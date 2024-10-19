import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/news/edit')({
  component: () => <div>Hello /_layout/news/edit!</div>,
})
