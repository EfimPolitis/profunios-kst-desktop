import { Link, useLocation } from '@tanstack/react-router'
import cn from 'clsx'
import { LogOut } from 'lucide-react'

import { AdminSidebar } from '@shared/constants/admin-sidebar.constatnts'

import { useResize } from '@shared/hooks/useResize'
import { useLogout } from '@shared/hooks/user/useLogout'

import styles from './index.module.scss'

const Sidebar = () => {
  const { mutate } = useLogout()
  const { pathname } = useLocation()

  return (
    <aside className={styles.sidebar}>
      <ul>
        {AdminSidebar.map(({ link, name, icon: Icon }) => (
          <li key={link}>
            <Link
              to={link}
              className={cn({
                [styles.active]: pathname?.includes(link) && link !== '/'
              })}
            >
              <p>{name}</p>
              <Icon size={24} />
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={styles.logout}
        onClick={() => {
          mutate()
          useResize(450, 550)
        }}
      >
        <p>Выйти</p>
        <LogOut size={24} />
      </button>
    </aside>
  )
}

export default Sidebar
