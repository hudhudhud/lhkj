<template>
  <div class="main">
    <div class="form">
      <div class="form-item">
        <select v-model="form.yxstate">
          <option v-for="(item, key) in yxstateMap" :key="key" :value="key">{{item}}</option>
        </select>
      </div>
      <div class="form-item">
        <select v-model="form.state">
          <option v-for="(item, key) in stateMap" :key="key" :value="key">{{item}}</option>
        </select>
      </div>
      <div class="form-item">
        <select v-model="form.bindCard">
          <option v-for="(item, key) in bindCardMap" :key="key" :value="key">{{item}}</option>
        </select>
      </div>
    </div>
    <div class="form">
      <div class="form-item">
        <input v-model="form.mobile" placeholder="输入手机号"/>
      </div>
      <div class="form-item">
        <select v-model="form.type">
          <option v-for="(item, key) in typeMap" :key="key" :value="key">{{item}}</option>
        </select>
      </div>
    </div>
    <div class="form">
      <div class="form-item">
        <input v-model="form.parentMobile" placeholder="输入绑定人手机号"/>
      </div>
      <div class="form-item">
        <button @click="loadList">查询</button>
      </div>
    </div>
    <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="scrolling"
         infinite-scroll-immediate-check="false"
         infinite-scroll-distance="10">
      <div v-for="(item, index) in list" class="list-item" :key="index">
        <div class="left">
          <p>
            <span v-if="item.surname && (item.surname + '').replace(/^ *$/g, '')" style="margin-right: 0.3rem">{{item.surname}}{{sexMap[item.sex]}}</span>
            <span>{{stateMap[item.state]}}</span>
          </p>
          <p>
            手机号：{{item.mobile}}
          </p>
        </div>
        <div class="right">
          <div class="tag">{{item.yxstate?'营销成功':'营销未成功'}}</div>
          <div class="tag">{{bindCardMap[item.isBindCard]}}</div>
          <div class="ckxq" @click="detail(item)">查看详情</div>
        </div>
      </div>
      <div class="loadding">{{pager.currentPage > pager.pageCount ? '没有更多了' : '正在加载。。。'}}</div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      list: [],
      pager: {
        currentPage: '',
        pageSize: 10
      },
      scrolling: false,
      form: {
        subbranch: '',
        organ_code: sessionStorage.getItem('referee_wdh') ? sessionStorage.getItem('referee_wdh') : 'cxq1994',
        type: '',
        mobile: '',
        parentMobile: '',
        state: '',
        yxstate: '',
        bindCard: '',
        currentPage: '',
        pageSize: ''
      },
      sexMap: {
        '男': '先生',
        '女': '女士'
      },
      bindCardMap: {
        '': '绑卡状态',
        '1': '已绑卡',
        '0': '未绑卡'
      },
      typeMap: {
        '': '身份',
        '1': '大堂经理',
        '2': '外拓人员',
        '3': '商户'
      },
      stateMap: {
        '': '用户状态',
        '1': '未签约未活跃',
        '2': '已签约未活跃',
        '3': '已签约已活跃'
      },
      yxstateMap: {
        '': '营销状态',
        '1': '新活',
        '2': '存活'
      }
    }
  },
  methods: {
    detail (item) {
      this.$router.push({name: 'refereeDetail', query: item})
    },
    loadList () {
      this.pager.currentPage = 1
      this.loadMore()
    },
    async loadMore () {
      if (
        this.pager.currentPage == 1 || this.pager.currentPage <= this.pager.pageCount &&
        this.pager.currentPage > 1
      ) {
        this.scrolling = true
        Indicator.open()
        this.form.currentPage = this.pager.currentPage
        this.form.pageSize = this.pager.pageSize
        let rs = await this.$post('api/referee/queryRefereeListWithPage', this.form)
        if (rs.status == 200) {
          rs = rs.payload
          if (this.pager.currentPage == 1) {
            this.list = []
          }
          rs.list.forEach(item => {
            this.list.push(item)
          })
          this.pager = rs.pager
          this.pager.currentPage++
        }
        this.scrolling = false
        Indicator.close()
      }
    }
  },
  created () {
    this.loadList()
  }
}
</script>

<style scoped>
  .main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 0.1rem;
    background: #f5f4f8;
    z-index: 1;
  }
  .form {
    background: white;
    width: 100%;
    padding: 0.1rem 0.3rem 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  .form-item {
    margin-bottom: 0.25rem;
  }
  .form-item select {
    background: #3c71ec;
    color: white;
    font-size: 0.24rem;
    line-height: 0.6rem;
    height: 0.6rem;
    border: none;
    border-radius: 0.3rem;
    min-width: 1.5rem;
    padding-left: 0.2rem;
    text-align: center;
    text-align-last: center;
  }
  .form-item input {
    color: #333333;
    background: white;
    font-size: 0.24rem;
    line-height: 0.6rem;
    height: 0.6rem;
    width: 4rem;
    padding-left: 0.2rem;
    border: #3c71ec 0.01rem solid;
  }
  .form-item button {
    background: #3c71ec;
    color: white;
    font-size: 0.24rem;
    line-height: 0.6rem;
    height: 0.6rem;
    width: 1.5rem;
    border: none;
    text-align: center;
    padding: 0;
  }
  .list {
    position: absolute;
    top: 3rem;
    bottom: 0rem;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch
  }
  .list-item {
    background: white;
    padding: 0.3rem;
    float: left;
    width: 100%;
    height: 1.7rem;
    border-bottom: #f5f4f8 0.02rem solid;
  }
  .left {
    color: #333333;
    font-size: 0.24rem;
    line-height: 0.5rem;
    width: 3rem;
    float: left;
  }
  .right {
    width: 3rem;
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .tag {
    background: #3c71ec;
    color: white;
    text-align: center;
    font-size: 0.24rem;
    line-height: 0.5rem;
    height: 0.5rem;
    width: 1.4rem;
    border-radius: 0.1rem;
    margin-bottom: 0.2rem;
  }
  .ckxq {
    width: 3rem;
    line-height: 0.5rem;
    height: 0.5rem;
    background: white;
    text-align: center;
    border: #3c71ec 0.01rem solid;
    color: #3c71ec;
    font-size: 0.24rem;
    border-radius: 0.1rem;
  }
  .loadding {
    height: 0.6rem;
    text-align: center;
    width: 100%;
    font-size: 0.24rem;
    line-height: 0.6rem;
    color: #666666;
  }
</style>
