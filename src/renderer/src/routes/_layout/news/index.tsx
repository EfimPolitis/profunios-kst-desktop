import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/news/')({
  component: () => <div>Hello /_layout/news/!</div>,
})
