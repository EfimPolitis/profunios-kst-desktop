import { createFileRoute } from '@tanstack/react-router'

import { EventPage } from '@/components/pages/events/[eventId]'

export const Route = createFileRoute('/_layout/events/$eventId')({
  component: () => <EventPage />,
})
