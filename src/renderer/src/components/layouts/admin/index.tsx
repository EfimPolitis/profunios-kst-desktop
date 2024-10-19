import { Outlet } from '@tanstack/react-router'

import styles from './index.module.scss'
import { Sidebar } from '@/components/frames'
import { Profile } from '@/components/frames/profile'

const AdminLayout = () => {
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
