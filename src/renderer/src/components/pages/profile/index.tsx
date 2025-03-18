import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import { AuthForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

const ProfilePage = () => {
  const { profile } = useProfile()
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <UndoBtn
          link='/events'
          size={30}
        />
        <AuthForm
          type='profile'
          userId={profile?.userId}
        />
      </div>
    </div>
  )
}

export default ProfilePage
