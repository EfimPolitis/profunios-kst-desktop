import { createFileRoute } from '@tanstack/react-router'

import OfflineServerNetworkConectionPage from '@/components/pages/offline-network-conection'

export const Route = createFileRoute('/offline')({
  component: () => <OfflineServerNetworkConectionPage />
})
