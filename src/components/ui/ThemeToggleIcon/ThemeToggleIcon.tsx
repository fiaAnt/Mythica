import { useTheme } from '@/theme/ThemeContext'
import React, { SVGProps } from 'react'
import DarkTheme from '../../../../assets/images/darkTheme.svg'
import LightTheme from '../../../../assets/images/lightTheme.svg'

export const ThemeToggleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  const { themeMode } = useTheme()
  if (themeMode === 'dark') {
    return <DarkTheme {...props} />
  }
  return <LightTheme {...props} />
}
