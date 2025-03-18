import { useParams } from '@tanstack/react-router'
import { Eye } from 'lucide-react'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetNewsById } from '@shared/hooks/news/useGetNewsById'

import styles from './index.module.scss'
import NewsPageSkeleton from './index.skeleton'
import { UndoBtn } from '@/components/ui'
import { Slider } from '@/components/ui/slider'

export const NewsPageId = () => {
  const newsId = useParams({
    from: '/_layout/news/$newsId',
    select: params => params.newsId
  })

  const { data, isPending } = useGetNewsById(newsId)
  const news = data?.data

  return (
    <div className={styles.page}>
      {!isPending ? (
        <div className={styles.content}>
          {news ? (
            <div className={styles.wrap}>
              <UndoBtn
                link={URL_PAGES.MANAGE_NEWS}
                size={30}
              />
              <div className={styles.info_block}>
                <div className={styles.views}>
                  <Eye />
                  <span>{news.views}</span>
                </div>
                <h1>{news.title}</h1>
                <hr />
                <div className={styles.row}>
                  <h3>
                    Опубликованно:{' '}
                    <span>
                      {new Date(news.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </h3>
                </div>
                <Slider
                  height={500}
                  images={news?.images}
                  style={{ borderRadius: '10px 10px 10px 10px' }}
                />
                <div className={styles.row}>
                  <h2>Описание</h2>
                </div>
                <div className={styles.description}>
                  {news?.content
                    .split('\n')
                    ?.map((label, index) => <p key={index}>{label}</p>)}
                </div>
              </div>
            </div>
          ) : (
            <p>Данное мероприятие не было найденно</p>
          )}
        </div>
      ) : (
        <NewsPageSkeleton />
      )}
    </div>
  )
}
