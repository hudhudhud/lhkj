<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="用户ID" prop="id" hidden>
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-radio v-model="form.status" :label="1" border>正常</el-radio>
        <el-radio v-model="form.status" :label="0" border>禁用</el-radio>
      </el-form-item> -->
      <el-form-item label="是否密码登录">
        <el-switch v-model="form.pwdLogin" active-color="#13ce66" inactive-color="" :active-value="1"
          :inactive-value="0"></el-switch>
      </el-form-item>

      <el-form-item label="角色">
        <el-checkbox v-for="role in roleList" :key="role.rid" :label="role.rid" v-model="checkList">{{role.name}}
          {{role.rid}}</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SysUserResponse from "@/api/modules/SysUserResponse";
import SysRoleResponse from "@/api/modules/SysRoleResponse";
import SysUserVO from "@/api/modules/SysUserVO";
import { Form as ElForm, Row } from "element-ui";
import AuthApi from "@/api/apis/AuthApi";

@Component
export default class ModuleForm extends Vue {
  @Prop({ default: {} }) private form!: SysUserVO;
  @Prop({ default: [] }) private roleList!: SysRoleResponse[];
  @Prop({ default: [] }) private roleIdList!: string[];
  private checkList: string[] = [];
  private showPath = true;
  private showRouter = true;
  private submiting = false;
  private close() {
    this.$emit("close");
  }
  @Watch("roleIdList")
  onMerchantAuthListChanged(val: string[], oldVal: string[]) {
    this.checkList = val;
  }

  private async save() {
    this.$set(this.form, "roleIdList", this.checkList);
    this.$set(this.form, "status", 1);
    const rs = await AuthApi.saveUserUsingPOST(this.form);
    if (rs.status == 200) {
      this.$notify({
        title: "温馨提示",
        message: "修改成功",
        type: "success",
        duration: 2000
      });
      this.$emit("emit-save", this.form);
    } else {
      this.$message.error(rs.error);
    }
  }
  private validForm() {
    (this.$refs.form as ElForm).validate(valid => {
      if (valid) {
        this.save();
      } else {
        return false;
      }
    });
  }
}
</script>


<style scoped>
.form {
  position: relative;
}
</style>
