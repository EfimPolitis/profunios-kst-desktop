import { createFileRoute } from '@tanstack/react-router'

import { AdminLayout } from '@/components/layouts'

export const Route = createFileRoute('/_layout')({
  component: () => <AdminLayout />
})
