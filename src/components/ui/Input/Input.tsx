import searchIcon from '@/assets/images/search.svg'
import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { useMemo } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '../Icon'

interface InputProps {
  placeholder: string
  value?: string
  onChangeText?: (text: string) => void
  onSearch?: () => void
}

export const Input = ({
  placeholder = 'Поиск...',
  value = '',
  onChangeText = () => {},
  onSearch = () => {},
}: InputProps) => {
  const { colors, spacing, borderRadius } = useTheme()

  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  return (
    <View style={styles.container}>
      <Icon name='search' color='icon-secondary' size='md' />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <AppText variant='body'>✕</AppText>
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
    },
  })
