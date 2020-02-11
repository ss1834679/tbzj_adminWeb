<template>
  <!-- 富文本编辑器组件 -->
  <div id="wangeditor">
    <div id="editorElem" ref="editor" style="text-align:left"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "editor",
  props: {
    value: { required: false }
  },
  data() {
    return {
      editor: "",
      editorContent: ""
    };
  },
  watch: {
    value: function(val) {
      this.editor.txt.html(val);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.uploadImgShowBase64 = true; /* 图片以base64形式保存 */
    this.editor.customConfig.onchange = html => {
      /* 获取富文本内容 */
      this.editorContent = html;
      // console.log(html);
      this.$emit("getHtmlFromWang", html);
    };
    this.editor.customConfig.pasteTextHandle = content => {
      /* 支持粘贴 */
      return content;
    };
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.customConfig.zIndex = 100
    this.editor.create();
    this.editor.txt.html(this.value);
  }
};
</script>
<style lang="less">
#editorElem /deep/ .w-e-text-container {
  //设置富文本高度，富文本有个默认300px的高度
  height: 450px !important;
}
</style>
