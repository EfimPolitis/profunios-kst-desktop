import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/components/frames'

import styles from './index.module.scss'

const AdminLayout = () => {
  return (
    <div className={styles.admin_layout}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
