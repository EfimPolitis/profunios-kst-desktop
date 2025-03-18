import styles from './index.module.scss'
import { AuthForm } from '@/components/frames'

const LoginPage = () => {
  window.api.setTitle('Вход в систему')

  return (
    <div className={styles.login_page}>
      <AuthForm type='login' />
    </div>
  )
}

export default LoginPage
