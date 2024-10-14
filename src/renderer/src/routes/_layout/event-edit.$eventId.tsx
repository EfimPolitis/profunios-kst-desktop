import { createFileRoute } from '@tanstack/react-router'

import EditEventPage from '@/components/pages/events/event-edit'

export const Route = createFileRoute('/_layout/event-edit/$eventId')({
  component: () => <EditEventPage />
})
