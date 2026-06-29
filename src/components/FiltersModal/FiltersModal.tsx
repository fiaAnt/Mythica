import { Toggle } from '@/components/Toggle'
import { AppDropdown } from '@/components/ui/AppDropdown'
import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { getFilters } from '@/services/filtersService'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from '../ui/Icon'

interface FilterData {
  mythologies: { label: string; value: string }[]
  types: { label: string; value: string }[]
}

interface FiltersModalProps {
  visible: boolean
  onClose: () => void
  onApply: () => void
  selectedMythology: string | undefined
  setSelectedMythology: (value: string | undefined) => void
  selectedType: string | undefined
  setSelectedType: (value: string | undefined) => void
}

export const FiltersModal = ({
  visible,
  onClose,
  onApply,
  selectedMythology,
  setSelectedMythology,
  selectedType,
  setSelectedType,
}: FiltersModalProps) => {
  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const { t, i18n } = useTranslation()

  const [filterOptions, setFilterOptions] = useState<FilterData>({
    mythologies: [],
    types: [],
  })
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (visible) {
      getFilters(i18n.language)
        .then((data) => {
          if (data) {
            setFilterOptions(data)
          }
        })
        .catch((err) => console.error('Failed to fetch filters:', err))
    }
  }, [visible, i18n.language])

  const handleReset = () => {
    setSelectedMythology(undefined)
    setSelectedType(undefined)
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
            <Icon name='filters' color='icon-primary' size='lg' />
            <AppText variant='title' style={{ color: colors['text-primary'] }}>
              {t('filters')}
            </AppText>
          </View>

          <View style={styles.content}>
            <AppDropdown
              label={t('mythology')}
              placeholder={t('select_mythology')}
              options={filterOptions.mythologies}
              value={selectedMythology}
              onChange={setSelectedMythology}
            />
            <AppDropdown
              label={t('type')}
              placeholder={t('select_type')}
              options={filterOptions.types}
              value={selectedType}
              onChange={setSelectedType}
            />
            <Toggle label={t('only_explored')} value={isEnabled} onToggle={setIsEnabled} />
          </View>

          <View style={styles.footer}>
            <Button
              title={t('reset')}
              variant='secondary'
              style={styles.buttonSpacing}
              onPress={handleReset}
            />

            <Button
              title={t('apply')}
              variant='primary'
              style={styles.buttonSpacing}
              onPress={handleApply}
            />
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
      maxWidth: 400,
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
    buttonSpacing: {
      flex: 1,
    },
  })
