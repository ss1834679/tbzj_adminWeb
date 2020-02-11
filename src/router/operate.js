import comIdx from '../views/shop/comIndex'

export default {
    path: '/operate',
    name: 'operate'/* 运营 */,
    component: comIdx,
    meta: { title: '运营' },
    redirect: '/operate/ad/index',
    children: [
        {
            path: 'ad',
            name: 'ad',
            meta: { title: '广告管理' },
            redirect: '/operate/ad/index',
            component: () => import( /* webpackChunkName: "order" */ '../views/shop/comIndex.vue'),
            children: [
                {
                    path: 'index',
                    name: 'ad_Idx',
                    meta: { title: '广告列表' },
                    component: () => import( /* webpackChunkName: "adIdx" */ '../views/shop/ad_idx.vue')
                }, {
                    path: 'add',
                    name: 'ad_add',
                    meta: { title: '添加广告' },
                    component: () => import( /* webpackChunkName: "adAdd" */ '../views/shop/ad_add&alter.vue')
                }, {
                    path: 'alter',
                    name: 'ad_alter',
                    meta: { title: '修改广告' },
                    component: () => import( /* webpackChunkName: "adAlter" */ '../views/shop/ad_add&alter.vue')
                }
            ]
        },
    ]
}