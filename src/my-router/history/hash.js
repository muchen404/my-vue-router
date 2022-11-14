/* eslint-disable no-useless-constructor */

import { BaseHistory } from './base'

export class HashHistory extends BaseHistory {
  constructor (router) {
    super(router)
  }

  setupListeners () {
    const handleRoutingEvent = () => {
      const location = getHash()
      this.transitionTo(location, () => {
        console.log('Hash路由监听跳转成功')
      })
    }

    window.addEventListener('hashchange', handleRoutingEvent)
    this.listeners.push(() => {
      window.removeEventListener('hashchange', handleRoutingEvent)
    })
  }

  ensureURL () {
    window.location.hash = this.current.fullPath
  }

  push (location, onComplete) {
    this.transitionTo(location, onComplete)
  }

  go (n) {
    window.history.go(n)
  }

  replace (location, onComplete) {
    this.transitionTo(location, (route) => {
      window.location.replace(getUrl(route.fullPath))
      onComplete && onComplete(route)
    })
  }

  getCurrentLocation () {
    return getHash()
  }
}

function getUrl (path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i > 0 ? href.slice(0, i) : href
  return `${base}#${path}}`
}

export function getHash () {
  let href = window.location.href
  const index = href.indexOf('#')
  if (index < 0) return '/'
  href = href.slice(index + 1)
  return href
}
