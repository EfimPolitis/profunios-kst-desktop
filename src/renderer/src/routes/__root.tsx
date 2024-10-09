import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { URL_PAGES } from '@shared/config/url.config'

import { useResize } from '@shared/hooks/useResize'

const rootComponent = () => {
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const accessToken = await window.api.getAccessToken()
      if (accessToken) {
        useResize(1200, 800)
        navigate({ to: URL_PAGES.MANAGE_EVENTS })
      } else {
        navigate({ to: URL_PAGES.LOGIN })
      }
    })()
  }, [])

  return (
    <div>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

export const Route = createRootRoute({
  component: rootComponent
})
