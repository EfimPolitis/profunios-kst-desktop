import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useLogout } from '@shared/hooks/auth/useLogout'

import styles from './index.module.scss'
import { Profile, Sidebar } from '@/components/frames'

const AdminLayout = () => {
  const accessToken = window.api.getAccessToken()

  useEffect(() => {
    if (!accessToken) useLogout()
  }, [accessToken])

  return (
    <div className={styles.admin_layout}>
      <Sidebar />
      <div className={styles.page_layout}>
        <Profile />
        <div className={styles.page}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
