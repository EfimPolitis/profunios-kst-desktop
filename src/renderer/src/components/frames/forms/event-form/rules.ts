export const formRules = {
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
    required: {
      value: true,
      message: 'Нужно выбрать хотя бы одну категорию'
    }
  },
  eventDate: {
    required: {
      value: true,
      message: '"Дата проведения" - обязательное поле'
    }
  },
  type: {
    required: {
      value: true,
      message:
        '"Тип мероприятия" - обязательное поле, нужно выбрать одно из двух'
    }
  }
}
