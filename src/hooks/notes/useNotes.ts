import { db } from '@/firebase'
import { useAppSelector } from '@/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Note } from './useNotes.types'

const useNoteQuery = (userId?: string, characterId?: string) => {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['notes', userId, characterId],
    queryFn: async () => {
      if (!userId || !characterId) return null
      const userSnap = await getDoc(doc(db, 'users', userId))
      const data = userSnap.exists() ? userSnap.data()?.notes?.[characterId] || null : null
      return data
    },
    enabled: !!userId && !!characterId,
    gcTime: 0,
  })
  useEffect(() => {
    return () => {
      if (userId) {
        queryClient.removeQueries({ queryKey: ['notes'], userId, characterId })
      }
    }
  }, [userId, characterId, queryClient])
  return query
}

const useSaveNote = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, Note>({
    mutationFn: async ({ userId, characterId, text, existingNote }) => {
      const userRef = doc(db, 'users', userId)
      const now = new Date().toISOString()
      const noteData = {
        id: existingNote?.id || Date.now().toString(),
        text,
        createdAt: existingNote?.createdAt || now,
        updatedAt: now,
      }
      await setDoc(userRef, { notes: { [characterId]: noteData } }, { merge: true })
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', variables.userId, variables.characterId],
      })
    },
  })
}

const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, Note>({
    mutationFn: async ({ userId, characterId }) => {
      const userRef = doc(db, 'users', userId)
      await updateDoc(userRef, { [`notes.${characterId}`]: deleteField() })
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', variables.userId, variables.characterId],
      })
    },
  })
}
export const useNotes = (characterId: string) => {
  const { user } = useAppSelector((state) => state.auth)
  const userId = user?.uid

  const [inputText, setInputText] = useState('')

  const { data: noteData } = useNoteQuery(userId, characterId)

  const saveMutation = useSaveNote()
  const deleteMutation = useDeleteNoteMutation()

  const handleSubmitNote = () => {
    if (!inputText.trim() || !userId) return

    saveMutation.mutate(
      {
        userId,
        characterId,
        text: inputText,
        existingNote: noteData,
      },
      {
        onSuccess: () => setInputText(''),
      },
    )
  }

  const handleEditNote = () => {
    if (noteData?.text) {
      setInputText(noteData.text)
    }
  }

  const handleDeleteNote = () => {
    if (!userId) return
    deleteMutation.mutate({ userId, characterId })
  }

  return {
    inputText,
    setInputText,
    noteText: noteData?.text || null,
    handleSubmitNote,
    handleEditNote,
    handleDeleteNote,
  }
}
