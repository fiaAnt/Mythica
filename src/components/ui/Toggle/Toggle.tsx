import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useMemo } from 'react'
import { StyleSheet, Switch, View } from 'react-native'

interface ToggleProps {
  label: string
  value: boolean
  onToggle: (value: boolean) => void
}

export const Toggle: React.FC<ToggleProps> = ({ label, value, onToggle }) => {
  const { borderRadius, colors } = useTheme()
  const styles = useMemo(() => createStyles({ borderRadius, colors }), [borderRadius, colors])
  return (
    <View style={styles.switchContainer}>
      <AppText variant='body'>{label}</AppText>
      <Switch
        style={styles.switch}
        trackColor={{
          false: colors['background-surface-secondary'],
          true: colors['background-selected'],
        }}
        thumbColor={value ? colors['button-primary'] : colors['button-secondary']}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  )
}
type ToggleStylesProps = Pick<ThemeContextValue, 'borderRadius'>
const createStyles = ({ borderRadius }: ToggleStylesProps) =>
  StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: borderRadius['border-lg'],
    },
    switch: {
      transform: [{ scale: 0.8 }],
    },
  })
