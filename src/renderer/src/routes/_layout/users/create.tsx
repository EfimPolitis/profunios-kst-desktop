import { createFileRoute } from '@tanstack/react-router'

import CreateUserPage from '@/components/pages/users/create'

export const Route = createFileRoute('/_layout/users/create')({
  component: () => <CreateUserPage />
})
