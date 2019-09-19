<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="用户名称">
        <el-input v-model="form.username" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd">新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="user/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="用户ID" width="100">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="customId" label="customId" width="100">
      </el-table-column>
      <el-table-column label="是否密码登录" width="200" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.pwdLogin=="1"?"success":"info"'>{{ props.row.pwdLogin=="1"?"是":"否" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.status=="1"?"success":"info"'>{{ props.row.status=="1"?"有效":"无效" }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button @click="resume(props.row)" type="success" v-if="props.row.status=='0'" :loading="props.row.loading">恢复</el-button>
          <el-button @click="dis(props.row)" type="danger" v-if="props.row.status=='1'" :loading="props.row.loading">禁用</el-button>
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
          <el-button @click="binding(props.row)" :loading="props.row.loading">绑定</el-button>

        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="扫码绑定" v-model="showQrcode">
      <div id="qrcode" ref="qrcode" class="qrcode"></div>
    </LayoutDialog>
    <LayoutDialog title="用户信息" v-model="showDialog">
      <UserForm :user="user" @success="onSearch" @close="showDialog=false"></UserForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import UserForm from "./UserForm";
import QRCode from "qrcodejs2";

export default {
  components: {
    UserForm,
    QRCode
  },
  data() {
    return {
      form: { username: "", status: "" },
      loading: false,
      showDialog: false,
      user: null,
      bindingURL: "",
      key: "",
      showQrcode: false
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    edit(user) {
      this.user = user;
      this.showDialog = true;
    },
    qrcode() {
      this.$el.querySelector("#qrcode").innerHTML = "";
      /* eslint-disable  no-unused-vars */
      let qrcode = new QRCode("qrcode", {
        width: 100, // 设置宽度
        height: 100, // 设置高度
        text: this.bindingURL
      });
    },

    async resume(user) {
      user.loading = true;
      let rs = await this.$post("user/setUserStatus", {
        id: user.id,
        status: "1"
      });
      if (rs.status === 200) {
        user.status = "1";
      }
      user.loading = false;
    },
    async dis(user) {
      user.loading = true;
      let rs = await this.$post("user/setUserStatus", {
        id: user.id,
        status: "0"
      });
      if (rs.status === 200) {
        user.status = "0";
      }
      user.loading = false;
    },
    async check(user) {
      if (this._checkIndex) {
        clearTimeout(this._checkIndex);
      }
      let rs = await this.$post(
        "loginBinding/check_binding_status?key=" + this.key
      );
      if (rs.status == 200 && rs.payload == "success") {
        alert("success");
        this.showQrcode = false;
      } else if (rs.payload == "timeout") {
        alert("超时");
        this.binding(user);
      } else {
        this._checkIndex = setTimeout(() => {
          this.check(user);
        }, 1000);
      }
    },

    async binding(user) {
      user.loading = true;

      let rs = await this.$post("loginBinding/generate_binding_url", {
        userId: user.id
      });

      if (rs.payload) {
        this.bindingURL = rs.payload.bindingURL;
        this.key = rs.payload.bindingKey;
      }
      // 生成二维码
      this.showQrcode = true;
      this.$nextTick(() => {
        this.qrcode();
      });
      this.check(user);
      console.info(rs);
      user.loading = false;
    },
    onAdd() {
      this.user = null;
      this.showDialog = true;
    }
  },
  beforeDestroy() {
    if (this._checkIndex) {
      clearTimeout(this._checkIndex);
    }
  }
};
</script>

<style scoped>
.qrcode {
  height: 200px;
  width: 200px;
}
</style>
