import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/applications')({
  component: () => (
    <div>
      <h1>Manage applications page</h1>
    </div>
  )
})
