<template>
  <div class="buyORrenthouse">
    <Header title="买房租房" headerStyle="background:rgb(26, 161, 230);color:#fff;font-weight: normal;" iconStyle="background: url(//static.lianhaikeji.com/images/20190529/40ddf5180fd74c04aa53b3378b92ea8f.png) no-repeat;background-size:100% 100%;width:.4rem;height:.4rem;"></Header>
    <div class="banner"><img src="//static.lianhaikeji.com/images/20190624/27e4c01d188f4b5abb143f2184bf53af.png" alt=""></div>
    <div class="tab">
      <div :class="{'active':tabPage==1}" @click="tabPage=1">我想买房</div>
      <div :class="{'active':tabPage==2}" @click="tabPage=2">我想租房</div>
    </div>
    <div class="tab1" v-if="tabPage==1">
      <div class="Tabform">
        <dl style='margin-bottom: 0.2rem;'>
          <dt style='font-size: 0.34rem;color: #222;margin-bottom: 0.14rem;line-height: 0.36rem;'>房贷计算器</dt>
          <dd style='color: #999;font-size: 0.26rem;line-height: 0.28rem;'>请填写完整信息，以保证结果的准确性</dd>
        </dl>
        <div class="input">
          <label for="input1">拟购买房产坐落</label>
          <input id="input1" v-model="formdata1.data1" type="text" class="placeholder999" placeholder="请输入购买房产坐落">
        </div>
        <div class="input">
          <label for="input2"><img src="//static.lianhaikeji.com/images/20190624/610b4f745afa4a3e81543f5363c56e51.png" alt="">房屋总价</label>
          <input id="input2" v-model="formdata1.data2" type="tel" maxlength="10" min="0" class="placeholder999" placeholder="请输入房屋总价">
          <span>(单位：万元)</span>
        </div>
        <div class="input">
          <label for="input3"><img src="//static.lianhaikeji.com/images/20190624/610b4f745afa4a3e81543f5363c56e51.png" alt="">拟贷款金额</label>
          <input id="input3" v-model="formdata1.data3" type="tel" maxlength="10" class="placeholder999" placeholder="请输入拟贷款金额">
          <span>(单位：万元)</span>
        </div>
        <div class="input">
          <label for="input4"><img src="//static.lianhaikeji.com/images/20190624/610b4f745afa4a3e81543f5363c56e51.png" alt="">拟贷款期限</label>
          <input id="input4" v-model="formdata1.data4" type="tel" maxlength="2" class="placeholder999" placeholder="请输入拟贷款期限">
          <span>(单位：年)</span>
        </div>
        <div class="input">
          <label for="input5"><img src="//static.lianhaikeji.com/images/20190624/610b4f745afa4a3e81543f5363c56e51.png" alt="">家庭月收入</label>
          <input id="input5" v-model="formdata1.data5" type="tel" maxlength="10" class="placeholder999" placeholder="请输入家庭月收入">
          <span>(单位：元)</span>
        </div>
        <div class="btn" @click="calculation">贷款计算</div>
      </div>
      
      <div class="result" v-if="resultStatus">
        <h2>贷款估算结果</h2>
        <div class="resultContent">
          <p>预计您的房贷最高可贷<span>{{mostloan}}</span>万元</p>
          <div class="tag">(本结果仅供参考，最终您的可贷款金额需与我行工作人员面谈面签后确定。)</div>
          <div class="btn" @click="popupVisible=true">联系工作人员</div>
        </div>
      </div>
    </div>
    <div class="tab2" v-if="tabPage==2">
      <dl style='margin-bottom: 0.4rem;'>
        <dt style='font-size: 0.34rem;color: #222;margin-bottom: 0.14rem;line-height: 0.36rem;'>租房需求填写</dt>
        <dd style='color: #999;font-size: 0.26rem;line-height: 0.28rem;'>请填写完整信息，以保证结果的准确性</dd>
      </dl>
      <div class="radio">
        <p>1.您想在苏州哪个区域租住</p>
        <ul>
          <li @click="formdata2.data1 = item" style="width:25%;" v-for="(item,index) in form2Info.items[0].options" :key="index">
            <span :class="{'active':formdata2.data1 == item}"></span>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="radio">
        <p>2.您的年龄是</p>
        <ul>
          <li @click="formdata2.data2 = item" v-for="(item,index) in form2Info.items[1].options" :key="index">
            <span :class="{'active':formdata2.data2 == item}"></span>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="input">
        <p>3.您的联系方式</p>
        <input type="text" v-model="formdata2.data3" placeholder="请输入您的联系方式" class="placeholder999">
      </div>
      <div class="radio">
        <p>4.您可以承受人均月租金最高价位大致在哪个范围?</p>
        <ul>
          <li @click="formdata2.data4 = item" v-for="(item,index) in form2Info.items[3].options" :key="index">
            <span :class="{'active':formdata2.data4 == item}"></span>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="radio">
        <p>5.您更倾向于个人独租还是与人合租</p>
        <ul>
          <li @click="formdata2.data5 = item" v-for="(item,index) in form2Info.items[4].options" :key="index">
            <span :class="{'active':formdata2.data5 == item}"></span>
             {{item}}
          </li>
        </ul>
      </div>
      <div class="radio">
        <p>6.您是否愿意租住专业化管理的品牌公寓(租金略高于市场普通公寓)</p>
        <ul>
          <li @click="formdata2.data6 = item" v-for="(item,index) in form2Info.items[5].options" :key="index">
            <span :class="{'active':formdata2.data6 == item}"></span>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="sort">
        <p>7.请将下列影响房屋的因素按顺序进行排列(如有其他因素请具体补充到G项)</p>
        <ul>
          <li style="width:100%;" v-for="(item,index) in form2Info.items[6].options" :key="index">
            {{item}}<input style="width:4.27rem;margin-left: 0.3rem;margin-bottom: 0;" v-if="index==6" type="text" class="placeholder999" placeholder="请输入其他原因">
          </li>
        </ul>
        <input type="text" v-model="formdata2.data7" class="placeholder999" placeholder="请输入排序">
      </div>
      <div class="radio">
        <p>8.您愿意签订固定租金的长期(3年以上)租赁合同吗</p>
        <ul>
          <li @click="formdata2.data8 = item" v-for="(item,index) in form2Info.items[7].options" :key="index">
            <span :class="{'active':formdata2.data8 == item}"></span>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="btn" @click="submit2">提交需求</div>
    </div>
    <mt-popup class="sharePopup" v-model="popupVisible" position="center">
      <div class="contact">
        <h2>请输入联系方式</h2>
        <div class="input">
          <label for="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
          <input id="name" v-model="formdata1.data6" type="text" class="placeholder999" placeholder="请输入姓名">
        </div>
        <div class="input">
          <label for="tel">联系电话</label>
          <input id="tel" v-model="formdata1.data7" type="tel" class="placeholder999" placeholder="请输入联系电话">
        </div>
        <div class="tag">(我行工作人员会在工作时间与您联系，请保持电话畅通。)</div>
        <div class="btn" @click="submit1"></div>
        <div class="close" @click="popupVisible=false"></div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Header from "@/views/header";
//import { loadFormInfo } from "@/utils";
//import dataRes from "./json/woyaomaifang.json";   //我要买房 id=21
import dataRes from "./json/woyaozufang.json";   //我要租房 id=22
  export default {
    name:'buyORrenthouse',
    data () {
      return {
        tabPage: 1,
        popupVisible: false,  //填写联系方式弹框显隐
        mostloan: null, //最高可贷款金额
        resultStatus: false,  //贷款金额结果显隐
        formdata1: {
          formId: 21,
          data1: '',
          data2: '',
          data3: '',
          data4: '',
          data5: '',
          data6: '',
          data7: '',
          customId: this.$store.state.customId
        },
        form2Info: {
          items: []
        },
        formdata2: {
          data1: '',
          data2: '',
          data3: '',
          data4: '',
          data5: '',
          data6: '',
          data7: '',
          data8: '',
          customId: this.$store.state.customId,
          formId: 22
        },
      };
    },
    components: {
        Header
    },
    created() {
      //this.loadFormInfo(22)
      console.log(this.$store.state.customId);
      
    },
    methods: {
      /* async loadFormInfo(id) {
        //加载表单配置,表单项配置
        //根据表单项生成formData
        loadFormInfo(id, () => {
          //this.form2Info = rs.payload;
          this.form2Info = dataRes.payload;
        });
      }, */
      calculation(){
        if(this.formdata1.data2==''){
          this.$toast('请输入房屋总价')
        } else if(this.formdata1.data3==''){
          this.$toast('请输入拟贷款金额')
        } else if(this.formdata1.data4==''){
          this.$toast('请输入拟贷款期限')
        } else if(this.formdata1.data5==''){
          this.$toast('请输入家庭月收入')
        } else{
          this.mostloan = this.formdata1.data2*0.7 > this.formdata1.data3 ? this.formdata1.data3 : (this.formdata1.data2 * 0.7).toFixed(2);
          this.resultStatus = true;
          this.$nextTick(()=>{
            window.scrollTo(0, document.documentElement.clientHeight);
          })
        }
      },
      async submit1(){
        if(this.formdata1.data6==''){
          this.$toast('请输入姓名')
        } else if(this.formdata1.data7==''){
          this.$toast('请输入联系电话')
        } else if(!(/^1[3456789]\d{9}$/.test(this.formdata1.data7))){
          this.$toast('联系电话格式有误')
        } else{
          let rs = await this.$post("/formData", this.formdata1);
          if (rs.status === 200) {
            this.$toast('提交成功');
          } else {
            this.$toast(rs.error);
          }
        }
      },
      async submit2(){
        for(let i in this.formdata2){
          console.log(i);
          if(this.formdata2[i]==''){
            this.$toast('表格请填写完整')
            return
          }
        }
        if(!(/^1[3456789]\d{9}$/.test(this.formdata2.data3))){
          this.$toast('联系方式格式有误')
        } else{
          let rs = await this.$post("/formData", this.formdata2);
          if (rs.status === 200) {
            this.$toast('提交成功');
          } else {
            this.$toast(rs.error);
          }
        }
      }
    },
    mounted() {
      this.form2Info = dataRes.payload;
    }
  }

</script>
<style lang="css">
.mint-toast{
  z-index: 3000;
}
</style>
<style lang='scss' scoped>
.buyORrenthouse{
  padding-top: 0.8rem;
  position: relative;
  background: #ffffff;
  .banner{
    img{
      width: 100%;
      display: block;
    }
  }
  .tab{
    width: 100%;
    height: 1rem;
    background: #ffffff;
    border-bottom: 0.1rem solid #eee;
    div{
      width: 50%;
      height: 1rem;
      float: left;
      text-align: center;
      text-align: center;
      line-height: 1rem;
      font-size: 0.28rem;
      color: #999;
      &.active{
        color: #00a0e9;
        position: relative;
      }
      &.active:after{
        content: ' ';
        position: absolute;
        z-index: 2;
        bottom: 0.09rem;
        left: 0;
        right: 0;
        width: 1.8rem;
        margin: 0 auto;
        border-bottom: 0.04rem solid #00a0e9;
      }
    }
  }
  .tab1{
    .Tabform{
      padding: 0.36rem 0.25rem;
    }
    .input{
      width: 100%;
      height: 1.1rem;
      border-bottom: 1px solid #f1f1f1;
      line-height: 1.1rem;
      position: relative;
      label{
        font-size: 0.28rem;
        color: #000;
        width: 2.35rem;
        text-align: right;
        height: 1.1rem;
        margin-right: 0.58rem;
        display: inline-block;
        img{
          width: 0.15rem;
          height: 0.14rem;
          vertical-align:6%;
          margin-right: 0.1rem;
        }
      }
      input{
        font-size: 0.26rem;
        width: 4rem;
        line-height: 0.4rem;
        color: #333333;
      }
      span{
        position: absolute;
        font-size: 0.28rem;
        line-height: 1.1rem;
        right: 0;
        display: block;
        width: 1.7rem;
        height: 1.1rem;
        top: 0;
      }
    }
    .btn{
      width: 6rem;
      height: 0.9rem;
      font-size: 0.32rem;
      line-height: 0.9rem;
      text-align: center;
      color: #ffffff;
      background: #00a0e9;
      border-radius: 0.5rem;
      margin: 0.3rem auto 0;
    }
    .result{
      width: 100%;
      height: 6rem;
      border-top: 0.1rem solid #eee;
      padding: 0.4rem 0.25rem 0;
      h2{
        font-weight: normal;
        font-size: 0.34rem;
        color: #222;
        margin-bottom: 0.3rem;
      }
      .resultContent{
        width: 6.32rem;
        //height: 4rem;
        background: #ededed;
        border-radius: 0.1rem;
        margin: 0 auto;
        padding: 0.65rem 0.35rem 0;
        text-align: center;
        padding-bottom: 0.3rem;
        p{
          font-size: 0.34rem;
          line-height: 0.5rem;
          color: #222;
          font-weight: 700;
          margin-bottom: 0.15rem;
          span{
            color: #f90000;
            font-size: 0.64rem;
          }
        }
        .tag{
          font-size: 0.26rem;
          color: #666;
          line-height: 0.42rem;
        }
        .btn{
          font-size: 0.34rem;
          width: 4rem;
          height: 0.8rem;
          color: #ffffff;
          line-height: 0.8rem;
          background: #ff8528;
          border-radius: 0.5rem;
        }
      }
    }
  }
  .tab2{
    padding: 0.36rem 0.25rem;
    .radio,
    .input,
    .sort{
      width: 100%;
      overflow: hidden;
      margin-bottom: 0.18rem;
      p{
        font-size: 0.26rem;
        color: #333;
        line-height: 0.42rem;
        margin-bottom: 0.32rem;
        font-weight: 600;
      }
    }
    .radio,
    .sort{
      ul{
        padding: 0;
        li{
          padding-left: 0.55rem;
          float: left;
          font-size: 0.3rem;
          line-height: 0.4rem;
          color: #333;
          width: 50%;
          margin-bottom: 0.38rem;
          position: relative;
          span{
            width: 0.36rem;
            height: 0.37rem;
            position: absolute;
            background: url('./imgs/check.png') no-repeat;
            background-size: 100% 100%;
            top: 0.015rem;
            left: 0;
            &.active{
              background: url('./imgs/checked.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .input{
      p{
        float: left;
        line-height: 0.7rem;
      }
      input{
        width: 4.27rem;
        height: 0.7rem;
        font-size: 0.26rem;
        background: #f7faff;
        padding-left: 0.23rem;
        margin-left: 0.25rem;
        border-radius: 0.1rem;
      }
    }
    .sort{
      ul{
        li{
          padding: 0;
        }
      }
      input{
        width: 5.27rem;
        height: 0.7rem;
        font-size: 0.26rem;
        background: #f7faff;
        padding-left: 0.23rem;
        border-radius: 0.1rem;
        margin-bottom: 0.38rem;
      }
    }
    .btn{
      width: 6rem;
      height: 0.9rem;
      font-size: 0.32rem;
      line-height: 0.9rem;
      text-align: center;
      color: #ffffff;
      background: #00a0e9;
      border-radius: 0.5rem;
      margin: 0.3rem auto 0;
    }
  }
  .contact{
    width: 5.88rem;
    height: 6.89rem;
    background: url('./imgs/dialogBg.png') no-repeat;
    background-size: 100% 100%;
    background-color: none;
    padding-top: 0.6rem;
    position: relative;
    h2{
      font-size: 0.45rem;
      text-align: center;
      line-height: 0.45rem;
      color: #ffffff;
      margin-bottom: 0.7rem;
    }
    .input{
      width: 5rem;
      height: 1.1rem;
      border-bottom: 1px solid #f1f1f1;
      line-height: 1.1rem;
      position: relative;
      margin: 0 auto;
      label{
        font-size: 0.32rem;
        color: #333;
        width: 1.97rem;
        text-align: right;
        height: 1.1rem;
        text-align:justify;
        display: inline-block;
      }
      input{
        font-size: 0.3rem;
        width: 2.7rem;
        line-height: 0.4rem;
        color: #333333;
      }
    }
    .tag{
      width: 4.6rem;
      margin: 0 auto;
      font-size: 0.26rem;
      line-height: 0.52rem;
      color: #999;
      text-align: center;
      margin-top: 0.1rem;
    }
    .btn{
      width: 3.43rem;
      height: 0.78rem;
      background: url('./imgs/btn.png') no-repeat;
      background-size: 100% 100%;
      margin: 0.5rem auto 0;
    }
    .close{
      width: 0.52rem;
      height: 0.52rem;
      background: url('./imgs/close.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -0.8rem;
      right: 0;
    }
  }
  .mint-popup-center{
    background: none;
  }
}
</style>