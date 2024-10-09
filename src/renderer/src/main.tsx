import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { router } from './router'

import '@/styles/globals.scss'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: '#303030',
              color: '#d7d7d7'
            }
          }}
        />
      </QueryClientProvider>
    </React.StrictMode>
  )
}
