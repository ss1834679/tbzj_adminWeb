<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
}
/* 高度自适应 */
.el-card {
  display: flex !important;
  flex-direction: column !important;
  .el-card__header {
    height: 50px !important;
  }
  .el-card__body {
    overflow-y: scroll !important;
    /* 消除右滚动条 */
    margin-right: -17px;
    .content {
      .el-table__body-wrapper {
        /* 表格的高度 */
        min-height: 500px;
      }
    }
    .content {
      .el-form {
        .el-table__body-wrapper {
          /* 表格的高度 */
          min-height: 0;
        }
      }
    }
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  min-width: 830px;
  height: 100%;
  min-height: 580px;
}
</style>
