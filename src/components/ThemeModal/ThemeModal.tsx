import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'; // Импортируем ваш Toggle
import { ThemeContextValue, ThemePreference, Themes } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

interface ThemeModalProps {
  visible: boolean
  onClose: () => void
}

export const ThemeModal = ({ visible, onClose }: ThemeModalProps) => {
  const { themePreference, activeTheme, colors, spacing, borderRadius, setThemePreference } =
    useTheme()
  const { t } = useTranslation()

  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )

  const isSystemTheme = themePreference === Themes.System

  const handleSystemToggle = (useSystem: boolean) => {
    if (useSystem) {
      setThemePreference(Themes.System)
    } else {
      setThemePreference(activeTheme as ThemePreference)
    }
  }

  const handleThemeSelect = (newTheme: ThemePreference) => {
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
            <Icon name='theme' size='lg' />
            <AppText variant='title' style={{ color: colors['text-primary'] }}>
              {t('theme')}
            </AppText>
          </View>

          <View style={styles.content}>
            <Toggle label={t('system_theme')} value={isSystemTheme} onToggle={handleSystemToggle} />
            {!isSystemTheme && (
              <View style={styles.manualThemeContainer}>
                <Button
                  title={t('light_theme')}
                  variant={themePreference === Themes.Light ? 'primary' : 'secondary'}
                  onPress={() => handleThemeSelect(Themes.Light)}
                />

                <Button
                  title={t('dark_theme')}
                  variant={themePreference === Themes.Dark ? 'primary' : 'secondary'}
                  onPress={() => handleThemeSelect(Themes.Dark)}
                />
              </View>
            )}

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
      gap: spacing['space-xl'],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['space-sm'],
    },
    content: {
      gap: spacing['space-xl'],
    },
    manualThemeContainer: {
      gap: spacing['space-md'],
    },
  })
