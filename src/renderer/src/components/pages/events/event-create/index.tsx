import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { EventForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const CreateEventPage = () => {
  window.api.setTitle('Создание мероприятия')

  return (
    <div className={styles.page}>
      <UndoBtn
        link={URL_PAGES.MANAGE_EVENTS}
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <EventForm />
    </div>
  )
}

export default CreateEventPage
