<template>
<section class="credit-indiv">
   <myheader :title='list[currentIndex].title' ></myheader>
   <img src='./imgs/credit-indiv.jpg' alt=""  v-if='currentIndex===0'>
   <img src='./imgs/credit-indiv1.jpg' alt="" v-if='currentIndex===1'>
   <img src='./imgs/credit-indiv2.jpg' alt="" v-if='currentIndex===2'>
   <img src='./imgs/credit-indiv3.jpg' alt="" v-if='currentIndex===3'>
</section>
</template>
<script>
import myheader from './components/myheader'
export default {
  components: {
    myheader
  },
  data () {
    return {
      list: [{
        title: '什么是个人征信',
        src: 'credit-indiv.jpg'
      },
      {
        title: '个人征信有什么用',
        src: 'credit-indiv1.jpg'
      },
      {
        title: '怎样算是优秀的信用报告呢？',
        src: 'credit-indiv2.jpg'
      },
      {
        title: '如何拥有一份优秀的信用报告？',
        src: 'credit-indiv3.jpg'
      }],
      currentIndex: 0
    }
  },
  created () {
    this.currentIndex = this.$route.params.index - 1
  }
}
</script>
<style lang='scss' scoped>
.credit-indiv{
    width:100%;
    img{
        width:100%;
    }
}
</style>
