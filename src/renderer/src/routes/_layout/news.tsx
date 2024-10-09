import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/news')({
  component: () => (
    <div>
      <h1>Manage news page</h1>
    </div>
  )
})
