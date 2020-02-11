/* 临时地址 */
import server from '../utils/order'

export function getOrderList() {
  return server({
    url: '/admin/order/list',
    method: 'get',
  })
}

export function getOneOrder(obj) {
  return server({
    url: `/admin/order/findOne/${obj}`,
  })
}

export function alterOrder(obj) {
  console.log(obj);
  // return server({
  //   url: `/admin/order/findOne/${obj}`,
  // })
}