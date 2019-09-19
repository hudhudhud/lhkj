<style>
/* 二手房 */
.form {
  position: absolute;
  top: 0.8rem;
  left: 0;
  right: 0;
  padding-top: 0.2rem;
  bottom: 0;
  background: url(//static.lianhaikeji.com/images/20190522/6d36ec83ffce4c089dae2580975d2706.png)
    no-repeat;
  background-size: cover;
}
.sub-btn {
  width: 4.18rem;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  color: #fff;
  background: url(./sub.png) no-repeat;
  background-size: 100% 100%;
  margin: 0.5rem auto;
}
</style>
<template>
  <div style="background:#fff;">
    <Header :title="title" :headerStyle="formDef.headerStyle" :iconStyle="formDef.iconStyle"></Header>

    <div
      v-if="formDef"
      :style="formDef.cssStyle"
    >
      <!-- <back></back> -->
      <!-- form:{{formId}}:style="formDef.cssStyle" -->
      <!-- url:{{callbackUrl}} -->

      <div
        v-if="formDef.headHtm"
        v-html="formDef.headHtm"
      >
        <!--  <img
        class="title"
        src="//static.lianhaikeji.com/images/20190522/330b21c1f40441d986252cd5c80277bb.png"
        alt=""
      >
      <span>点击查看</span> -->
      </div>
      <div>
        <component
          :is="item.formItemType"
          v-for="item in formDef.items"
          :key="item.id"
          v-model="formData[item.dataKey]"
          :item="item"
          :style="item.formItemType=='FormCode'?'':item.cssStyle"
        ></component>
      </div>

      <div v-if="formDef.bottomHtm" class="rules">
        <input v-if="formDef.agreementStatus" type="checkbox" v-model="agreementStatus">
        <div v-html="formDef.bottomHtm"></div>
      </div>
      <div
        v-if="canResubmit"
        @click="onSubmit"
        :style="formDef.submitBtnStyle"
      >
        {{formDef.submitBtnTxt?formDef.submitBtnTxt:'点击申请'}}
      </div>
      <!-- 球童需要一直显示按钮，只是点击的时候提示下 -->
     <div
        v-if="formDef.id==100"
        @click="onSubmit"
        :style="formDef.submitBtnStyle"
      >
        {{formDef.submitBtnTxt?formDef.submitBtnTxt:'点击申请'}}
      </div>
    </div>
    <div class="Dialog" v-if="dialogStatus">
      <div class="dialog">
        <div class="title">资料提交成功</div>
        <div class="diaContent">客服会在<span>3个工作日</span>内联系你</div>
        <div class="btn" @click="dialogStatus = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import components from "../components/";
//import config from "./config.json";
//import dataRes from "./data.json";    //办卡登记 id=17
//import dataRes from "./jiazhuangfq.json";   //家装分期额度测评 id=12
//import dataRes from "./maifangfq.json";   //买房分期 id=13
//import dataRes from "./jiazhuangfq2.json";   //家装分期 id=14
//import dataRes from "./qichefq.json";   //汽车分期 id=15
//import dataRes from "./zizhuceping.json";   //自助测评 id=19
//import dataRes from "./woyaobanka.json";   //我要办卡 id=20
//import dataRes from "./datajson/newJiazhuangfq2.json";   //家装分期 id=14
//import dataRes from "./datajson/newQichefq.json";   //汽车分期 id=15
//import dataRes from "./datajson/woyaomaifang.json";   //我要买房 id=21
//import dataRes from "./datajson/jiazhuangbaoming.json";   //家装报名 id=30
//import dataRes from "./datajson/jianhangqiutong.json";   //建行球童报名 id=100

import { getFormDetail, loadFormInfo, searchFormData } from "@/utils";
import Header from "@/views/header";
export default {
  components: {
    ...components,
    Header
  },
  name: "index",
  data() {
    return {
      age:'',
      formDef: {},
      formId: this.$route.params.formId,
      formDetail: null,
      canResubmit: true,
      formData: {
        formId: this.$route.params.formId
      },
      formDataMatch: [
        {
          verifyRegex: null,  //表单正则
          necessary: true,
          label: "当前表单id"
        }
      ],
      //config: config.payload,
      title: null,  //头标题
      agreementStatus: false, //是否选择协议
      dialogStatus: false,
      actId:'',
      domain:process.env.VUE_APP_CURRENTMODE == 'test'?
      'http://hemitest.lianhaikeji.com':
        process.env.NODE_ENV == 'development'
          ? 'http://hemitest.lianhaikeji.com'
          : 'https://hemi.lianhaikeji.com',
    };
  },
  methods: {
    async loadFormInfo() {
      //加载表单配置,表单项配置
      //根据表单项生成formData
      loadFormInfo(this.formId, rs => {
        let result=rs
        this.formDef = result.payload;
        // if(this.formId==100){
        //   result=dataRes
        //   this.formDef = dataRes.payload;
        // }
        this.title = this.formDef.title;
        result.payload.items.forEach(element => {
          if (this.formDetail) {
            this.$set(
              this.formData,
              element.dataKey,
              this.formDetail[element.dataKey]
            );
          } else {
            this.$set(this.formData, element.dataKey, "");
          }
          this.formDataMatch.push({
            verifyRegex: element.verifyRegex,
            necessary: element.necessary,
            label: element.label
          });
        });
      });
    },

    async onSubmit() {
      //根据表单项配置做校验
      let formData = this.formData;
      let formDataMatch = this.formDataMatch;
      let isValid = true;
      let idx = -1;
      console.log(formData);
      
      for (var i in formData) {
        idx++;
        /* debugger; */
        if (formData[i] && i!='code' && i!='customId') {
          if (formDataMatch[idx].verifyRegex) {
            let re = new RegExp(formDataMatch[idx].verifyRegex);
            if(!re.test(formData[i])){
              this.$toast(formDataMatch[idx].label + '输入格式错误');
              isValid = false;
              break;
            }
          }
        } else {
          if(formDataMatch[idx]){
            if (formDataMatch[idx].necessary) {
              console.log(idx);
              this.$toast("请输入" + formDataMatch[idx].label);
              isValid = false;
              break;
            }
          }
        }
      }
      if (!isValid) {
        return;
      }
      if(!this.agreementStatus && this.formDef.agreementStatus){
        this.$toast('请勾选协议');
        return;
      }
      let customId = this.$store.state.customId;
      this.$set(this.formData, "customId", this.$store.state.customId);
      if(this.$store.state.code){
        this.$set(this.formData, "code", this.$store.state.code);
      }
      let rs = await this.$post("/formData", this.formData);
      if (rs.status === 200) {
        this.$store.state.code = null;
        if(this.formId!=100){
          this.$toast('提交成功');
        }
        if(this.formId == 17){
          let formId = rs.payload.dataId;
          this.$router.push(
            `/${customId}/${this.$route.query.cb}?formId=${formId}`
          );
        }
        else if(this.formId==100){
          if(rs.payload.status){
            this.$toast('提交成功!');
            window.location.href=`${this.domain}/${this.merchantId}/merchant/jhqt/index/0?formId=${this.formId}&actId=${this.actId}`
          }
          else{
              this.$toast('您已报名，页面跳转中...')
              setTimeout(() => {
                window.location.href=`${this.domain}/${this.merchantId}/merchant/jhqt/index/0?formId=${this.formId}&actId=${this.actId}`
              }, 2000);
          }
        }
        else{
          this.dialogStatus = true;
        }
      } else {
        this.$toast(rs.error);
      }
    }
  },
  watch: {
    formDef(val) {
      if(this.formId == 17 || this.formId == 100){
        //设置默认值
        if(this.formId==100){
          this.$set(this.formData,'data19','white,S');
        }
        if (!val.canResubmit) {
          searchFormData(this.formId, this.$route.params.customId, rs => {//查询该表单所有提交数据
            if (rs.payload.length) {
              window.localStorage.removeItem('form_'+this.formDef.id)
              getFormDetail(rs.payload[rs.payload.length-1].id, rs => { //获取最新一条数据明细
                this.formDetail = rs.payload;
                this.canResubmit = val.canResubmit;
                this.formDef.items.forEach(element => {
                  if (this.formDetail) {
                    this.$set(
                      this.formData,
                      element.dataKey,
                      this.formDetail[element.dataKey]
                    );
                  }
                });
                //设置默认值
                if(this.formId==100&&!this.formData['data19']){
                  this.$set(this.formData,'data19','white,S');
                }
              });
            }
            else if(this.formDef.canStorage){
              let item=JSON.parse(window.localStorage.getItem('form_'+this.formDef.id))
              if(item){
                this.formData =item
                //设置默认值
                if(this.formId==100&&!this.formData['data19']){
                  this.$set(this.formData,'data19','white,S');
                }
              }
            }
          });
        }
      }
    }
  },
  async created() {
    this.loadFormInfo();
    this.actId=this.$route.query.actId?this.$route.query.actId:''
    this.merchantId=this.$route.query.merchantId?this.$route.query.merchantId:''
  },
  mounted() {},
  beforeDestroy(){
    if(this.formDef.canStorage){
      window.localStorage.setItem('form_'+this.formDef.id,JSON.stringify(this.formData))
    }
  },
};
</script>

<style lang="scss" scoped>
.rules {
  display: flex;
  input {
    width: 0.28rem;
    height: 0.28rem;
    margin-top: 0.06rem;
    margin-right: 0.1rem;
  }
}
.Dialog{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
  .dialog{
    width: 5.88rem;
    height: 4.59rem;
    background: url('../assets/dialog.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -2.3rem -2.94rem;
    .title{
      font-size: 0.45rem;
      color: #ffffff;
      text-align: center;
      line-height: 0.45rem;
      padding-top: 0.6rem;
    }
    .diaContent{
      text-align: center;
      font-size: 0.36rem;
      color: #000;
      line-height: 0.36rem;
      margin: 1.1rem 0;
      padding: 0 0.1rem;
      span{
        color: #ff0000;
      }
    }
    .btn{
      width: 5.86rem;
      height: 1.1rem;
      background: url('../assets/dialogBtn.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.3rem;
    }
  }
}
</style>
