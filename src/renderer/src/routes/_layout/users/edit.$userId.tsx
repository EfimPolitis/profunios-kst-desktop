import { createFileRoute } from '@tanstack/react-router'

import EditUserPage from '@/components/pages/users/edit'

export const Route = createFileRoute('/_layout/users/edit/$userId')({
  component: () => <EditUserPage />
})
