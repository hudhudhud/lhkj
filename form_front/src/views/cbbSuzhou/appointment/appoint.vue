<template>
  <div class="appoint">
    <Header :title="title[page]" headerStyle="background:rgb(26, 161, 230);color:#fff;font-weight: normal;" iconStyle="background: url(//static.lianhaikeji.com/images/20190529/40ddf5180fd74c04aa53b3378b92ea8f.png) no-repeat;background-size:100% 100%;width:.4rem;height:.4rem;"></Header>
    <div class="choseArea" v-if="page==0">
      <div class="area">
        <div class="currentArea">{{area}} <img src="./imgs/down.png" alt=""> </div>
        <div class="arealist" v-if="arealistStatus">
          <div class="arealist-item" :class="{activity:choseArea==index}" @click="choiceArea(index)" v-for="(item,index) in arealist" :key="item">
            <img v-if="choseArea == index" src="./imgs/local2.png" alt="">
            {{item}}
          </div>
        </div>
      </div>
      <div class="areaPopup" @click="arealistStatus = !arealistStatus" v-if="arealistStatus"></div>
      <div class="list" v-if="banklist">
        <div class="list-item" v-for="(item,index) in banklist" :key="'banklist' + index">
          <div class="list-item-top">
            {{item.bankName}}
            <span v-if="item.parentId==1">已有预约</span>
          </div>
          <!-- <div class="list-item-content" v-for="(item,index) in timelist" :key="'timelist' + index"> -->
          <div class="list-item-content">
            <p>地址：<span>{{item.address.split('/')[0]}}</span></p>
            <p>办理时间：<span>{{item.address.split('/')[1]}}</span></p>
            <div class="btn" @click="goAppoint(item)">预约</div>
          </div>
        </div>
      </div>
      <mt-popup
        style="background:none;"
        v-model="haveAppoint"
        position="center">
          <div class="tips">
            <img src="./imgs/fail.png" alt="">
            <dl>
              <dt>
                <img src="./imgs/tag.png" alt="">
              </dt>
              <dd>请先取消当前预约，再预约下一次</dd>
            </dl>
            <div class="btn" @click="$router.push(`/${formData.customId}/cbbSuzhou/appointRecord?formId=${formData.formId}`)">查看我的预约</div>
            <div class="close" @click="haveAppoint=false"></div>
          </div>
      </mt-popup>
    </div>
    <div class="appointContent" v-if="page==1">
      <div class="item right" @click="choseType('date')">
        <label for="">预约日期</label>
        <input v-model="formData.data3" type="text" disabled placeholder="请选择日期">
      </div>
      <div class="item right" @click="choseType('time')">
        <label for="">预约时间</label>
        <input v-model="formData.data4" type="text" disabled placeholder="请选择时间">
      </div>
      <div class="item">
        <label for="">产证编号</label>
        <input v-model="formData.data5" type="text" placeholder="请输入产证编号">
      </div>
      <div class="item">
        <label for="">联系人</label>
        <input v-model="formData.data6" type="text" placeholder="请输入预约人姓名">
      </div>
      <div class="item">
        <label for="">联系电话</label>
        <input v-model="formData.data7" type="text" placeholder="请输入预约人联系方式">
      </div>
      <div class="btn" @click="appoint">预约</div>
      <mt-popup
        style="background:#fff;"
        v-model="choseAppoint"
        position="right">
          <div class="choseAppoint">
            <div class="date" v-if="choseAppointType=='date'">
              <div class="date-item" :class="{disable:item.holiday}" v-for="(item,index) in datelist" :key="'datelist'+index">
                {{item.orderday}}<span @click="choseDate('date',item)">预约</span>
              </div>
            </div>
            <div class="time" v-if="choseAppointType=='time'">
              <div class="time-item" :class="{fullorder:item.orderFull=='true'}" v-for="(item,index) in timelist" :key="'timelist' + index">
                {{item.tb}}<span @click="choseDate('time',item)">{{item.orderFull=='true'?'已约满':'预约'}}</span>
              </div>
            </div>
          </div>
      </mt-popup>
      <mt-popup
        style="background:none;"
        v-model="successAppoint"
        :closeOnClickModal="popupOnClickModal"
        position="center">
          <div class="successAppoint" v-if="successAppointData">
            <div class="title">
              <h2><img src="./imgs/success.png" alt="">恭喜您，预约成功！</h2>
              <dl>
                <dt>您的预约编号为{{successAppointData.id}}</dt>
                <dd>(请您在预约时间到达，过号请重新预约)</dd>
              </dl>
            </div>
            <div class="successContent">
              <h2>预约详情</h2>
              <p>预约网点：<span>{{successAppointData.data9}}</span></p>
              <p>网点地址：<span>{{successAppointData.data10}}</span><a :href="'http://api.map.baidu.com/geocoder?address='+successAppointData.data10+'&output=html&src=webapp.baidu.openAPIdemo'"><img src="./imgs/local1.png" alt="">点击导航</a></p>
              <p>预约日期：<span>{{successAppointData.data3}}</span></p>
              <p>预约时段：<span>{{successAppointData.data4}}</span></p>
            </div>
            <div class="goback" @click="goback()">返回主页</div>
          </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import Header from "@/views/header";
  export default {
    name:'appoint',
    data () {
      return {
          title: ['选择网点','预约','选择预约日期','选择预约时间'],
          page: 0,
          area: '全部区域',//当前选择区域
          arealistStatus: false,//选择区域是否显示
          arealist: ['全部区域','吴中市','相城区','姑苏区','工业园区','高新区','吴江区','张家港区','常熟市','太仓市','昆山市'],
          banklist: null,
          choseArea: 0,//选择区域
          haveAppoint: false,//是否已预约弹窗
          haveAppointStatus: false,//是否有已预约的
          formData: {
            formId: this.$route.query.formId,
            customId: this.$route.params.customId,
            data1: this.$route.query.formId,
            data2: null,
            data3: null,
            data4: null,
            data5: null,
            data6: null,
            data7: null,
            data9: null,
            data10: null,
            data32: null
          },//表单数据
          choseAppoint: false,//选择时间段
          choseAppointType: 'null',//选择类型
          datelist: null,
          timelist: null,
          successAppoint: false,//预约成功弹窗
          successAppointData: null,//预约成功信息
          popupOnClickModal: false,//弹窗点击阴影不关闭
          domain:
            process.env.PUBLISH_ENV == 'production'
              ? 'https://hemi.lianhaikeji.com/8b53bbcb7b36483eb057de927b84edb4'
              : 'http://hemitest.lianhaikeji.com/106f4a50063247f58d221abff52a7b84',
      };
    },
    components: {
        Header
    },
    methods: {
      goback(){
        window.location.href = `${this.domain}/merchant/cbbsuzhou/appointmentSecondHouse?formId=${this.formData.formId}`
      },
      choiceArea(index){
        this.choseArea=index;
        this.arealistStatus = false;
        this.area = this.arealist[index]
      },
      async getBankResources(){
        let rs = await this.$get('/forms/bankResources/CCB/region?bankType=CCB&city=苏州市69&formId='+ this.$route.query.formId +'&customId='+this.$route.params.customId);
        if(rs.status==200) {
          this.banklist = rs.payload;
          console.log(this.banklist);
          for(let i=0;i<rs.payload.length;i++){
            if(rs.payload[i].parentId == 1){
              this.haveAppointStatus = true
            }
          }
        } else {
          this.$toast(rs.error)
        }
      },
      goAppoint(item){
        if(this.haveAppointStatus){
          this.haveAppoint = true
        }else{
          this.formData.data2 = item.id;
          this.formData.data9 = item.bankName;
          this.formData.data10 = item.address.split('/')[0];
          this.formData.data32 = item.telephoneNumber;
          this.$get('/formResources/key/'+ this.formData.formId +'/'+ this.formData.data2 +'/orderDays').then(res=>{
            if(res.status==200){
              this.page = 1;
              this.datelist = res.payload;
            }else{
              this.$toast(res.error)
            }
          })
        }
      },
      choseType(type){
        if(type == 'time' && !this.formData.data3){
          this.$toast('请先选择日期')
        }else{
          this.choseAppoint = true;
          this.choseAppointType = type;
        }
      },
      choseDate(type,item){
        console.log(type);
        console.log(item);
        
        if(type=='date'){
          if(item.holiday){
            this.$toast('节假日不可选择')
            return
          }
          this.formData.data3 = item.orderday;
          this.$get('/formResources/key/'+ this.formData.formId +'/'+ this.formData.data2 +'/timeBucket?extendParam=' + this.formData.data3).then(res=>{
            if(res.status==200){
              this.choseAppoint = false;
              this.page = 1;
              this.timelist = res.payload;
            }else{
              this.$toast(res.error)
            }
          })
        } else if(type=='time'){
          if(item.orderFull=="true"){
            this.$toast('此时段已约满，请选择其他时段')
          } else {
            this.choseAppoint = false;
            this.formData.data4 = item.tb;
          }
        }
      },
      appoint(){//预约
        for(let key in this.formData){
          if(this.formData[key] == null || this.formData[key] == ''){
            this.$toast('请填写完整信息')
            return
          }
        }
        if(!(/^1[3456789]\d{9}$/.test(this.formData.data7))){ 
          this.$toast("手机号码有误，请重填");  
          return false; 
        } 
        this.$post('/formData',this.formData).then(res=>{
          if(res.status==200){
            if(res.payload.status){
              this.successAppointData = res.payload;
              this.successAppoint = true;
            }else{
              this.$toast(res.payload.msg)
            }
          }else{
            this.$toast(res.error)
          }
        })
      }
    },
    mounted() {
      this.getBankResources();
    }
  }

</script>
<style lang='scss' scoped>
.appoint{
  background: #ffffff;
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #999;
  }
  .choseArea{
    position: absolute;
    top: 0.8rem;
    bottom: 0;
    left: 0;
    right: 0;
    .areaPopup{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      position: absolute;
      top: 0;
    }
    .area{
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 99;
      background: #ffffff;
      .currentArea{
        width: 100%;
        height: 0.9rem;
        font-size: 0.32rem;
        color: #333;
        text-align: center;
        border-bottom: 1px solid #ececec;
        line-height: 0.9rem;
        img{
          width: 0.2rem;
        }
      }
      .arealist{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-top: 0.3rem;
        &-item{
          flex-shrink: 0;
          width: 1.6rem;
          height: 0.6rem;
          font-size: 0.26rem;
          color: #333;
          text-align: center;
          background: #f5f5fa;
          line-height: 0.6rem;
          margin: 0 0 0.24rem 0.2rem;
          &.activity{
            background: #00a0e9;
            color: #ffffff;
          }
          img{
            width: 0.18rem;
          }
        }
      }
    }
    .list{
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 1.2rem;
      &-item{
        width: 7.22rem;
        height: 2.46rem;
        background: url('./imgs/Square1.png') center / 100% no-repeat;
        margin: 0 auto 0.3rem;
        padding: 0.1rem 0;
        &-top{
          font-size: 0.28rem;
          color: #333;
          height: 0.62rem;
          width: 6.8rem;
          border-bottom: 1px solid #ececec;
          margin: 0 auto;
          line-height: 0.62rem;
          padding: 0 0.3rem;
          font-weight: 700;
          span{
            float: right;
            color: #fb642f;
            font-weight: normal;
          }
        }
        &-content{
          position: relative;
          p{
            width: 6rem;
            padding-left: 0.5rem;
            font-size: 0.28rem;
            color: #666;
            line-height: 0.28rem;
            margin-top: 0.3rem;
            span{
              color: #333;
            }
          }
          p:nth-child(2){
            span{
              color: #fb642f;
            }
          }
          .btn{
            width: 1.1rem;
            height: 0.6rem;
            border-radius: 0.1rem;
            position: absolute;
            right: 0.5rem;
            top: 0.1rem;
            font-size: 0.26rem;
            text-align: center;
            color: #fff;
            line-height: 0.6rem;
            background: #00a0e9;
          }
        }
      }
    }
    .tips{
      width: 5.23rem;
      height: 5.16rem;
      background: #ffffff;
      border-radius: 0.3rem;
      position: relative;
      padding-top: 0.54rem;
      text-align: center;
      img{
        width: 1.36rem;
        margin-bottom: 0.5rem;
      }
      dl{
        dt{
          img{
            width: 2.26rem;
            margin-bottom: 0.2rem;
          }
        }
        dd{
          font-size: 0.3rem;
          color: #666;
          line-height: 0.3rem;
        }
      }
      .btn{
        width: 3rem;
        height: 0.8rem;
        font-size: 0.34rem;
        color: #ffffff;
        line-height: 0.8rem;
        background: #00a0e9;
        border-radius: 0.6rem;
        margin: 0.5rem auto;
      }
      .close{
        width: 0.82rem;
        height: 0.82rem;
        background: url('./imgs/close.png') center / 100% no-repeat;
        position: absolute;
        bottom: -1rem;
        left: 50%;
        margin-left: -0.41rem;
      }
    }
  }
  .appointContent{
    padding-top: 0.8rem;
    .item{
      width: 7rem;
      height: 1.1rem;
      border-bottom: 1px solid #ececec;
      margin: 0 auto;
      line-height: 1.1rem;
      font-size: 0.3rem;
      color: #000;
      display: flex;
      &.right{
        background: url('./imgs/right.png') right center / 0.55rem 0.55rem no-repeat;
      }
      label{
        width: 2rem;
        display: inline-block;
        padding-left: 0.2rem;
        background: url('./imgs/must.png') left center / 0.15rem 0.14rem no-repeat;
      }
      input{
        flex: 1;
      }
    }
    .btn{
      width: 6rem;
      height: 0.88rem;
      text-align: center;
      font-size: 0.32rem;
      color: #fff;
      line-height: 0.88rem;
      background: #00a0e9;
      border-radius: 0.5rem;
      margin: 0.7rem auto;
    }
    .choseAppoint{
      width: 100vw;
      height: 100vh;
      background: #fff;
      .date,.time{
        &-item{
          width: 7rem;
          height: 1.3rem;
          font-size: 0.3rem;
          color: #333;
          line-height: 1.3rem;
          border-bottom: 1px solid #ececec;
          margin: 0 auto;
          padding: 0 0.4rem;
          &.disable{
            span{
              background: #ccc;
            }
          }
          &.fullorder{
            span{
              background: #ccc;
            }
          }
          span{
            background: #00a0e9;
            color: #fff;
            width: 1.1rem;
            height: 0.6rem;
            display: block;
            float: right;
            line-height: 0.6rem;
            text-align: center;
            border-radius: 0.1rem;
            margin-top: 0.35rem;
          }
        }
      }
    }
    .successAppoint{
      width: 6rem;
      //height: 7.9rem;
      background: #fff;
      border-radius: 0.2rem;
      padding-top: 0.32rem;
      padding-bottom: 0.2rem;
      .title{
        width: 5rem;
        height: 2rem;
        background: #e5f6fe;
        border-radius: 0.1rem;
        margin: 0 auto;
        text-align: center;
        padding-top: 0.3rem;
        h2{
          font-size: 0.38rem;
          color: #333;
          font-weight: normal;
          margin-bottom: 0.3rem;
          img{
            width: 0.45rem;
            vertical-align: middle;
            margin-right: 0.1rem;
          }
        }
        dl{
          dt{
            font-size: 0.3rem;
            color: #333;
            line-height: 0.3rem;
            margin-bottom: 0.18rem;
          }
          dd{
            font-size: 0.24rem;
            color: #999;
            line-height: 0.24rem;
          }
        }
      }
      .successContent{
        margin-top: 0.45rem;
        h2{
          font-size: 0.34rem;
          color: #333;
          text-align: center;
          margin-bottom: 0.36rem;
        }
        p{
          color: #999;
          font-size: 0.28rem;
          line-height: 0.28rem;
          margin-bottom: 0.5rem;
          padding-left: 0.55rem;
          span{
            color: #333;
          }
          a{
            color: #00a0e9;
            text-decoration: underline;
            img{
              width: 0.26rem;
              margin-right: 0.1rem;
              margin-left: 0.2rem;
            }
          }
        }
      }
      .goback{
        width: 3rem;
        height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        line-height: 0.8rem;
        background: #00a0e9;
        border-radius: 0.5rem;
        margin: 0.7rem auto;
      }
    }
  }
}
</style>