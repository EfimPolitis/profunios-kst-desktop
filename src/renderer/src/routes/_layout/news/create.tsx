import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/news/create')({
  component: () => <div>Hello /_layout/news/create!</div>,
})
