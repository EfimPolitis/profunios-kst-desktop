import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from '@tanstack/react-router'
import { AtSign, Lock, User, UserCog } from 'lucide-react'

import { Button } from '@/components/ui'
import { Field } from '@/components/ui'

import type { IFormData } from '@shared/types/auth.types'
import type { ERole } from '@shared/types/user.types'

import { useAuth } from '@shared/hooks/user/useAuth'
import { useGetUser } from '@shared/hooks/user/useGetUser'
import { useUpdateUser } from '@shared/hooks/user/useUpdateUser'

import { regularEmail } from '@shared/constants/regular-email'

import styles from './index.module.scss'
import toast from 'react-hot-toast'

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    // defaultValues: initialValues,
    // values
  })

  const { authUser, isPendingAuth } = useAuth(!!isLogin, reset)
  const { updateUser, isPendingUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    isEditing ? updateUser({ data, userId }) : authUser(data)
  }

  const handleError = () => {
    console.log(errors)
    if (!!Object.keys(errors).length) {
      const errorsKeys = Object.keys(errors)
      errorsKeys.forEach((error) => {
        toast.error(`${errors[error]?.message}`)
      })
    }
  }

  return (
    <div className={styles.auth_block}>
      <p>{isLogin ? 'Вход в систему' : isEditing ? 'Редактирование' : 'Регистрация'}</p>
      <form
        onSubmit={
          //@ts-ignore
          handleSubmit(onSubmit)
        }
        className={styles.form}
      >
        <Field
          placeholder="Логин"
          Icon={User}
          {...register('userName', {
            required: {
              value: true,
              message: '"Логин" - обязательное поле!'
            }
          })}
        />
        {isLogin || (
          <>
            <Field
              placeholder="Имя"
              Icon={User}
              {...register('firstName', {
                required: {
                  value: true,
                  message: '"Имя" - обязательное поле!'
                }
              })}
            />
            <Field
              placeholder="Фамилия"
              Icon={User}
              {...register('lastName', {
                required: {
                  value: true,
                  message: '"Фамилия" - обязательное поле!'
                }
              })}
            />
            <Field placeholder="Отчество" Icon={User} {...register('middleName')} />
            <Field
              placeholder="Почта"
              Icon={AtSign}
              {...register('email', {
                required: {
                  value: true,
                  message: '"Email" - обязательное поле!'
                },
                pattern: {
                  value: regularEmail,
                  message: 'Введите корректную почту!'
                }
              })}
            />
            <Field placeholder="Роль" Icon={UserCog} {...register('role')} />
          </>
        )}
        <Field
          placeholder="Пароль"
          isPassword
          Icon={Lock}
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: '"Пароль" - обязательное поле!'
            }
          })}
        />
        <Button
          text={isLogin ? 'Войти' : isEditing ? 'Редактировать' : 'Создать'}
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          onClick={() => handleError()}
        />
      </form>
    </div>
  )
}

export default AuthForm
