<template>
    <LayoutForm>
      <el-form :model="form" :rules="rules" ref="form" label-width="130px">
        <el-form-item label="奖品名称" prop="prizeName">
          <el-input v-model="form.prizeName"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="proType">
          <el-select v-model="form.proType" placeholder="请选择">
            <el-option v-for="proType in proTypeList" :key="proType.code" :label="proType.desc" :value="proType.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.proType!='5' && form.proType!='8'&&form.proType!='9'&&form.proType!='10'" label="原始商品名称"
          prop="baseProId">
          <el-select v-model="form.baseProId" filterable clearable @change="loadBaseStandardCode" placeholder="请选择">
            <el-option v-for="basePro in baseProList" :key="basePro.feiyuProductId" :label="basePro.feiyuProductName" :value="basePro.feiyuProductId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.proType!='5'&& form.proType!='8'&&form.proType!='9'&&form.proType!='10'" label="原始商品规格"
          prop="baseStandardCode">
          <el-select v-model="form.baseStandardCode" clearable @change="getFeiyuPrice" placeholder="请选择">
            <el-option v-for="baseStandard in baseStandardCodeList" :key="baseStandard.feiyuStandardId" :label="baseStandard.feiyuStandardName"
              :value="baseStandard.feiyuStandardCode">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="currentProd&&currentProd.feiyuProductType=='0'" label="充值账号名称" prop="accountName">
          <el-select v-model="form.accountName" clearable @change="loadAccountPattern" placeholder="请选择">
            <el-option v-for="account in accountList" :key="account.id" :label="account.name" :value="account.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.accountName!=null&&form.accountName!=''&&currentProd&&currentProd.feiyuProductType=='0'"
          label="充值账号校验格式" prop="accountPattern">
          <el-input v-model="form.accountPattern" :disabled="true"></el-input>
        </el-form-item>
        <!-- 积分类型活动 -->
        <el-form-item v-if="form.proType=='5'" label="积分类型" prop="creditType">
          <el-select v-model="form.creditTypeId" clearable placeholder="请选择">
            <el-option v-for="creditType in creditTypeList" :key="creditType.id" :label="creditType.name" :value="creditType.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.proType=='5'" label="积分价值" prop="creditValue ">
          <el-input type="number" v-model="form.creditValue "></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input type="number" v-model="form.originalPrice "></el-input>
        </el-form-item>
        <el-form-item label="现价 " prop="currentPrice ">
          <el-input type="number" v-model="form.currentPrice "></el-input>
        </el-form-item>
        <el-form-item label="结算价格" prop="merchantPrice ">
          <el-input type="number" v-model="form.merchantPrice"></el-input>
        </el-form-item>
        <el-form-item label="飞鱼价格" prop="fishCost">
          <el-input type="number" v-model="form.fishCost "></el-input>
        </el-form-item>
        <el-form-item label="奖品排序" prop="lotterySord">
          <template>
            <el-input-number v-model="form.lotterySord" :min="1" :max="10"></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="奖品概率" prop="prizeProbability ">
          <el-input v-model="form.prizeProbability" max="“200”">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label=" 是否默认奖品 " prop="isDefault">
          <el-switch v-model="form.isDefault" active-color="#13ce66" inactive-color="#D3D3D3" active-value="1" inactive-value="0">></el-switch>
        </el-form-item> -->
        <el-form-item label="是否为首次中奖奖品">
          <el-switch v-model="form.isFirstOrder" active-color="#13ce66" inactive-color :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item v-if="currentProd!=null&&currentProd.id==3" label="是否开放充值 ">
          <el-switch v-model="form.isOpenRecharge" active-color="#13ce66" inactive-color="#D3D3D3" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item v-if="form.proType=='5'" label="积分过期时间" prop="expiredTime">
          <el-date-picker v-model="form.expiredTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="库存 " prop="prizeTotal ">
          <el-input type="number" v-model="form.prizeTotal"></el-input>
        </el-form-item>

        <el-form-item label="使用说明 " prop="standardInstruction">
          <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7} " v-model="form.standardInstruction"></el-input>
        </el-form-item>
        <el-form-item label="奖品图片" prop="imglist ">
          <UploadImages v-model="imglist" action="file/upload"></UploadImages>
        </el-form-item>
        <el-form-item label="活动中使用的图片" prop="actImgList ">
          <UploadImages v-model="actImgList" action="file/upload"></UploadImages>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="validForm" :loading="loading">保存</el-button>
        <el-button @click="close" v-if="!loading">取消</el-button>
      </el-form-item>
    </el-form>
    </LayoutForm>
</template>
<script  lang="ts">
import Vue from 'vue'
import ProductVO from "@/api/modules/ProductVO";
import LotteryVO from "@/api/modules/LotteryVO";
import QueryCreditTypeListVO from  "@/api/modules/QueryCreditTypeListVO";
import FeiyuProductResponse from "@/api/modules/FeiyuProductResponse";
import FeiyuStandardResponse from "@/api/modules/FeiyuStandardResponse";
import { ProductApi,EnumsApi,ActivityApi,AssetApi } from "@/api";
import LayoutForm from '@/components/layout/LayoutForm.vue';
import UploadImages from '@/components/UploadImages.vue'

export default Vue.extend({
    components:{
        LayoutForm,
        UploadImages
    },
    data():{
        form:any,//LotteryVO,
        rules:object,
        valuationTypeList:object[]
        imglist:any,
        actImgList:any,
        loading:Boolean,
        proTypeList:any[],
        baseProList:FeiyuProductResponse[],
        baseStandardCodeList:FeiyuStandardResponse[],
        currentProd:FeiyuProductResponse,
        accountList:any[],
        actId?:number,
        lotteryId?:number,
        creditTypeList:any[],
        merchantId?:number,
    }{
        return {
            form:new LotteryVO(),
            rules:{
              prizeName: [
                { required: true, message: "请输入奖品名称", trigger: "blur" },
                {
                  min: 1,
                  max: 20,
                  message: "长度在 1 到 20 个字符",
                  trigger: "change"
                }
              ],
              proType: [
                { required: true, message: "请选择奖品类型", trigger: "blur" }
              ],
              prizeProbability: [
                { required: true, message: "请输入奖品概率", trigger: "blur" }
              ],
              prizeTotal: [{ required: true, message: "请输入库存", trigger: "blur" }]
            },
            valuationTypeList:[
                {id: 1,type: "纯现金"},
                {id: 2,type: "纯积分"}
            ],
            imglist:[],
            actImgList:[],
            loading:false,
            proTypeList:[],
            baseProList:[],
            baseStandardCodeList:[],
            accountList:[
                {id: "1",name: "手机号"},
                {id: "2",name: "QQ号"},
                {id: "3",name: "淘宝会员名"},
                {id: "4",name: "中石化油卡账号"},
                {id: "5",name: "中石油油卡账号"}
              ],
            currentProd:new FeiyuProductResponse(),
            creditTypeList:[],
        }
    },
    async created(){
      if(this.$route.params.actId){
          this.actId=Number(this.$route.params.actId)
      }

      if(this.$route.query.lotteryId){
        this.lotteryId=Number(this.$route.query.lotteryId)
        await this.loadLottery()
        if(this.form.baseProId){
          this.loadBaseStandardCode()
        }
      }
      this.loadProTypeList() 
      this.loadMerchant()
    },
  watch:{
    'form.baseProId':{
      async handler(val){
          if(!this.baseProList||!this.baseProList.length){
            await this.loadBaseProList() 
          }
          let item = this.baseProList.find(item =>item.feiyuProductId === val);
          if(item){
            this.currentProd=item
          }       
      },
      immediate:true
    }
  } , 
  methods:{
    loadAccountPattern(id:string) {
      if (id == "手机号") {
        this.form.accountPattern = "^1[0-9]{10}$";
      } else if (id == "QQ号") {
        this.form.accountPattern = "[1-9][0-9]{4,14}";
      } else if (id == "中石化油卡账号") {
        this.form.accountPattern = "^\\d{19}$";
      } else if (id == "中石油油卡账号") {
        this.form.accountPattern = "^\\d{16}$";
      } else {
        this.form.accountPattern = ".*";
      }
    },
    async loadProTypeList(){
        let {payload}=await EnumsApi.getEnumByTypeUsingGET({type:'ProType'})
        if(payload){
            this.proTypeList=payload
        }
    },
    async loadMerchant() {
      if(this.actId){
         let param={actId:this.actId}
        let rs = await ActivityApi.getActivityUsingGET(param) 
        if (rs.status === 200) {
          this.merchantId = rs.payload.merchantId;
          this.loadCreditTypeList(this.merchantId);
        }
      }
    },
    async loadCreditTypeList(merchantId:number) {
      let param = new QueryCreditTypeListVO()
      param.merchantId=merchantId
      let rs = await AssetApi.queryCreditTypeListUsingPOST_1(param)
      if (rs.status === 200) {
        this.creditTypeList = rs.payload;
      }
    },
    async loadLottery(){
       if(this.lotteryId){
          let param=new LotteryVO()
          param.id=this.lotteryId
          if(this.actId){
            param.actId=this.actId
          }
          let {payload} = await ProductApi.getLotteryOneUsingPOST(param)
          if(payload){
              this.form=JSON.parse(JSON.stringify(payload))
              this.form.proType=Number(this.form.proType)
              this.imglist=[{url:payload.standardImgUrl}]
              this.actImgList=[{url:payload.standardActUrl}]
          }
       }
    },
    async loadBaseProList(){
      let {payload} = await ProductApi.getBaseProUsingPOST()
      if(payload){
        this.baseProList=payload
      }
    },
    async loadBaseStandardCode(){
      if(this.form.baseProId){
        let {payload}=await ProductApi.getBaseStandardCodeUsingGET({baseProId:this.form.baseProId})
        if(payload){
          this.baseStandardCodeList=payload
        }
      }
    },
    getFeiyuPrice(code:string) {
      if (this.form.baseStandardCode) {
        let item = this.baseStandardCodeList.find(item => 
         item.feiyuStandardCode == code
        );
        if(item){
            this.form.fishCost =(Number(item.feiyuStandardValue) * item.priceDiscount) / 10000;
        }
      }
    },
    validForm() {
      (this.$refs.form as HTMLFormElement).validate((valid:any) => {
        if (valid) {
          this.doSubmit();
        } else {
          return false;
        }
      });
    },
    async doSubmit(){
        this.loading=true
        if (this.imglist&&this.imglist.length) {
            if (this.imglist[0].url) {
             this.form.standardImgUrl = this.imglist[0].url;
            }
        }
        if (this.actImgList&&this.actImgList.length) {
            if (this.actImgList[0].url) {
             this.form.standardActUrl = this.actImgList[0].url;
            }
        }
        if(this.lotteryId){
          this.form.id=this.lotteryId
        }
        if(this.actId){
          this.form.actId=this.actId
        }

        this.form.currentPrice=parseFloat(this.form.currentPrice)
        this.form.merchantPrice=parseFloat(this.form.merchantPrice)
        this.form.originalPrice=parseFloat(this.form.originalPrice)
        this.form.prizeProbability=parseFloat(this.form.prizeProbability)
        
        let res = await ProductApi.saveLotteryUsingPOST(this.form)
        if(res.status===200){
            this.$notify({
                title: "温馨提示",
                message: "保存成功",
                type: "success",
                duration: 2000
            });
            this.$router.go(-1);
        }
        this.loading=false
    },
    close() {
      this.$router.go(-1);
    },
  }
})
</script>

