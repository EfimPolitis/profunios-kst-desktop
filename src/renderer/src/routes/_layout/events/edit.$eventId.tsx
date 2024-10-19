import { createFileRoute } from '@tanstack/react-router'

import EditEventPage from '@/components/pages/events/edit'

export const Route = createFileRoute('/_layout/events/edit/$eventId')({
  component: () => <EditEventPage />
})
