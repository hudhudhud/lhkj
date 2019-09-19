<template>
    <LayoutForm>
       <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="活动名称" prop="actName">
            <el-input v-model="form.actName"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" prop="merchantId">
            <el-select v-model="form.merchantId" filterable clearable placeholder="请选择" :disabled='!!form.actId'>
                <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动类型" prop="actType">
            <el-select v-model="form.actType" disabled placeholder="请选择" :disabled='!!form.actId'>
                <el-option v-for="item in actTypeList" :key="item.code" :label="item.desc" :value="item.code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="支付配置" prop="payType">
            <label for="">待定</label>
            <!-- 没接口 -->
            <!-- <el-cascader v-model="form.payType" :options="payTypeConfig" expand-trigger="hover" change-on-select clearable
            placeholder="请选择"></el-cascader> -->
        </el-form-item>
        <el-form-item label="登录后可进入">
            <el-switch v-model="form.checkLogin" active-color="#13ce66" inactive-color="" :active-value="1"  :inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item label="是否全屏">
            <el-switch v-model="form.fullScreen" active-color="#13ce66" inactive-color="" :active-value="1" :inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item label="是否以白名单次数为准">
            <el-switch v-model="form.whiteLimitType" active-color="#13ce66" inactive-color="" :active-value="1"
            inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item label="是否进行风控" prop="riskStatus">
            <el-switch v-model="form.riskStatus" active-color="#13ce66" inactive-color="" :active-value="1" :inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item label="每日是否向订单进行数据传输" prop="dataProjectStatus">
            <el-switch v-model="form.dataProjectStatus" active-color="#13ce66" inactive-color="" :active-value="1"
            :inactive-value="0">
            </el-switch>
        </el-form-item>

        <el-form-item v-if="form.actType=='7' " label="闯关数量" prop="num">
            <el-input type="number" v-model.number="form.num "></el-input>
        </el-form-item>
        <el-form-item v-if="form.actType=='2'" label="是否开启首次中指定奖品">
            <el-switch v-model="form.isFirstOrder" active-color="#13ce66" inactive-color="" :active-value="1" :inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item v-if="form.actType=='5'" label="是否付费签到">
            <el-switch v-model="form.is_open_buy" active-color="#13ce66" inactive-color="" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item  label="计价类型" prop="valuationType" v-if="form.actType=='2' || form.is_open_buy=='1'">
            <el-select v-model="form.valuationType" placeholder="请选择">
                <el-option v-for="valuation in valuationTypeList" :key="valuation.id" :label="valuation.type" :value="valuation.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="(form.actType=='2' || form.is_open_buy=='1')&&form.valuationType==1" label="现金最高价格" prop="highestPrice">
            <el-input type="number" v-model.number="form.highestPrice "></el-input>
        </el-form-item>
        <el-form-item v-if="(form.actType=='2' || form.is_open_buy=='1')&&form.valuationType==1" label="现金最低价格" prop="lowestPrice">
            <el-input type="number" v-model.number="form.lowestPrice "></el-input>
        </el-form-item>

        <el-form-item v-if="form.valuationType==2" label="最大积分数量" prop="maxIntegralNum">
            <el-input type="number" v-model.number="form.maxIntegralNum"></el-input>
        </el-form-item>
        <el-form-item v-if="form.valuationType==2" label="最小积分数量" prop="minIntegralNum">
            <el-input type="number" v-model.number="form.minIntegralNum"></el-input>
        </el-form-item>

        <el-form-item v-if="form.actType=='2'" label="抽奖活动免费参与次数" prop="actJoinNum">
            <el-input type="number" v-model.number="form.actJoinNum "></el-input>
        </el-form-item>

        <el-form-item v-if="form.actType=='2'" label="单人非默认奖品中奖总量" prop="nonDefaultTotal">
            <el-input type="number" v-model.number="form.nonDefaultTotal "></el-input>
        </el-form-item>

        <el-form-item v-if="form.actType=='5'" label="启用补签" prop="splmtFlag">
            <el-switch v-model="form.splmtFlag" active-color="#13ce66" inactive-color="" active-value="1" inactive-value="0">
            </el-switch>
        </el-form-item>

        <div v-if="form.splmtFlag=='1'">
            <el-form-item label="补签收费方式" prop="splmtPricingWay">
                <el-select v-model="form.splmtPricingWay" placeholder="请选择">
                    <el-option v-for="item in splmtPricingWayList" :key="item.id" :label="item.type" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="form.splmtPricingWay!='3'" label="补签起始价" prop="splmtInitPrice">
                <el-input type="number" v-model.number="form.splmtInitPrice "></el-input>
            </el-form-item>

            <el-form-item v-if="form.splmtPricingWay!='1'" label="补签最低价" prop="splmtMinPrice">
                <el-input type="number" v-model.number="form.splmtMinPrice "></el-input>
            </el-form-item>

            <el-form-item v-if="form.splmtPricingWay!='1'" label="补签最高价" prop="splmtMaxPrice">
                <el-input type="number" v-model.number="form.splmtMaxPrice "></el-input>
            </el-form-item>

            <el-form-item v-if="form.splmtPricingWay=='2'" label="补签递增价" prop="splmtAddstepPrice">
                <el-input type="number" v-model.number="form.splmtAddstepPrice "></el-input>
            </el-form-item>

            <el-form-item label="补签次数上限" prop="splmtMaxTimes">
                <el-input type="number" v-model.number="form.splmtMaxTimes "></el-input>
            </el-form-item>

            <el-form-item label="补签时间限制" prop="splmtLimitDays">
                <el-input type="number" v-model.number="form.splmtLimitDays ">
                    <template slot="append">天</template>
                </el-input>
            </el-form-item>
        </div>

      <!--<el-form-item v-if="form.actType=='5'" label="签到规则说明" prop="ruleText">
        <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.ruleText"></el-input>
      </el-form-item>-->

        <el-form-item v-if="form.actType!='3' && form.actType!='5'" label="最大购买次数" prop="maxBuyNum">
            <el-input type="number" v-model.number="form.maxBuyNum "></el-input>
        </el-form-item>

        <el-form-item label="订单过期时间/秒" prop="startTime">
            <el-input type="number" v-model.number="form.overTime">
                <template slot="append">秒</template>
            </el-input>
        </el-form-item>

        <el-form-item label="活动开始时间" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间" format= "yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间"  format= "yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="活动备注" prop="detail">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="detail">
            <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.detail"></el-input>
        </el-form-item>
        <el-form-item label="图片上传" prop="list">
            <UploadImages v-model="imglist" action="file/upload" :max='1' ></UploadImages>
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
import ActivityVO from "@/api/modules/ActivityVO";
import ActivityBo from '@/api/modules/ActivityBo';
import MerchantResponse from "@/api/modules/MerchantResponse";
import EnumEntityObject from "@/api/modules/EnumEntityObject";
import { MerchantApi,ActivityApi,EnumsApi, ActApi } from "@/api";
import LayoutForm from '@/components/layout/LayoutForm.vue';
import UploadImages from '@/components/UploadImages.vue'

export default Vue.extend({
    components:{
        LayoutForm,
        UploadImages
    },
    data():{
        form:ActivityVO,
        rules:object,
        merchantList:MerchantResponse[],
        actTypeList:EnumEntityObject[],
        valuationTypeList:object[]
        imglist:any,
        loading:Boolean,
        actId?:number,
    }{
        return {
            form:new ActivityVO(),
            rules:{},
            merchantList:[],
            actTypeList:[],
            valuationTypeList:[],
            imglist:[],
            loading:false,
        }
    },
    created(){
        

        this.valuationTypeList= [
            {
                id: 1,
                type: "纯现金"
            },
            {
                id: 2,
                type: "纯积分"
            }
        ]
        //表单验证 begin
            var validateLowestPrice = (rule:any, value:any, callback:any) => {
                if (value === "") {
                    callback(new Error("请输入最低价格"));
                } else {
                    if (value > this.form.highestPrice) {
                    callback(new Error("最低价格应小于或等于最高价格"));
                    }
                    callback();
                }
            };
            var validateHighestPrice = (rule:any, value:any, callback:any) => {
                if (value === "") {
                    callback(new Error("请输入最高价格"));
                } else {
                    if (value < this.form.lowestPrice) {
                    callback(new Error("最高价格应大于或等于最低价格"));
                    }
                    callback();
                }
            };
            var validateLowestNum = (rule:any, value:any, callback:any) => {
                if (value === "") {
                    callback(new Error("请输入最低积分数量"));
                } else {
                    if (value > this.form.maxIntegralNum) {
                    callback(new Error("最低积分数量应小于或等于最高积分数量"));
                    }
                    callback();
                }
            };
            var validateHighestNum = (rule:any, value:any, callback:any) => {
                if (value === "") {
                    callback(new Error("请输入最高积分数量"));
                } else {
                    if (value < this.form.minIntegralNum) {
                    callback(new Error("最高积分数量应大于或等于最低积分数量"));
                    }
                    callback();
                }
            };

            this.rules={
                lowestPrice: [{ validator: validateLowestPrice, trigger: "blur" }],
                highestPrice: [{ validator: validateHighestPrice, trigger: "blur" }],
                minIntegralNum: [{ validator: validateLowestNum, trigger: "blur" }],
                maxIntegralNum: [{ validator: validateHighestNum, trigger: "blur" }],
                actName: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                {
                    min: 1,
                    max: 20,
                    message: "长度在 1 到 20 个字符",
                    trigger: "change"
                }
                ],
                merchantId: [
                { required: true, message: "请选择商户", trigger: "blur" }
                ],
                actType: [
                { required: true, message: "请选择活动类型", trigger: "blur" }
                ]
            }
        //表单验证 end
      
      this.loadAct()
      this.loadActTypeList()  
      this.loadMerchantList()
    },
  methods:{
    async loadAct(){
        let actId=this.$route.query.actId
        if(actId){
          this.actId=Number(actId)
          let {payload} = await ActivityApi.getActivityUsingGET({actId:this.actId})
          if(payload){
              this.form=JSON.parse(JSON.stringify(payload))
              this.imglist=[{url:payload.actIcon}]
          }
        }
    },
    async loadActTypeList(){
        let {payload}=await EnumsApi.getEnumByTypeUsingGET({type:'ActType'})
        if(payload){
            this.actTypeList=payload
        }
    },
    async loadMerchantList() {
        let { payload } = await MerchantApi.findMerchantListUsingPOST();
        if(payload){
            this.merchantList=payload
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
             this.form.actIcon = this.imglist[0].url;
            }
        }

        let res = await ActivityApi.saveActivityUsingPOST(this.form)
        if(res && res.status===200){
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

