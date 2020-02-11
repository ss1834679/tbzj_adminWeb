import server from '../utils/request'

export function getSupplier(obj) {
    return server({
        url: '/admin/supplier/list',
        method: 'get',
        params: obj
    })
}
export function getSupplierById(obj) {
    return server({
        url: '/admin/supplier/get',
        method: "get",
        params: obj
    })
}
export function updateSupplier(obj) {
    return server({
        url: '/admin/supplier/update',
        method: 'put',
        params: obj
    })
}
export function addSupplier(obj) {
    return server({
        url: '/admin/supplier/add',
        method: 'post',
        params: obj
    })
}