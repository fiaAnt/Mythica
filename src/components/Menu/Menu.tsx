import { FiltersModal } from '@/components/FiltersModal'
import { ThemeModal } from '@/components/ThemeModal'
import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from '../ui/Icon'

interface MenuProps {
  onFiltersApply: (mythology: string | undefined, type: string | undefined) => void
}

export const Menu = ({ onFiltersApply }: MenuProps) => {
  const { colors, spacing, shadow, borderRadius } = useTheme()
  const { t } = useTranslation()
  const styles = useMemo(
    () => createStyles({ colors, spacing, shadow, borderRadius }),
    [colors, spacing, shadow, borderRadius],
  )

  const [menuVisible, setMenuVisible] = useState(false)
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [themeVisible, setThemeVisible] = useState(false)

  const [selectedMythology, setSelectedMythology] = useState<string | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()

  const handleFiltersApply = () => {
    onFiltersApply(selectedMythology, selectedType)
    setFiltersVisible(false)
    setMenuVisible(false)
  }

  const handleOpenFilters = () => {
    setMenuVisible(false)
    setFiltersVisible(true)
  }

  const handleOpenTheme = () => {
    setMenuVisible(false)
    setThemeVisible(true)
  }

  return (
    <>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Icon name='menu' size='md' />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View
          style={[styles.menuContainer, { backgroundColor: colors['background-surface-primary'] }]}
        >
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenTheme}>
            <Icon name='theme' size='md' />
            <AppText style={{ color: colors['text-primary'] }}>{t('theme')}</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleOpenFilters}>
            <Icon name='filters' size='md' />
            <AppText style={{ color: colors['text-primary'] }}>{t('filters')}</AppText>
          </TouchableOpacity>
        </View>
      </Modal>

      <FiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        onApply={handleFiltersApply}
        selectedMythology={selectedMythology}
        setSelectedMythology={setSelectedMythology}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <ThemeModal visible={themeVisible} onClose={() => setThemeVisible(false)} />
    </>
  )
}

type MenuStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'shadow' | 'borderRadius'>
const createStyles = ({ colors, spacing, shadow, borderRadius }: MenuStylesProps) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors['overlay-50'],
    },
    menuContainer: {
      position: 'absolute',
      top: spacing['space-xxl'],
      right: spacing['space-xl'],
      borderRadius: borderRadius['border-lg'],
      padding: spacing['space-sm'],
      ...shadow['light'],
      zIndex: 999,
    },
    menuItem: {
      paddingVertical: spacing['space-lg'],
      paddingHorizontal: spacing['space-xl'],
      borderRadius: borderRadius['border-md'],
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['space-md'],
    },
  })
