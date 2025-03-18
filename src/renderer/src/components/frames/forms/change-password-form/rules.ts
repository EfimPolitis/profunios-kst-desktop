import type { RegisterOptions } from 'react-hook-form'

import type { IChangePasswordFormData } from '@shared/types/auth.types'

type TChangePasswordFormRules = {
  currentPassword: RegisterOptions<IChangePasswordFormData, 'currentPassword'>
  newPassword: RegisterOptions<IChangePasswordFormData, 'newPassword'>
  confirmPassword: RegisterOptions<IChangePasswordFormData, 'confirmPassword'>
}

export const changePasswordFormRulles: TChangePasswordFormRules = {
  currentPassword: {
    required: {
      value: true,
      message: '"Старый пароль" - обязательное поле'
    }
  },
  newPassword: {
    required: {
      value: true,
      message: '"Новый пароль" - обязательное поле'
    },
    minLength: {
      value: 6,
      message: 'Новый пароль не должен быть меньше 6 символов'
    },
    validate: {
      hasUppercase: value =>
        /[A-ZА-ЯЁ]/.test(value) ||
        'Новый пароль должен содержать хотя бы одну заглавную букву',
      hasSpecialChar: value =>
        /[№@!$#^&?%-_\|/]/.test(value) ||
        'Новый пароль должен содержать хотя бы один специальный символ №@!$#^&?%-_\|/'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: '"Подтверждение нового пароля" - обязательное поле'
    }
  }
}
