import { createFileRoute } from '@tanstack/react-router'

import ReservationsPage from '@/components/pages/reservations'

export const Route = createFileRoute('/_layout/reservations/')({
  component: () => <ReservationsPage />
})
