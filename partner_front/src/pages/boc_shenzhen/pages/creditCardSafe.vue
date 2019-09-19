<template>
<section class="credit-safe">
  <myheader title='信用卡安全用卡' ></myheader>
    <img src="./imgs/credit-safe.jpg" alt="">
</section>
</template>
<script>
import myheader from './components/myheader'
export default{
  components: {
    myheader
  }
}
</script>
<style lang='scss' scoped>
.credit-safe{
    width:100%;
    img{
        width:100%;
    }
}
</style>
