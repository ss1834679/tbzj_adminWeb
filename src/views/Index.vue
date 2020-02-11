<template>
  <div id="index">
    <!-- 最大的首页 -->
    <el-container>
      <el-header>
        <div class="logoTitle">
          <!-- <img src="../../public/img/logo_small.png" alt /> -->
          <span>涂邦之家后台业务管理系统</span>
        </div>
        <div class="imformation"></div>
      </el-header>
      <el-container>
        <el-aside>
          <tabs-menu></tabs-menu>
        </el-aside>
        <el-container>
          <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
              <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tabsMenu from "../components/tabsMenu";

export default {
  data() {
    return {
      isCollapse: false,
      levelList: null,
      activeName: "order-menu"
    };
  },
  components: {
    tabsMenu
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      this.levelList = matched.filter(item => {
        return item.path != "";
      });
      console.log(this.levelList);
    }
  }
};
</script>

<style lang='less'>
#index {
  width: 100%;
  height: 100%;
  .el-container {
    .el-header {
      display: flex;
      justify-content: space-between;
      background-color: #31c3a6;
      .logoTitle {
        height: 50px;
        display: flex;
        span {
          line-height: 50px;
          // margin-left: 14px;
          font-weight: 800;
          color: white;
        }
      }
    }
    .el-aside {
      background-color: #d3dce6;
      color: #333;
      // height: 100%;
      width: auto !important;
      .el-tabs {
        height: 100%;
        .el-tabs__header {
          background-color: #464c5b;
          margin: 0;
          .el-tabs__nav {
            .el-tabs__active-bar {
              display: none;
            }
            .el-tabs__item {
              color: #ccc;
              padding: 0 15px;
            }
            .el-tabs__item.is-active {
              color: #fff;
              background-color: #6c7b8b;
              position: relative;
              overflow: hidden;
            }
            .el-tabs__item.is-active::after {
              display: block;
              content: "";
              position: absolute;
              background-color: #fff;
              right: -5px;
              top: 15px;
              width: 10px;
              height: 10px;
              transform: rotate(45deg);
            }
          }
          .el-tabs__nav-wrap::after {
            background-color: #464c5b;
          }
        }
        .el-tabs__content {
          .el-menu {
            .el-menu-item.is-active {
              color: #31c3a6;
            }
            .el-menu-item-group {
              .el-menu-item-group__title {
                background-color: #f2f2f2;
              }
              .el-menu-item {
                position: relative;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #e4e4e4;
              }
              .el-menu-item::after {
                display: block;
                content: "";
                position: absolute;
                width: 4px;
                height: 4px;
                background-color: #333;
                border-radius: 50%;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
              }
              .el-menu-item.is-active::after {
                background-color: #31c3a6;
              }
            }
          }
        }
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        /* 菜单宽度 */
        width: 120px;
      }
      .el-menu {
        background-color: #eaedf1;
        border: none;
        .logo {
          text-align: center;
          max-height: 60px;
          margin-top: 10px;
          margin-bottom: 10px;
          padding-left: 5px;
          padding-right: 5px;
        }
        .el-submenu .el-menu-item {
          height: 35px;
          line-height: 35px;
        }
      }
      .el-menu--collapse {
        text-align: center;
      }
    }
    .el-breadcrumb {
      padding: 7px 20px;
      background-color: #f9f9f9;
    }
    .el-main {
      background-color: #f1f1f1;
      padding: 10px;
      .el-card {
        border-radius: 0;
      }
    }
    .el-main > div {
      background-color: #fff;
      width: 100%;
      height: 100%;
    }
    .el-main > div > div {
      height: 100%;
    }
    .el-main > div > div > div {
      height: 100%;
    }
  }
  .red {
    /* 输入金额的红色提示 */
    width: 180px !important;
    .el-input-group__append {
      color: red !important;
    }
  }
  .el-header,
  .el-footer {
    height: 50px !important;
    line-height: 50px !important;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
}
#index > .el-container.is-vertical {
  height: 100%;
  width: 100%;
  display: -webkit-box !important;
}
</style>
