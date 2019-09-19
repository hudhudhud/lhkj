<template>
  <div class="swiper-editor">
    <div class="swiper-editor-item" :class="{'swiper-editor-item-active':currentItem==item}" v-for="(item,ind) in list" :key="'swiperitem_'+ind" @click="currentItem=item">
      <img class="swiper-editor-item-img" :src="item.url" v-if="item.url" @click.stop="currentItem=item" />
      <div class="swiper-editor-item-img" v-else>尚未上传图片</div>
    </div>
    <div class="swiper-editor-row" v-if="!list||list.length==0">
      尚未添加图片
    </div>
    <div class="swiper-editor-row">
      <el-button @click="add" size="mini" icon="el-icon-plus">添加</el-button>
    </div>
    <div v-if="currentItem" class="swiper-editor-props">
      <div>操作</div>
      <div>
        <el-button size="mini">上移</el-button>
        <el-button size="mini" type="danger" @click="remove">删除</el-button>
      </div>
      <div>图片</div>
      <div>
        <ImageUploader @success="uploadSuccess"></ImageUploader>
      </div>
      <div>点击事件</div>
      <ActionEditor v-model="currentItem.action"></ActionEditor>
    </div>
  </div>
</template>

<script>
import ActionEditor from "./ActionEditor"
import ImageUploader from "./ImageUploader"

export default {
  props: ["value", "propDef"],
  components: {ImageUploader, ActionEditor},
  data () {
    return {
      list: this.value,
      currentItem: null
    }
  },
  watch: {
    value (val) {
      this.list = val
      this.currentItem = null
    },
    list: {
      deep: true,
      handler: function (val) {
        this.$emit("input", val)
      }
    }
  },
  methods: {
    add () {
      this.list.push({
        url: "",
        action: {
          type: "none",
          action: ""
        }
      })
    },
    remove () {
      this.list.forEach((item, ind) => {
        if (item === this.currentItem) {
          this.list.splice(ind, 1)
        }
      })
    },
    uploadSuccess (res) {
      if (res.status == 200 && res.payload) {
        this.currentItem.url = res.payload
      } else {
        this.$message.error("上传失败:" + res)
      }
    }
  }
}
</script>

<style scoped>
.swiper-editor {
  position: relative;
}
.swiper-editor-item {
  border: 1px dotted transparent;
  margin-bottom: 5px;
}
.swiper-editor-item-active {
  border: 1px dotted #000;
}
.swiper-editor-item-img {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  line-height: 30px;
  height: 30px;
  text-align: center;
  margin-right: 5px;
  background: teal;
  color: #fff;
}
.swiper-editor-row {
  margin: 5px 0;
}
.swiper-editor-props {
  border: 1px solid #eee;
  padding: 5px;
}
</style>
