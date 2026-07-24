import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useMemo } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '../Icon'

interface InputProps {
  placeholder?: string
  value?: string
  icon?: string
  onChangeText?: (text: string) => void
  onSearch?: () => void
  onSubmitEditing?: () => void
  multiline?: boolean
  numberOfLines?: number
  showCheckmark?: boolean
  onSubmit?: () => void
}

export const Input = ({
  placeholder = '...',
  value = '',
  icon,
  onChangeText = () => {},
  onSearch = () => {},
  onSubmitEditing = () => {},
  multiline = false,
  numberOfLines,
  showCheckmark = false,
  onSubmit = () => {},
}: InputProps) => {
  const { borderRadius, spacing, colors } = useTheme()
  const styles = useMemo(
    () => createStyles({ borderRadius, spacing, colors }),
    [borderRadius, spacing, colors],
  )

  const handleRightButtonPress = () => {
    if (showCheckmark) {
      onSubmit()
    } else {
      onChangeText('')
    }
  }

  return (
    <View style={[styles.container, multiline && styles.multilineContainer]}>
      {icon && (
        <View style={multiline ? styles.multilineIcon : undefined}>
          <Icon name={icon} size='md' />
        </View>
      )}

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          { color: colors['text-primary'] },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors['text-secondary']}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch !== Input.defaultProps?.onSearch ? onSearch : onSubmitEditing}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />

      {value.length > 0 && (
        <TouchableOpacity style={styles.rightButton} onPress={handleRightButtonPress}>
          <AppText variant='body' style={styles.buttonText}>
            {showCheckmark ? '✓' : '✕'}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  )
}

const createStyles = ({ colors, borderRadius, spacing }: ThemeContextValue) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors['background-surface-primary'],
      borderRadius: borderRadius['border-xl'],
      paddingHorizontal: spacing['space-lg'],
      paddingVertical: spacing['space-md'],
      marginBottom: spacing['space-xl'],
    },
    multilineContainer: {
      alignItems: 'flex-start',
    },
    multilineIcon: {
      marginTop: spacing['space-xs'],
    },
    input: {
      flex: 1,
      marginLeft: spacing['space-sm'],
    },
    multilineInput: {
      textAlignVertical: 'top',
    },
    rightButton: {
      marginLeft: spacing['space-sm'],
      paddingHorizontal: spacing['space-xs'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      color: colors['text-primary'],
    },
  })
