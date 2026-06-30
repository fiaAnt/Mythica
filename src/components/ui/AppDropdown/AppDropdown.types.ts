interface DropdownOption {
  label: string
  value: string
}

export interface Layout {
  x: number
  y: number
  width: number
  height: number
}

export interface AppDropdownProps {
  label: string
  placeholder?: string
  options: Record<string, string> | readonly DropdownOption[]
  value?: string
  onChange: (value: string) => void
}
