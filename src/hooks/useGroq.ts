import i18n from '@/i18n'
import { logger } from '@/utils/logger'
import OpenAI from 'openai'
import { useState } from 'react'
import { Character } from './useCharacters/useCharacters.types'

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY
if (!GROQ_API_KEY) {
  logger.warn('EXPO_PUBLIC_GROQ_API_KEY is missing! Add it to your .env file')
}

const groq = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true,
})

export const useGroq = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const findSimilarCharacters = async (currentCharacter: Character, allCharacters: Character[]) => {
    setLoading(true)
    setError(null)

    try {
      const otherCharacters = allCharacters.filter((c) => c.id !== currentCharacter.id)

      if (otherCharacters.length === 0) {
        return []
      }
      const currentLanguage = i18n.language || 'en'
      const prompt = `
Find 3 most similar mythology characters from the list below.

Target character:
Name: ${currentCharacter.name}
Description: ${currentCharacter.description}
Mythology: ${currentCharacter.mythology}
Symbols: ${Array.isArray(currentCharacter.symbols) ? currentCharacter.symbols.join(', ') : (currentCharacter.symbols ?? '')}

Characters list:
${otherCharacters
  .map((c) => {
    const formattedSymbols = Array.isArray(c.symbols)
      ? c.symbols.join(', ')
      : typeof c.symbols === 'string'
        ? c.symbols
        : ''

    const shortDescription = c.description ? c.description.slice(0, 200) : ''

    return `ID: "${c.id}", Name: "${c.name}", Description: "${shortDescription}", Symbols: "${formattedSymbols}"`
  })
  .join('\n')}

Choose the 3 most similar characters.
CRITICAL: You must write the "reason" field in the following language: "${currentLanguage}" (e.g. if 'ru' -> write in Russian, if 'en' -> write in English).

Return ONLY a valid JSON object matching this schema:
{
  "characters": [
    {
      "id": "string",
      "reason": "string"
    }
  ]
}
`

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert in mythology character analysis. You must return ONLY a valid JSON object. Do not include any markdown formatting like ```json.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
        max_tokens: 400,
      })

      const content = completion.choices[0]?.message?.content

      if (!content) {
        throw new Error('Empty response from Groq')
      }

      const parsedData = JSON.parse(content)
      const similarWithReasons: { id: string; reason: string }[] = parsedData.characters || []

      const similar = otherCharacters
        .filter((c) => similarWithReasons.some((item) => item.id === c.id))
        .map((c) => {
          const reason = similarWithReasons.find((item) => item.id === c.id)?.reason
          return {
            id: c.id,
            name: c.name,
            title: c.title,
            description: c.description,
            image: c.image,
            similarityReason: reason,
          }
        })
        .slice(0, 3)

      return similar
    } catch (err: unknown) {
      logger.error('Failed to find similar characters:', err)

      if (err instanceof SyntaxError) {
        setError('AI response processing error')
      } else if (err instanceof Error) {
        if (err.message.includes('401')) {
          setError('Invalid API key')
        } else if (err.message.includes('429')) {
          setError('Too many requests')
        } else {
          setError(err.message)
        }
      } else {
        setError('Unknown error')
      }

      return []
    } finally {
      setLoading(false)
    }
  }

  return { findSimilarCharacters, loading, error }
}
