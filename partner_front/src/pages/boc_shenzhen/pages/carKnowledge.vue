<template>
<section class="car-kno">
    <myheader title='用卡小知识' ></myheader>
    <section class="btns">
        <img src="./imgs/card.png" alt="" @click='$router.push("cardnotice")'>
        <img src="./imgs/credit.png" alt="" @click='$router.push("creditCardSafe")'>
        <img src="./imgs/indi.png" alt="" @click='$router.push("indivNotice")'>
    </section>
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
  .card-header {
    font-family: "simhei";
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
  }
.car-kno{
    width:100%;
    .btns{
        width:100%;
        height: 12.83rem;
        background: url('./imgs/car-kno-bgk.jpg') no-repeat;
        background-position:0;
        background-size: 100% 100%;
        text-align: center;
        padding-top:2.8rem;
        img{
            width:5rem;
            height: 1.43rem;
            margin-bottom:.5rem;
            cursor: pointer;
        }
    }
}
</style>
