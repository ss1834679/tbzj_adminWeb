import server from '../utils/request'

export function addCategory(obj) {
    return server({
        url: '/admin/category/add',
        method: "post",
        params: obj
    })
}

export function getCategory(obj) {
    return server({
        url: '/admin/category/list',
        method: 'get',
        params: obj
    })
}

export function getCategoryByPar(obj) {
    return server({
        url: '/admin/category/get',
        method: 'get',
        params: obj
    })
}

export function updateCategory(obj) {
    return server({
        url: '/admin/category/update',
        method: 'put',
        params: obj
    })
}

export function deleteCategory(obj) {
    return server({
        url: '/admin/category/delete',
        method: 'delete',
        params: obj
    })
}