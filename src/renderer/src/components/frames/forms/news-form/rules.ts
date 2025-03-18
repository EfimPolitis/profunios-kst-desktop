import type { RegisterOptions } from 'react-hook-form'

import type { INewsFormData } from '@shared/types/news.types'

type TFormRules = {
  title: RegisterOptions<INewsFormData, 'title'>
  imagesId: RegisterOptions<INewsFormData, 'imagesId'>
  content: RegisterOptions<INewsFormData, 'content'>
}

export const formRules: TFormRules = {
  title: {
    required: {
      value: true,
      message: '"Заголовок" - обязательное поле для заполнения'
    }
  },
  imagesId: {
    required: {
      value: true,
      message: 'Нужно загрузить хотя бы одну фотографию'
    }
  },
  content: {
    required: {
      value: true,
      message: '"Основной контент" - обязательное поле для заполнения'
    }
  }
}
