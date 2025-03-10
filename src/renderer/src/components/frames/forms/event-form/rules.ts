import type { RegisterOptions } from 'react-hook-form'

import type { IEventFormData } from '@shared/types/event.types'

type TFormRules = {
  title: RegisterOptions<IEventFormData, 'title'>
  description: RegisterOptions<IEventFormData, 'description'>
  organizer: RegisterOptions<IEventFormData, 'organizer'>
  imagesId: RegisterOptions<IEventFormData, 'imagesId'>
  categoriesId: RegisterOptions<IEventFormData, 'categoriesId'>
  date: RegisterOptions<IEventFormData, 'date'>
  link: RegisterOptions<IEventFormData, 'link'>
  places: RegisterOptions<IEventFormData, 'places'>
  status: RegisterOptions<IEventFormData, 'status'>
}

export const formRules: TFormRules = {
  title: {
    required: {
      value: true,
      message: '"Заголовок" - обязательное поле'
    }
  },
  description: {
    required: {
      value: true,
      message: '"Описание" - обязательное поле'
    }
  },
  organizer: {
    required: {
      value: true,
      message: '"Организатор" - обязательное поле'
    }
  },
  imagesId: {
    required: {
      value: true,
      message: 'Нужно загрузить хотя бы одну фотографию'
    }
  },
  categoriesId: {
    required: false
  },
  date: {
    required: {
      value: true,
      message: '"Дата проведения" - обязательное поле'
    }
  },
  link: {
    required: false,
    pattern: {
      value: /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/,
      message: 'Введите корректный URL'
    }
  },
  places: {
    required: {
      value: true,
      message: '"Количество мест" - обязательное поле'
    }
  },
  status: {
    required: {
      value: true,
      message: '"Статус мероприятия" - обязательное поле'
    }
  }
}
