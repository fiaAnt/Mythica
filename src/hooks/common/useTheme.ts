import { ThemeContext, ThemeContextValue } from '@/context/ThemeContext'
import { useContext } from 'react'

type MyReturnType<T> = T extends () => infer U ? U : T

type First<T> = T extends [infer First, ...infer Rest] ? First : never

type DeepRequired<T> = { [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P] }

type MyParameters<T> = T extends (...args: infer P) => infer R ? P : never

//type DeepReadonly<T> = (infer U) ? DeepReadonly<U> : readonly [U in keyof T]

type DeepReadonly<T> = { readonly [U in keyof T]: T[U] extends object ? DeepReadonly<T[U]> : T[U]  }

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
