import { createFileRoute } from '@tanstack/react-router'

import CreateEventPage from '@/components/pages/events/event-create'

export const Route = createFileRoute('/_layout/event-create')({
  component: () => <CreateEventPage />
})
