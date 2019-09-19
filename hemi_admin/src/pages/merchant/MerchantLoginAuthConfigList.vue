<template>
  <LayoutPage>
    <LayoutTable ref="myTable" url="merchant/getMerchantAuthTypeConfig" :param="form" @loaded="loading=false">
      <!-- <el-table-column prop="authType" label="authType" width="100">
      </el-table-column> -->
      <el-table-column prop="name" label="名称" width="100">
      </el-table-column>
      <el-table-column prop="authStatus" label="配置" width="120">
        <template slot-scope="props">
          <el-button @click="delCofig(props.row)" v-if="!!(props.row.authStatus)">已启用</el-button>
          <el-button @click="createCofig(props.row)" v-else-if="!(props.row.authStatus) && (props.row.authType=='0' || props.row.authType=='10')">未启用</el-button>
          <el-tag type="danger" v-model="props.row.authStatus" v-else-if="props.row.authStatus">未启用</el-tag>
          <el-tag type="danger" v-model="props.row.authStatus" v-else>未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="配置选择" min-width="500">
        <template slot-scope="props">
          <el-tag type="info" v-if="props.row.authType=='0'">手机登录无需选择模版</el-tag>
          <el-tag type="info" v-if="props.row.authType=='10'">建行APP登录无需选择模版</el-tag>
          <el-button @click="dialogVisible=true" v-if="!!(props.row.authStatus)&& (props.row.authType=='10')">获取建行APP登录入口</el-button>
          <el-select v-model="props.row.configId" v-if="(props.row.authType!='0') && (props.row.authType!='10')" @change=" props.row.saveButtonStatus=true"
            placeholder="请选择登陆模版">
            <template v-if="props.row.authType=='1'">
              <el-option v-for="item in wechatAuthList" :key="item.id" :label="item.authName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='3'">
              <el-option v-for="item in bocAuthList" :key="item.id" :label="item.authName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='4'">
              <el-option v-for="item in icbcAuthList" :key="item.id" :label="item.authName" :value="item.id"></el-option>
            </template>
            <template v-if="props.row.authType=='6'">
              <el-option v-for="item in icbceAuthList" :key="item.id" :label="item.authName" :value="item.id"></el-option>
            </template>
          </el-select>
          <el-select v-model="props.row.scope" v-if="(props.row.authType=='6' || props.row.authType=='1') && props.row.configId"
                     @change=" props.row.saveButtonStatus=true" placeholder="请选择认证方式">
            <template v-if="props.row.authType=='1'">
              <el-option v-for="item in wechatScope" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </template>
            <template v-if="props.row.authType=='6'">
              <el-option v-for="item in icbceScope" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </template>
          </el-select>
          <el-button v-if="props.row.saveButtonStatus" @click="saveLoginAuth(props.row)" :loading="statusLoading">保存</el-button>
          <!-- <el-button v-if="!(props.row.authStatus)" @click="dispose(props.row)" v-model="props.row.authStatus" :loading="props.row.statusLoading">配置参数</el-button> -->
          <!-- <el-button v-else @click="dispose(props.row)" v-model="props.row.authStatus" :loading="props.row.statusLoading">修改配置</el-button> -->
        </template>
      </el-table-column>
    </LayoutTable>
    <el-dialog
      title="获取建行APP登录入口"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div>真实的活动地址 <input type="text" style="width: 100%;margin-top: 20px;" v-model="urlValue"></div>
      <div style="width:100%;margin-top: 20px; overflow-wrap: break-word;">建行APP登录入口</div>
      <div style="width:100%;margin-top: 20px; overflow-wrap: break-word;">{{str}}</div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="urlTransfer">获 取</el-button>
  </span>
    </el-dialog>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      urlValue: "",
      str: "",
      statusLoading: false,
      dialogVisible: false,
      wechatAuthList: [],
      bocAuthList: [],
      icbcAuthList: [],
      icbceAuthList: [],
      form: { id: this.$route.params.id },
      wechatScope: [{
        value: "snsapi_base",
        label: "静默登录(snsapi_base)"
      }, {
        value: "snsapi_userinfo",
        label: "授权登录(snsapi_userinfo)"
      }],
      icbceScope: [{
        value: "base",
        label: "静默登录"
      }, {
        value: "base:inner",
        label: "静默登录(行内号)"
      }, {
        value: "userallow",
        label: "授权登录"
      }]
    };
  },
  methods: {
    urlTransfer() {
      this.str = window.location.origin.replace("admin.", "") + `/customer/ccb/autoLogin/${
        this.form.id
      }?redirectUrl=${encodeURIComponent(this.urlValue)}`;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    async createCofig(prop) {
      this.$confirm("此操作将开启该商户" + prop.name + "登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.createCofigImpl(prop);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    },
    async createCofigImpl(prop) {
      let rs = await this.$post(
        "/merchant/createMerchantAuthConfigConnection/" + this.form.id + "/" + prop.authType
      );
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "开启成功"
        });
      } else {
        this.$message({
          type: "error",
          message: "开启失败," + rs.error
        });
      }
      this.onSearch();
    },
    async delCofig(prop) {
      this.$confirm(
        "此操作将导致该商户无法使用" + prop.name + "登录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.delCofigImpl(prop);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    },
    async delCofigImpl(prop) {
      let rs = await this.$post(
        "/merchant/delMerchantAuthConfigConnectionByAuthType",
        { merchantId: this.form.id, authType: prop.authType }
      );
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "关闭成功"
        });
      } else {
        this.$message({
          type: "error",
          message: "关闭失败," + rs.error
        });
      }

      this.onSearch();
    },
    async saveLoginAuth(merchant) {
      this.statusLoading = true;
      var rs = await this.$post("merchant/saveLoginAuthConfigConnection", {
        merchantId: this.$route.params.id,
        authType: merchant.authType,
        configId: merchant.configId,
        scope: merchant.scope
      });
      this.onSearch();
      if (rs.status == "200") {
        this.onSearch();
        this.$message({
          type: "success",
          message: "修改成功"
        });
      } else {
        this.$message({
          type: "error",
          message: rs.msg
        });
      }
      this.statusLoading = false;
    },
    dispose(merchant) {
      // 配置
      if (merchant.authType == "0") {
        // 手机 HandsetDispose
        this.$router.push(this.$route.path + "/handsetDispose/" + merchant.id);
      } else if (merchant.authType == "1") {
        // 微信开放平台 WxPlatformsDispose
        if (merchant.authStatus) {
          this.$router.push({
            path:
              "loginDispose/WxPlatformsDispose/" +
              merchant.id +
              "/" +
              merchant.configId
          });
        } else {
          this.$router.push({
            path: "loginDispose/WxPlatformsDispose/" + merchant.id
          });
        }
      } else if (merchant.authType == "2") {
        // 微信公众号 WxVipcnDispose
        this.$router.push({
          path: "loginDispose/WxVipcnDispose/" + merchant.id
        });
      } else if (merchant.authType == "3") {
        // 中行 BOCDispose
        this.$router.push({
          path: "loginDispose/BOCDispose/" + merchant.id
        });
      } else if (merchant.authType == "4") {
        // 工商银行 ICBCDispose
        this.$router.push({
          path: "loginDispose/ICBCDispose/" + merchant.id
        });
      } else if (merchant.authType == "5") {
        // 工行融e联 RYLDispose
        this.$router.push({
          path: "loginDispose/RYLDispose/" + merchant.id
        });
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async getLoginAuthListByType(type) {
      let rs = await this.$post("loginConfig/query", { loginType: type });
      if (rs.status == "200") {
        if (type == 1) {
          this.wechatAuthList = rs.payload.list;
        } else if (type == 3) {
          this.bocAuthList = rs.payload.list;
        } else if (type == 4) {
          this.icbcAuthList = rs.payload.list;
        } else if (type == 6) {
          this.icbceAuthList = rs.payload.list;
        }
      }
    }
  },
  created() {
    // 查询微信登陆模版
    this.getLoginAuthListByType(1);
    // 中行
    this.getLoginAuthListByType(3);
    // 工行
    this.getLoginAuthListByType(4);
    // 工行融E联
    this.getLoginAuthListByType(6);
  }
};
</script>

<style scoped>
</style>
