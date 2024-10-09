import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/reservations')({
  component: () => (
    <div>
      <h1>Manage reservation page</h1>
    </div>
  )
})
