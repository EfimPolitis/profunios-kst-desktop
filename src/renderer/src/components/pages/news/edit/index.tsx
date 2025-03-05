import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { NewsForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const EditNewsPage = () => {
  window.api.setTitle('Создание мероприятия')

  return (
    <div className={styles.page}>
      <UndoBtn
        link={URL_PAGES.MANAGE_NEWS}
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <NewsForm isEditing />
    </div>
  )
}

export default EditNewsPage
