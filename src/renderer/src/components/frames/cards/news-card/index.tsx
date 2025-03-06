import { Link } from '@tanstack/react-router'
import { ArrowRight, Edit2, Eye, Trash2 } from 'lucide-react'
import type { FC } from 'react'

import type { INewsCard } from '@shared/types/news.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useDeleteNews } from '@shared/hooks/news/useDeleteNews'
import { useProfile } from '@shared/hooks/user/useProfile'

import { Slider } from '@/components/ui/slider'

import styles from './index.module.scss'

export const NewsCard: FC<INewsCard> = ({ data }) => {
  const { title, newsId, images, description, views, createdAt } = data
  const { data: user } = useProfile()

  const { mutateNews } = useDeleteNews()

  const onDelete = (eventId: string) => {
    const answer = confirm('Вы точно хотите удалить мероприятие?')
    answer && mutateNews(eventId)
  }

  return (
    <div className={styles.card}>
      <Link
        className={styles.card_link}
        to={'/news/$newsId'}
        params={{newsId}}
      />
      <p className={styles.views}>
        <Eye />
        <span>{views > 1000 ? (views / 1000).toFixed(1) + 'k' : views}</span>
      </p>
      {user?.role === 'ADMIN' || user?.role === 'MODER' ? (
        <div className={styles.menu}>
          <Link
            to={'/news/edit/$newsId'}
            params={{newsId}}
            title='Редактировать'
            className={styles.edit}
          >
            <Edit2 />
          </Link>
          <button
            className={styles.trash}
            title='Удалить'
          >
            <Trash2 onClick={() => onDelete(newsId)} />
          </button>
        </div>
      ) : null}
      <Slider
        images={images}
        height={240}
        style={{ borderRadius: '10px 10px 0px 0px' }}
      />
      <div className={styles.info_block}>
        <p className={styles.date}>
          Опубликованно:{' '}
          <span>
            {new Date(createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </p>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>
          {description.length > 150
            ? description.slice(0, 150) + '...'
            : description}
        </p>
        <Link
          to={'/news/$newsId'}
          params={{newsId}}
          className={styles.details}
        >
          Подробнее
          <ArrowRight
            size={20}
            className={styles.arrow}
          />
        </Link>
      </div>
    </div>
  )
}
