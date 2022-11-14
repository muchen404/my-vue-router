/* eslint-disable no-debugger */
/**
 * @Description route对象相关方法
 */
export function createRoute (record, location) {
  const route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: location.path || '/',
    matched: record && formatMatch(record)
  }

  return Object.freeze(route)
}

// 初始状态路由
export const START = createRoute(null, { path: '/' })

function formatMatch (record) {
  const res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}
