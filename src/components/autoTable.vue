<template>
  <!-- 自动生成table(添加规格)组件 -->
  <div id="autoTable">
    <el-table :data="itemList" height="400" style="width: 100%">
      <el-table-column
        v-for="(i,index) in goodsGroupSpecParmList"
        :key="i.groupName"
        :prop="'value'+index"
        :label="i.groupName"
      ></el-table-column>
      <el-table-column prop="goodsItem.itemTitle" label="商品标题">
        <template slot-scope="scope">
          <el-input v-model="scope.row.goodsItem.itemTitle"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="goodsItem.img" align="center" label="图片">
        <template slot-scope="scope">
          <upload-img
            @getimgArr="(imgarr)=>{scope.row.goodsItem.img = imgarr}"
            :imgArr="scope.row.goodsItem.img"
            :limit="1"
            :notMultiple="true"
          ></upload-img>
        </template>
      </el-table-column>
      <el-table-column prop="goodsItem.itemCore" label="编码">
        <template slot-scope="scope">
          <el-input v-model="scope.row.goodsItem.itemCore"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="goodsItem.itemPrice" label="价格(单位:分)" width="200">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.goodsItem.itemPrice" class="red">
            <template slot="append">分</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="goodsItem.itemNum" label="库存">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.goodsItem.itemNum"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import uploadImg from "./uploadImg";
export default {
  name: "autoTable",
  props: {
    goodsGroupSpecParmList: {
      type: Array,
      required: true
    },
    goodsItemList: {
      type: Array
    },
    placeTitle: { required: true },
    placeNum: { required: true }
  },
  data() {
    return {
      parmList: [],
      itemList: [],
      arr2: []
    };
  },
  watch: {
    itemList: {
      handler() {
        /* 复制对象，操作对象原对象不会发生改变 */
        let arr = JSON.parse(JSON.stringify(this.itemList));
        arr.map(item => {
          item["goodsOptional"] = {};
          item["goodsOptional"]["specOptionalValue"] = [];
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              if (key != "goodsItem" && key != "goodsOptional") {
                item["goodsOptional"]["specOptionalValue"].push(item[key]);
                delete item[key];
              }
            }
          }
        });
        this.$emit("getItemList", { list: arr });
      },
      deep: true
    }
  },
  methods: {
    doExchange(arr) {
      let len = arr.length;
      /* 当数组大于等于2个的时候 */
      if (len >= 2) {
        /* 第一个数组的长度 */
        let len1 = arr[0].length;
        /* 第二个数组的长度 */
        let len2 = arr[1].length;
        /* 2个数组产生的组合数 */
        let lenBoth = len1 * len2;
        /* 申明一个新数组 */
        let items = new Array(lenBoth);
        /* 申明新数组的索引 */
        let index = 0;
        for (let i = 0; i < len1; i++) {
          for (let j = 0; j < len2; j++) {
            if (arr[0][i] instanceof Array) {
              items[index] = arr[0][i].concat(arr[1][j]);
            } else {
              items[index] = [arr[0][i]].concat(arr[1][j]);
            }
            index++;
          }
        }
        let newArr = new Array(len - 1);
        for (let i = 2; i < arr.length; i++) {
          newArr[i - 1] = arr[i];
        }
        newArr[0] = items;
        return this.doExchange(newArr);
      } else {
        return arr[0];
      }
    },
    updataData() {
      var arr = [];
      for (let i = 0; i < this.goodsGroupSpecParmList.length; i++) {
        arr.push(this.goodsGroupSpecParmList[i].specParam);
      }
      this.arr2 = this.doExchange(arr);
      var temp = new Array(this.arr2.length);
      this.arr2.map((item, index, array) => {
        if (Array.isArray(this.arr2[index])) {
          temp[index] = {};
          this.arr2[index].map((i, idx) => {
            temp[index][`value${idx}`] = array[index][idx];
          });
          if (this.goodsItemList.length != array.length) {
            temp[index].goodsItem = {
              img: "" /* 商品图片  选择规格之后的图片 */,
              itemCore: "" /* 编码 */,
              itemTitle: this.placeTitle /* 商品标题 */,
              itemPrice: 0.0 /* 商品价格 */,
              itemNum: this.placeNum /* 商品库存 */,
              /* 礼包内的商品个数 (可以直接购买的商品)选项 */
              giftDetails: [
                { itemId: "" /* 规格id */, number: 0 /* 规格数量 */ }
              ]
            };
          } else {
            temp[index].goodsItem = this.goodsItemList[index].goodsItem;
          }
        } else {
          this.arr2.map((i, idx) => {
            temp[idx] = {};
            temp[idx][`value0`] = array[idx];
            if (this.goodsItemList.length != array.length) {
              temp[idx].goodsItem = {
                img: "" /* 商品图片  选择规格之后的图片 */,
                itemCore: "" /* 编码 */,
                itemTitle: this.placeTitle /* 商品标题 */,
                itemPrice: 0.0 /* 商品价格 */,
                itemNum: this.placeNum /* 商品库存 */,
                /* 礼包内的商品个数 (可以直接购买的商品)选项 */
                giftDetails: [{ itemId: "", itemNum: 0 }]
              };
            } else {
              temp[idx].goodsItem = this.goodsItemList[idx].goodsItem;
            }
          });
        }
      });
      this.itemList = temp;
    }
  },
  beforeMount() {
    this.updataData();
  },
  beforeUpdate() {
    this.updataData();
  },
  components: { uploadImg }
};
</script>

<style lang='less'>
#autoTable {
  .el-upload-list--picture-card .el-upload-list__item {
    /* 图片上传的样式 */
    width: 80px;
    height: 80px;
  }
  .el-upload--picture-card {
    /* 图片上传的样式 */
    width: 80px;
    height: 80px;
    line-height: 86px;
  }
}
</style>
