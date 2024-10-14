import { Link, useLocation } from '@tanstack/react-router'
import cn from 'clsx'
import { m } from 'framer-motion'
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useState } from 'react'

import { useResize } from '@shared/hooks/useResize'
import { useLogout } from '@shared/hooks/user/useLogout'

import styles from './index.module.scss'
import { SidebarData } from '@/components/frames/sidebar/sidebar.data'
import { ThemeLayout } from '@/components/layouts/theme'

const Sidebar = () => {
  const { mutate } = useLogout()
  const { pathname } = useLocation()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <m.aside
      className={cn(styles.sidebar, {
        [styles.collapsed]: isCollapsed
      })}
      animate={{ width: isCollapsed ? 60 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <div className={styles.buttons}>
        <button
          className={styles.toggle}
          title={isCollapsed ? 'Развернуть' : 'Свернуть'}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
        <ThemeLayout.ThemeToggler />
      </div>
      <ul>
        {SidebarData.map(({ link, name, icon: Icon }) => (
          <li key={link}>
            <Link
              to={link}
              className={cn({
                [styles.active]: pathname?.includes(link) && link !== '/'
              })}
              title={isCollapsed ? name : undefined}
            >
              <Icon size={24} />
              {!isCollapsed && <span>{name}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={styles.logout}
        title={isCollapsed ? 'Выйти' : undefined}
        onClick={() => {
          mutate()
          useResize(450, 550)
        }}
      >
        <LogOut size={24} />
        {!isCollapsed && <span>Выйти</span>}
      </button>
    </m.aside>
  )
}

export default Sidebar
