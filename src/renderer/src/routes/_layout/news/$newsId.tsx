import { createFileRoute } from '@tanstack/react-router'

import { NewsPageId } from '@/components/pages/news/[newsId]'

export const Route = createFileRoute('/_layout/news/$newsId')({
  component: () => <NewsPageId />
})
