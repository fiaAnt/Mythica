import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { AppDropdownProps, Layout } from './AppDropdown.types'

export default function AppDropdown({
  label,
  placeholder = 'Select',
  options,
  value,
  onChange,
}: AppDropdownProps) {
  const [open, setOpen] = useState(false)
  const [layout, setLayout] = useState<Layout | null>(null)
  const ref = useRef<View>(null)
  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const anim = useRef(new Animated.Value(0)).current
  const optionsArray = Array.isArray(options || [])
    ? options || []
    : Object.entries(options || {}).map(([label, value]) => ({ label, value }))
  const selected = optionsArray.find((o) => o.value === value)
  const topDistance = 4
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => setOpen(false))
    return () => sub.remove()
  }, [])

  const toggle = () => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height })

      const toValue = open ? 0 : 1
      if (!open) anim.setValue(0)

      setOpen(true)
      Animated.timing(anim, {
        toValue,
        duration: open ? 140 : 180,
        useNativeDriver: true,
      }).start(() => {
        if (toValue === 0) setOpen(false)
      })
    })
  }

  return (
    <View ref={ref} style={styles.container}>
      <AppText variant='body' color={colors['text-primary']}>
        {label}
      </AppText>

      <TouchableOpacity style={styles.input} onPress={toggle}>
        <AppText>{selected?.label || placeholder}</AppText>

        <AppText variant='body'>{open ? '▴' : '▾'}</AppText>
      </TouchableOpacity>

      {open && layout && (
        <Modal transparent>
          <TouchableWithoutFeedback onPress={toggle}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.dropdown,
              {
                top: layout.y + layout.height + topDistance,
                left: layout.x,
                width: layout.width,
                opacity: anim,
                transform: [
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-8, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <FlatList
              data={optionsArray}
              keyExtractor={(i) => i.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, item.value === value && styles.selected]}
                  onPress={() => {
                    onChange(item.value)
                    toggle()
                  }}
                >
                  <AppText variant='body'>{item.label}</AppText>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </Modal>
      )}
    </View>
  )
}
type DropdownStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>
const createStyles = ({ colors, spacing, borderRadius }: DropdownStylesProps) =>
  StyleSheet.create({
    container: { width: '100%', gap: spacing['space-xs'] },
    input: {
      backgroundColor: colors['background-selected'],
      padding: spacing['space-md'],
      borderRadius: borderRadius['border-lg'],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: colors['overlay-50'],
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: colors['background-surface-secondary'],
      borderRadius: borderRadius['border-lg'],
      borderWidth: 1,
      borderColor: colors['border-primary'],
      overflow: 'hidden',
      zIndex: 1000,
    },
    item: {
      paddingVertical: spacing['space-md'],
      paddingHorizontal: spacing['space-lg'],
      borderBottomWidth: 1,
      borderBottomColor: colors['border-primary'],
    },
    selected: { backgroundColor: colors['background-selected'] },
  })
