import { START } from '../utils/route'

export class BaseHistory {
  constructor (router) {
    this.router = router

    // 当前路由route对象
    this.current = START

    // 路由监听数组，存放路由监听销毁方法
    this.listeners = []
  }

  listen (cb) {
    this.cb = cb
  }

  // 路由跳转
  transitionTo (location, onComplete) {
    const route = this.router.match(location)

    this.current = route

    // 调用赋值回调，传出新路由对象，用于更新_route
    this.cb && this.cb(route)

    onComplete && onComplete(route)

    // 更新URL
    this.ensureURL()
  }

  // 卸载
  teardown () {
    this.listeners.forEach(cleanupListener => {
      cleanupListener()
    })

    this.listeners = []
    this.current = ''
  }

  // 启动路由监听
  setupListeners () {}

  // 更新URL，在子类完善
  ensureURL () {}
}
