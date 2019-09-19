<template>
  <div class="page">
    <div class="nav">
      <div class="left" @click="bindTab(true)">
        <img v-show="!listShow" src="./imgs/people.png" alt="">
        <img v-show="listShow" src="./imgs/people-ac.png" alt="">
      </div>
      <div class="right" @click="bindTab(false)">
        <img v-show="listShow" src="./imgs/gold.png" alt="">
        <img v-show="!listShow" src="./imgs/gold-ac.png" alt="">
      </div>
    </div>
    <div class="people" v-show="!listShow">
      <div class="cont">
        <div class="tips" v-if="list.length <= 0">暂无排名</div>
        <div class="title" v-if="list.length > 0">
          <div class="item">总排名</div>
          <div class="item">姓名</div>
          <div class="item">办卡人数</div>
        </div>
        <div class="inner" v-if="list.length > 0">
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
            <div class="title">
              总排名
            </div>
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
          <div class="num">
            <div class="title">
              办卡人数
            </div>
            {{myInfo.count}}
          </div>
        </div>
      </div>
    </div>
    <div class="gold" v-show="listShow">
      <div class="cont">
        <div class="tips" v-if="goldList.length <= 0">暂无排名</div>
        <div class="title" v-if="goldList.length > 0">
          <div class="item">总排名</div>
          <div class="item">姓名</div>
          <div class="item">总金币</div>
        </div>
        <div class="inner" v-if="goldList.length > 0">
          <div v-for="(item, index) in goldList" :key="index" class="row">
            <div class="item num">
              <img v-if="index==0" src="./imgs/ranking-one.png" alt="">
              <img v-if="index==1" src="./imgs/ranking-two.png" alt="">
              <img v-if="index==2" src="./imgs/ranking-three.png" alt="">
              <span v-if="index>2">{{index+1}}</span>
            </div>
            <div class="item">{{item.nickName}}</div>
            <div class="item">{{item.accumulatedCredit}}</div>
          </div>
        </div>
      </div>
      <div class="my-ranking">
        <div class="inner">
          <div class="num">
            <div class="title">
              总排名
            </div>
            {{myGoldInfo.rownum || '未上榜'}}
          </div>
          <div class="mid">
            <div class="pic">
              <img :src="myGoldInfo.headImgUrl" alt="">
            </div>
            <div class="text">
              <div class="name">我</div>
              <span class="tips">{{myGoldInfo.nickName}}</span>
            </div>
          </div>
          <div class="num">
            <div class="title">
              总金币
            </div>
            {{myGoldInfo.accumulatedCredit || 0}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      goldList: [],
      myInfo: {},
      myGoldInfo: {},
      listShow: true
    };
  },
  methods: {
    async getListBoundRanking () {
      this.list = [];
      let rs = await this.$post('/new_partner/listBoundRanking', {
        apply_card: 'Y'
      });
      rs.payload.forEach(item => {
        item.name = changeName(item.name);
        this.list.push(item);
      });
      let rs1 = await this.$post('/new_partner/getMyRanking', {
        apply_card: 'Y'
      });
      this.myInfo = rs1.payload;
    },
    async userCredit () {
      this.goldList = [];
      let rs = await this.$post('/user_credit/ranking');
      rs.payload.list.forEach((item, index) => {
        if (index > 9) return false;
        item.nickName = changeName(item.nickName);
        this.goldList.push(item);
      });
      let rs1 = await this.$post('/user_credit/MyRanking');
      this.myGoldInfo = rs1.payload;
    },
    getheadImgUrl () {
      this.myInfo.imgUrl = this.$store.state.cust.headImgUrl;
      this.myInfo.name = this.$store.state.cust.nickname;
    },
    bindTab (e) {
      this.listShow = e;
    }
  },
  created () {
    this.getheadImgUrl();
    this.getListBoundRanking();
    this.userCredit();
  }
};
const changeName = val => {
  if (val) {
    if (val.length) {
      const len = val.length;
      if (len === 1) {
        return '*';
      } else if (len === 2) {
        return val[0] + '*';
      } else if (len === 3) {
        return val[0] + '*' + val[2];
      } else if (len > 3 && len < 6) {
        const newVal = val.substring(2, len - 1);
        let newValChange = [];
        for (let i = 0; i < newVal.length; i++) {
          newValChange.push('*');
        }
        return val[0] + val[1] + newValChange.join('') + val[len - 1];
      } else if (len >= 6 && len < 8) {
        const newVal = val.substring(2, len - 2);
        let newValChange = [];
        for (let i = 0; i < newVal.length; i++) {
          newValChange.push('*');
        }
        return (
          val[0] + val[1] + newValChange.join('') + val[len - 2] + val[len - 1]
        );
      } else {
        const newVal = val.substring(3, len - 3);
        let newValChange = [];
        for (let i = 0; i < newVal.length; i++) {
          newValChange.push('*');
        }
        return (
          val[0] +
          val[1] +
          val[2] +
          newValChange.join('') +
          val[len - 3] +
          val[len - 2] +
          val[len - 1]
        );
      }
    }
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
  .nav {
    display: flex;
    width: 5rem;
    margin: 0 auto;
    margin-bottom: 0.1rem;
    img {
      width: 2.5rem;
    }
  }
  .tips {
    text-align: center;
    padding-top: 0.3rem;
  }
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
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
        .title {
          font-size: 0.3rem;
          height: 0.4rem;
          margin-top: -0.3rem;
          margin-bottom: 0.2rem;
        }
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
