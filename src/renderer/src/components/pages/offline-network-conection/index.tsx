import { Network } from 'lucide-react'

import styles from './index.module.scss'

const OfflineServerNetworkConectionPage = () => {
  window.api.setTitle('Ошибка сети')
  return (
    <div className={styles.page}>
      <div className={styles.block}>
        <Network size={180} />
        <h1>Проверте ваше интернет соединение</h1>
      </div>
    </div>
  )
}

export default OfflineServerNetworkConectionPage
