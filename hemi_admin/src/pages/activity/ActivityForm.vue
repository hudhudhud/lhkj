<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="活动名称" prop="actName">
        <el-input v-model="form.actName"></el-input>
      </el-form-item>

      <el-form-item label="商户名称" prop="merchantId">
        <el-select v-if="!form.actId" v-model="form.merchantId" @change="loadPayTypeConfig(form.merchantId)" filterable
          clearable placeholder="请选择">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>

        <el-select v-if="form.actId" v-model="form.merchantId" disabled placeholder="请选择">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item label="活动类型" prop="actType">
        <el-select v-if="!form.actId" v-model="form.actType" placeholder="请选择">
          <el-option v-for="acttype in actTypeList" :key="acttype.id" :label="acttype.type" :value="acttype.id">
          </el-option>
        </el-select>

        <el-select v-if="form.actId" v-model="form.actType" disabled placeholder="请选择">
          <el-option v-for="acttype in actTypeList" :key="acttype.id" :label="acttype.type" :value="acttype.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付配置" prop="payType">
        <el-cascader v-model="form.payType" :options="payTypeConfig" expand-trigger="hover" change-on-select clearable
          placeholder="请选择"></el-cascader>
      </el-form-item>

      <el-form-item label="登录后可进入">
        <el-switch v-model="form.checkLogin" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否全屏">
        <el-switch v-model="form.fullScreen" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否以白名单次数为准">
        <el-switch v-model="form.whiteLimitType" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否进行风控" prop="riskStatus">
        <el-switch v-model="form.riskStatus" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="每日是否向订单进行数据传输" prop="dataProjectStatus">
        <el-switch v-model="form.dataProjectStatus" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="form.actType=='7' " label="闯关数量" prop="num">
        <el-input type="number" v-model.number="form.num "></el-input>
      </el-form-item>
      <el-form-item v-if="form.actType=='2'" label="是否开启首次中指定奖品">
        <el-switch v-model="form.isFirstOrder" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="form.actType=='5'" label="是否付费签到">
        <el-switch v-model="form.is_open_buy" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item v-if="form.actType=='2' || form.is_open_buy=='1'" label="计价类型" prop="valuationType">
        <el-select v-model="form.valuationType" placeholder="请选择">
          <el-option v-for="valuation in valuationTypeList" :key="valuation.id" :label="valuation.type"
            :value="valuation.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="(form.actType=='2' || form.is_open_buy=='1')&&form.valuationType==1" label="现金最高价格"
        prop="highestPrice">
        <el-input type="number" v-model.number="form.highestPrice "></el-input>
      </el-form-item>
      <el-form-item v-if="(form.actType=='2' || form.is_open_buy=='1')&&form.valuationType==1" label="现金最低价格"
        prop="lowestPrice">
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
        <el-switch v-model="form.splmtFlag" active-color="#13ce66" inactive-color="" active-value="1"
          inactive-value="0">
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
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动备注" prop="detail">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item label="活动描述" prop="detail">
        <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.detail"></el-input>
      </el-form-item>

      <el-form-item label="图片上传" prop="list">
        <UploadImages v-model="imglist" action="file/upload"></UploadImages>

      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-radio v-model="form.isDeleted" label="0" border>正常</el-radio>
        <el-radio v-model="form.isDeleted" label="1" border>禁用</el-radio>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import moment from "moment";
import UploadImages from "@/components/UploadImages";

export default {
  components: {
    UploadImages
  },
  props: {
    activity: {
      require: true,
      type: Object
    }
  },
  data() {
    var validateLowestPrice = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入最低价格"));
      } else {
        if (value > this.form.highestPrice) {
          callback(new Error("最低价格应小于或等于最高价格"));
        }
        callback();
      }
    };
    var validateHighestPrice = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入最高价格"));
      } else {
        if (value < this.form.lowestPrice) {
          callback(new Error("最高价格应大于或等于最低价格"));
        }
        callback();
      }
    };
    var validateLowestNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入最低积分数量"));
      } else {
        if (value > this.form.maxIntegralNum) {
          callback(new Error("最低积分数量应小于或等于最高积分数量"));
        }
        callback();
      }
    };
    var validateHighestNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入最高积分数量"));
      } else {
        if (value < this.form.minIntegralNum) {
          callback(new Error("最高积分数量应大于或等于最低积分数量"));
        }
        callback();
      }
    };
    return {
      oldForm: null,
      form: {
        is_open_buy: "0",
        dataProjectStatus: "1",
        actId: "",
        actName: "",
        actType: "",
        checkLogin: "0",
        fullScreen: "0",
        merchantId: "",
        detail: "",
        startTime: "",
        endTime: "",
        isDeleted: "",
        actIcon: "",
        overTime: "",
        highestPrice: "",
        lowestPrice: "",
        templateConfig: "",
        actTemplate: "",
        actJoinNum: "",
        maxBuyNum: "",
        valuationType: "",
        maxIntegralNum: "",
        minIntegralNum: "",
        splmtFlag: "",
        splmtPricingWay: "",
        splmtInitPrice: "",
        splmtMinPrice: "",
        splmtMaxPrice: "",
        splmtAddstepPrice: "",
        splmtMaxTimes: "",
        splmtLimitDays: "",
        ruleText: "",
        remarks: "",
        nonDefaultTotal: "",
        whiteLimitType: "",
        isFirstOrder: "",
        riskStatus: "1",
        num: "",
        payType: []
      },
      imglist: [],
      submiting: false,

      roleList: [],
      merchantList: [],
      valuationTypeList: [
        {
          id: 1,
          type: "纯现金"
        },
        {
          id: 2,
          type: "纯积分"
        }
      ],
      actTypeList: [
        {
          id: "1",
          type: "特卖活动"
        },
        {
          id: "2",
          type: "抽奖活动"
        },
        {
          id: "3",
          type: "秒杀活动"
        },
        {
          id: "4",
          type: "领券活动"
        },
        {
          id: "5",
          type: "签到活动"
        },
        {
          id: "6",
          type: "多多券卡券活动"
        },
        {
          id: "7",
          type: "游戏活动"
        },
        {
          id: "8",
          type: "积分活动"
        },
        {
          id: "12",
          type: "票类活动"
        },
        {
          id: "13",
          type: "签证活动"
        },
        {
          id: "14",
          type: "传绣球活动"
        }
      ],
      splmtPricingWayList: [
        { id: "1", type: "恒价" },
        { id: "2", type: "递增(减)" },
        { id: "3", type: "随机" }
      ],
      rules: {
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
      },
      payTypeConfig: []
    };
  },
  methods: {
    validForm() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const passed = await this.$checkMail({
            actId: this.form.actId,
            sendType: this.form.actId ? "actConfig" : "addAct",
            oldForm: this.oldForm,
            newForm: this.form
          });
          if (passed) {
            this.doSubmit();
          }
        } else {
          return false;
        }
      });
    },

    async loadMerchant() {
      this.submiting = true;
      let rs = await this.$get("merchant/get_merchant_list");
      if (rs.status == "200") {
        rs.payload.forEach(merchant => {
          merchant.checked = !!false;
        });
        this.merchantList = rs.payload;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async loadActivity(actId) {
      this.submiting = true;
      let rs = await this.$post("activity/get_act_one", { actId: actId });
      if (rs.status == "200") {
        this.form.actId = actId;
        this.form.actName = rs.payload.actName;
        this.form.actType = rs.payload.actType;
        this.form.merchantId = rs.payload.merchantId;
        this.form.detail = rs.payload.detail;
        this.form.startTime = moment(
          rs.payload.startTime,
          "YYYY-MM-DD HH:mm:ss"
        ).toDate();
        this.form.endTime = moment(
          rs.payload.endTime,
          "YYYY-MM-DD HH:mm:ss"
        ).toDate();

        this.form.overTime = rs.payload.overTime;
        this.form.highestPrice = rs.payload.highestPrice;
        this.form.lowestPrice = rs.payload.lowestPrice;
        this.form.actJoinNum = rs.payload.actJoinNum;
        this.form.maxBuyNum = rs.payload.maxBuyNum;
        this.form.actTemplate = rs.payload.actTemplate;
        this.form.templateConfig = rs.payload.templateConfig;
        this.form.maxIntegralNum = rs.payload.maxIntegralNum;
        this.form.minIntegralNum = rs.payload.minIntegralNum;
        this.form.valuationType = rs.payload.valuationType;
        this.form.checkLogin = rs.payload.checkLogin.toString();
        this.form.fullScreen = rs.payload.fullScreen.toString();
        this.imglist = [{ url: rs.payload.actIcon }];
        this.form.remarks = rs.payload.remarks;
        this.form.nonDefaultTotal = rs.payload.nonDefaultTotal;
        this.form.whiteLimitType = rs.payload.whiteLimitType + "";
        this.form.isFirstOrder = rs.payload.isFirstOrder + "";
        this.form.riskStatus = rs.payload.riskStatus + "";
        this.form.dataProjectStatus = rs.payload.dataProjectStatus + "";
        if (rs.payload.actType == "5" && rs.payload.valuationType) {
          this.form.is_open_buy = "1";
        }
        this.form.payType = [
          Number(rs.payload.payTypes),
          Number(rs.payload.payConfig)
        ];
        this.loadPayTypeConfig(this.form.merchantId);
        console.info(this.form);
        this.oldForm = JSON.parse(JSON.stringify(this.form));
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      if (this.form.actType == "5") {
        // 获取签到规则
        rs = await this.$post("signIn/get_sign_rule", { actId: actId });
        if (rs.status == "200") {
          this.form.splmtFlag = rs.payload.splmtFlag + "";
          this.form.splmtPricingWay = rs.payload.splmtPricingWay + "";
          this.form.splmtInitPrice = rs.payload.splmtInitPrice;
          this.form.splmtMinPrice = rs.payload.splmtMinPrice;
          this.form.splmtMaxPrice = rs.payload.splmtMaxPrice;
          this.form.splmtAddstepPrice = rs.payload.splmtAddstepPrice;
          this.form.splmtMaxTimes = rs.payload.splmtMaxTimes;
          this.form.splmtLimitDays = rs.payload.splmtLimitDays;
          this.form.ruleText = rs.payload.ruleText;
        } else {
          this.submiting = false;
          this.$message.error(rs.msg);
        }
      }
      this.submiting = false;
    },
    async doSubmit() {
      this.submiting = true;
      this.form.payTypeStr = JSON.stringify(this.form.payType);
      // console.info(this.form);
      if (this.imglist != "") {
        if (this.imglist[0].url) {
          this.form.actIcon = this.imglist[0].url;
        }
      }

      let rs;
      if (this.form.actType != "5") {
        rs = await this.$post("activity/save_activity", this.form);
      } else {
        if (this.form.is_open_buy == "0") {
          this.form.valuationType = "";
          this.form.highestPrice = "";
          this.form.lowestPrice = "";
        }
        rs = await this.$post("signIn/save_sign_rule", this.form);
      }

      if (rs.status == "200") {
        console.info("rs===" + rs.message);
        this.$message({
          message: rs.message,
          type: "success"
        });
        this.$emit("success", this.form);
        this.$router.go(-1);
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    close() {
      this.$router.go(-1);
    },
    async loadPayTypeConfig(merchantId) {
      this.submiting = true;
      let rs = await this.$post("merchant/payTypeConfig", {
        merchantId: merchantId
      });
      if (rs.status == "200") {
        let configList = rs.payload;
        for (let i = 0; i < configList.length; i++) {
          let payType = configList[i].payType;
          let children = configList[i].children;
          let configId = configList[i].configId;
          let rs = await this.$post("payConfig/query", { payType: payType });
          if (rs.status == "200") {
            // let moren = false;
            let payConfigList = rs.payload.list;
            let listObj = [];
            for (let j = 0; j < payConfigList.length; j++) {
              if (payConfigList[j].id == configId) {
                listObj.push({
                  label: payConfigList[j].configName,
                  value: payConfigList[j].id
                });
                break;
              }
            }
            if (children) {
              for (let c = 0; c < children.length; c++) {
                if (children[c] == configId) {
                  continue;
                }
                for (let j = 0; j < payConfigList.length; j++) {
                  if (payConfigList[j].id == children[c]) {
                    listObj.push({
                      label: payConfigList[j].configName,
                      value: payConfigList[j].id
                    });
                    break;
                  }
                }
              }
            }
            configList[i].children = listObj;
          }
        }
        this.payTypeConfig = configList;
      } else {
        this.$message.error(rs.error);
      }
      this.submiting = false;
    }
  },
  created() {
    this.loadMerchant();
    let actId = this.$route.params.actId;
    if (actId) {
      this.loadActivity(actId);
    } else {
      this.oldForm = JSON.parse(JSON.stringify(this.form));
    }
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
