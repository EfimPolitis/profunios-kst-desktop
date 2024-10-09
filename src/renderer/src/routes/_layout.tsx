import { AdminLayout } from '@/components/layouts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: () => <AdminLayout />
})
