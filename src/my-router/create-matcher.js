import { createRouteMap } from './create-route-map'

import { createRoute } from './utils/route'

export function createMatcher (routes) {
  // 生成路由映射对象
  const pathMap = createRouteMap(routes)

  // 动态添加路由（添加一条新路由规则）
  function addRoute (parentOrRoute, route) {
    const parent = (typeof parentOrRoute !== 'object') ? pathMap[parentOrRoute] : undefined
    createRouteMap([route || parentOrRoute], pathMap, parent)
  }

  // 动态添加路由（参数必须是一个符合routes选项要求的数组）
  function addRoutes (routes) {
    createRouteMap(routes, pathMap)
  }

  // 获取所有的活跃的路由记录列表
  function getRoutes () {
    return pathMap
  }

  // 路由匹配
  function match (location) {
    location = typeof location === 'string' ? { path: location } : location
    // return pathMap[location.path]
    return createRoute(pathMap[location.path], location)
  }

  return {
    match,
    getRoutes,
    addRoute,
    addRoutes
  }
}
