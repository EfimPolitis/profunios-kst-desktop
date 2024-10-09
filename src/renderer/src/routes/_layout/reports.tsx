import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/reports')({
  component: () => (
    <div>
      <h1>Manage reports</h1>
    </div>
  )
})
