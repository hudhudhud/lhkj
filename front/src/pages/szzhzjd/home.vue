<template>
    <section class="zjd-home">
        <div class="content">
            <div class="award">
                <div class="left-arr arr"></div>
                <div class="right-arr arr"></div>
                <ul class="pro-list">

                    <li class="pro2">
                        <img src="./imgs/pro2.png" alt="">
                        <p>BOSE 耳机soundsportMIF</p>
                    </li>
                    <li class="pro3">
                        <img src="./imgs/pro3.png" alt="">
                        <p>Ipad mini5 wifi(64金)</p>
                    </li>
                    <li class="pro4">
                        <img src="./imgs/pro4.png" alt="">
                        <p>久量触摸三色调光充电台灯</p>
                    </li>
                    <li class="pro5">
                        <img src="./imgs/pro5.png" alt="">
                        <p>腾讯视频年卡</p>
                    </li>
                    <li class="pro1">
                        <img src="./imgs/pro1.png" alt="">
                        <p>888金币</p>
                    </li>
                    <li class="pro1">
                        <img src="./imgs/pro1.png" alt="">
                        <p>388金币</p>
                    </li>
                    <li class="pro1">
                        <img src="./imgs/pro1.png" alt="">
                        <p>188金币</p>
                    </li>
                </ul>
            </div>
            <div class="left-btn btn"   @click='iShare'></div>
            <div class="right-btn btn"  @click='sharePopVisible=true'></div>
            <p class="tip">您有 <span class="num">{{chancesNum}}</span> 次砸金蛋的机会</p>
            <div class="btn-go" @click='go'></div>
        </div>
        <div class="share-pop" v-if='sharePopVisible' @click='sharePopVisible=false'>
            <img src="./imgs/hand.png" alt="" >
        </div>
    </section>
</template>
<script>
import {Indicator, Toast} from 'mint-ui';
export default{
  data () {
    return {
      chances: 0,
      payChances: 0,
      actId: '',
      sharePopVisible: false
    }
  },
  created () {
    this.actId = this.$route.query.actId
    this.getChance()
  },
  computed: {
    chancesNum () {
      return this.payChances > 0 ? this.payChances : this.chances;
    }
  },
  methods: {
    go () {
      if (this.chancesNum <= 0) {
        Toast('您未满足抽奖条件！')
        return
      }
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/szzhzjd?` + window.document.location.search)
    },
    async getChance () {
      Indicator.open();
      let rs = await this.$post('api/activity/custom/search/record', {// 获取用户购买的抽奖机会
        actId: this.actId
      });
      if (rs.status === 200) {
        this.payChances = JSON.parse(rs.payload).num;
      }

      rs = await this.$get('api/get_lottery_info/' + this.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }

      Indicator.close();
    },

    iShare () {
      window.document.location = 'http://hemi.lianhaikeji.com/partner/szzh/qrcode'
    }
  }
}
</script>
<style lang='scss' scoped>
.zjd-home{
    width: 100%;
    min-height: 14.12rem;
    position:absolute;
    top:0;
    bottom:0;
    background:#3b0072 url('./imgs/home-bg.jpg') no-repeat;
    background-size: 100% auto;
    .content{
        position:absolute;
        top:6.9rem;
        width:7.17rem;
        left:50%;
        transform: translateX(-50%);
        .award{
            background:url('./imgs/award-bg.png') no-repeat;
            background-size: 100% 100%;
            width:100%;
            height: 3.27rem;
            .arr{
                position:absolute;
                top:1.2rem;
                width:.76rem;
                height:.94rem;
                &.left-arr{
                    background:url('./imgs/left-arr.png') no-repeat;
                    background-size: 100% 100%;
                    left:-.1rem;
                }
                &.right-arr{
                    background:url('./imgs/right-arr.png') no-repeat;
                    background-size: 100% 100%;
                    right:-.1rem;
                }
            }
            .pro-list{
                list-style:none;
                margin:0;
                padding:0;
                display: flex;
                flex-wrap: nowrap;
                overflow-x:scroll;
                position:absolute;
                left:50%;
                transform: translateX(-50%);
                width:6rem;
                top:.95rem;
                li{
                    display: inline-block;
                    img{
                        width:1.31rem;
                        height: 1.3rem;
                    }
                    p{
                        padding-top:.06rem;
                        color:#affdff;
                        font-size:.24rem;
                        padding-bottom:.2rem;
                    }
                    margin-right:.54rem;
                }
            }
        }
        .btn{
            margin-top:.28rem;
            width:3.2rem;
            height: .9rem;
            display: inline-block;
            &.left-btn{
                background:url('./imgs/left-btn.png') no-repeat;
                background-size: 100% 100%;
                margin-left:.2rem;
            }
            &.right-btn{
                background:url('./imgs/right-btn.png') no-repeat;
                background-size: 100% 100%;
                margin-left:.2rem;
            }
        }
        .tip{
            margin-top:.42rem;
            font-size:.26rem;
            color:#fff;
            text-align: center;
            .num{
                font-size:.30rem;
            }
        }
        .btn-go{
            margin-top:.36rem;
            background:url('./imgs/go.png') no-repeat;
            background-size:100% 100%;
            width:7.28rem;
            height: 1.08rem;
        }
    }
    .share-pop{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background-color:rgba(0,0,0,0.5);
        img{
            width:2.96rem;
            height: 1.60rem;
            position:absolute;
            right:.2rem;
            top:.4rem;
        }
    }
}
</style>
