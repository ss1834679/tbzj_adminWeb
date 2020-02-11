import comIdx from '../views/shop/comIndex'

export default {
    path: '/promotion',
    name: 'promotion'/* 促销 */,
    component: comIdx,
    meta: { title: '促销' },
    redirect: '/promotion/coupon/index',
    children: [
        {
            path: 'coupon',
            name: 'coupon',
            meta: { title: '优惠券' },
            redirect: '/promotion/coupon/index',
            component: () => import( /* webpackChunkName: "coupon" */ '../views/shop/comIndex.vue'),
            children: [
                {
                    path: 'index',
                    name: 'coupon_idx',
                    meta: { title: '优惠券列表' },
                    component: () => import( /* webpackChunkName: "couponIdx" */ '../views/shop/coupon_idx.vue')
                },
                {
                    path: 'add',
                    name: 'coupon_add',
                    meta: { title: '添加优惠券' },
                    component: () => import( /* webpackChunkName: "addCoupon" */ '../views/shop/coupon_add&alter.vue')
                },
                {
                    path: 'alter',
                    name: 'coupon_alter',
                    meta: { title: '修改优惠券' },
                    component: () => import( /* webpackChunkName: "alterCoupon" */ '../views/shop/coupon_add&alter.vue')
                }
            ]
        },
        {
            path: 'seckill',
            name: 'seckill',
            meta: { title: '秒杀' },
            redirect: '/promotion/seckill/index',
            component: () => import( /* webpackChunkName: "seckill" */ '../views/shop/comIndex.vue'),
            children: [
                {
                    path: 'index',
                    name: 'seckill_idx',
                    meta: { title: '秒杀活动列表' },
                    component: () => import( /* webpackChunkName: "seckillIdx" */ '../views/shop/seckill_idx.vue')
                }, {
                    path: 'add',
                    name: 'seckill_add',
                    meta: { title: '添加秒杀活动' },
                    component: () => import( /* webpackChunkName: "addSeckill" */ '../views/shop/seckill_add&alter.vue')
                }, {
                    path: 'alter',
                    name: 'seckill_alter',
                    meta: { title: '修改秒杀活动' },
                    component: () => import( /* webpackChunkName: "alterSeckill" */ '../views/shop/seckill_add&alter.vue')
                }
            ]
        }
    ]
}