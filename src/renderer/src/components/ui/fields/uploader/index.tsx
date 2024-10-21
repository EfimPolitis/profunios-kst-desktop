import { Download, File, Plus, Trash2, X } from 'lucide-react'
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  memo,
  useEffect,
  useRef,
  useState
} from 'react'

import type { TypeImage } from '@shared/types/event.types'

import styles from './index.module.scss'

interface IUploader {
  imagesId: string[]
  setImagesId: Dispatch<SetStateAction<string[]>>
  images: TypeImage[]
}

export const Uploader = memo(({ imagesId, setImagesId, images }: IUploader) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [imagesUrl, setImagesUrl] = useState<string[]>([])

  const handleChangeImage = async ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!files) return

      const file = files[0]

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
          const resultBuffer = window.api.createBuffer(
            reader.result as ArrayBuffer
          )
          resolve(resultBuffer)
        }

        reader.onerror = error => reject(error)
        reader.readAsArrayBuffer(file)
      })

      const { data } = await window.api.uploadImage({
        buffer,
        name: file.name,
        type: file.type
      })

      setFileNames(prev => [...prev, file.name])
      setImagesUrl([...imagesUrl, data.url])
      setImagesId([...imagesId, data.id])

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    } catch (error) {
      alert(`Произошла ошибка ${error}`)
    }
  }

  const deleteAllImages = () => {
    setFileNames([])
    setImagesUrl([])
    setImagesId([])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const deleteCurrentImage = (i: number) => {
    setFileNames(fileNames.filter((_, ind) => ind !== i))
    setImagesUrl(imagesUrl.filter((_, ind) => ind !== i))
    setImagesId(imagesId.filter((_, ind) => ind !== i))

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    const imagesName = images.map(image => image.name)
    const imagesUrl = images.map(image => image.url)
    setFileNames(imagesName)
    setImagesUrl(imagesUrl)
  }, [images])

  return (
    <div className={styles.uploader}>
      <div
        className={styles.uploader_input}
        onClick={() => {
          if (inputRef.current) inputRef.current.click()
        }}
      >
        <input
          type='file'
          accept='image/*'
          hidden
          ref={inputRef}
          onChange={handleChangeImage}
        />
        {imagesUrl.length > 0 ? (
          <div className={styles.img}>
            <img
              src={imagesUrl[0]}
              alt={fileNames[0]}
              width={700}
              height={475}
            />
          </div>
        ) : (
          <>
            <Download size={50} />
            <p>Выберите файл для загрузки</p>
          </>
        )}
      </div>
      <div className={styles.images}>
        {imagesUrl.slice(1, imagesUrl.length).map((url, i) => (
          <img
            width={200}
            height={120}
            key={i}
            src={url}
            alt={fileNames[i]}
          />
        ))}
      </div>
      <section className={styles.selected}>
        {fileNames.length ? (
          fileNames.map((fileName, i) => (
            <span key={i}>
              <File /> {fileName}{' '}
              <X
                className={styles.X}
                onClick={() => deleteCurrentImage(i)}
              />
            </span>
          ))
        ) : (
          <span>
            <File /> файл не выбран
          </span>
        )}
        {imagesId.length > 0 && (
          <div className={styles.buttons}>
            <button
              className={styles.input}
              type='button'
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click()
                }
              }}
            >
              Добавить ещё фотографию <Plus size={24} />
            </button>
            <button
              className={styles.trash}
              type='button'
              onClick={deleteAllImages}
            >
              Удалить всё <Trash2 />
            </button>
          </div>
        )}
      </section>
    </div>
  )
})
