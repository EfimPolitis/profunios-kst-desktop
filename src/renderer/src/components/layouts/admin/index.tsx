import { Outlet } from '@tanstack/react-router'

import styles from './index.module.scss'
import { Sidebar } from '@/components/frames'

const AdminLayout = () => {
  return (
    <div className={styles.admin_layout}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
