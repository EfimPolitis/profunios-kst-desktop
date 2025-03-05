import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useLogout } from '@shared/hooks/user/useLogout'

import styles from './index.module.scss'
import { Sidebar } from '@/components/frames'
import { Profile } from '@/components/frames/profile'

const AdminLayout = () => {
  // const accessToken = window.api.getAccessToken()

  // useEffect(() => {
  //   console.log(accessToken)
  //   if (!accessToken) useLogout()
  // }, [accessToken])

  return (
    <div className={styles.admin_layout}>
      <Sidebar />
      <div className={styles.page_layout}>
        <Profile />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
