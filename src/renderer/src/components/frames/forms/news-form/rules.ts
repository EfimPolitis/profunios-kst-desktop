import type { RegisterOptions } from 'react-hook-form'

import type { INewsFormData } from '@shared/types/news.types'

type TFormRules = {
  title: RegisterOptions<INewsFormData, 'title'>
  description: RegisterOptions<INewsFormData, 'description'>
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
  description: {
    required: {
      value: true,
      message: '"Описание для карточки" - обязательное поле для заполнения'
    },
    maxLength: {
      value: 150,
      message: 'Описание для карточки не должно быть больше 150 символов'
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
