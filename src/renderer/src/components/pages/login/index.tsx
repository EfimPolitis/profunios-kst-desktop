import React from 'react'
import { AuthForm } from '@/components/frames'
import styles from './index.module.scss'

const LoginPage = () => {
  return (
    <div className={styles.login_page}>
      <AuthForm isLogin />
    </div>
  )
}

export default LoginPage
