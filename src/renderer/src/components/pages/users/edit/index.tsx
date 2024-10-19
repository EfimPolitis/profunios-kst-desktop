import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { AuthForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const EditPage = () => {
  window.api.setTitle('Редактирование пользователя')

  return (
    <div className={styles.page}>
      <UndoBtn
        link={URL_PAGES.MANAGE_USERS}
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <AuthForm isEditing />
    </div>
  )
}

export default EditPage
