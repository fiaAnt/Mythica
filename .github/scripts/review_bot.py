import os
import json
import re
import sys
import time
from google import genai
from google.genai import types
from github import Github, Auth

# --- CONFIG ---
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
REPO = os.getenv('REPO_NAME')
PR_NUM_STR = os.getenv('PR_NUMBER')

if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY is missing!")
    sys.exit(1)
if not GITHUB_TOKEN or not REPO or not PR_NUM_STR:
    print("❌ Error: Missing GITHUB_TOKEN, REPO_NAME or PR_NUMBER!")
    sys.exit(1)

PR_NUM = int(PR_NUM_STR)

# --- GITHUB ---
auth = Auth.Token(GITHUB_TOKEN)
g = Github(auth=auth)
repo = g.get_repo(REPO)
pr = repo.get_pull(PR_NUM)
last_commit = list(pr.get_commits())[-1]

# --- SETTINGS ---
BATCH_SIZE = 20
MAX_PATCH_CHARS = 50000
MAX_COMMENTS = 20
RETRY_COUNT = 3
BLOCK_SIZE = 1500  # безопасный размер блока
CONTEXT_LINES = 3

# --- HELPERS ---
def post_error_comment(msg):
    try:
        pr.create_issue_comment(f"❌ AI Review failed:\n`{msg}`")
    except:
        pass

def get_changed_lines_only(patch):
    valid_lines = set()
    current_new_line = 0
    for line in patch.split('\n'):
        match = re.match(r'^@@ \-\d+(?:,\d+)? \+(\d+)', line)
        if match:
            current_new_line = int(match.group(1))
            continue
        if line.startswith('+') and not line.startswith('+++'):
            valid_lines.add(current_new_line)
            current_new_line += 1
        elif line.startswith(' '):
            current_new_line += 1
    return valid_lines

def call_gemini_safe(client, prompt, schema, retries=RETRY_COUNT):
    """Вызываем Gemini API с повторными попытками и экспоненциальным бэкоффом"""
    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=schema,
                    temperature=0.1,
                ),
            )
            return response.text
        except Exception as e:
            wait_time = 5 * (2 ** attempt)
            print(f"Retry {attempt + 1}/{retries} failed: {e}. Waiting {wait_time}s...")
            time.sleep(wait_time)
    raise Exception("Gemini API failed after retries")

def get_patch_blocks_safe(patch, block_size=BLOCK_SIZE):
    """Разбиваем патч на блоки не больше block_size символов, стараясь не резать строки"""
    blocks = []
    start = 0
    while start < len(patch):
        end = start + block_size
        if end < len(patch):
            next_newline = patch.rfind('\n', start, end)
            if next_newline > start:
                end = next_newline + 1
        blocks.append(patch[start:end])
        start = end
    return blocks

# --- STRICT JSON SCHEMA ---
review_schema = types.Schema(
    type=types.Type.ARRAY,
    items=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "path": types.Schema(type=types.Type.STRING),
            "line": types.Schema(type=types.Type.INTEGER),
            "body": types.Schema(type=types.Type.STRING),
        },
        required=["path", "line", "body"]
    )
)

# --- MAIN ---
all_comments = []
client = genai.Client(api_key=GEMINI_API_KEY)

print(f"🔍 Reviewing PR #{PR_NUM} with {len(list(pr.get_files()))} files...")

for file in pr.get_files():
    if file.status in ["removed", "deleted", "renamed"] or not file.patch:
        continue

    # Только нужные расширения
    if not file.filename.endswith(('.ts', '.tsx', '.js', '.jsx')):
        continue

    # Пропускаем слишком большие файлы
    if len(file.patch) > 100_000:
        print(f"⚠️ Skipping large file: {file.filename}")
        continue

    valid_lines = get_changed_lines_only(file.patch)
    if not valid_lines:
        continue

    blocks = get_patch_blocks_safe(file.patch, BLOCK_SIZE)

    for block in blocks:
        prompt = f"""
You are a cynical, hard-to-please Senior Code Reviewer.
Focus strictly on logic bugs, security, performance, and maintainability.
DO NOT give compliments or formatting notes.
Review only this code fragment from file {file.filename}:
{block}
"""
        try:
            raw_content = call_gemini_safe(client, prompt, review_schema)
            try:
                ai_comments = json.loads(raw_content)
            except json.JSONDecodeError:
                print(f"❌ Invalid JSON from Gemini for {file.filename}:\n{raw_content}")
                post_error_comment(f"Invalid JSON from Gemini in {file.filename}")
                continue

            for c in ai_comments:
                path = c.get("path")
                line = int(c.get("line", 0))
                body = c.get("body")
                if path == file.filename and line in valid_lines:
                    all_comments.append({'path': path, 'line': line, 'body': body})

        except Exception as e:
            print(f"⚠️ Failed on file {file.filename}: {e}")
            post_error_comment(f"Failed to review {file.filename}: {e}")
            continue

# --- Публикация результатов ---
if all_comments:
    pr.create_review(
        commit=last_commit,
        body=f"### 🤖 AI Code Review ({len(all_comments)} comments)",
        event="COMMENT",
        comments=all_comments[:MAX_COMMENTS]
    )
    print(f"✅ Posted {len(all_comments)} comments")
else:
    pr.create_issue_comment("✅ AI Review: no critical issues found.")
    print("👍 No critical issues found.")
