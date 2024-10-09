import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/category')({
  component: () => (
    <div>
      <h1>Manage categorys page</h1>
    </div>
  )
})
