import { useTheme } from '@/hooks/useTheme'
import { SVGProps } from 'react'
import DarkTheme from '../../../../assets/images/darkTheme.svg'
import LightTheme from '../../../../assets/images/lightTheme.svg'

export const ThemeToggleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useTheme()
  if (theme === 'dark') {
    return <DarkTheme {...props} />
  }
  return <LightTheme {...props} />
}
