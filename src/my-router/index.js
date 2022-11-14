import { install } from './install'
import { createMatcher } from './create-matcher'
import { HTML5History } from './history/html5'
import { HashHistory } from './history/hash'
import { AbstractHistory } from './history/abstract'
import { START } from './utils/route'
const inBrowser = typeof window !== 'undefined'

export default class VueRouter {
  constructor (options) {
    console.log(options)

    this.options = options

    this.matcher = createMatcher(options.routes)

    let mode = options.mode || 'hash'

    if (!inBrowser) {
      mode = 'abstract'
    }

    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this)
        break

      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'abstract':
        this.history = new AbstractHistory(this)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          throw new Error(`[vue-router] invalid mode: ${mode}`)
        }
    }
  }

  init (app) {
    app.$once('hook:destroyed', () => {
      this.app = null
      if (!this.app) this.history.teardown()
    })

    if (this.app) return

    this.app = app
    this.history.transitionTo(this.history.getCurrentLocation(), () => {
      this.history.setupListeners()
    })

    this.history.listen(route => {
      app._route = route
    })
  }

  match (location) {
    return this.matcher.match(location)
  }

  getRoutes () {
    return this.matcher.getRoutes()
  }

  addRoute (parentOrRoute, route) {
    this.matcher.addRoute(parentOrRoute, route)
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }

  addRoutes (routes) {
    this.matcher.addRoute(routes)
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }

  // 导航到新url，向 history栈添加一条新访问记录
  push (location) {
    this.history.push(location)
  }

  // 在 history 记录中向前或者后退多少步
  go (n) {
    this.history.go(n)
  }

  // 导航到新url，替换 history 栈中当前记录
  replace (location, onComplete) {
    this.history.replace(location, onComplete)
  }

  // 导航回退一步
  back () {
    this.history.go(-1)
  }
}

VueRouter.install = install
