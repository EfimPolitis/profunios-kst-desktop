import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { ChangePasswordForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const ChangePasswordPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <UndoBtn
          link={URL_PAGES.PROFILE}
          size={30}
        />
        <ChangePasswordForm />
      </div>
    </div>
  )
}

export default ChangePasswordPage
