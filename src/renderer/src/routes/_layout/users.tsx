import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
  component: () => (
    <div>
      <h1>Manage users page</h1>
    </div>
  )
})
