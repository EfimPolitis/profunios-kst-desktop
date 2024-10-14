import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { LazyMotion, domAnimation } from 'framer-motion'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { router } from './router'
import '@/styles/globals.scss'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <LazyMotion features={domAnimation}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LazyMotion>
    </React.StrictMode>
  )
}
