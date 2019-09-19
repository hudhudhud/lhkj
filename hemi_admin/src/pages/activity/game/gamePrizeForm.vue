<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="规格名称" prop="standardName">
        <el-input v-model="form.standardName"></el-input>
      </el-form-item>

      <el-form-item label="闯关数 " prop="num">
        <template>
          <el-input-number v-model="form.num " :min="1 " :max="100 "></el-input-number>
        </template>
      </el-form-item>

      <el-form-item label="最大分数" prop="num">
        <template>
          <el-input-number v-model="form.maxScore " :min="0" :max="100 "></el-input-number>
        </template>
      </el-form-item>

      <el-form-item label="最小分数" prop="num">
        <template>
          <el-input-number v-model="form.minScore " :min="0" :max="100 "></el-input-number>
        </template>
      </el-form-item>

      <el-form-item label="商品类型" prop="proType">
        <el-select v-model="form.proType" placeholder="请选择">
          <el-option v-for="proType in proTypeList" :key="proType.id" :label="proType.type" :value="proType.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.proType=='5'" label="积分类型" prop="creditType">
        <el-select v-model="form.creditType" clearable placeholder="请选择">
          <el-option v-for="creditType in creditTypeList" :key="creditType.id" :label="creditType.name" :value="creditType.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.proType!='5'" label="原始商品名称" prop="baseProId">
        <el-select v-model="form.baseProId" filterable clearable @change="loadBaseStandardCode" placeholder="请选择">
          <el-option v-for="basePro in baseProList" :key="basePro.id" :label="basePro.name" :value="basePro.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.proType!='5'" label="原始商品规格" prop="baseStandardCode">
        <el-select v-model="form.baseStandardCode" clearable @change="getFeiyuPrice" placeholder="请选择">
          <el-option v-for="baseStandard in baseStandardCodeList" :key="baseStandard.id" :label="baseStandard.name"
            :value="baseStandard.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="currentProd!=null&&currentProd.param_type=='0'" label="充值账号名称" prop="accountName">
        <el-select v-model="form.accountName" clearable @change="loadAccountPattern" placeholder="请选择">
          <el-option v-for="account in accountList" :key="account.id" :label="account.name" :value="account.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.accountName!=null&&form.accountName!=''&&currentProd!=null&&currentProd.param_type=='0'"
        label="充值账号校验格式" prop="accountPattern">
        <el-input v-model="form.accountPattern" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item v-if="form.actType==1" label="计价类型" prop="valuationType">
        <el-select v-model="form.valuationType" placeholder="请选择">
          <el-option v-for="valuation in valuationTypeList" :key="valuation.id" :label="valuation.type" :value="valuation.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.valuationType!=2&&form.proType!='5'" label="原价" prop="originalPrice">
        <el-input type="number" v-model.number="form.originalPrice "></el-input>
      </el-form-item>
      <el-form-item v-if="form.valuationType!=2&&form.proType!='5'" label="现价 " prop="currentPrice ">
        <el-input type="number" v-model.number="form.currentPrice "></el-input>
      </el-form-item>

      <!-- <el-form-item v-if="form.proType=='5'" label="积分数量" prop="currentPrice ">
        <el-input type="number" v-model.number="form.creditNum "></el-input>
      </el-form-item> -->

      <el-form-item label="商户价格" prop="merchantPrice ">
        <el-input type="number" v-model.number="form.merchantPrice "></el-input>
      </el-form-item>
      <el-form-item v-if="form.valuationType!=1" label="积分数量" prop="integralNum">
        <el-input v-model="form.integralNum"></el-input>
      </el-form-item>

      <el-form-item label="规格排序 " prop="standardSort">
        <template>
          <el-input-number v-model="form.standardSort " :min="1 " :max="10 "></el-input-number>
        </template>
      </el-form-item>

      <el-form-item v-if="currentProd!=null&&currentProd.id==3" label="是否开放充值 ">
        <el-switch v-model="form.isOpenRecharge" active-color="#13ce66" inactive-color="#D3D3D3" active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>

      <el-form-item v-if="this.form.actType!=3" label="库存" prop="limitTotal">
        <el-input type="number" v-model="form.limitTotal "></el-input>
      </el-form-item>

      <el-form-item label="使用说明" prop="standardInstruction">
        <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.standardInstruction"></el-input>
      </el-form-item>
      <el-form-item label="规格图片" prop="homeImgList ">
        <UploadImages v-model="homeImgList" action="file/upload"></UploadImages>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import UploadImages from "@/components/UploadImages";

export default {
  components: {
    UploadImages
  },

  data() {
    return {
      form: {
        proId: this.$route.params.proId,
        id: this.$route.params.standardId,
        actId: this.$route.params.actId,
        proType: "",
        standardName: "",
        baseProId: "",
        baseStandardCode: "",
        originalPrice: "",
        currentPrice: "",
        standardSort: "",
        standardImgUrl: "",
        limitTotal: "",
        limitPerTime: "",
        accountPattern: "",
        accountName: "",
        actType: "",
        standardInstruction: "",
        isOpenRecharge: "",
        valuationType: 1,
        integralNum: "",
        standardPrompt: "",
        merchantPrice: "",
        num: "",
        classifyName: "",
        maxScore: "0",
        minScore: "0",
        creditNum: "",
        merchantId: ""
      },
      homeImgList: [],
      submiting: false,
      baseProList: [],
      baseStandardCodeList: [],
      classifyList: [],
      valuationTypeList: [
        {
          id: 1,
          type: "纯现金"
        },
        {
          id: 2,
          type: "纯积分"
        },
        {
          id: 3,
          type: "现金积分二选一"
        },
        {
          id: 4,
          type: "混合使用"
        }
      ],
      proTypeList: [
        {
          id: "1",
          type: "充值"
        },
        {
          id: "2",
          type: "卡密"
        },
        {
          id: "3",
          type: "资产"
        },
        {
          id: "5",
          type: "积分"
        },
        {
          id: "9",
          type: "实物"
        }
      ],
      accountList: [
        {
          id: "1",
          name: "手机号"
        },
        {
          id: "2",
          name: "QQ号"
        },
        {
          id: "3",
          name: "淘宝会员名"
        },
        {
          id: "4",
          name: "中石化油卡账号"
        },
        {
          id: "5",
          name: "中石油油卡账号"
        }
      ],
      creditTpyeList: [
        {
          id: "1",
          name: "黄金"
        },
        {
          id: "2",
          name: "紫金"
        },
        {
          id: "3",
          name: "白金"
        }
      ],
      rules: {
        originalPrice: [
          { required: true, message: "原价不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字格式" }
        ],
        currentPrice: [
          { required: true, message: "现价不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字格式" }
        ],
        standardName: [
          { required: true, message: "规格名称不能为空", trigger: "blur" }
        ],
        limitTotal: [
          { required: true, message: "库存不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    currentProd() {
      let pro = null;
      if (this.form.baseProId) {
        this.baseProList.forEach(item => {
          if (item.id == this.form.baseProId) {
            pro = item;
          }
        });
      }
      return pro;
    }
  },
  methods: {
    validForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit();
        } else {
          return false;
        }
      });
    },
    loadAccountPattern(id) {
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
    getFeiyuPrice(id) {
      if (id) {
        this.baseStandardCodeList.forEach(item => {
          if (item.code == id) {
            console.info("item.value" + item.value);
            this.form.merchantPrice =
              (Number(item.value) * item.price_discount) / 10000;
          }
        });
      }
    },
    async loadStandard(standardId) {
      this.submiting = true;
      let rs = await this.$post("product/get_standard_one", {
        standardId: standardId
      });
      if (rs.status == "200") {
        this.form.standardName = rs.payload.standardName;
        this.form.baseProId = rs.payload.baseProId;
        this.loadBaseStandardCode(this.form.baseProId);
        this.form.baseStandardCode = rs.payload.baseStandardCode;
        this.form.limitTotal = rs.payload.limitTotal;
        this.form.limitPerTime = rs.payload.limitPerTime;
        this.form.originalPrice = rs.payload.originalPrice;
        this.form.currentPrice = rs.payload.currentPrice;
        this.form.standardSort = rs.payload.standardSort;
        this.form.accountPattern = rs.payload.accountPattern;
        this.form.accountName = rs.payload.accountName;
        this.form.proType = rs.payload.proType;
        this.form.standardInstruction = rs.payload.standardInstruction;
        this.form.isOpenRecharge = rs.payload.isOpenRecharge.toString();
        this.form.integralNum = rs.payload.integralNum;
        this.form.valuationType = rs.payload.valuationType;
        this.homeImgList = [{ url: rs.payload.standardImgUrl }];
        this.form.isCoupon = rs.payload.isCoupon.toString();
        this.form.standardPrompt = rs.payload.standardPrompt;
        this.form.merchantPrice = rs.payload.merchantPrice;
      }
      this.submiting = false;
    },

    async loadCreditType() {
      this.submiting = true;
      let rs = await this.$post("credit/type/list", {
        merchantId: this.form.merchantId
      });
      if (rs.status == "200") {
        this.creditTypeList = rs.payload;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async loadMerchant() {
      let rs = await this.$post("credit/type/list", {
        actId: this.form.actId
      });

      if (rs.status == "200") {
        this.creditTypeList = rs.payload;
      } else {
        this.submiting = false;
      }
    },
    async loadBasePro() {
      this.submiting = true;
      let rs = await this.$post("product/get_base_pro");
      if (rs.status == "200") {
        this.baseProList = rs.payload;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async loadActType() {
      this.submiting = true;
      let rs = await this.$post("product/get_actType", {
        id: this.form.id,
        proId: this.form.proId
      });
      if (rs.status == "200") {
        this.form.actType = rs.payload.actType;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async loadBaseStandardCode(baseStandardCode) {
      this.form.baseStandardCode = null;
      let code = baseStandardCode;

      console.info("code:" + code);
      this.submiting = true;
      let rs = await this.$post("product/get_base_standard", { id: code });
      if (rs.status == "200") {
        this.baseStandardCodeList = rs.payload;
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async doSubmit() {
      this.submiting = true;
      if (this.homeImgList != "") {
        if (this.homeImgList[0].url) {
          this.form.standardImgUrl = this.homeImgList[0].url;
        }
      }

      let rs = await this.$post("game/save_game_prize", this.form);
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
    }
  },
  created() {
    let standardId = this.$route.params.standardId;
    if (standardId) {
      this.loadStandard(standardId);
    }
    this.loadBasePro();
    this.loadMerchant();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
