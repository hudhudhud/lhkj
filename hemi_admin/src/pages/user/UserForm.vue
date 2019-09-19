<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="用户ID" prop="id" hidden>
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="form.state" label="1" border>正常</el-radio>
        <el-radio v-model="form.state" label="0" border>禁用</el-radio>
      </el-form-item>
      <el-form-item label="是否密码登录">
        <el-switch v-model="form.pwdLogin" active-color="#13ce66" inactive-color="" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>

      <el-form-item label="角色">
        <el-checkbox v-for="role in roleList" :key="role.rid" v-model="role.checked">{{role.rname}}</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      require: true,
      type: Object
    }
  },
  data() {
    // 如果有参数传入,则使用参数,否则使用默认值
    let form = null;
    if (this.user) {
      form = {
        id: this.user.id.toString(),
        uname: this.user.username,
        nickname: this.user.nickname,
        state: this.user.status,
        roleList: [],
        pwdLogin: this.user.pwdLogin + ""
      };
    } else {
      form = {
        id: "",
        uname: "",
        nickname: "",
        state: "1",
        roleList: [],
        pwdLogin: ""
      };
    }
    return {
      submiting: false,
      form: form,
      roleList: [],
      rules: {
        uname: [
          { required: true, message: "请输入账号", trigger: "change" },
          {
            min: 3,
            max: 40,
            message: "长度在 3 到 40 个字符",
            trigger: "change"
          }
        ],
        nickname: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 40,
            message: "长度在 3 到 40 个字符",
            trigger: "change"
          }
        ]
      }
    };
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
    async loadRole() {
      this.submiting = true;
      let rs = await this.$post("user/getUserRoles", this.user || {});
      if (rs.status == "200") {
        rs.payload.list.forEach(role => {
          role.checked = !!role.uid;
        });
        this.roleList = rs.payload.list;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async doSubmit() {
      this.submiting = true;
      this.form.roleList = this.roleList;
      let rs = await this.$post("user/save", this.form);
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$emit("success", this.form);
        this.close();
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.loadRole();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
