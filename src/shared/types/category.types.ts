export interface ICategory {
  name: string
  color: EColors
}

export interface IResponseCategories {
  id: string
  name: string
  color: EColors
}

enum EColors {
  'red' = '#000',
  'orange' = '#000',
  'blue' = '#000',
  'cian' = '#000',
  'green' = '#000',
  'default' = '#000'
}
