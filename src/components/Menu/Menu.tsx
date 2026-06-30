import { FiltersModal } from '@/components/FiltersModal'
import { ThemeModal } from '@/components/ThemeModal'
import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'
import { useAppDispatch } from '@/store'
import { logout } from '@/store/features/auth/auth.thunk'
import { router, usePathname } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from '../ui/Icon'

interface MenuProps {
  onFiltersApply: (
    mythology: string | undefined,
    type: string | undefined,
    isExplored: boolean,
  ) => void
}

export const Menu = ({ onFiltersApply }: MenuProps) => {
  const { colors, spacing, shadow, borderRadius } = useTheme()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
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
  const [isExplored, setIsExplored] = useState(false)

  const handleFiltersApply = () => {
    onFiltersApply(selectedMythology, selectedType, isExplored)
    setFiltersVisible(false)
    setMenuVisible(false)
  }

  const logOut = () => {
    dispatch(logout())
    setMenuVisible(false)
    setFiltersVisible(false)
  }

  const handleLogOutPress = () => {
    router.push('/')
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

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenTheme}>
            <Icon name='theme' size='md' />
            <AppText style={styles.menuText}>{t('theme')}</AppText>
          </TouchableOpacity>

          {pathname === '/profile' && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                logOut()
                handleLogOutPress()
              }}
            >
              <Icon name='log-out' size='md' />
              <AppText style={styles.menuText}>{t('logOut')}</AppText>
            </TouchableOpacity>
          )}

          {pathname === '/' && (
            <TouchableOpacity style={styles.menuItem} onPress={handleOpenFilters}>
              <Icon name='filters' size='md' />
              <AppText style={styles.menuText}>{t('filters')}</AppText>
            </TouchableOpacity>
          )}
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
        isExplored={isExplored}
        setIsExplored={setIsExplored}
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
      backgroundColor: colors['background-surface-primary'],
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
    menuText: {
      color: colors['text-primary'],
    },
  })
