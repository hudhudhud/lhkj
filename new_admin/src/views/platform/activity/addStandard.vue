<template>
    <LayoutForm>
      <el-form :model="form" :rules="rules" ref="form" label-width="130px">
        <el-form-item label="规格名称" prop="standardName">
          <el-input v-model="form.standardName"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="proType">
          <el-select v-model="form.proType" placeholder="请选择">
            <el-option v-for="proType in proTypeList" :key="proType.code" :label="proType.desc" :value="proType.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.proType!='5' && form.proType!='9'&&form.proType!='10'&&form.proType!='11'" label="原始商品名称"
          prop="baseProId">
          <el-select v-model="form.baseProId" filterable clearable @change="loadBaseStandardCode" placeholder="请选择">
            <el-option v-for="basePro in baseProList" :key="basePro.feiyuProductId" :label="basePro.feiyuProductName" :value="basePro.feiyuProductId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.proType!='5'&& form.proType!='9'&&form.proType!='10'&&form.proType!='11'" label="原始商品规格"
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
        <!-- 活动类型特卖 -->
        <el-form-item v-if="form.actType==1" label="计价类型" prop="valuationType">
          <el-select v-model="form.valuationType" placeholder="请选择">
            <el-option v-for="valuation in valuationTypeList" :key="valuation.id" :label="valuation.type" :value="valuation.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.valuationType!=2" label="原价" prop="originalPrice">
          <el-input type="number" v-model="form.originalPrice "></el-input>
        </el-form-item>
        <el-form-item v-if="form.valuationType!=2" label="现价 " prop="currentPrice">
          <el-input type="number" v-model="form.currentPrice "></el-input>
        </el-form-item>
        <!-- 计价非积分或活动类型特卖 且 商品类型非积分、实品、预定、红包 -->
        <!-- <el-form-item v-if="(form.valuationType!=2||form.actType==1)&&form.proType!='5'&& form.proType!='9'&&form.proType!='10'&&form.proType!='11'"
          label="是否价格随机减 ">
          <el-switch v-model="form.discountType" active-color="#13ce66" inactive-color="#D3D3D3" :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="form.discountType=='1'" label="最大减价金额 " prop="maxDiscountPrice ">
          <el-input type="number" v-model="form.maxDiscountPrice "></el-input>
        </el-form-item>
        <el-form-item v-if="form.discountType=='1'" label="最小减价金额 " prop="minDiscountPrice ">
          <el-input type="number" v-model="form.minDiscountPrice "></el-input>
        </el-form-item> -->
        <!-- 商品类型是积分 -->
        <el-form-item v-if="form.proType=='5'" label="积分类型" prop="creditType">
          <el-select v-model="form.creditTypeId" clearable placeholder="请选择">
            <el-option v-for="creditType in creditTypeList" :key="creditType.id" :label="creditType.name" :value="creditType.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商品类型是积分 -->
        <el-form-item v-if="form.proType=='5'" label="积分价值" prop="creditValue ">
          <el-input type="number" v-model="form.creditValue "></el-input>
        </el-form-item>

        <el-form-item label="结算价格" prop="merchantPrice ">
          <el-input type="number" v-model="form.merchantPrice "></el-input>
        </el-form-item>
        <!-- 商品类型不是实品、预定、红包 -->
        <el-form-item v-if="form.proType!='9'&&form.proType!='10'&&form.proType!='11'" label="飞鱼价格" prop="fishCost">
          <el-input type="number" v-model="form.fishCost "></el-input>
        </el-form-item>
        <el-form-item v-if="form.valuationType!=1" label="积分数量" prop="integralNum">
          <el-input v-model="form.integralNum"></el-input>
        </el-form-item>
        <el-form-item label="规格排序 " prop="standardSort">
          <template>
            <el-input-number v-model="form.standardSort " :min="1 " :max="10 "></el-input-number>
          </template>
        </el-form-item>
        <!-- 商品类型是积分 -->
        <el-form-item v-if="form.proType=='5'" label="积分过期时间" prop="expiredTime">
          <el-date-picker v-model="form.expiredTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <!-- 商品类型非积分 -->
        <el-form-item v-if="form.proType!='5'" label="是否支持优惠券 ">
          <el-switch v-model="form.isCoupon" active-color="#13ce66" inactive-color="#D3D3D3" :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="currentProd&&currentProd.id==3" label="是否开放充值 ">
          <el-switch v-model="form.isOpenRecharge" active-color="#13ce66" inactive-color="#D3D3D3" :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
        <!-- 活动类型非秒杀 -->
        <el-form-item v-if="this.form.actType!=3" label="库存" prop="limitTotal">
          <el-input type="number" v-model="form.limitTotal "></el-input>
        </el-form-item>
        <!-- 活动类型为秒杀 -->
        <el-form-item v-if="this.form.actType==3" label="每时段限制数量 " prop="limitPerTime ">
          <el-input type="number" v-model="form.limitPerTime "></el-input>
        </el-form-item>

        <el-form-item label="使用说明" prop="standardInstruction">
          <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.standardInstruction"></el-input>
        </el-form-item>
        <el-form-item label="规格图片" prop="imglist ">
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
import FeiyuProductResponse from "@/api/modules/FeiyuProductResponse";
import FeiyuStandardResponse from "@/api/modules/FeiyuStandardResponse";
import { ProductApi,EnumsApi } from "@/api";
import LayoutForm from '@/components/layout/LayoutForm.vue';
import UploadImages from '@/components/UploadImages.vue'

export default Vue.extend({
    components:{
        LayoutForm,
        UploadImages
    },
    data():{
        form:any,//ProductVO,
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
        proId?:number,
        standardId?:number,
    }{
        return {
            form:new ProductVO(),
            rules:{
              originalPrice: [
                { required: true, message: "原价不能为空", trigger: "blur" },
              ],
              currentPrice: [
                { required: true, message: "现价不能为空", trigger: "blur" },
              ],
              standardName: [
                { required: true, message: "规格名称不能为空", trigger: "blur" }
              ],
              limitTotal: [
                { required: true, message: "库存不能为空", trigger: "blur" }
              ]
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
        }
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
    },
    async created(){
      if(this.$route.params.actId){
          this.actId=Number(this.$route.params.actId)
      }
      if(this.$route.params.proId){
         this.proId=Number(this.$route.params.proId)
      }
      if(this.$route.query.standardId){
        this.standardId=Number(this.$route.query.standardId)
        await this.loadStandard()
        if(this.form.baseProId){
          this.loadBaseStandardCode()
        }
      }
      this.loadProTypeList() 
      this.loadActType()
    },
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
    async loadStandard(){
          let param=new ProductVO()
          if(this.standardId){
            param.standardId=this.standardId
          }
          let {payload} = await ProductApi.getStandardOneUsingPOST(param)
          if(payload){
              this.form=JSON.parse(JSON.stringify(payload))
              this.form.proType=Number(this.form.proType)
              this.imglist=[{url:payload.standardImgUrl}]
              this.actImgList=[{url:payload.standardActUrl}]
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
    async loadActType() {
      let param=new ProductVO()
      if(this.proId){
        param.proId=this.proId
      }
      let {payload} = await ProductApi.getActTypeUsingPOST_1(param)
      if (payload) {
        this.form.actType = payload.actType;
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
        if(this.standardId){
          this.form.standardId=this.standardId
        }
        let res = await ProductApi.saveStandardUsingPOST(this.form)
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

