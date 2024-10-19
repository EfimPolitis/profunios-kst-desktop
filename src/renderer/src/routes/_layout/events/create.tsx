import { createFileRoute } from '@tanstack/react-router'

import CreateEventPage from '@/components/pages/events/create'

export const Route = createFileRoute('/_layout/events/create')({
  component: () => <CreateEventPage />
})
