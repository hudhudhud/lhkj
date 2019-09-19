<template>
  <div class="main">
    <div class="time">
      <div class="name">{{refereeInfo.surname}}{{sexMap[refereeInfo.sex]}}</div>
      <div class="zctime">
        <p>
          注册时间：{{refereeInfo.ctime}}
        </p>
        <p>
          绑定时间：{{refereeInfo.bindTime}}
        </p>
      </div>
    </div>
    <div class="info">
      <div class="info-item">
        <span>手机号：</span>{{refereeInfo.mobile}}
      </div>
      <div class="info-item">
        <span>绑定人：</span>{{refereeInfo.shareMobile}}
      </div>
      <div class="info-item">
        <span>用户状态：</span>{{refereeInfo.state ? stateMap[refereeInfo.state] : '未签约未活跃'}}
      </div>
      <div class="info-item">
        <span>营销状态：</span>{{refereeInfo.yxstate ? '营销成功' : '营销未成功'}}
      </div>
      <div class="info-item">
        <span>网点归属：</span>{{refereeInfo.organCode}}
      </div>
      <div class="info-item">
        <span>身份：</span>{{refereeInfo.type ? typeMap[refereeInfo.type] : '普通用户'}}
      </div>
    </div>
    <div class="remark">
      <p>备注</p>
      <textarea v-model="refereeInfo.remark"></textarea>
      <button @click="save">修改备注</button>
    </div>
    <div class="back" @click="close">返回</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      refereeInfo: this.$route.query,
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
        '1': '大堂经理',
        '2': '外拓人员',
        '3': '商户'
      },
      stateMap: {
        '1': '未签约未活跃',
        '2': '已签约未活跃',
        '3': '已签约已活跃'
      }
    }
  },
  methods: {
    async save () {
      let rs = await this.$post('api/referee/updateRemark', {
        cusId: this.refereeInfo.customId,
        remark: this.refereeInfo.remark
      });
      if (rs.status == 200) {
        Toast('保存成功')
      } else {
        Toast('保存失败')
      }
    },
    close () {
      this.$router.back()
    }
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
    background: #f5f5f9;
  }
  .time {
    position: relative;
    margin-top: 0.1rem;
    width: 100%;
    background: white;
    padding: 0.2rem;
    color: #69b0e3;
    font-size: 0.24rem;
    line-height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .name {
    width: 3rem;
    height: 0.8rem;
    font-size: 0.3rem;
    color: #333333;
    padding: 0.2rem 0 0 0.2rem;
  }
  .zctime {
    width: 3.5rem;
  }
  .info {
    background: white;
    width: 100%;
    padding: 0.2rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 0.02rem;
  }
  .info-item {
    width: 3rem;
    font-size: 0.24rem;
    color: #333333;
    line-height: 0.5rem;
  }
  .remark {
    margin: 0.3rem auto 0 auto;
    text-align: center;
    background: white;
    width: 7rem;
    height: 3.5rem;
    padding: 0.3rem;
    border-radius: 0.1rem;
    box-shadow: 0 0.1rem 0.4rem 0 rgba(150, 150, 150, 0.2)
  }
  .remark p {
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .remark textarea {
    font-size: 0.24rem;
    text-align: left;
    width: 100%;
    height: 1.5rem;
    resize: none;
    border: none;
    background: none;
  }
  .remark button {
    border: none;
    background: #3c71ec;
    color: white;
    text-align: center;
    padding: 0 0.8rem;
    height: 0.6rem;
    margin-top: 0.2rem;
    border-radius: 0.3rem;
    font-size: 0.26rem;
    line-height: 0.6rem;
    box-shadow: 0 0.05rem 0.08rem 0 rgba(150, 150, 150, 0.5);
  }
  .back {
    margin: 0.5rem auto 0 auto;
    width: 2rem;
    border: none;
    background: #3c71ec;
    color: white;
    text-align: center;
    height: 0.6rem;
    margin-top: 0.3rem;
    border-radius: 0.3rem;
    font-size: 0.26rem;
    line-height: 0.6rem;
    box-shadow: 0 0.05rem 0.08rem 0 rgba(150, 150, 150, 0.5);
  }
</style>
