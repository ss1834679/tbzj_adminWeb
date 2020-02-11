<template>
  <!-- tabs 跟路由动态改变 -->
  <el-tabs :value="activeName" tabPosition="left">
    <!-- <el-tabs value="index" tabPosition="left"> -->
    <el-tab-pane v-for="item in list" :key="item.name" :name="item.name">
      <span slot="label">
        <i :class="item.icon"></i>
        {{item.label}}
      </span>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
        <template v-for="child in item.children">
          <el-menu-item-group :key="child.title">
            <template slot="title">{{child.title}}</template>
            <template v-for="list in child.children">
              <el-menu-item :index="list.path" :key="list.title">{{list.title}}</el-menu-item>
            </template>
          </el-menu-item-group>
        </template>
      </el-menu>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "tabsMenu",
  data() {
    return {
      shopList: [
        {
          title: "商城管理",
          icon: "el-icon-s-goods",
          children: [
            { path: "/index/index", title: "店铺管理", icon: "el-icon-s-cooperation" },
            { path: "/category/index", title: "商品分类", icon: "el-icon-star-on" },
            { path: "/brand/index", title: "商品品牌", icon: "el-icon-thumb" },
            { path: "/goods/index", title: "商品列表", icon: "el-icon-s-fold" },
            { path: "/coupon/index", title: "优惠券列表", icon: "el-icon-s-finance" },
            { path: "/goods_comment", title: "商品评论", icon: "el-icon-chat-round" }
          ]
        },
        {
          title: "网站管理",
          icon: "el-icon-paperclip",
          children: [{ path: "/article/index", title: "文章管理", icon: "el-icon-document-add" }]
        },
        {
          title: "会员管理",
          icon: "el-icon-user-solid",
          children: [
            { path: "/user/index", title: "普通会员", icon: "el-icon-s-custom" },
            { path: "", title: "设计师", icon: "el-icon-magic-stick" },
            { path: "", title: "家政人员", icon: "el-icon-brush" },
            { path: "", title: "装修工人", icon: "el-icon-s-open" }
          ]
        },
        {
          title: "订单",
          icon: "el-icon-paperclip",
          children: [{ path: "/order/index", title: "订单列表", icon: "el-icon-s-order" }]
        }
      ],
      list: [
        {
          label: "首页" /* 最左侧的标题 */,
          name: "index" /* 路由的根路径下的第一个 以这个为名字的路由都在这个下面 */,
          icon: "el-icon-s-home" /* 左侧的图标 */,
          children: [
            {
              title: "系统首页" /* 每个分组的名称 原型图 */,
              children: [{ path: "/index/index" /* 跳转路径 */, title: "系统首页" /* 名称 */ }]
            }
          ]
        },
        {
          label: "商品",
          name: "goods",
          icon: "el-icon-s-goods",
          children: [
            {
              title: "商品管理",
              children: [
                { path: "/goods/goods/index", title: "商品列表" },
                { path: "/goods/goods/add", title: "添加商品" },
                { path: "/supplier/index", title: "店铺管理" },
                { path: "/goods/goods_comment", title: "商品评论" }
              ]
            },
            {
              title: "商品配置",
              children: [
                { path: "/article/index", title: "文章管理" },
                { path: "/goods/category/index", title: "商品分类" },
                { path: "/goods/brand/index", title: "品牌管理" }
              ]
            }
          ]
        },
        {
          label: "订单",
          name: "order",
          icon: "el-icon-s-order",
          children: [
            {
              title: "订单管理",
              children: [{ path: "/order/order/index", title: "订单列表" }]
            },
            {
              title: "退款及退货",
              children: [
                { path: "/order/return/returnGoods", title: "退货申请列表" },
                { path: "/order/return/returnMoney", title: "退款申请列表" }
                // { path: "/order/return/returnReason", title: "退款原因设置" }
              ]
            }
          ]
        },
        {
          label: "用户",
          name: "user",
          icon: "el-icon-user",
          children: [
            {
              title: "用户管理",
              children: [{ path: "/user/user/index", title: "用户列表" }]
            }
          ]
        },
        {
          label: "促销",
          name: "promotion",
          icon: "el-icon-discount",
          children: [
            {
              title: "优惠券管理",
              children: [{ path: "/promotion/coupon/index", title: "优惠券列表" }]
            },
            {
              title: "秒杀专区",
              children: [
                { path: "/promotion/seckill/index", title: "秒杀活动列表" }
                // { path: "/promotion/seckill/time", title: "时间段列表" },
                // { path: "/promotion/seckill/remind", title: "秒杀提醒通知" }
              ]
            }
          ]
        },
        {
          label: "运营",
          name: "operate",
          icon: "el-icon-s-platform",
          children: [
            {
              title: "广告管理",
              children: [
                { path: "/operate/ad/index", title: "广告列表" },
                { path: "/operate/ad/add", title: "添加广告" }
              ]
            }
          ]
        },
        {
          label: "内容",
          name: "content",
          icon: "el-icon-menu",
          children: [
            {
              title: "圈子详情",
              children: [
                // { path: "/content/circle/topic_index", title: "话题列表" },
                // { path: "/content/circle/add_topic", title: "添加话题" },
                // { path: "/content/circle/article_index", title: "文章列表" },
                // { path: "/content/circle/add_article", title: "发布文章" },
                // { path: "/content/circle/comment_index", title: "评论管理" }
                { path: "", title: "话题列表" },
                { path: "", title: "添加话题" },
                { path: "", title: "文章列表" },
                { path: "", title: "发布文章" },
                { path: "", title: "评论管理" }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    activeName() {
      return this.$store.state.activeName;
    }
  },
  mounted() {}
};
</script>

<style lang='less'>
</style>
