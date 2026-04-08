import os
import json
import re
import sys
import time
from google import genai
from google.genai import types
from github import Github, Auth
from base64 import b64decode

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
MAX_PATCH_CHARS = 50000  # увеличенный лимит
MAX_COMMENTS = 20
RETRY_COUNT = 3
CONTEXT_LINES = 3  # сколько строк контекста добавлять сверху/снизу
BLOCK_SIZE = 3000  # разбивка большого патча по символам

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

def call_gemini(client, prompt, schema):
    for attempt in range(RETRY_COUNT):
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
            print(f"Retry {attempt+1}/{RETRY_COUNT} failed: {e}")
            time.sleep(5)
    raise Exception("Gemini API failed after retries")

def get_patch_blocks(patch, block_size=BLOCK_SIZE):
    """Разбиваем большой patch на блоки по block_size символов."""
    blocks = []
    for i in range(0, len(patch), block_size):
        blocks.append(patch[i:i+block_size])
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
files = list(pr.get_files())
all_comments = []

print(f"🔍 Reviewing PR #{PR_NUM} with {len(files)} files in batches of {BATCH_SIZE}...")

client = genai.Client(api_key=GEMINI_API_KEY)

for batch_start in range(0, len(files), BATCH_SIZE):
    batch_files = files[batch_start:batch_start + BATCH_SIZE]
    batch_comments = []

    for file in batch_files:
        if file.status in ["removed", "deleted", "renamed"] or not file.patch:
            continue

        # Только нужные расширения
        if not file.filename.endswith(('.ts', '.tsx', '.js', '.jsx')):
            continue

        valid_lines = get_changed_lines_only(file.patch)
        if not valid_lines:
            continue

        patch = file.patch[:MAX_PATCH_CHARS]  # увеличенный лимит
        blocks = get_patch_blocks(patch)

        for block in blocks:
            prompt = f"""
You are a cynical, hard-to-please Senior Code Reviewer.
Focus strictly on logic bugs, security, performance, and maintainability.
DO NOT give compliments or formatting notes.
Review only this code fragment from file {file.filename}:
{block}
"""
            try:
                raw_content = call_gemini(client, prompt, review_schema)
                ai_comments = json.loads(raw_content)
                for c in ai_comments:
                    path = c.get("path")
                    line = int(c.get("line", 0))
                    body = c.get("body")
                    if path == file.filename and line in valid_lines:
                        batch_comments.append({'path': path, 'line': line, 'body': body})
            except Exception as e:
                print(f"⚠️ Failed on file {file.filename}: {e}")
                post_error_comment(f"Failed to review {file.filename}: {e}")
                continue

    if len(batch_comments) > MAX_COMMENTS:
        batch_comments = batch_comments[:MAX_COMMENTS]

    if batch_comments:
        try:
            pr.create_review(
                commit=last_commit,
                body=f"### 🤖 AI Code Review (batch {batch_start//BATCH_SIZE + 1})",
                event="COMMENT",
                comments=batch_comments
            )
            print(f"✅ Posted {len(batch_comments)} comments for batch {batch_start//BATCH_SIZE + 1}")
            all_comments.extend(batch_comments)
        except Exception as e:
            post_error_comment(f"Failed to post review for batch: {e}")

if not all_comments:
    pr.create_issue_comment("✅ AI Review: no critical issues found.")
    print("👍 No critical issues found.")
