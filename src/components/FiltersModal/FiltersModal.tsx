import { AppDropdown } from '@/components/ui/AppDropdown'
import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { useFilters } from '@/hooks/filters'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from '../ui/Icon'
import { Toggle } from '../ui/Toggle'

interface FiltersModalProps {
  visible: boolean
  onClose: () => void
  onApply: () => void
  selectedMythology: string | undefined
  setSelectedMythology: (value: string | undefined) => void
  selectedType: string | undefined
  setSelectedType: (value: string | undefined) => void
  isExplored: boolean
  setIsExplored: (value: boolean) => void
}

export const FiltersModal = ({
  visible,
  onClose,
  onApply,
  selectedMythology,
  setSelectedMythology,
  selectedType,
  setSelectedType,
  isExplored,
  setIsExplored,
}: FiltersModalProps) => {
  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const { t, i18n } = useTranslation()

  const { filters } = useFilters(i18n.language)

  const handleReset = () => {
    setSelectedMythology(undefined)
    setSelectedType(undefined)
    setIsExplored(false)
  }

  const handleApply = () => {
    onApply()
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
            <Icon name='filters' size='lg' />
            <AppText variant='title' style={{ color: colors['text-primary'] }}>
              {t('filters')}
            </AppText>
          </View>

          <View style={styles.content}>
            <AppDropdown
              label={t('mythology')}
              placeholder={t('select_mythology')}
              options={filters.mythologies}
              value={selectedMythology}
              onChange={setSelectedMythology}
            />
            <AppDropdown
              label={t('type')}
              placeholder={t('select_type')}
              options={filters.types}
              value={selectedType}
              onChange={setSelectedType}
            />
            <Toggle label={t('only_unexplored')} value={isExplored} onToggle={setIsExplored} />
          </View>

          <View style={styles.footer}>
            <Button title={t('reset')} variant='secondary' onPress={handleReset} />

            <Button title={t('apply')} variant='primary' onPress={handleApply} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

type FiltersStyleProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>
const createStyles = ({ colors, spacing, borderRadius }: FiltersStyleProps) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors['overlay-50'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      borderRadius: borderRadius['border-xl'],
      padding: spacing['space-xxl'],
      width: '90%',
      gap: spacing['space-xl'],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing['space-xl'],
      gap: spacing['space-sm'],
    },
    content: {
      gap: spacing['space-sm'],
    },
    footer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: spacing['space-xxl'],
      gap: spacing['space-md'],
    },
  })
