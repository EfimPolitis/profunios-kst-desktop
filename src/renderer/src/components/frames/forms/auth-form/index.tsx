import { useParams } from '@tanstack/react-router'
import { AtSign, Lock, User, UserCog } from 'lucide-react'
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

import { useAuth } from '@shared/hooks/user/useAuth'
import { useGetUser } from '@shared/hooks/user/useGetUser'
import { useUpdateUser } from '@shared/hooks/user/useUpdateUser'

import styles from './index.module.scss'
import { formRules } from './rules'
import { Button } from '@/components/ui'
import { Field } from '@/components/ui'
import { InputSelect } from '@/components/ui/fields/input-select'

interface AuthFormProps {
  isLogin?: boolean
  isEditing?: boolean
}

const AuthForm = ({ isLogin, isEditing }: AuthFormProps) => {
  if (isEditing) {
    var userId = 
      useParams({
        from: '/_layout/users/edit/$userId',
        select: params => params.userId
      })
    

    if (userId) {
      const { data } = useGetUser(userId)
      var user = data?.data
    }

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
    }, [user])
  }

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

  const [values, setValues] = useState(initialValues)
  const { register, handleSubmit, reset, control } = useForm<IAuthFormData>({
    mode: 'onChange',
    defaultValues: initialValues,
    values
  })

  const { authUser, isPendingAuth } = useAuth(!!isLogin, reset)
  const { updateUser, isPendingUpdate } = useUpdateUser()

  const isPending = isPendingAuth || isPendingUpdate

  const onSubmit: SubmitHandler<IAuthFormData> = data => {
    isEditing ? updateUser({ data, userId }) : authUser(data)
  }

  const onError = (errors: FieldErrors<IAuthFormData>) => {
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
            : 'Создание пользователя'}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={styles.form}
      >
        <Field
          placeholder='Логин'
          Icon={User}
          {...register('userName', formRules.userName)}
        />
        {isLogin || (
          <>
            <Field
              placeholder='Фамилия'
              Icon={User}
              {...register('lastName', formRules.lastName)}
            />
            <Field
              placeholder='Имя'
              Icon={User}
              {...register('firstName', formRules.firstName)}
            />
            <Field
              placeholder='Отчество'
              Icon={User}
              {...register('middleName', formRules.middleName)}
            />
            <Field
              placeholder='Email'
              Icon={AtSign}
              {...register('email', formRules.email)}
            />
            <Controller
              control={control}
              name='role'
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  setState={onChange}
                  initialValue={roles[value]}
                  Icon={UserCog}
                  data={variantsRoles}
                />
              )}
            />
          </>
        )}
        <Field
          placeholder='Пароль'
          isPassword
          Icon={Lock}
          type='password'
          {...register('password', isEditing ? {} : formRules.password)}
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
