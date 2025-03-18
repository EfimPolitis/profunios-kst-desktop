import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { AuthForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const CreateUserPage = () => {
  window.api.setTitle('Создание пользователя')

  return (
    <div className={styles.page}>
      <UndoBtn
        link={URL_PAGES.MANAGE_USERS}
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <AuthForm type='register' />
    </div>
  )
}
export default CreateUserPage
