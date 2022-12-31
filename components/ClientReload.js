import { useEffect } from 'react'
import Router from 'next/router'

const ClientReload = () => {
  useEffect(() => {
    import('socket.io-client').then((module) => {
      const socket = module.io()
      socket.on('reload', (data) => {
        Router.replace(Router.asPath, undefined, {
          scroll: false,
        })
      })
    })
  }, [])

  return null
}

export default ClientReload
