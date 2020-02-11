<template>
  <div>
    <!-- 图片上传组件 -->
    <!-- action 为上传地址 -->
    <el-upload
      :file-list="fileList"
      :multiple="(notMultiple!=null?false:true)"
      list-type="picture-card"
      ref="upload"
      :action="upload_url"
      accept="*/*"
      name="file"
      :on-preview="handlePictureCardPreview"
      :on-change="handlePchange"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :on-remove="removePicture"
      :limit="(limit!=null?limit:0)"
      :class="{hide:hideUpload}"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <template v-if="size!=null">
      <p>{{`宽高最小为 ${this.size.width}*${this.size.height}`}}</p>
      <p>{{`宽高比例为 ${this.size.width}*${this.size.height}`}}</p>
    </template>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
// import imageConversion from "image-conversion"; /* 图片压缩的包 */

export default {
  name: "uploadImg",
  props: {
    imgArr: { required: true } /* 图片传入的字符串 */,
    limit: { required: false } /* 传入则有上传限制，不传则没有限制 */,
    notMultiple: { required: false } /* 传入则不可多选 */,
    remindText: { required: false } /* 提示信息，不传没有 */,
    size: { required: false } /* 图片上传的宽高限制 */
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      /* 上传数量限制 */
      hideUpload: false,
      base_url: "" /* 获取到仓库的base_url */,
      upload_url: "http://ot50yo4tk8.52http.net/fileserver/file" /* 上传地址 */,
      errorSubmit: false /* 是否是上传错误的判断 */
    };
  },
  watch: {
    imgArr() {
      this.showImg(this.imgArr);
    },
    fileList() {
      this.hideUpload = this.fileList.length >= this.limit;
    }
  },
  mounted() {
    this.base_url = this.$store.state.base_url;
    this.showImg(this.imgArr);
  },
  methods: {
    beforeUpload(file) {
      /* 在上传之前对图片进行压缩 */
      //   return new Promise(resolve => {
      //     let isLt2M = file.size / 1024 / 1024 < 4; // 判定图片大小是否小于4MB
      //     if (isLt2M) {
      //       resolve(file);
      //     }
      //     console.log(file); // 压缩到400KB,这里的400就是要压缩的大小,可自定义
      //     imageConversion.compressAccurately(file, 400).then(res => {
      //       console.log(res);
      //       resolve(res);
      //     });
      //   });
      /* 限制图片上传的宽高 */
      if (this.size != null) {
        let _this = this;
        console.log(this.size);
        return new Promise((resolve, reject) => {
          let width = this.size.width;
          let height = this.size.height;
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function() {
            /* 查看图片 */
            // console.log(img.width, width, 1);
            // console.log(img.height, height, 2);
            // console.log(img.width / img.height, width / height, 3);
            /* 上传的图片宽高是不是比规定的宽高大 并且长宽比例一致 */
            let valid = img.width >= width && img.height >= height && img.width / img.height == width / height;
            // valid ? resolve() : reject();
            if (valid) {
              // console.log("上传成功");
              resolve();
            } else {
              _this.$message({
                showClose: true,
                message: `上传的图片最小尺寸为${_this.size.width}*${_this.size.height}  且宽高比例一致`,
                type: "error",
                duration: 5000
              });
              _this.errorSubmit = true;
              reject();
            }
          };
        });
      }
    },
    showImg(imgArr) {
      if (imgArr) {
        if (imgArr.split(",").length > 1) {
          this.fileList = imgArr.split(",").map(item => {
            /* 这里是返回给这个element 组件的固定格式，item这里先设置为完整网址 */
            return {
              status: "success" /* 这个值是这个图片是否上传的标志 */,
              url: this.base_url + item,
              response: {
                content: [{ name: item, id: item }]
              }
            };
          });
        } else {
          /* 只有一个图片 imgArr 为字符串  */
          if (imgArr == "") {
            this.fileList = [];
          } else {
            this.fileList = [
              {
                status: "success",
                url: this.base_url + imgArr,
                response: { content: [{ name: imgArr, id: imgArr }] }
              }
            ];
          }
        }
      }
    },
    /* 图片预览 */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /* 上传时失败或者成功的页面显示 */
    handlePchange(file, fileList) {
      if (file.status == "success") {
        this.$message({
          type: "success",
          message: "图片上传成功！",
          center: true
        });
        this.fileList = fileList;
        /* 这个是确保是上传成功的最后一次情况，这样就不会报错 */
        if (
          this.$refs.upload.uploadFiles.filter(i => {
            return i.status !== "success";
          }).length === 0
        ) {
          this.sendImgArr();
        }
      } else if (file.status == "fail") {
        this.$message({
          type: "error",
          message: "图片上传失败",
          center: true
        });
      }
      /* 限制长度隐藏 */
      this.hideUpload = this.fileList.length >= this.limit;
    },
    handleError(response) {
      console.log(response);
    },
    /* 将图片的数组传递出子组件 */
    sendImgArr() {
      /* 这里的imgarr都是字符串 */
      let imgArr = "";
      if (this.limit && this.limit == 1) {
        /* 这个是后台返回的数据 */
        if (this.fileList.length == 0) {
          imgArr = "";
        } else {
          // if (this.fileList[0].response.content[0].id.split("/").length > 1) {
          //   imgArr = imgArr + this.fileList[0].response.content[0].id;
          // } else {
          imgArr = imgArr + this.fileList[0].response.content[0].id;
          // }
        }
      } else {
        /* 去遍历这个组件的filelist 找到可以显示的url返回到父组件 */
        this.fileList.forEach((item, index, arr) => {
          if (index == arr.length - 1) {
            // if (item.response.content[0].id.split("/").length > 1) {
            //   imgArr = imgArr + item.response.content[0].id;
            // } else {
            imgArr = imgArr + item.response.content[0].id;
            // }
            // imgArr = imgArr + item.response.content[0].id;
          } else {
            // if (item.response.content[0].id.split("/").length > 1) {
            //   imgArr = imgArr + item.response.content[0].id + ",";
            // } else {
            imgArr = imgArr + item.response.content[0].id + ",";
            // }
            // imgArr = imgArr + item.response.content[0].id + ",";
          }
        });
      }
      /* 查看这个返回的数组是什么 */
      // console.log(imgArr, 12314);
      this.$emit("getimgArr", imgArr);
    },
    /* 移除图片，相应的还要在服务器删除图片 */
    removePicture(file, fileList) {
      /* 这一段都是假操作 */
      if (this.errorSubmit) {
        this.errorSubmit = false;
      } else {
        this.$message({
          type: "success",
          message: "图片删除成功！",
          center: true
        });
        this.fileList = fileList;
        this.sendImgArr();
      }
      /* 长度限制 */
      this.hideUpload = this.fileList.length >= this.limit;
      /* 相应的调用删除接口的操作 */
      // if (file.status == "success") {
      //     console.log(123);
      //   deleteImg(file.response.data.name).then(res => {
      //       console.log(res);
      //     if (res.status == 0) {
      //       this.$message({
      //         type: "success",
      //         message: "图片删除成功！",
      //         center: true
      //       });
      //       this.fileList = fileList;
      //       this.sendImgArr();
      //     } else {
      //       this.$message({
      //         type: "error",
      //         message: "图片删除失败！",
      //         center: true
      //       });
      //     }
      //   });
      // }
    }
  }
};
</script>

<style lang="less">
.hide .el-upload--picture-card {
  display: none;
}
.remind {
  margin-left: 10px;
}
</style>