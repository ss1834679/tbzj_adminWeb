<template v-if="showTag">
  <!-- 添加规格，添加标签组件 -->
  <div>
    <el-tag
      :key="tag"
      v-for="tag in tagData"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新规格</el-button>
  </div>
</template>

<script>
export default {
  name: "tagAdd",
  props: {
    arrData: { required: true }
  },
  data() {
    return {
      tagData: "",
      inputVisible: false,
      inputValue: ""
    };
  },
  beforeMount() {
    this.tagData = this.arrData;
  },
  beforeUpdate() {
    this.tagData = this.arrData;
  },
  methods: {
    /* 规格tags的函数 */
    handleClose(tag) {
      this.tagData.splice(this.tagData.indexOf(tag), 1);
      this.$emit("getArrData", this.tagData);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tagData.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.$emit("getArrData", this.tagData);
    }
  }
};
</script>

<style lang='less'>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
