import { EventsPage } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/events')({
  component: () => <EventsPage />
})
