import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/reports/')({
  component: () => <div>Hello /_layout/reports/!</div>,
})
