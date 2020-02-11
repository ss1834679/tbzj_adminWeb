import comIdx from '../views/shop/comIndex'

export default {
    path: '/order',
    name: 'order'/* 订单 */,
    component: comIdx,
    meta: { title: '订单' },
    redirect: '/order/order/index',
    children: [
        {
            path: 'order',
            name: 'orders',
            meta: { title: '订单管理' },
            redirect: '/order/order/index',
            component: () => import( /* webpackChunkName: "order" */ '../views/shop/comIndex.vue'),
            children: [
                {
                    path: 'index',
                    name: 'order_Idx',
                    meta: { title: '订单列表' },
                    component: () => import( /* webpackChunkName: "orderIdx" */ '../views/shop/order_idx.vue')
                }, {
                    path: 'view',
                    name: 'order_view',
                    meta: { title: '订单详情' },
                    component: () => import( /* webpackChunkName: "viewOrder" */ '../views/shop/order_view.vue')
                }, {
                    path: 'alter',
                    name: 'alterGoodsInfo',
                    meta: { title: '修改商品信息' },
                    component: () => import( /* webpackChunkName: "alterInfo" */ '../views/shop/order_goodsInfo.vue')
                }
            ]
        },
        {
            path: 'return',
            name: 'return',
            meta: { title: '退款及退货' },
            redirect: '/order/return/returnGoods',
            component: () => import( /* webpackChunkName: "return" */ '../views/shop/comIndex.vue'),
            children: [
                {
                    path: 'returnGoods',
                    name: 'return_Goods',
                    meta: { title: '退货申请处理' },
                    component: () => import( /* webpackChunkName: "returnGoods" */ '../views/shop/return_goods.vue')
                }, {
                    path: 'returnMoney',
                    name: 'return_Money',
                    meta: { title: '退款申请处理' },
                    component: () => import( /* webpackChunkName: "returnMoney" */ '../views/shop/return_money.vue')
                }, {
                    path: 'returnReason',
                    name: 'return_Reason',
                    meta: { title: '退货原因设置' },
                    component: () => import( /* webpackChunkName: "returnReason" */ '../views/shop/return_reason.vue')
                }, {
                    path: 'returnGoodsDetails',
                    name: 'return_Goods_Details',
                    meta: { title: '服务单详情' },
                    component: () => import( /* webpackChunkName: "returnGoodsDetails" */ '../views/shop/returnGoodsDetails.vue')
                }, {
                    path: 'returnMoneyDetails',
                    name: 'return_Money_Details',
                    meta: { title: '服务单详情' },
                    component: () => import( /* webpackChunkName: "returnMoneyDetails" */ '../views/shop/returnMoneyDetails.vue')
                },
            ]
        },
    ]
}