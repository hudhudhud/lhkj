<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="商户名称">
        <el-input v-model="form.mname" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="无效" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" v-if="$hasAuth('02060100000000000000')" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="merchant/showMerchant" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="商户ID" width="100">
      </el-table-column>
      <el-table-column prop="name" label="商户名称" width="200">
      </el-table-column>
      <el-table-column prop="balance" label="余额" width="100">
      </el-table-column>
      <el-table-column label="跳过登陆" width="175" align="center">
        <template slot-scope="props">
          <el-button @click="setSkipLogin(props.row)" v-if="props.row.skipLogin==1" type="success" :loading="props.row.loading">已开启</el-button>
          <el-button @click="setSkipLogin(props.row)" v-else-if="props.row.skipLogin==0" type="warning" :loading="props.row.loading">未开启</el-button>
          <el-tag type="danger" v-else>custom无对应商户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="滑块验证" width="105" align="loginSlipFlag">
        <template slot-scope="props">
          <el-button v-if="props.row.loginSlipFlag==1 || props.row.loginSlipFlag==0" @click="setLoginSlipFlag(props.row)"
            :type="props.row.loginSlipFlag==1?'success':'warning'" :loading="props.row.loaded">{{props.row.loginSlipFlag==1?'已开启':'未开启'}}</el-button>
          <el-tag type="danger" v-else>custom无对应商户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.status=="1"?"success":"info"'>{{ props.row.status=="1"?"可用":"无效" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="1400">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" type="success" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="activityMerchantConfig(props.row)" :loading="props.row.loading" plain>活动页配置</el-button>
          <el-button @click="platformConfig(props.row)" :loading="props.row.loading" plain>平台配置</el-button>
          <el-button @click="smsConfig(props.row)" :loading="props.row.loading" plain>短信模版配置</el-button>
          <el-button @click="authConfig(props.row)" :loading="props.row.loading" plain>认证配置</el-button>
          <el-button @click="payConfig(props.row)" :loading="props.row.loading" plain>支付配置</el-button>
          <el-button @click="ipConfig(props.row)" :loading="props.row.loading" plain>IP白名单配置</el-button>
          <el-button @click="institution(props.row)" :loading="props.row.loading" plain>地区配置</el-button>
          <el-button @click="department(props.row)" :loading="props.row.loading" plain>部门配置</el-button>
          <el-button @click="phoneLocationLimitConfig(props.row)" :loading="props.row.loading" plain>登录限制配置</el-button>
          <el-button @click="loginConfig(props.row)" :loading="props.row.loading" plain>登录界面配置</el-button>
          <el-button @click="updateToken(props.row)" type="danger" :loading="loading">重置TOKEN</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="短信模版配置" v-model="smsShowDialog">
      <SmsConfigForm :merchant="merchant" @success="onSearch" @close="smsShowDialog=false"></SmsConfigForm>
    </LayoutDialog>
    <LayoutDialog v-if="merchant" :title="merchant.name+'登录界面配置'" v-model="loginPageConfigShowDialog">
      <MerchantLoginPageConfigForm :merchant="merchant" @success="onSearch" @close="loginPageConfigShowDialog=false"></MerchantLoginPageConfigForm>
    </LayoutDialog>
    <LayoutDialog v-if="merchant" :title="merchant.name+'平台配置'" v-model="platformConfigShowDialog">
      <PlatformConfigForm :merchant="merchant" @success="onSearch" @close="platformConfigShowDialog=false"></PlatformConfigForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import SmsConfigForm from "./SmsConfigForm";
import MerchantLoginPageConfigForm from "./MerchantLoginPageConfigForm";
import PlatformConfigForm from "./PlatformConfigForm";

export default {
  components: {
    SmsConfigForm,
    MerchantLoginPageConfigForm,
    PlatformConfigForm
  },
  data() {
    return {
      form: { mname: "", status: "" },
      loading: false,
      authShowDialog: false,
      showDialog: false,
      showConfigDialog: false,
      smsShowDialog: false,
      errShowDialog: false,
      merchant: null,
      payType: "",
      merchantId: "",
      errReturnMsg: "",
      loginPageConfigShowDialog: false,
      platformConfigShowDialog: false
    };
  },
  methods: {
    // 登录界面配置
    loginConfig(merchant) {
      this.merchant = merchant;
      this.loginPageConfigShowDialog = true;
    },
    platformConfig(merchant) {
      this.merchant = merchant;
      this.platformConfigShowDialog = true;
    },
    async institution(merchant) {
      var rs = await this.$post("activity/get_first_institution", {
        merchantId: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "该商户没有下属机构"
        });
        return false;
      }

      this.$router.push({
        path: "merchant/institution/" + merchant.id
      });
    },
    async department(merchant) {
      this.$router.push({
        path: "merchant/department/" + merchant.id
      });
    },
    async setErrReturnMsg(merchant) {
      var rs = await this.$post("merchant/getCustomMerchantByMercahntId", {
        id: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        });
        return false;
      }
      this.merchant = {
        id: rs.payload.id,
        errReturnMsg: rs.payload.errReturnMsg
      };
      this.errShowDialog = true;
    },
    async updateToken(merchant) {
      let success = await this.$checkPassWord();
      if (success) {
        let rs = await this.$post("merchant/updateMerchantTokenSecret", {
          merchtId: merchant.id
        });
        if (rs.status == "200") {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            type: "error",
            message: rs.message
          });
        }
      }
    },
    async activityMerchantConfig(merchant) {
      this.$router.push({
        path: "merchant/templateConfig/" + merchant.id
      });
    },
    async updateMerchantLoginSlipFlag(merchant) {
      this.loading = true;
      let rs = await this.$post("merchant/updateMerchantLoginSlipFlag", {
        merchantId: merchant.id,
        loginSlipFlag: merchant.loginSlipFlag == "1" ? 0 : 1
      });
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      }
      this.onSearch();
      this.loading = false;
    },
    // 滑块验证
    async setLoginSlipFlag(merchant) {
      this.$confirm(
        merchant.loginSlipFlag == "1"
          ? "此操作将关闭滑块验证, 是否继续?"
          : "此操作将开启滑块验证, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.updateMerchantLoginSlipFlag(merchant);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    },
    async updateMerchantSkipLogin(merchant) {
      this.loading = true;
      let rs = await this.$post("merchant/updateMerchantSkipLogin", {
        merchantId: merchant.id,
        skipLogin: merchant.skipLogin == "1" ? 0 : 1
      });
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      }
      this.onSearch();
      this.loading = false;
    },
    // 跳过登陆配置
    async setSkipLogin(merchant) {
      this.$confirm(
        merchant.skipLogin == "1"
          ? "此操作将关闭跳过登陆, 是否继续?"
          : "此操作将开启跳过登陆, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.updateMerchantSkipLogin(merchant);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    },
    // 短信模版配置
    async smsConfig(merchant) {
      var rs = await this.$post("merchant/getCustomMerchantByMercahntId", {
        id: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        });
        return false;
      }
      this.merchant = {
        id: rs.payload.id,
        smsModel: rs.payload.smsModel
      };
      this.smsShowDialog = true;
    },
    // 限制配置
    async phoneLocationLimitConfig(merchant) {
      var rs = await this.$post("merchant/getCustomMerchantByMercahntId", {
        id: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        });
        return false;
      }
      this.$router.push({
        path: "merchant/phoneLocationLimitConfig/" + merchant.id
      });
    },
    async ipConfig(merchant) {
      var rs = await this.$post("merchant/getCustomMerchantByMercahntId", {
        id: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        });
        return false;
      }
      this.$router.push({
        path: "merchant/ipAuth/" + merchant.id + "/ipDispose"
      });
    },
    async authConfig(merchant) {
      var rs = await this.$post("merchant/getCustomMerchantByMercahntId", {
        id: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        });
        return false;
      }
      this.$router.push({
        path: "merchant/loginAuth/" + merchant.id + "/loginDispose"
      });
    },
    async payConfig(merchant) {
      var rs = await this.$post("merchant/getCustomMerchantByMercahntId", {
        id: merchant.id
      });
      if (!rs.payload) {
        this.$message({
          type: "error",
          message: "Custom库内未找到该商户"
        });
        return false;
      }
      this.$router.push({
        path: "merchant/payAuth/" + merchant.id + "/payDispose"
      });
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    edit(merchant) {
      this.merchant = merchant;
      this.$router.push({
        path: "merchant/edit/" + merchant.id
      });
    },
    onAdd() {
      this.merchant = null;
      this.$router.push({
        path: "merchant/add"
      });
    },
    async dodel(merchant) {
      this.merchant = merchant;
      let rs = await this.$post("merchant/del", { merchantId: merchant.id });
      if (rs.status == "200") {
        this.onSearch();
      }
    },
    del(merchant) {
      this.$confirm("此操作将永久删除该商户,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dodel(merchant);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
