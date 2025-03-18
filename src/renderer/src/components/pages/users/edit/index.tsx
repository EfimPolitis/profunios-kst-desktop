import { useParams } from '@tanstack/react-router'

import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { AuthForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const EditPage = () => {
  window.api.setTitle('Редактирование пользователя')

  const userId = useParams({
    from: '/_layout/users/edit/$userId',
    select: params => params.userId
  })

  return (
    <div className={styles.page}>
      <UndoBtn
        link={URL_PAGES.MANAGE_USERS}
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <AuthForm
        type='edit'
        userId={userId}
      />
    </div>
  )
}

export default EditPage
