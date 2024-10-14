import { regularEmail } from '@shared/constants/regular-email'

export const formRules = {
  login: {
    required: {
      value: true,
      message: '"Логин" - обязательное поле!'
    }
  },
  name: {
    required: {
      value: true,
      message: '"Имя" - обязательное поле!'
    }
  },
  surname: {
    required: {
      value: true,
      message: '"Фамилия" - обязательное поле!'
    }
  },
  email: {
    required: {
      value: true,
      message: '"Email" - обязательное поле!'
    },
    pattern: {
      value: regularEmail,
      message: 'Введите корректную почту!'
    }
  },
  password: {
    required: {
      value: true,
      message: '"Пароль" - обязательное поле!'
    }
  }
}
