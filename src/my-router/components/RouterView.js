export default {
  name: 'RouterView',
  functional: true,
  render (h, { parent, data }) {
    // parent 对父组件的引用
    // data 传递给组件的整个数据对象，作为createElement的第二个参数传入组件

    // 标识当前渲染组件为router-view
    data.routerView = true

    let depth = 0
    while (parent && parent._routerRoot !== parent) {
      const vnodeData = parent.$vnode ? parent.$vnode.data : {}
      if (vnodeData.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    const route = parent.$route
    if (!route.matched) return h()

    const matched = route.matched[depth]
    if (!matched) return h
    return h(matched.component, data)
  }
}
