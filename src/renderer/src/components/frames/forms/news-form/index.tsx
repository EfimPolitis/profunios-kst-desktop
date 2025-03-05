import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

import type { IEventFormData, TypeImage } from '@shared/types/event.types'
import type { INewsFormData } from '@shared/types/news.types'

import { useGetCategories } from '@shared/hooks/category/useGetCategories'
import { useCreateEvent } from '@shared/hooks/event/useCreateEvent'
import { useGetEventById } from '@shared/hooks/event/useGetEventById'
import { useUpdateEvent } from '@shared/hooks/event/useUpdateEvent'
import { useCreateNews } from '@shared/hooks/news/useCreateNews'
import { useGetNewsById } from '@shared/hooks/news/useGetNewsById'
import { useUpdateNews } from '@shared/hooks/news/useUpdateNews'

import styles from './index.module.scss'
import { formRules } from './rules'
import {
  Button,
  DateInput,
  Field,
  InputRadio,
  SelectCategories,
  TextArea,
  Uploader
} from '@/components/ui'

interface INewsForm {
  isEditing?: boolean
}

const variants = [
  {
    value: 'link',
    label: 'С сылкой на форму или объявление'
  },
  {
    value: 'noLink',
    label: 'С определённым количеством билетов'
  }
]

const initialValues = {
  title: '',
  description: '',
  content: '',
  imagesId: []
}

export const NewsForm = ({ isEditing }: INewsForm) => {
  if (isEditing) {
    var newsId = useParams({
      from: '/_layout/news/edit/$newsId',
      select: params => params.newsId
    })

    if (newsId) {
      const { data } = useGetNewsById(newsId)
      var news = data?.data
    }
  }

  const [values, setValues] = useState<INewsFormData>(initialValues)
  const [images, setImages] = useState<TypeImage[]>([])

  useEffect(() => {
    if (news) {
      const imagesId = news.images.map(image => image.id)

      setImages(news.images)
      setValues({
        title: news.title,
        description: news.description,
        content: news.content,
        imagesId
      })
    }
  }, [news])

  const { createNews, isPendingCreate, isSuccessCreate } = useCreateNews()
  const { updateNews, isPendingUpdate, isSuccessUpdate } = useUpdateNews()

  const isSuccess = isSuccessCreate || isSuccessUpdate
  const isPending = isPendingCreate || isPendingUpdate

  const { register, control, handleSubmit } = useForm<INewsFormData>({
    defaultValues: initialValues,
    values
  })

  const onSubmit: SubmitHandler<INewsFormData> = useCallback(data => {
    isEditing ? newsId && updateNews({ data, newsId }) : createNews(data)
  }, [])

  const onError = useCallback((errors: FieldErrors<IEventFormData>) => {
    const errorsKeys = Object.keys(errors).reverse()
    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={styles.event_form}
    >
      <Field
        placeholder='Заголовок'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('title', formRules.title)}
      />
      <Controller
        control={control}
        name='imagesId'
        rules={formRules.imagesId}
        render={({ field: { value: imagesId, onChange: setImagesId } }) => (
          <Uploader
            imagesId={imagesId}
            setImagesId={setImagesId}
            images={images}
            entity='news'
          />
        )}
      />
      <TextArea
        style={{ maxWidth: '800px', minHeight: '250px' }}
        placeholder='Описание для карточки'
        {...register('description', formRules.description)}
      />
      <TextArea
        style={{ maxWidth: '800px', minHeight: '400px' }}
        placeholder='Основной контент'
        {...register('content', formRules.content)}
      />
      <Button
        text={isEditing ? 'Сохранить изменения' : 'Создать'}
        isPending={isPending}
        isSuccess={isSuccess}
        style={{ width: '400px' }}
        type='submit'
      />
    </form>
  )
}
