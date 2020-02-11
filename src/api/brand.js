import server from '../utils/request'

export function addBrand(obj) {
  return server({
    url: '/admin/brand/add',
    method: 'post',
    params: obj,
  })
}

export function getBrandList(obj) {
  /* 默认的每页数量 */
  obj['pageSize'] = 20
  return server({
    url: '/admin/brand/list',
    method: 'get',
    params: obj,
  })
}

export function getBrand(obj) {
  return server({
    url: '/admin/brand/get',
    method: 'get',
    params: obj,
  })
}

export function updateBrand(obj) {
  return server({
    url: '/admin/brand/update',
    method: 'put',
    data: obj,
  })
}
