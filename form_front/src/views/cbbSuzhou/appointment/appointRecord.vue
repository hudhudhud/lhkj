<template>
  <div class="appointRecord">
    <Header title="预约记录" headerStyle="background:rgb(26, 161, 230);color:#fff;font-weight: normal;" iconStyle="background: url(//static.lianhaikeji.com/images/20190529/40ddf5180fd74c04aa53b3378b92ea8f.png) no-repeat;background-size:100% 100%;width:.4rem;height:.4rem;"></Header>
    <div class="content">
      <div class="list">
        <div class="list-item" v-for="(item,index) in appointList" :key="index">
          <div class="list-item-top">
            预约编号：{{item.id}}
            <span class="success" v-if="!item.revoked">预约成功</span>
            <span v-else>预约取消</span>
          </div>
          <div class="list-item-content">
            <p>预约网点：<span>{{item.data9}}</span></p>
            <p>预约时间：<span>{{item.data3}} {{item.data4}}</span></p>
            <div class="btn" @click="goDetail(item)">查看</div>
          </div>
        </div>
      </div>
      <div class="bottom" @click="addAppoint">
        <img src="./imgs/close.png" alt="">
        添加新的预约
      </div>
    </div>
    <mt-popup
      style="background:none;"
      v-model="popupVisible"
      position="center">
        <div class="tips">
          <img src="./imgs/fail.png" alt="">
          <dl>
            <dt> 您当前有一个预约未完成</dt>
            <dd>请先取消当前预约，再预约下一次</dd>
          </dl>
          <div class="btn" @click="popupVisible=false">我知道了</div>
          <div class="close" @click="popupVisible=false"></div>
        </div>
    </mt-popup>
  </div>
</template>
<script>
import Header from "@/views/header";
  export default {
    name:'appointRecord',
    data () {
      return {
        popupVisible: false,
        appointList: null
      };
    },
    components: {
        Header
    },
    methods: {
      goDetail(item){
        this.$router.push(`/${this.$route.params.customId}/cbbSuzhou/appointDetail?data=${JSON.stringify(item)}`)
      },
      addAppoint(){
        if(this.appointList.length == 0){
          this.$router.push(`/${this.$route.params.customId}/cbbSuzhou/appoint??formId=${this.$route.query.formId}`)
          return
        }
        if(this.appointList[0].revoked){
          this.$router.push(`/${this.$route.params.customId}/cbbSuzhou/appoint??formId=${this.$route.query.formId}`)
        } else {
          this.popupVisible = true;
        }
      }
    },
    mounted() {
      this.$post('/forms/license/customOrder',{
        formId: this.$route.query.formId,
        customId: this.$route.params.customId
      }).then(res=>{
        if(res.status==200){
          this.appointList = res.payload;
        }else{
          this.$toast(res.error)
        }
      })
    }
  }

</script>
<style>
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999;
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #999;
}
</style>
<style lang='scss' scoped>
.appointRecord{
  padding-top: 0.8rem;
  div{
    box-sizing: border-box;
  }
  .content{
    width: 100%;
    height: calc(100vh - 0.8rem);
    position: relative;
    //margin-top: 0.8rem;
    .list{
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 0.3rem;
      padding-bottom: 1rem;
      -webkit-overflow-scrolling: touch;
      position: static;
      &-item{
        width: 7.22rem;
        height: 2.46rem;
        background: url('./imgs/Square1.png') center / 100% no-repeat;
        margin: 0 auto 0.3rem;
        padding: 0.1rem 0;
        &-top{
          font-size: 0.28rem;
          color: #666;
          height: 0.62rem;
          width: 6.8rem;
          border-bottom: 1px solid #ececec;
          margin: 0 auto;
          line-height: 0.62rem;
          padding: 0 0.3rem;
          span{
            float: right;
            color: #999;
            &.success{
              color: #2ca613;
            }
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
          .btn{
            width: 0.8rem;
            height: 0.48rem;
            border: 1px solid #ececec;
            border-radius: 0.1rem;
            position: absolute;
            right: 0.5rem;
            top: 0.1rem;
            font-size: 0.26rem;
            text-align: center;
            color: #666;
            line-height: 0.48rem;
          }
        }
      }
    }
    .bottom{
      width: 100%;
      height: 1rem;
      background: #00a0e9;
      position: absolute;
      bottom: 0;
      text-align: center;
      font-size: 0.3rem;
      color: #ffffff;
      line-height: 1rem;
      img{
        width: 0.45rem;
        transform: rotate(45deg);
        vertical-align: middle;
        transform-origin:center;
        margin-right: 0.1rem;
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
        font-size: 0.38rem;
        color: #333;
        line-height: 0.38rem;
        margin-bottom: 0.28rem;
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
</style>