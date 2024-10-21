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

import { useGetCategories } from '@shared/hooks/category/useGetCategories'
import { useCreateEvent } from '@shared/hooks/event/useCreateEvent'
import { useGetEventById } from '@shared/hooks/event/useGetEventById'
import { useUpdateEvent } from '@shared/hooks/event/useUpdateEvent'

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

interface IEventForm {
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
  organizer: '',
  imagesId: [],
  date: '',
  categoriesId: [],
  link: '',
  totalTickets: 0
}

export const EventForm = ({ isEditing }: IEventForm) => {
  if (isEditing) {
    var eventId = useParams({
      from: '/_layout/events/edit/$eventId',
      select: params => params.eventId
    })

    if (eventId) {
      const { data } = useGetEventById(eventId)
      var event = data?.data
    }
  }

  const [values, setValues] = useState<IEventFormData>(initialValues)
  const [images, setImages] = useState<TypeImage[]>([])

  const initialTypeEvent = useMemo(
    () => (isEditing ? (event?.link ? 'link' : 'noLink') : 'link'),
    [isEditing, event?.link]
  )

  const [typeEvent, setTypeEvent] = useState(initialTypeEvent)
  const isLink = typeEvent === 'link'

  useEffect(() => {
    if (event) {
      const categoriesId = event.categories.map(category => category.id)
      const imagesId = event.images.map(image => image.id)

      setImages(event.images)
      setValues({
        title: event.title,
        description: event.description,
        organizer: event.organizer,
        imagesId,
        date: event.date,
        categoriesId,
        link: event.link,
        totalTickets: event.totalTickets
      })
    }
  }, [event])

  const { categories } = useGetCategories()
  const { createEvent, isPendingCreate, isSuccessCreate } = useCreateEvent()
  const { updateEvent, isPendingUpdate, isSuccessUpdate } = useUpdateEvent()

  const isSuccess = isSuccessCreate || isSuccessUpdate
  const isPending = isPendingCreate || isPendingUpdate

  const { register, control, handleSubmit } = useForm<IEventFormData>({
    defaultValues: initialValues,
    values
  })

  const onSubmit: SubmitHandler<IEventFormData> = useCallback(data => {
    data.totalTickets = Number(data.totalTickets)
    isEditing ? eventId && updateEvent({ data, eventId }) : createEvent(data)
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
      <TextArea
        style={{ maxWidth: '800px' }}
        placeholder='Описание'
        {...register('description', formRules.description)}
      />
      <Field
        placeholder='Организатор'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('organizer', formRules.organizer)}
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
          />
        )}
      />
      <Controller
        control={control}
        name='categoriesId'
        rules={formRules.categoriesId}
        render={({ field: { onChange, value } }) => (
          <SelectCategories
            onChange={onChange}
            value={value}
            categories={categories}
          />
        )}
      />
      <div>
        <DateInput {...register('date', formRules.date)} />
      </div>
      <div>
        <h3>Тип меропрития</h3>
        <InputRadio
          setState={setTypeEvent}
          variants={variants}
          checked={initialTypeEvent}
          style={{ marginBottom: '20px' }}
        />
        {isLink ? (
          <Field
            placeholder={'Введите ссылку'}
            style={{ width: '500px', paddingLeft: '20px' }}
            {...register('link', isLink && formRules.type)}
          />
        ) : (
          <Field
            placeholder='Количество билетов'
            style={{ width: '120px', textAlign: 'center', padding: '5px' }}
            type={'number'}
            {...register('totalTickets', !isLink && formRules.type)}
          />
        )}
      </div>
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
