import { Link, useParams } from '@tanstack/react-router'
import cn from 'clsx'
import { AtSign, Lock, LogOut, User, UserCog } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { roles, variantsRoles } from '@shared/constants/roles.constants'

import type { IAuthFormData } from '@shared/types/auth.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useAuth } from '@shared/hooks/auth/useAuth'
import { useLogout } from '@shared/hooks/auth/useLogout'
import { useGetUser } from '@shared/hooks/user/useGetUser'
import { useUpdateUser } from '@shared/hooks/user/useUpdateUser'

import styles from './index.module.scss'
import { authFormRules } from './rules'
import { Button } from '@/components/ui'
import { Field } from '@/components/ui'
import { InputSelect } from '@/components/ui/fields/input-select'

interface AuthFormProps {
  type: 'login' | 'edit' | 'profile' | 'register'
  userId?: string
}

const titleList = {
  login: 'Вход в систему',
  profile: 'Профиль',
  register: 'Форма создания пользователя',
  edit: 'Форма редактирования пользователя'
}

const AuthForm = ({ type, userId }: AuthFormProps) => {
  const { mutate: logout } = useLogout()

  const initialValues = useMemo(
    () => ({
      userName: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: '',
      role: 'USER'
    }),
    []
  )

  const { data } = useGetUser(userId)

  if (type === 'edit' || type === 'profile') {
    const user = data?.data

    useEffect(() => {
      if (user) {
        setValues({
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          email: user.email,
          password: '',
          role: user.role
        })
      }
    }, [type, user])
  }

  const [values, setValues] = useState(initialValues)
  const { register, handleSubmit, reset, control } = useForm<IAuthFormData>({
    mode: 'onChange',
    defaultValues: initialValues,
    values
  })

  const { authUser, isPendingAuth } = useAuth(type === 'login', reset)
  const { updateUser, isPendingUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate

  const onSubmit: SubmitHandler<IAuthFormData> = data => {
    type === 'edit' || type === 'profile'
      ? updateUser({ data, userId })
      : authUser(data)
  }

  const onError = (errors: FieldErrors<IAuthFormData>) => {
    const errorsKeys = Object.keys(errors).reverse()
    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  const title = titleList[type]

  return (
    <div
      className={styles.auth_block}
      style={type === 'login' ? { backgroundColor: 'transparent' } : {}}
    >
      <p style={{ textAlign: 'center' }}>{title}</p>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={styles.form}
      >
        <Field
          placeholder='Логин'
          Icon={User}
          autoComplete='username'
          {...register('userName', authFormRules.userName)}
        />
        {type !== 'login' && (
          <>
            <Field
              placeholder='Фамилия'
              Icon={User}
              {...register('lastName', authFormRules.lastName)}
            />
            <Field
              placeholder='Имя'
              Icon={User}
              {...register('firstName', authFormRules.firstName)}
            />
            <Field
              placeholder='Отчество'
              Icon={User}
              {...register('middleName', authFormRules.middleName)}
            />
            <Field
              placeholder='Email'
              Icon={AtSign}
              {...register('email', authFormRules.email)}
            />
            {type !== 'profile' && (
              <Controller
                control={control}
                name='role'
                render={({ field: { onChange } }) => (
                  <InputSelect
                    setState={onChange}
                    initialValue={roles[values.role]}
                    Icon={UserCog}
                    data={variantsRoles}
                  />
                )}
              />
            )}
          </>
        )}
        {type !== 'profile' && (
          <Field
            placeholder='Пароль'
            isPassword
            Icon={Lock}
            type='password'
            autoComplete='current-password'
            {...register(
              'password',
              type === 'edit' ? {} : authFormRules.password
            )}
          />
        )}
        {type === 'profile' && (
          <div className={styles.btn_block}>
            <button
              className={cn(styles.logout, styles.btn)}
              onClick={() => logout()}
            >
              Выйти <LogOut className={styles.logout_icon} />
            </button>
            <Link
              to={URL_PAGES.CHANGE_PASSWORD}
              className={cn(styles.btn)}
            >
              Сменить пароль
              <Lock />
            </Link>
          </div>
        )}
        {type === 'login' && (
          <div>
            <a
              href={'https://profunions.ru/request-email'}
              target='_blank'
            >
              <h3>Забыли пароль?</h3>
            </a>
          </div>
        )}
        <Button
          type='submit'
          isLoading={isPending}
          disabled={isPending}
        >
          {type === 'login'
            ? 'Войти'
            : type === 'edit' || type === 'profile'
              ? 'Редактировать'
              : 'Создать'}
        </Button>
      </form>
    </div>
  )
}

export default AuthForm
