<template>
  <div>
    <div
      class="btn"
      @click="target"
      :style="{'top': defineStyle.top,'width': defineStyle.width}"
    >
      <img
        :src="defineStyle.imgUrl"
        alt=""
        width="100%"
      >
    </div>

  </div>
</template>
<script>
export default {
  name: 'TopRBtn',
  props: ['defineStyle', 'link'],
  methods: {
    target () {
      if (this.link.indexOf('http') > -1) {
        window.location.href = this.link;
      } else {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/${this.link}`
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  position: absolute;
  right: 0;
  z-index: 10;
}
</style>
