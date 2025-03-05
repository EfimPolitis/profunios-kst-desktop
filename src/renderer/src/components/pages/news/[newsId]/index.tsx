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

  window.api.setTitle(`${news?.title}`)

  return (
    <div className={styles.page}>
      {!isPending ? (
        <div className={styles.content}>
          {news ? (
            <>
              <UndoBtn
                link={URL_PAGES.MANAGE_NEWS}
                size={30}
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '-60px',
                  zIndex: '1'
                }}
              />
              <Slider
                height={500}
                images={news?.images}
                style={{ borderRadius: '10px 10px 0px 0px' }}
              />
              <div className={styles.info_block}>
                <div className={styles.views}>
                  <Eye />
                  <span>{news.views}</span>
                </div>
                <h2>{news.title}</h2>
                <div className={styles.description}>
                  {news?.content
                    .split('\n')
                    ?.map((label, index) => <p key={index}>{label}</p>)}
                </div>
              </div>
            </>
          ) : (
            <p>Кажется что данной новости уже нет...</p>
          )}
        </div>
      ) : (
        <NewsPageSkeleton />
      )}
    </div>
  )
}
