import { useParams } from '@tanstack/react-router'
import { AtSign, Lock, User, UserCog } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { regularEmail } from '@shared/constants/regular-email'

import type { IFormData } from '@shared/types/auth.types'
import type { ERole } from '@shared/types/user.types'

import { useAuth } from '@shared/hooks/user/useAuth'
import { useGetUser } from '@shared/hooks/user/useGetUser'
import { useUpdateUser } from '@shared/hooks/user/useUpdateUser'

import styles from './index.module.scss'
import { formRules } from './rules'
import { Button } from '@/components/ui'
import { Field } from '@/components/ui'

interface AuthFormProps {
  isLogin?: boolean
  isEditing?: boolean
}

const AuthForm = ({ isLogin, isEditing }: AuthFormProps) => {
  const [userId, setUserId] = useState('')

  // if (isEditing) {
  //   setUserId(useParams({ from: '/users/$userId', select: (params) => params.userId }))
  //   const { data, isFetching } = useGetUser(userId)
  //   const user = data?.data

  //   useEffect(() => {
  //     if (isEditing && userId) {
  //       setValues({
  //         userName: user?.userName,
  //         firstName: user?.firstName,
  //         lastName: user?.lastName,
  //         middleName: user?.middleName,
  //         email: user?.email,
  //         password: user?.password,
  //         //@ts-ignore
  //         role: ERole[user?.role]
  //       })
  //     }
  //   }, [isFetching, isEditing, userId])
  // }

  // const initialValues = useMemo(
  //   () => ({
  //     userName: '',
  //     firstName: '',
  //     lastName: '',
  //     middleName: '',
  //     email: '',
  //     password: '',
  //     role: ''
  //   }),
  //   []
  // )

  // const [values, setValues] = useState(initialValues)
  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange'
    // defaultValues: initialValues,
    // values
  })

  const { authUser, isPendingAuth } = useAuth(!!isLogin, reset)
  const { updateUser, isPendingUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate

  const onSubmit: SubmitHandler<IFormData> = data => {
    isEditing ? updateUser({ data, userId }) : authUser(data)
  }

  const onError = (errors: FieldErrors<IFormData>) => {
    const errorsKeys = Object.keys(errors).reverse()
    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }

  return (
    <div className={styles.auth_block}>
      <p>
        {isLogin
          ? 'Вход в систему'
          : isEditing
            ? 'Редактирование'
            : 'Регистрация'}
      </p>
      <form
        onSubmit={
          // @ts-ignore
          handleSubmit(onSubmit, onError)
        }
        className={styles.form}
      >
        <Field
          placeholder='Логин'
          Icon={User}
          {...register('userName', formRules.login)}
        />
        {isLogin || (
          <>
            <Field
              placeholder='Имя'
              Icon={User}
              {...register('firstName', formRules.name)}
            />
            <Field
              placeholder='Фамилия'
              Icon={User}
              {...register('lastName', formRules.surname)}
            />
            <Field
              placeholder='Отчество'
              Icon={User}
              {...register('middleName')}
            />
            <Field
              placeholder='Почта'
              Icon={AtSign}
              {...register('email', formRules.email)}
            />
            <Field
              placeholder='Роль'
              Icon={UserCog}
              {...register('role')}
            />
          </>
        )}
        <Field
          placeholder='Пароль'
          isPassword
          Icon={Lock}
          type='password'
          {...register('password', formRules.password)}
        />
        <Button
          text={isLogin ? 'Войти' : isEditing ? 'Редактировать' : 'Создать'}
          type='submit'
          isLoading={isPending}
          disabled={isPending}
        />
      </form>
    </div>
  )
}

export default AuthForm
