<template>
  <div class="main">
    <div class="form">
      <div class="form-item">
        姓名:
        <input v-model="form.etc_name" placeholder="请输入姓名"/>
      </div>
      <div class="form-item">
        手机号码:
        <input type="tel" v-model="form.etc_mobile" placeholder="请输入手机号码"/>
      </div>
      <div class="form-item">
        预约网点:
        <select v-model="form.etc_yywd" :class="form.etc_yywd?'':'hui'">
          <option value="">请选择预约网点</option>
          <option v-for="(item, index) in yywdList" :value="item" :key="index">{{item}}</option>
        </select>
      </div>
      <div class="btn" @click="submit">立即申请</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      form: {
        etc_name: '',
        etc_mobile: '',
        etc_yywd: ''
      },
      yywdList: [
        '总行营业部',
        '陶堰支行',
        '孙端支行',
        '齐贤支行',
        '安昌支行',
        '钱清支行',
        '杨汛桥支行',
        '夏履支行',
        '柯桥支行',
        '华舍支行',
        '漓渚支行',
        '福全支行',
        '兰亭支行',
        '平水支行',
        '王坛支行',
        '滨海支行',
        '马鞍支行',
        '越州支行',
        '新城支行',
        '城南支行',
        '轻纺城支行',
        '柯岩支行',
        '湖塘支行',
        '富盛支行',
        '柯北支行',
        '义乌支行'
      ]
    }
  },
  methods: {
    async load () {
      let rs = await this.$get('/borf/get/etc')
      if (rs.status == 200) {
        this.form.etc_name = rs.payload.etcName
        this.form.etc_mobile = rs.payload.etcMobile
        this.form.etc_yywd = rs.payload.etcYywd
      }
    },
    async submit () {
      if (!this.form.etc_name) {
        Toast('请输入姓名');
        return;
      } else if (!(/^\D+$/.test(this.form.etc_name))) {
        Toast('姓名中不能出现数字');
        return;
      }
      if (!this.form.etc_mobile) {
        Toast('请输入手机号码');
        return;
      } else {
        let phoneReg = /^1[3456789]\d{9}$/;
        if (!phoneReg.test(this.form.etc_mobile)) {
          Toast('请输入正确的手机号码');
          return;
        }
      }
      if (!this.form.etc_yywd) {
        Toast('请选择预约网点');
        return;
      }
      let rs = await this.$post('/borf/etcSave', this.form)
      if (rs.status == 200) {
        Toast('提交成功！');
      }
    }
  },
  created () {
    this.load()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 12.06rem;
    background: url("./imgs/ETC_bg.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .form {
    margin: 3.8rem auto 0 auto;
    background: white;
    box-shadow: 0.05rem 0.05rem 0.3rem rgba(150,150,150,0.5);
    border-radius: 0.3rem;
    padding: 0.52rem 0;
    width: 6.5rem;
  }

  .form-item {
    width: 5.5rem;
    margin: 0 auto;
    text-align: right;
    font-size: 0.3rem;
    color: #333333;
    margin-bottom: 0.3rem;
    input {
      background: white;
      margin-left: 0.1rem;
      width: 3.9rem;
      height: 0.7rem;
      padding: 0.2rem;
      font-size: 0.26rem;
      border: 0.01rem #cccccc solid;
      border-radius: 0.05rem;
    }
    select {
      background: white;
      margin-left: 0.1rem;
      width: 3.9rem;
      height: 0.7rem;
      padding-left: 0.11rem;
      font-size: 0.26rem;
      border: 0.01rem #cccccc solid;
      border-radius: 0.05rem;
    }
  }

  .btn {
    margin: 0.5rem auto 0 auto;
    text-align: center;
    width: 5.6rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.36rem;
    color: white;
    background: #44a1c4;
    border-radius: 0.4rem;
  }

  .hui {
    color: #999999;
  }
</style>
