import { createFileRoute } from '@tanstack/react-router'

import { UsersPage } from '@/components/pages'

export const Route = createFileRoute('/_layout/users/')({
  component: () => <UsersPage />
})
