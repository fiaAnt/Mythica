import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'

interface NoteProps {
  text: string
  onEdit: () => void
  onDelete: () => void
}

export const Note = ({ text, onEdit, onDelete }: NoteProps) => {
  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const { t } = useTranslation()

  return (
    <View style={styles.noteContainer}>
      <View style={styles.header}></View>

      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.noteContentContainer}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <AppText variant='note'>{text}</AppText>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title={t('edit')} variant='secondary' onPress={onEdit} />
          </View>

          <View style={styles.buttonWrapper}>
            <Button title={t('delete')} variant='primary' onPress={onDelete} />
          </View>
        </View>
      </View>
    </View>
  )
}

type NoteStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>

const createStyles = ({ colors, spacing, borderRadius }: NoteStylesProps) =>
  StyleSheet.create({
    noteContainer: {
      marginBottom: spacing['space-xl'],
      borderRadius: borderRadius['border-lg'],
      backgroundColor: colors['background-surface-primary'],
      overflow: 'hidden',
    },
    header: {
      paddingHorizontal: spacing['space-md'],
      paddingTop: spacing['space-sm'],
      flexDirection: 'row',
    },
    overlay: {
      flex: 1,
      paddingTop: spacing['space-xs'],
    },
    noteContentContainer: {
      paddingHorizontal: spacing['space-lg'],
      paddingBottom: spacing['space-sm'],
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingVertical: spacing['space-sm'],
      paddingHorizontal: spacing['space-md'],
      gap: spacing['space-sm'],
    },
    buttonWrapper: {
      flex: 1,
    },
  })
