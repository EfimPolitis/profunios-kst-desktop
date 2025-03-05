import { createFileRoute } from '@tanstack/react-router'

import CreateNewsPage from '@/components/pages/news/create'

export const Route = createFileRoute('/_layout/news/create')({
  component: () => <CreateNewsPage />
})
