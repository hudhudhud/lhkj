<template>
  <div class="container">
    <cbbHeader title="推手攻略"></cbbHeader>
    <img src="./imgs/share-guide_01.jpg" alt="">
    <img src="./imgs/share-guide_02.jpg" alt="">
    <img src="./imgs/share-guide_03.jpg" alt="">
    <img src="./imgs/share-guide_04.jpg" alt="">
    <img src="./imgs/share-guide_05.jpg" alt="">
    <img src="./imgs/share-guide_06.jpg" alt="">
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader'
export default {
  data () {
    return {}
  },
  components: {
    cbbHeader
  }

}
</script>

<style scoped>
.container {
  padding-top: 0.8rem;
}
img {
  width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
