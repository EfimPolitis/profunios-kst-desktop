import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type CSSProperties, useState } from 'react'
import toast from 'react-hot-toast'

import type { TypeImage } from '@shared/types/event.types'

import styles from './index.module.scss'

interface ISlider {
  images: TypeImage[]
  height: number
  style?: CSSProperties
  isCard?: boolean
}

export const Slider = ({ images, height, style }: ISlider) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images) return toast.error('Нету картинок')

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div
      className={styles.slider_container}
      style={style}
    >
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((image, index) => (
          <div
            key={image.id}
            className={cn(styles.slide, {
              [styles.active]: index === currentIndex
            })}
            style={{
              height: `${height}px`,
              backgroundImage: `url("${image.url}")`
            }}
          ></div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            className={cn(styles.arrow, styles.prev)}
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={cn(styles.arrow, styles.next)}
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      <div className={styles.indicator}>
        {currentIndex + 1}/{images?.length}
      </div>
    </div>
  )
}
