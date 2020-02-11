
import comIdx from '../views/shop/comIndex'

export default {
    path: '/goods',
    name: 'good',
    component: comIdx,
    redirect: '/goods/goods/index',
    meta: { title: '商品' },
    children: [
        {
            path: 'goods',
            name: 'goods',
            redirect: '/goods/goods/index',
            meta: { title: '商品列表' },
            component: () => import( /* webpackChunkName: "goods" */ '../views/shop/comIndex.vue'),
            children: [{
                path: 'index',
                name: 'goods_Idx',
                meta: { title: '商品列表' },
                component: () => import( /* webpackChunkName: "goodsIdx" */ '../views/shop/goods_idx.vue')
            }, {
                path: 'add',
                name: 'goods_add',
                meta: { title: '添加商品' },
                component: () => import( /* webpackChunkName: "addGoods" */ '../views/shop/goods_add&alter.vue')
            }, {
                path: 'alter',
                name: 'goods_alter',
                meta: { title: '修改商品' },
                component: () => import( /* webpackChunkName: "alterGoods" */ '../views/shop/goods_add&alter.vue')
            }]
        },
        {
            path: 'goods_comment',
            name: 'goods_comment',
            meta: { title: '商品评论' },
            component: () => import( /* webpackChunkName: "goodsComment" */ '../views/shop/goods_comment.vue'),
        },
        {
            path: 'brand',
            name: 'brand',
            redirect: '/goods/brand/index',
            meta: { title: '品牌列表' },
            component: () => import( /* webpackChunkName: "brand" */ '../views/shop/comIndex.vue'),
            children: [{
                path: 'index',
                name: 'brand_Idx',
                meta: { title: '品牌列表' },
                component: () => import( /* webpackChunkName: "brandIdx" */ '../views/shop/brand_idx.vue')
            }, {
                path: 'add',
                name: 'brand_add',
                meta: { title: '添加品牌' },
                component: () => import( /* webpackChunkName: "addBrand" */ '../views/shop/brand_add&alter.vue')
            }, {
                path: 'alter',
                name: 'brand_alter',
                meta: { title: '修改品牌' },
                component: () => import( /* webpackChunkName: "alterBrand" */ '../views/shop/brand_add&alter.vue')
            }]
        },
        {
            path: 'category',
            name: 'category',
            redirect: '/goods/category/index',
            meta: { title: '分类列表' },
            component: () => import( /* webpackChunkName: "category" */ '../views/shop/comIndex.vue'),
            children: [{
                path: 'index',
                name: 'category_Idx',
                meta: { title: '分类列表' },
                component: () => import( /* webpackChunkName: "categoryIdx" */ '../views/shop/category_idx.vue')
            }, {
                path: 'add',
                name: 'category_add',
                meta: { title: '添加分类' },
                component: () => import( /* webpackChunkName: "addCategory" */ '../views/shop/category_add&alter.vue')
            }, {
                path: 'alter',
                name: 'category_alter',
                meta: { title: '修改分类' },
                component: () => import( /* webpackChunkName: "alterCategory" */ '../views/shop/category_add&alter.vue')
            }]
        },
    ]
}