<template>
  <div class="appointDetail">
    <Header title="预约详情" headerStyle="background:rgb(26, 161, 230);color:#fff;font-weight: normal;" iconStyle="background: url(//static.lianhaikeji.com/images/20190529/40ddf5180fd74c04aa53b3378b92ea8f.png) no-repeat;background-size:100% 100%;width:.4rem;height:.4rem;"></Header>
    <div class="content" :class="{cancel:data.revoked}">
      <div class="title" v-if="!data.revoked">预约成功</div>
      <div class="title" v-else>您的预约已取消</div>
      <div class="appointInfo">
        <p>产证信息：<span>{{data.data5}}</span></p>
        <p>联系人:<span>{{data.data6}}</span></p>
        <p>联系电话:<span>{{data.data7}}</span></p>
        <p>预约编号:<span>{{data.id}}</span></p>
        <p>预约网点:<span>{{data.data9}}</span></p>
        <p>网点地址:<span>{{data.data10}}<a :href="'http://api.map.baidu.com/geocoder?address='+data.data10+'&output=html&src=webapp.baidu.openAPIdemo'"><img src="./imgs/local1.png" alt=""></a></span></p>
        <p>预约日期:<span>{{data.data3}}</span></p>
        <p>预约时段:<span>{{data.data4}}</span></p>
      </div>
      <div class="btn" :class="{notCancel:data.data32=='no'}" @click="cancel" v-if="!data.revoked">取消预约</div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/header";
import { MessageBox } from 'mint-ui';
  export default {
    name:'appointDetail',
    data () {
      return {
        appointStatus: true, //预约状态
        data: JSON.parse(this.$route.query.data)
      };
    },
    components: {
        Header
    },
    methods: {
      cancel(){
        if(this.data.data32=='yes'){
          MessageBox({
            title: '',
            message: '是否确认取消预约?',
            showCancelButton: true,
            cancelButtonText: '不了'
          }).then(action => {
            if (action == 'confirm') {
              this.$post('/formData/revoke/formData',{
                id: this.data.id,
                formId: this.data.formId,
                customId: this.data.customId,
                data1: this.data.formId,
                data2:this.data.data2,
                data3:this.data.data3,
                data4:this.data.data4,
                data5:this.data.data5,
                data6:this.data.data6,
                data7:this.data.data7,
                data8:'',
                data9:this.data.data9,
                data10:this.data.data10,
                data32:this.data.data32
              }).then(res=>{
                if(res.status==200){
                  this.cancelSuccess();
                  this.data.revoked = !this.data.revoked;
                }else{
                  this.$toast(res.error)
                }
              })
            }
          });
        } else {
          this.$toast('当前预约不可取消')
        }
      },
      cancelSuccess(){
        MessageBox({
          title: '',
          message: '您已成功取消预约！',
          showCancelButton: true,
          cancelButtonText: '好的',
          confirmButtonText: '再预约一次'
        }).then(action => {
          if (action == 'confirm') {
            this.$router.push(`/${this.$route.params.customId}/cbbSuzhou/appoint?formId=${this.data.formId}`)
          }
        });
      }    
    },
    mounted() {
      console.log(this.data);
      
    }

  }

</script>
<style lang='scss' scoped>
.appointDetail{
  div{
    box-sizing: border-box;
  }
  .content{
    margin-top: 0.8rem;
    background: url('./imgs/index2.png') center top / 100% no-repeat;
    padding-top: 0.55rem;
    &.cancel{
      background: url('./imgs/index3.png') center top / 100% no-repeat;
    }
    .title{
      font-size: 0.4rem;
      color: #ffffff;
      text-align: center;
      margin-bottom: 0.55rem;
    }
    .appointInfo{
      width: 7.22rem;
      height: 6.06rem;
      background: url('./imgs/Square2.png') center / 100% no-repeat;
      margin: 0 auto;
      padding: 0.6rem 0.5rem 0;
      p{
        font-size: 0.28rem;
        line-height: 0.28rem;
        margin-bottom: 0.34rem;
        color: #878787;
        span{
          color: #1c1c1c;
          img{
            width: 0.26rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
    .btn{
      width: 4rem;
      height: 0.88rem;
      background: #00a0e9;
      text-align: center;
      font-size: 0.36rem;
      color: #ffffff;
      line-height: 0.88rem;
      border-radius: 0.5rem;
      margin: 0.55rem auto;
      &.notCancel{
        background: #ccc;
      }
    }
  }
}
</style>