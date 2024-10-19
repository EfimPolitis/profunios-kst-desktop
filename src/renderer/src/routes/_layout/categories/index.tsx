import { createFileRoute } from '@tanstack/react-router'

import { CategoriesPage } from '@/components/pages'

export const Route = createFileRoute('/_layout/categories/')({
  component: () => <CategoriesPage />
})
