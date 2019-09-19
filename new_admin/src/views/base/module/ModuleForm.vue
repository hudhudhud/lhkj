<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="mid" prop="mid">
        <el-input v-model="form.mid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="pmid" prop="pmid">
        <el-input v-model="form.pmid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="level" prop="level">
        <el-input v-model="form.level" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="serialNo" prop="serialNo">
        <el-input v-model="form.serialNo"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="mname">
        <el-input v-model="form.mname"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="form.status" label="1" border>正常</el-radio>
        <el-radio v-model="form.status" label="0" border>禁用</el-radio>
      </el-form-item>
      <el-form-item label="是否需要登录" prop="loginState">
        <el-radio v-model="form.loginState" label="1" border>是</el-radio>
        <el-radio v-model="form.loginState" label="0" border>否</el-radio>
      </el-form-item>
      <el-form-item label="权限验证状态">
        <el-radio v-model="form.authState" label="1" border>正常</el-radio>
        <el-radio v-model="form.authState" label="0" border>禁用</el-radio>
      </el-form-item>

      <el-form-item label="类型" prop="type">
        <template slot-scope="props">
          <el-radio v-model="form.type" label="NODE" border @change="node()">NODE</el-radio>
          <el-radio v-model="form.type" label="URL" border @change="url()">URL</el-radio>
          <el-radio v-model="form.type" label="HIDDEN" border @change="hidden()">HIDDEN</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="API路由" prop="path" v-show="showPath">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="前端路由" prop="router" v-show="showRouter">
        <el-input v-model="form.router"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop,Watch } from "vue-property-decorator";
import SysModuleResponse from "@/api/modules/SysModuleResponse";
import SysUserResponse from "@/api/modules/SysUserResponse";
import { Form as ElForm, Row } from "element-ui";
import { saveModuleUsingPOST } from "./module";

@Component
export default class ModuleForm extends Vue {
  @Prop({ default: {} }) private form!: SysModuleResponse;
  private showPath = true;
  private showRouter = true;
  private submiting = false;
  private node() {
    this.showPath = false;
    this.showRouter = false;
    this.form.path = "";
    this.form.router = "";
  }
  private url() {
    this.showPath = true;
    this.showRouter = true;
  }
  private hidden() {
    this.showPath = true;
    this.showRouter = false;
    this.form.router = "";
  }
  private close() {
    this.$emit("close");
  }
  private validForm() {
    (this.$refs.form as ElForm).validate(valid => {
      if (valid) {
        this.$emit("emit-save", this.form);

        saveModuleUsingPOST(this.form, (rs: any) => {
          if (rs.status == 200) {
            this.$notify({
              title: "温馨提示",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
            this.$emit("emit-save", this.form);
          }
        });
      } else {
        return false;
      }
    });
  }

  @Watch("form.type", { immediate: true })
  private OnTypeChange(type: String) {
   if(type==='NODE'){
    this.showPath = false;
    this.showRouter = false;
   }
   else{
    this.showPath = true;
    this.showRouter = true;
   }
  }

}
</script>


<style scoped>
.form {
  position: relative;
}
</style>
