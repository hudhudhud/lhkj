<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="签到类型" prop="signType">
        <el-select v-model="form.signType" placeholder="请选择">
          <el-option v-for="item in signTypeList" :key="item.id" :label="item.type" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.signType!=3" label="目标天数" prop="signTimes">
        <el-input type="number" v-model="form.signTimes" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item v-if="form.signType!=3" label="领奖条件" prop="compare">
        <el-select v-model="form.compare">
          <el-option v-for="item in compareList" :key="item.key" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.signType!=3" label="领奖限制" prop="resetPeriod">
        <el-select v-model="form.resetPeriod" placeholder="请选择">
          <el-option v-for="item in resetPeriodList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.signType==3" label="签到日期" prop="signDate">
        <el-date-picker v-model="form.signDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="奖品类型" prop="prizeType">
        <el-select v-model="form.prizeType" placeholder="请选择">
          <el-option v-for="proType in proTypeList" :key="proType.id" :label="proType.type" :value="proType.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="奖品名称 " prop="prizeName ">
        <el-input v-model="form.prizeName "></el-input>
      </el-form-item>

      <el-form-item v-if="form.prizeType==5" label="积分类型">
        <el-select v-model="form.baseProId" placeholder="请选择">
          <el-option v-for="item in creditTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.prizeType==5" label="积分过期时间">
        <el-date-picker v-model="form.expiredTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item v-if="form.prizeType==3" label="抽奖活动">
        <el-select v-model="form.baseProId" placeholder="请选择抽奖活动">
          <el-option v-for="activity in activityList" v-if="activity.actType=='2'" :key="activity.id"
                     :label="activity.actName" :value="activity.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.prizeType==1 || form.prizeType==2" label="原始商品名称" prop="baseProId">
        <el-select v-model="form.baseProId" @change="loadBaseStandardCode" placeholder="请选择">
          <el-option v-for="basePro in baseProList" :key="basePro.id" :label="basePro.name" :value="basePro.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.prizeType==1 || form.prizeType==2" label="原始商品规格" prop="baseProStandardCode">
        <el-select v-model="form.baseProStandardCode" @change="initMerchantPrice" placeholder="请选择">
          <el-option v-for="baseStandard in baseStandardCodeList" :key="baseStandard.id" :label="baseStandard.name"
                     :value="baseStandard.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.prizeType==1 || form.prizeType==2" label="结算价格" prop="merchantPrice">
        <el-input type="number" v-model="form.merchantPrice"></el-input>
      </el-form-item>

      <el-form-item v-if="form.prizeType==1 || form.prizeType==2" label="飞鱼价格" prop="fishPrice">
        <el-input type="number" v-model="form.fishPrice"></el-input>
      </el-form-item>

      <el-form-item label="每次发放奖品数量">
        <el-input type="number" v-model="form.prizeNum"></el-input>
      </el-form-item>

      <el-form-item label="奖品总量">
        <el-input type="number" v-model="form.prizeTotal"></el-input>
      </el-form-item>
      <div v-if="form.prizeType==1">
        <el-form-item label="是否开放充值">
          <el-switch v-model="form.isOpenRecharge" active-color="#13ce66" inactive-color="" active-value="1"
                     inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item v-if="form.isOpenRecharge==1" label="充值账号名称 " prop="accountName ">
          <el-input v-model="form.accountName "></el-input>
        </el-form-item>

        <el-form-item v-if="form.isOpenRecharge==1" label="充值账号校验格式" prop="accountPattern">
          <el-input v-model="form.accountPattern"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="是否收费奖品" prop="isNeedPay">
        <el-switch v-model="form.isNeedPay" active-color="#13ce66" inactive-color="" active-value="1"
                   inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="form.isNeedPay=='1'" label="需要支付金额">
        <el-input v-model="form.payPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="奖品使用说明" prop="standardInstruction">
        <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.standardInstruction"></el-input>
      </el-form-item>

      <el-form-item label="奖品图片 " prop="imglist ">
        <UploadImages v-model="imglist " action="file/upload"></UploadImages>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="validForm " :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import UploadImages from "@/components/UploadImages"

export default {
  components: {
    UploadImages
  },
  data () {
    return {
      activityList: [],
      form: {
        id: "",
        actId: "",
        signType: "",
        signTimes: "",
        resetPeriod: "",
        signDate: "",
        prizeType: "",
        prizeName: "",
        prizeImg: "",
        prizeNum: 1,
        prizeTotal: "",
        baseProId: "",
        baseProStandardCode: "",
        accountName: "",
        accountPattern: "",
        isOpenRecharge: "1",
        merchantPrice: "",
        fishPrice: "",
        expiredTime: "",
        compare: "=",
        isNeedPay: "0",
        payPrice: "999999",
        standardInstruction: ""
      },
      mid: "",
      imglist: [],
      submiting: false,
      creditTypeList: [],
      baseProList: [],
      baseStandardCodeList: [],
      proTypeList: [
        {id: 1, type: "充值"},
        {id: 2, type: "卡密"},
        {id: 3, type: "抽奖机会"},
        // {id: 4, type: "卡券"},
        {id: 5, type: "积分"}
        // {id: 6, type: "补签机会"},
        // {id: 7, type: "签到机会"},
        // {id: 8, type: "谢谢惠顾"}
      ],
      rules: {},
      signTypeList: [
        {id: 1, type: "连续签到"},
        {id: 2, type: "累计签到"},
        {id: 3, type: "日期签到"}
      ],
      resetPeriodList: [
        {id: 0, name: "每人限领一次"},
        {id: 1, name: "每周限领一次"},
        {id: 2, name: "每月限领一次"},
        {id: 3, name: "每天限领一次"},
        {id: 4, name: "不限领取次数"}
      ],
      compareList: [
        {key: "=", name: "等于目标天数"},
        {key: ">", name: "大于目标天数"},
        {key: ">=", name: "大于等于目标天数"},
        {key: "<", name: "小于目标天数"},
        {key: "<=", name: "小于等于目标天数"},
        {key: "%=", name: "整除目标天数"}
      ]
    }
  },
  computed: {
    currentProd () {
      let pro = null
      if (this.form.baseProId) {
        this.baseProList.forEach(item => {
          if (item.id == this.form.baseProId) {
            pro = item
          }
        })
      }
      return pro
    }
  },
  methods: {
    initMerchantPrice (code) {
      for (let item of this.baseStandardCodeList) {
        if (item.code == code) {
          this.form.fishPrice = item.value / 100
          if (!this.form.merchantPrice) {
            this.form.merchantPrice = item.value * item.price_discount / 10000
          }
        }
      }
    },
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    async loadActList () {
      let rs = await this.$get("order/show_activity/" + this.mid)
      if (rs.status == "200") {
        this.activityList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
    },
    async loadSignPrize (lotteryId) {
      this.submiting = true
      let rs = await this.$post("signIn/get_sign_prize", {id: this.form.id})
      if (rs.status == "200") {
        let signPrize = rs.payload.list[0]
        this.form.actId = signPrize.actId
        this.form.signType = signPrize.signType
        this.form.signTimes = signPrize.signTimes
        this.form.resetPeriod = signPrize.resetPeriod
        this.form.signDate = signPrize.signDate
        this.form.prizeName = signPrize.prizeName
        this.form.prizeType = signPrize.prizeType
        this.form.prizeNum = signPrize.prizeNum
        this.form.prizeTotal = signPrize.prizeTotal
        this.form.baseProId = signPrize.baseProId
        this.loadBasePro()
        this.loadBaseStandardCode(this.form.baseProId)
        this.form.baseProStandardCode = signPrize.baseProStandardCode
        this.form.accountPattern = signPrize.accountPattern
        this.form.accountName = signPrize.accountName
        this.form.merchantPrice = signPrize.merchantPrice
        this.form.fishPrice = signPrize.fishPrice
        this.form.expiredTime = signPrize.expiredTime
        this.form.compare = signPrize.compare
        this.form.isNeedPay = signPrize.isNeedPay
        this.form.payPrice = signPrize.payPrice
        this.form.isOpenRecharge = signPrize.isOpenRecharge + ""
        this.form.standardInstruction = signPrize.standardInstruction
        this.imglist = signPrize.prizeImg ? [{url: signPrize.prizeImg}] : []
      }
      this.submiting = false
    },
    async loadCreditType () {
      let rs = await this.$post("activity/credit_type_list", {
        merchantId: this.mid
      });
      if (rs.status == "200") {
        this.creditTypeList = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
    },
    async loadBasePro () {
      this.submiting = true
      let rs = await this.$post("product/get_base_pro")
      if (rs.status == "200") {
        this.baseProList = rs.payload
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadBaseStandardCode (baseStandardCode) {
      this.form.baseProStandardCode = null
      let code = baseStandardCode
      console.info("code:" + code)
      this.submiting = true
      let rs = await this.$post("product/get_base_standard", {id: code})
      if (rs.status == "200") {
        this.baseStandardCodeList = rs.payload
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadAct (actId) {
      let rs = await this.$post("activity/get_act_one", {actId: actId})
      if (rs.status == "200") {
        this.mid = rs.payload.merchantId
        this.loadCreditType()
        this.loadActList()
      }
    },
    async doSubmit () {
      this.submiting = true
      if (this.imglist != "") {
        if (this.imglist[0].url) {
          this.form.prizeImg = this.imglist[0].url
        }
      }

      let rs = await this.$post("signIn/save_sign_prize", this.form)
      if (rs.status == "200") {
        console.info("rs===" + rs.message)
        this.$message({
          message: rs.message,
          type: "success"
        })
        this.$emit("success", this.form)
        this.$router.go(-1)
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    this.form.id = this.$route.params.id
    this.form.actId = this.$route.params.actId
    if (this.form.id) {
      this.loadSignPrize(this.form.id)
    }
    if (this.form.actId) {
      this.loadAct(this.form.actId)
    }
    this.loadBasePro()
  }
}
</script>

<style scoped>
  .form {
    position: relative;
  }
</style>
