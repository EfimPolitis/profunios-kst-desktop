import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users/$userId')({
  component: () => <div>Hello /users/$userId!</div>,
})
