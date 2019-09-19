<template>
    <section class="order-list">
      <back></back>
       <div class="content">
           <div class="header">
               <img src="./imgs/order-header.png" alt="">
           </div>
           <ul class="list">
               <li class="item" v-for='(item,i) in list' :key='i'>
                  <span class="pro-name left">{{item.proStandardName}}</span>
                  <div class="pro-right">
                      <img  class="pro-btn"  v-if='item.proType==9' src="./imgs/liqu.png" alt="" @click="$router.push(`/${$store.state.merchantAppid}/merchant/address/list?targetPath=order?actId=${actId}&orderCode=${item.orderCode}&proName=${item.proStandardName}`)">
                      <img class="pro-btn" v-else src="./imgs/had.png" alt="">
                      <p class="time" v-if='item.orderTime'>下单时间：{{item.orderTime.split(' ').length?item.orderTime.split(' ')[0]:item.orderTime}}</p>
                  </div>
               </li>
           </ul>
       </div>
    </section>
</template>
<script>
// import {loadOrder} from '@/lib/api.js'
export default {
  data () {
    return {
      actId: '',
      list: []
    }
  },
  created () {
    this.actId = this.$route.query.actId
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      // this.list = await loadOrder({actId: this.actId})
      let rs = await this.$post('/api/getOrderList', {
        actId: this.actId,
        actType: '1,3,2,4,5',
        currentPage: 1,
        pageSize: 100
      })
      if (rs.status === 200) {
        this.list = rs.payload.list // proStandardId
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.order-list{
    width:100%;
    height: 100%;
    min-height: 14rem;
    position:absolute;
    top:0;
    bottom:0;
    background: #3b0072 url(./imgs/bg.png) no-repeat;
    background-size: 100% auto;
    .content{
        position:absolute;
        top:1.2rem;
        left:50%;
        transform: translateX(-52%);
        .header{
            margin-top:-1rem;
            text-align: center;
            img{
                margin-left: .45rem;
                width:3.56rem;
                height: 1.28rem;
            }
        }
        background: url(./imgs/order-bg.png) no-repeat;
        background-size: 100% auto;
        background-position: 0 -1rem;
        height: 12rem;
        width:7.04rem;
        .list{
            list-style: none;
            margin:auto;
            padding:0;
            width:5.77rem;
            margin-left:.8rem;
            padding-top:.3rem;
            overflow-y:scroll;
            height: 11rem;
            .item{
                background:url('./imgs/pro-bg.png') no-repeat;
                background-size: 100% auto;
                width:5.77rem;
                height:1.34rem;
                display: flex;
                align-items: center;
                .pro-name{
                    margin-left:.26rem;
                    font-size:.36rem;
                    color:#E11c3E;
                    float:left;
                    width:3.5rem;
                    xpadding-right: .2rem;
                    padding-left: .2rem;
                    line-height: .5rem;
                    word-break: break-all;
                }
                .pro-right{
                  text-align: center;
                  width:3.5rem;
                  .pro-btn{
                    margin-right:.26rem;
                    width:1.70rem;
                    height: .56rem;
                  }
                  .time{
                    font-size:.22rem;
                    color:gray;
                    padding-top:.1rem;
                    padding-right:.2rem;
                  }
                }

                margin-bottom:.24rem;
            }
        }
    }

}
</style>
