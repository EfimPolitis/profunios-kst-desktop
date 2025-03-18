import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { URL_PAGES } from '@shared/config/url.config'

import { useResize } from '@shared/hooks/useResize'

import { ThemeLayout } from '@/components/layouts/theme'

const rootComponent = () => {
  const navigate = useNavigate()
  const [isOnline, setIsOnline] = useState(false)

  // function updateOnlineStatus() {
  // }

  useEffect(() => {
    setIsOnline(navigator.onLine)
    // window.addEventListener('online', updateOnlineStatus)
    // window.addEventListener('offline', updateOnlineStatus)

    if (!isOnline) {
      navigate({ to: URL_PAGES.OFFLINE })
    } else if (isOnline) {
      ;(async () => {
        const accessToken = await window.api.getAccessToken()

        if (accessToken) {
          useResize(1200, 800)
          navigate({ to: URL_PAGES.MANAGE_EVENTS })
        } else {
          navigate({ to: URL_PAGES.LOGIN })
        }
      })()
    }

    // return () => {
    //   window.removeEventListener('online', updateOnlineStatus)
    //   window.removeEventListener('offline', updateOnlineStatus)
    // }
  }, [isOnline])

  return (
    <div>
      <ThemeLayout>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeLayout>
    </div>
  )
}

export const Route = createRootRoute({
  component: rootComponent
})
