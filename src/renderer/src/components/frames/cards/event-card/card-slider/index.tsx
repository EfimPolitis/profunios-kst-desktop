import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CSSProperties, useState } from 'react'

import { TypeImage } from '@shared/types/event.types'

import styles from './index.module.scss'

interface ISlider {
  images: TypeImage[]
  style?: CSSProperties
  isCard?: boolean
}

export const Slider = ({ images, isCard, style }: ISlider) => {
  const [currentIndex, setCurrentIndex] = useState(0)

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
      className={cn(
        styles.slider_container,
        isCard ? styles.card : styles.standart
      )}
      style={style}
    >
      <div className={'slider'}>
        {images?.map((image, index) => (
          <div
            key={index}
            className={cn(
              styles.slide,
              index === currentIndex ? styles.active : ''
            )}
            style={{ backgroundImage: `url(${image.url})` }}
          ></div>
        ))}
      </div>
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
      <div className={styles.indicator}>
        {currentIndex + 1}/{images?.length}
      </div>
      <style>{`
        .slider {
          display: flex;
          transition: transform 0.5s ease-in-out;
          transform: translateX(-${currentIndex * 100}%);
        }
      `}</style>
    </div>
  )
}
