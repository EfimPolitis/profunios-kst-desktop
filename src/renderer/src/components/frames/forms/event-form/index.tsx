import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  EStatus,
  type IEventFormData,
  type TypeImage
} from '@shared/types/event.types'

import { useGetCategories } from '@shared/hooks/category/useGetCategories'
import { useCreateEvent } from '@shared/hooks/event/useCreateEvent'
import { useGetEventById } from '@shared/hooks/event/useGetEventById'
import { useUpdateEvent } from '@shared/hooks/event/useUpdateEvent'

import styles from './index.module.scss'
import { eventFormRules } from './rules'
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
    _value: EStatus.EVERYONE,
    label: 'Публичный'
  },
  {
    _value: EStatus.INTERNAL,
    label: 'Скрытый'
  }
]

export const EventForm = ({ isEditing }: IEventForm) => {
  const initialValues = useMemo(
    () => ({
      title: '',
      description: '',
      organizer: '',
      imagesId: [],
      date: '',
      categoriesId: [],
      link: '',
      places: 0,
      status: EStatus.EVERYONE
    }),
    []
  )

  if (isEditing) {
    var eventId = useParams({
      from: '/_layout/events/edit/$eventId',
      select: params => params.eventId
    })
    var { data } = useGetEventById(eventId)
  }

  useEffect(() => {
    if (isEditing && data?.data) {
      const event = data?.data

      const categoriesId = event.categories.map(category => category.id)
      const imagesId = event.images.map(image => image.id)

      setImages(event.images)
      setValues({
        title: event.title,
        description: event.description,
        organizer: event.organizer,
        imagesId,
        date: event.date.slice(0, 16),
        categoriesId,
        link: event.link,
        places: event.places || 0,
        status: event.status,
        address: event.address
      })
    }
  }, [isEditing, data?.data])

  const [values, setValues] = useState<IEventFormData>(initialValues)
  const [images, setImages] = useState<TypeImage[]>([])

  const { categories } = useGetCategories()
  const { createEvent, isPendingCreate, isSuccessCreate } = useCreateEvent()
  const { updateEvent, isPendingUpdate, isSuccessUpdate } = useUpdateEvent()

  const isSuccess = isSuccessCreate || isSuccessUpdate
  const isPending = isPendingCreate || isPendingUpdate

  const { register, control, handleSubmit } = useForm<IEventFormData>({
    defaultValues: initialValues,
    values
  })

  const onSubmit: SubmitHandler<IEventFormData> = useCallback(
    data => {
      data.places = Number(data.places)
      data.date = data.date + 'Z'

      isEditing ? eventId && updateEvent({ data, eventId }) : createEvent(data)
    },
    [isEditing, updateEvent, createEvent]
  )

  const onError = useCallback((errors: FieldErrors<IEventFormData>) => {
    const errorsKeys = Object.keys(errors).reverse() as Array<
      keyof IEventFormData
    >

    errorsKeys.forEach(error => {
      toast.error(`${errors[error]?.message}`)
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={styles.event_form}
    >
      <h2>Форма {isEditing ? 'редактирования' : 'создания'} мероприятия</h2>
      <Field
        placeholder='Заголовок'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('title', eventFormRules.title)}
      />
      <TextArea
        style={{ maxWidth: '800px', minHeight: '400px' }}
        placeholder='Описание'
        {...register('description', eventFormRules.description)}
      />
      <Field
        placeholder='Организатор'
        style={{ width: '450px', paddingLeft: '20px' }}
        {...register('organizer', eventFormRules.organizer)}
      />
      <Controller
        control={control}
        name='imagesId'
        rules={eventFormRules.imagesId}
        render={({ field: { value: imagesId, onChange: setImagesId } }) => (
          <Uploader
            imagesId={imagesId}
            setImagesId={setImagesId}
            images={images}
            entity={'event'}
          />
        )}
      />
      <Controller
        control={control}
        name='categoriesId'
        rules={eventFormRules.categoriesId}
        render={({ field: { value, onChange } }) => (
          <SelectCategories
            onChange={onChange}
            value={value || []}
            categories={categories}
          />
        )}
      />
      <div>
        <Field
          placeholder={'Место регистрации'}
          style={{ width: '500px', paddingLeft: '20px' }}
          {...register('address', eventFormRules.address)}
        />
      </div>
      <div>
        <DateInput
          min={new Date().toISOString().slice(0, 16)}
          {...register('date', eventFormRules.date)}
        />
      </div>
      <div>
        <Field
          placeholder={'Введите ссылку на мероприятие'}
          style={{ width: '500px', paddingLeft: '20px' }}
          {...register('link', eventFormRules.link)}
        />
      </div>
      <div>
        <h3>Количество мест</h3>
        <br />
        <Controller
          control={control}
          name='places'
          rules={eventFormRules.places}
          render={({ field: { value, onChange } }) => (
            <div className={styles.places_block}>
              <Button
                onClick={() => onChange(value ? value - 1 : 0)}
                className={styles.btn}
                type='button'
              >
                <p>-</p>
              </Button>
              <Field
                style={{ width: '140px', textAlign: 'center', padding: '5px' }}
                type={'number'}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
              />
              <Button
                onClick={() =>
                  onChange(value === undefined ? undefined : value + 1)
                }
                className={styles.btn}
                type='button'
              >
                <p>+</p>
              </Button>
            </div>
          )}
        />
      </div>
      <div>
        <h3>Тип меропрития</h3>
        <br />
        <Controller
          control={control}
          name='status'
          rules={eventFormRules.status}
          render={({ field: { value, onChange } }) => (
            <InputRadio
              variants={variants}
              checked={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Button
        isPending={isPending}
        isSuccess={isSuccess}
        style={{ width: '400px' }}
        type='submit'
      >
        <p>{isEditing ? 'Сохранить изменения' : 'Создать'}</p>
      </Button>
    </form>
  )
}
