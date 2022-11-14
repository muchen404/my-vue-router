import RouterView from './components/RouterView'
import RouterLink from './components/RouterLink'
export let _Vue

// 插件安装方法
export function install (Vue) {
  if (install.installed && _Vue === Vue) return

  install.installed = true
  _Vue = Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)

        // this._route = this._router.history.current
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // console.log('child mixin', this, this.$parent)
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route
    }
  })

  Vue.component('RouterView', RouterView)
  Vue.component('RouterLink', RouterLink)
}
