import { createFileRoute } from '@tanstack/react-router'

import NewsPage from '@/components/pages/news/page'

export const Route = createFileRoute('/_layout/news/')({
  component: () => <NewsPage />
})
