<template>
  <div class="info">
    <div class="cont">
      <div class="item" v-for='(item, index) in statistics' :key="index">
        {{item.name}}：<span>{{item.num}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'partnerInfo',
  props: ['statistics']
};
</script>
<style lang="scss" scoped>
.info {
  height: 0.98rem;
  line-height: 0.98rem;
  .cont {
    width: 6.86rem;
    height: 100%;
    background-color: #ffeaea;
    border-radius: 0.14rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 0 0.4rem;
    .item {
      font-size: 0.26rem;
      color: #c99a9b;
      span {
        font-size: 0.34rem;
        color: #e22319;
      }
    }
  }
}
</style>
