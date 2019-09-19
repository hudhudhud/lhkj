<template>
  <div class="page">
    <div class="cont">
      <div class="title">
        <div class="item">总排名</div>
        <div class="item">姓名</div>
        <div class="item">办卡人数</div>
      </div>
      <div class="inner">
        <div v-for="(item, index) in list" :key="index" class="row">
          <div class="item num">
            <img v-if="index==0" src="./imgs/ranking-one.png" alt="">
            <img v-if="index==1" src="./imgs/ranking-two.png" alt="">
            <img v-if="index==2" src="./imgs/ranking-three.png" alt="">
            <span v-if="index>2">{{item.rownum}}</span>
          </div>
          <div class="item">{{item.name}}</div>
          <div class="item">{{item.count}}</div>
        </div>
      </div>
    </div>
    <div class="my-ranking">
      <div class="inner">
        <div class="num">
          {{myInfo.rownum || '未上榜'}}
        </div>
        <div class="mid">
          <div class="pic">
            <img :src="myInfo.imgUrl" alt="">
          </div>
          <div class="text">
            <div class="name">我</div>
            <span class="tips">{{myInfo.name}}</span>
          </div>
        </div>
        <div class="num">{{myInfo.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: Array,
      myInfo: null
    };
  },
  methods: {
    async getListBoundRanking () {
      let rs = await this.$post('/new_partner/listBoundRanking', {
        apply_card: 'Y'
      });
      this.list = rs.payload;

      let rs1 = await this.$post('/new_partner/getMyRanking', {
        apply_card: 'Y'
      });
      this.myInfo = rs1.payload;
    }
  },
  created () {
    this.getListBoundRanking();
  }
};
</script>

<style lang="scss" scoped>
  .page {
    background: url(./imgs/ranking-bg.jpg) no-repeat center top;
    min-height: 100vh;
    background-size: 100%;
    padding-top: 2rem;
    padding-bottom: 0.5rem;
    position: relative;
    .cont {
      width: 6.73rem;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 0.12rem;
      margin: 0 auto;
      padding-bottom: 0.3rem;
      margin-bottom: 2.5rem;
      .title {
        width: 6.48rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        height: 1.08rem;
        line-height: 1.08rem;
        .item {
          text-align: center;
          width: 1.86rem;
          font-size: 0.32rem;
          color: #2c8cff;
        }
      }
      .inner {
        width: 6.48rem;
        background-color: rgba(163, 230, 250, 0.8);
        box-shadow: -0.07rem 0.11rem 0.24rem 0px rgba(86, 191, 219, 0.19),
        inset -0.02rem -0.01rem 0.12rem 0px rgba(90, 195, 218, 0.74);
        border-radius: 0.08rem;
        margin: 0 auto;
        .row {
          display: flex;
          justify-content: space-between;
          height: 0.96rem;
          line-height: 0.96rem;
          border-bottom: 1px solid #fff;
          &:last-child {
            border: none;
          }
          .item {
            text-align: center;
            width: 1.86rem;
            font-size: 0.3rem;
            color: #076b9f;
            position: relative;
            &.num {
              font-size: 0.44rem;
              overflow: hidden;
              color: rgb(63, 138, 179);
              img {
                width: 1.71rem;
                height: 1.28rem;
                position: absolute;
                left: 0;
                right: 0;
                top: -0.3rem;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
    .my-ranking {
      position: absolute;
      bottom: 0.4rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 6.73rem;
      height: 1.96rem;
      background-color: rgba(255, 255, 255, 0.6);
      box-shadow: -0.07rem 0.11rem 0.24rem 0rem rgba(84, 185, 216, 0.19),
      inset -0.02rem -0.01rem 0.12rem 0rem rgba(207, 239, 245, 0.74);
      border-radius: 0.12rem;
      padding: 0.2rem 0.12rem 0.2rem 0.13rem;
      .inner {
        width: 6.48rem;
        height: 1.57rem;
        background-color: rgba(255, 255, 255, 0.8);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .num {
          width: 1.86rem;
          font-size: 0.44rem;
          color: rgba(255, 33, 54, 0.8);
          text-align: center;
          line-height: 1.57rem;
        }
        .mid {
          display: flex;
          align-items: center;
          .pic {
            width: 1.04rem;
            height: 1.04rem;
            border: 0.04rem solid #ddedf4;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            margin-left: 0.14rem;
            .name {
              font-size: 0.36rem;
              color: #ff656f;
              margin-bottom: 0.12rem;
            }
            span {
              font-size: 0.28rem;
              color: #9e9e9e;
            }
          }
        }
      }
    }
  }
</style>
