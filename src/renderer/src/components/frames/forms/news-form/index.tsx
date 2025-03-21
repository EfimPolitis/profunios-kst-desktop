import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

import type { IEventFormData, TypeImage } from '@shared/types/event.types'
import type { INewsFormData } from '@shared/types/news.types'

import { useCreateNews } from '@shared/hooks/news/useCreateNews'
import { useGetNewsById } from '@shared/hooks/news/useGetNewsById'
import { useUpdateNews } from '@shared/hooks/news/useUpdateNews'

import styles from './index.module.scss'
import { formRules } from './rules'
import { Button, Field, TextArea, Uploader } from '@/components/ui'

interface INewsForm {
  isEditing?: boolean
}

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
      <h2>Форма {isEditing ? 'редактирования' : 'создания'} новости</h2>
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
        style={{ maxWidth: '800px', minHeight: '400px' }}
        placeholder='Основной контент'
        {...register('content', formRules.content)}
      />
      <Button
        isPending={isPending}
        isSuccess={isSuccess}
        style={{ width: '400px' }}
        type='submit'
      >
        {isEditing ? 'Сохранить изменения' : 'Создать'}
      </Button>
    </form>
  )
}
