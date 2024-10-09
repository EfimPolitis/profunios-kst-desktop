import { createFileRoute } from '@tanstack/react-router'

const Home = () => {
  return (
    <div>
      <p>Hello home page!</p>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})
