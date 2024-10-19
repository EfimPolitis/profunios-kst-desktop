import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/news/$newsId')({
  component: () => <div>Hello /_layout/news/$newsId!</div>,
})
