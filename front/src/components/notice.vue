<template>
  <div>
    <mt-popup
      v-model="show"
      class="mypop"
      :closeOnClickModal=false
      popup-transition="popup-fade"
    >
      <div class="tipdetail">
        <div
          class="content"
          style="text-align:center;"
          v-html="txt||敬请期待"
        >
        </div>

      </div>

    </mt-popup>
  </div>
</template>
<script>
export default {
  name: 'notice',
  props: ['show', 'txt']
};
</script>
<style lang="scss" scoped>
.tipdetail {
  width: 5.8rem;
  background: #fff;
  padding: 1rem 0.6rem;
  .content {
    line-height: 0.46rem;
    font-size: 0.28rem;
    color: #333;
    span {
      color: #ab1818;
    }
  }
}
</style>
