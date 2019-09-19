<template>
    <div class="main">
      <div class="back-btn" @click="$router.back()">&lt;</div>
      <div class="count">共<span>{{list.length}}</span>条反馈记录</div>
      <div class="box" v-for="item in list" :key="item.id">
        <div class="que">{{item.msg}}</div>
        <div class="ans">
          <div class="author" v-if="item.answerMsg">
            <span>{{item.answerAuthorName.indexOf('客服')>=0?item.answerAuthorName:'客服'+item.answerAuthorName}}：</span>
            <span class="time">{{item.answerTime?item.answerTime.substr(0, 16):''}}</span>
          </div>
          <div class="no-ans" v-else>该问题还未被回答</div>
          <p>{{item.answerMsg}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    async loadList () {
      let rs = await this.$post('/staff/listFeedbackByCus', {
        cusId: this.$store.state.cust.id,
        mid: this.$store.state.cust.merchantId
      })
      if (rs.status === 200) {
        this.list = rs.payload
      }
    }
  },
  created () {
    this.loadList()
  }
}
</script>

<style scoped>
  .back-btn {
    position: fixed;
    color: #fff;
    background: rgba(0,0,0,0.1);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    text-align: center;
    font-size: 0.4rem;
    line-height: 0.5rem;
    font-weight: bolder;
    top: 0.2rem;
    left: 0.2rem;
  }
  .main {
    width: 100%;
    height: 100%;
    padding: 0.44rem 0.32rem 0.32rem 0.32rem;
  }
  .count {
    font-family: simhei;
    font-size: 0.28rem;
    color: rgb(51, 51, 51);
    text-align: right;
  }
  .count span {
    color: rgb(247, 37, 57);
  }
  .box {
    margin-top: 0.36rem;
    border: 0.01rem rgb(191, 191, 191) solid;
    border-radius: 0.08rem;
    padding: 0.22rem 0.2rem 0.28rem 0.2rem;
    font-family: simhei;
    color: rgb(51, 51, 51);
    text-align: left;
  }
  .que {
    font-size: 0.3rem;
    margin-bottom: 0.22rem;
    position: relative;
    padding-left: 0.18rem;
  }
  .que:before {
    position: absolute;
    content: '';
    background: red;
    width: 0.06rem;
    height: 0.26rem;
    left: 0;
    top: 0.03rem;
  }
  .ans {
    width: 100%;
    font-size: 0.28rem;
    border-top: 0.01rem #000 solid;
    padding-top: 0.28rem;
    text-align: justify;
  }
  .no-ans {
    color: rgb(192, 192, 192);
    text-align: left;
  }
  .author {
    color: rgb(33, 174, 227);
    margin-bottom: 0.22rem;
    text-align: left;
  }
  .time {
    float: right;
    color: rgb(192, 192, 192);
  }
</style>
