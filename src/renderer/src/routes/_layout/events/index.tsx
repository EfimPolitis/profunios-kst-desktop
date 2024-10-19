import { createFileRoute } from '@tanstack/react-router'

import { EventsPage } from '@/components/pages'

export const Route = createFileRoute('/_layout/events/')({
  component: () => <EventsPage />,
})
