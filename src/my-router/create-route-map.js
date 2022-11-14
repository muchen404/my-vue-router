// 生成路由映射
export function createRouteMap (routes, oldPathMap, parentRoute) {
  const pathMap = oldPathMap || Object.create(null)

  routes.forEach(route => {
    addRouteRecord(pathMap, route, parentRoute)
  })

  return pathMap
}

function addRouteRecord (pathMap, route, parent) {
  const { path, name } = route

  const normalizedPath = normalizePath(path, parent)

  // 生成一条路由记录
  const record = {
    path: normalizedPath,
    regex: '',
    component: route.component,
    name,
    parent,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta,
    props: route.props === null ? {} : route.props
  }

  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(pathMap, child, record)
    })
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record
  }
}

function normalizePath (path, parent) {
  if (path[0] === '/') return path
  if (!parent) return path
  return `${parent.path}/${path}`.replace(/\/\//g, '/')
}
