import { Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import { type FieldErrors, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { IChangePasswordFormData } from '@shared/types/auth.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useChangePassword } from '@shared/hooks/auth/useChangePassword'
import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import { changePasswordFormRulles } from './rules'
import { Button, Field } from '@/components/ui'

export const ChangePasswordForm = () => {
  const { profile } = useProfile()
  const { register, handleSubmit, reset } = useForm<IChangePasswordFormData>()
  const { changePassword } = useChangePassword(reset)

  const onSubmit: SubmitHandler<IChangePasswordFormData> = data => {
    if (data.newPassword !== data.confirmPassword)
      return toast.error('Новый пароль не совпадает с подтвержденным паролем')

    return changePassword(data)
  }

  const onError = (errors: FieldErrors<IChangePasswordFormData>) => {
    const errorsKeys = Object.keys(errors).reverse() as Array<
      keyof IChangePasswordFormData
    >
    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  return (
    <div className={styles.change_password_block}>
      <p style={{ textAlign: 'center' }}>Смена пароля</p>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={styles.form}
        autoComplete='off'
      >
        <input
          type='text'
          name='username'
          autoComplete='username'
          value={profile?.userName}
          readOnly
          hidden
        />
        <Field
          placeholder='Старый пароль'
          Icon={Lock}
          type='password'
          isPassword
          autoComplete='current-password'
          {...register(
            'currentPassword',
            changePasswordFormRulles.currentPassword
          )}
        />
        <Field
          placeholder='Новый пароль'
          Icon={Lock}
          type='password'
          isPassword
          autoComplete='new-password'
          {...register('newPassword', changePasswordFormRulles.newPassword)}
        />
        <Field
          placeholder='Подтвердите новый пароль'
          Icon={Lock}
          type='password'
          isPassword
          autoComplete='new-password'
          {...register(
            'confirmPassword',
            changePasswordFormRulles.confirmPassword
          )}
        />
        <a href={'https://profunios.ru/request-email'}>
          <h3>Забыли пароль?</h3>
        </a>
        <Button type='submit'>Сменить</Button>
      </form>
    </div>
  )
}
