<template>
  <div class="grid-page">
    <div class="page-title">
      <div @click="back" class="page-back">
        <i class="el-icon-arrow-left"></i>
        返回
      </div>
    </div>
    <div class="page-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutPage",
  props: {
    showBack: {
      require: false,
      type: Boolean
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.grid-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
.page-title {
  flex: 0 0 30px;
  line-height: 30px;
  border-bottom: 1px solid #f2f2f2;
}
.page-back {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}
.page-back:hover {
  color: #409eff;
}
.page-body {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
