<template>
  <div class="selector">
    <div
      class="selector-li"
      v-for="(li, index) in list"
      :key="index"
    >
      <div
        class="selector-item"
        v-for="(item, index1) in li"
        :key="'item'+index1"
        @click="target(item.link)"
      >
        <img
          :src="item.icon"
          alt=""
        >
        <p>{{item.txt}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  methods: {
    target (url) {
      if (url) {
        window.location.href = url;
      } else {
        this.$toast('敬请期待');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.selector {
  &-li {
    margin-bottom: 0.2rem;
    :first-child {
      margin-bottom: 0.3rem;
    }
  }
  &-item {
    display: inline-block;
    width: 20%;
    text-align: center;
    img {
      width: 0.62rem;
    }
    p {
      font-size: 0.26rem;
      color: rgb(51, 51, 51);
    }
  }
}
</style>
