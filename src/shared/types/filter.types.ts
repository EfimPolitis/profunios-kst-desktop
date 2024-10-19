export interface FilterField {
  name: string
  label?: string
  placeholder?: string
  type: 'text' | 'date' | 'select'
  optionLabel?: string
  options?: { value: string; label: string }[]
}

export interface FilterProps {
  fields: FilterField[]
  onFilterChange: (filters: { [key: string]: string | null }) => void
}
