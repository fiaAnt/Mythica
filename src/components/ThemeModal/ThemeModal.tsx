import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Theme, ThemeContextValue, Themes } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

interface ThemeModalProps {
  visible: boolean
  onClose: () => void
}

export const ThemeModal = ({ visible, onClose }: ThemeModalProps) => {
  const { theme, colors, spacing, borderRadius, setThemePreference } = useTheme()
  const { t } = useTranslation()

  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )

  const handleThemeSelect = (newTheme: Theme) => {
    newTheme = theme === Themes.Light ? Themes.Dark : Themes.Light
    setThemePreference(newTheme)
  }

  return (
    <Modal transparent visible={visible} animationType='fade' onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        <View
          style={[styles.modalContainer, { backgroundColor: colors['background-surface-primary'] }]}
        >
          <View style={styles.header}>
            <Icon name='theme' color='icon-primary' size='lg' />
            <AppText variant='title' style={{ color: colors['text-primary'] }}>
              {t('theme')}
            </AppText>
          </View>

          <View style={styles.content}>
            <Button
              title={t('light_theme')}
              variant={theme === Themes.Light ? 'primary' : 'secondary'}
              onPress={() => handleThemeSelect(Themes.Light)}
            />

            <Button
              title={t('dark_theme')}
              variant={theme === Themes.Dark ? 'primary' : 'secondary'}
              onPress={() => handleThemeSelect(Themes.Dark)}
            />
            <Button title={t('close')} variant='secondary' onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

type ThemeStyleProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>
const createStyles = ({ colors, spacing, borderRadius }: ThemeStyleProps) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors['overlay-50'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      borderRadius: borderRadius['border-xl'],
      padding: spacing['space-xl'],
      gap: spacing['space-xxl'],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['space-sm'],
    },
    content: {
      gap: spacing['space-md'],
      marginHorizontal: spacing['space-md'],
    },
  })
