import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@shared/hooks/useTheme'

import styles from './index.module.scss'

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className={styles.themeBtn}
      title={
        theme === 'dark'
          ? 'Поменять на светлую тему'
          : 'Поменять на тёмную тему'
      }
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
