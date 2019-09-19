<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="用户ID" prop="rid">
        <el-input v-model="form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户列表">
        <template>
          <el-transfer filterable :filter-method="filterMethod" :titles="['未授权商户', '已授权商户']"
            filter-placeholder="请输入商户名称" v-model="checkList" :props="{
      key: 'id',
      label: 'name'
    }" :data="merchantList">
          </el-transfer>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button @click="close" v-if="!submiting">取消</el-button>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SysRoleResponse from "@/api/modules/SysRoleResponse";
import MerchantResponse from "@/api/modules/MerchantResponse";
import UserMerchantVO from "@/api/modules/UserMerchantVO";
import MerchantVO from "@/api/modules/MerchantVO";
import { Form as ElForm, Row } from "element-ui";
import { AuthApi } from "@/api";
@Component
export default class ModuleForm extends Vue {
  @Prop({ default: {} }) private form!: SysRoleResponse;
  @Prop({ default: () => [] }) private merchantList!: MerchantResponse[];
  @Prop({ default: () => [] }) private merchantAuthList!: number[];
  private checkList: number[] = [];
  private submiting = false;
  private radio = 0;

  private close() {
    this.$emit("close");
  }

  @Watch("merchantAuthList")
  onMerchantAuthListChanged(val: number[], oldVal: number[]) {
    this.checkList = val;
  }
  private filterMethod(query: string, item: MerchantResponse) {
    return item.name.indexOf(query) > -1;
  }

  private async save() {
    let params = new UserMerchantVO();
    let list: any[] = [];
    let result = this.merchantList.filter(element => {
      if (this.checkList.indexOf(element.id) > -1) {
        return true;
      }
    });
    result.forEach(element => {
      list.push({ merchantId: element.id, merchantName: element.name });
    });
    params.merchantList = list;
    params.userId = this.form.id;
    params.roleId = this.form.rid;
    const rs = await AuthApi.saveRoleMerchantAuthUsingPOST(params);
    if (rs.status == 200) {
      this.$notify({
        title: "温馨提示",
        message: "保存成功",
        type: "success",
        duration: 2000
      });
      this.$emit("emit-save", this.form);
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
