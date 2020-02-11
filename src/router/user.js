import comIdx from '../views/shop/comIndex'

export default {
    path: '/user',
    name: 'user'/* 用户 */,
    component: comIdx,
    meta: { title: '用户' },
    redirect: '/user/user/index',
    children: [
        {
            path: 'user',
            name: 'users',
            meta: { title: '用户管理' },
            redirect: '/user/user/index',
            component: () => import( /* webpackChunkName: "users" */ '../views/shop/comIndex.vue'),
            children: [
                {
                    path: 'index',
                    name: 'user_Idx',
                    meta: { title: '用户列表' },
                    component: () => import( /* webpackChunkName: "userIdx" */ '../views/shop/user_idx.vue')
                }, {
                    path: 'add',
                    name: 'user_add',
                    meta: { title: '添加用户' },
                    component: () => import( /* webpackChunkName: "addUser" */ '../views/shop/user_add&alter.vue')
                }, {
                    path: 'alter',
                    name: 'user_alter',
                    meta: { title: '修改用户' },
                    component: () => import( /* webpackChunkName: "alterUser" */ '../views/shop/user_add&alter.vue')
                }
            ]
        },
    ]
}