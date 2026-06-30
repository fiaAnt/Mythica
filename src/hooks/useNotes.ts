import { useAppDispatch, useAppSelector } from '@/store'
import { addNote, deleteNote, fetchNotes, updateNote } from '@/store/features/notes/notes.thunk'
import { useEffect, useState } from 'react'

export const useNotes = (characterId?: string) => {
  const [inputText, setInputText] = useState('')
  const [noteText, setNoteText] = useState('')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const notes = useAppSelector((state) => state.notes.notes)

  useEffect(() => {
    if (user?.uid && characterId) {
      dispatch(fetchNotes({ userId: user.uid, characterId }))
    }
  }, [dispatch, user?.uid, characterId])

  useEffect(() => {
    if (characterId && notes[characterId]) {
      setNoteText(notes[characterId].text || '')
      setEditingNoteId(notes[characterId].id || null)
    } else {
      setNoteText('')
      setEditingNoteId(null)
    }
  }, [characterId, notes])

  const handleSubmitNote = () => {
    if (!user?.uid || !characterId) return

    if (inputText.trim()) {
      if (editingNoteId) {
        dispatch(
          updateNote({
            userId: user.uid,
            characterId,
            noteId: editingNoteId,
            text: inputText,
          }),
        )
      } else {
        dispatch(
          addNote({
            userId: user.uid,
            characterId,
            text: inputText,
          }),
        )
      }
      setInputText('')
      setEditingNoteId(null)
    }
  }

  const handleEditNote = () => {
    setInputText(noteText)
  }

  const handleDeleteNote = () => {
    if (!user?.uid || !characterId || !editingNoteId) return

    dispatch(
      deleteNote({
        userId: user.uid,
        characterId,
        noteId: editingNoteId,
      }),
    )
    setNoteText('')
    setEditingNoteId(null)
    setInputText('')
  }

  return {
    inputText,
    setInputText,
    noteText,
    setNoteText,
    handleSubmitNote,
    handleEditNote,
    handleDeleteNote,
    editingNoteId,
  }
}
