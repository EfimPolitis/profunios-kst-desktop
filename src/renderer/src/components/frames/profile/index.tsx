import { roles } from '@shared/constants/roles.constants'

import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import { Loader } from '@/components/ui'

export const Profile = () => {
  const { data, isLoading } = useProfile()

  const user = data?.data

  if (!user?.role) return

  return (
    <div className={styles.profile}>
      <div className={styles.profile_block}>
        <div className={styles.info}>
          {isLoading || (
            <>
              <span className={styles.fullname}>
                {user?.lastName} {user.firstName}
              </span>
              <span className={styles.role}>{roles[user.role]}</span>
            </>
          )}
        </div>
        <div className={styles.avatar}>
          {isLoading ? <Loader /> : user.firstName?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}
