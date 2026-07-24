import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, View } from 'react-native'
import { Icon } from '../ui/Icon'

interface InfoModalProps {
  visible: boolean
  onClose: () => void
  message?: string
  iconType?: 'info' | 'favorite_guard'
}

export const InfoModal = ({ visible, onClose, message, iconType = 'info' }: InfoModalProps) => {
  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const { t } = useTranslation()

  const iconName = iconType === 'favorite_guard' ? 'favorite_guard' : 'info_modal'

  return (
    <Modal transparent visible={visible} animationType='fade' onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Icon name={iconName} size='xl' />

          <AppText variant='body' align='center'>
            {message || t('favorites_info')}
          </AppText>

          <Button title={t('ok')} onPress={onClose}></Button>
        </View>
      </View>
    </Modal>
  )
}

type ModalStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>

const createStyles = ({ colors, spacing, borderRadius }: ModalStylesProps) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors['overlay-50'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      borderRadius: borderRadius['border-lg'],
      padding: spacing['space-lg'],
      width: '90%',
      alignItems: 'center',
      gap: spacing['space-sm'],
      backgroundColor: colors['background-primary'],
    },
  })
