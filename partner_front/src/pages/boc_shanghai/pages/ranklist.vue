<template>
  <div class="rankinglist">
    <div class="rankinglist-header">
      <div>推荐办卡排行榜</div>
    </div>
    <div class="main-content">
      <div class="topheader">
        <img src="./imgs/toppic.png" alt>
      </div>
      <div class="list">
        <div class="title">
          <div>全行排名</div>
          <div>姓名</div>
          <div>办卡人数</div>
          <div>推荐人数</div>
        </div>
        <div class="list-item" v-for="(item, index) in rankList" :key="'inx'+index">
          <div class="num" v-if="index===0">
            <img src="./imgs/1.png" alt>
          </div>
          <div class="num" v-else-if="index===1">
            <img src="./imgs/2.png" alt>
          </div>
          <div class="num" v-else-if="index===2">
            <img src="./imgs/3.png" alt>
          </div>
          <div class="num" v-else>{{index+1}}</div>
          <div>{{item.name}}</div>
          <div>{{item.count}}</div>
          <div>{{item.bindingCount}}</div>
        </div>
      </div>
      <div class="userinfo">
        <div class="order" v-if="rank>0">{{rank}}</div>
        <div class="noorder" v-else>暂无排名</div>
        <div class="info">
          <img class="headimg" :src="headImgUrl" alt>
          <div class="name">
            <p>我</p>
            <p>{{name}}</p>
          </div>
        </div>
        <div class="peoplenum" v-if="count>0">{{count}}</div>
        <div class="nopeoplenum" v-else>暂无办卡人</div>
        <div class="peoplenum" v-if="bindingCount>0">{{bindingCount}}</div>
        <div class="nopeoplenum" v-else>暂无推荐人</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      rankList: [],
      rank: '',
      count: '',
      name: '',
      headImgUrl: '',
      bindingCount: ''
    };
  },
  methods: {
    async getranklist () {
      let key = this.$route.params.key;
      if (key == 2) {
        let rs = await this.$post('/binding/rank/2'); // 员工1  学生2
        if (rs.status == 200) {
          this.rankList = rs.payload.rankList;
          this.name = rs.payload.name;
          this.count = rs.payload.count;
          this.rank = rs.payload.rank;
        } else {
          Toast(rs.error);
        }
      } else {
        let rs = await this.$post('/binding/rank/1'); // 员工1  学生2
        if (rs.status == 200) {
          this.rankList = rs.payload.rankList;
          this.name = rs.payload.name;
          this.count = rs.payload.count;
          this.rank = rs.payload.rank;
          this.bindingCount = rs.payload.bindingCount;
        } else {
          Toast(rs.error);
        }
      }
    }, // 全行排名接口
    getheadImgUrl () {
      this.headImgUrl = this.$store.state.cust.headImgUrl;
    }
  },
  async created () {
    Indicator.open();
    await this.getranklist();
    await this.getheadImgUrl();
    Indicator.close();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.rankinglist {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  .rankinglist-header {
    position: relative;
    top: 0rem;
    left: 0;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
    .rankinglist-out {
      position: absolute;
      top: 0.4rem;
      right: 0.3rem;
      height: 0.3rem;
      width: 0.3rem;
    }
  }
  .main-content {
    width: 100%;
    background: url("./imgs/listbg.png") no-repeat;
    background-size: 100% 100%;
    .topheader {
      width: 6.32rem;
      height: 1.47rem;
      margin: 0 auto;
      padding: 0.5rem 0 0 0;
      img {
        width: 100%;
      }
    }
    .list {
      width: 7.15rem;
      height: 11.4rem;
      background: url("./imgs/ranklistbg.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 0.45rem;
      padding: 0.38rem 0 0 0;
      .title {
        display: flex;
        justify-content: space-around;
        color: rgb(71, 174, 79);
        font-size: 0.32rem;
        margin: 0.15rem 0.25rem 0.4rem 0.4rem;
        div {
          width: 33.33%;
          text-align: center;
        }
      }
      .list-item {
        position: relative;
        height: 0.96rem;
        width: 6.35rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        line-height: 0.96rem;
        border-bottom: 0.01rem solid rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        font-size: 0.3rem;
        div {
          width: 33.33%;
          text-align: center;
        }
        &:last-child {
          border: 0;
        }
        .num {
          font-size: 0.44rem;
          img {
            position: absolute;
            top: -0.1rem;
            left: 0.2rem;
            width: 1.28rem;
          }
        }
      }
    }
    .userinfo {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 7.15rem;
      height: 1.96rem;
      margin: 0 auto;
      background: url("./imgs/rankinglist.png") no-repeat;
      background-size: 100% 100%;
      padding: 0.4rem;
      .headimg {
        border-radius: 50%;
      }
      .order {
        font-size: 0.44rem;
        color: rgba(255, 33, 54, 0.8);
      }
      .noorder {
        font-size: 0.25rem;
        color: rgba(255, 33, 54, 0.8);
      }
      .peoplenum {
        font-size: 0.3rem;
        color: rgb(255, 101, 111);
      }
      .nopeoplenum {
        font-size: 0.25rem;
        color: rgb(255, 101, 111);
      }
      .info {
        display: flex;
        img {
          width: 1.04rem;
          height: 1.04rem;
        }
      }
      .name {
        margin-left: 0.18rem;
        p {
          margin-top: 0.15rem;
          &:first-child {
            font-size: 0.36rem;
            color: rgb(255, 101, 111);
          }
          &:last-child {
            font-size: 0.28rem;
            color: rgb(158, 158, 158);
          }
        }
      }
    }
  }
}
</style>
