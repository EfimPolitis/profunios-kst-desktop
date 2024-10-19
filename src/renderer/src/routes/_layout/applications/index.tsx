import { createFileRoute } from '@tanstack/react-router'

import { ApplicationsPage } from '@/components/pages'

export const Route = createFileRoute('/_layout/applications/')({
  component: () => <ApplicationsPage />
})
