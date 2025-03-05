import { createFileRoute } from '@tanstack/react-router'

import EditNewsPage from '@/components/pages/news/edit'

export const Route = createFileRoute('/_layout/news/edit/$newsId')({
  component: () => <EditNewsPage />
})
