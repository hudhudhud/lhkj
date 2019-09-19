<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色ID" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="模块权限配置" prop="module">
        <el-tree :data="modules" show-checkbox accordion node-key="mid" ref="tree" @check-change="getCheckedKeys"
          highlight-current :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio v-model="form.state" :label="1" border>正常</el-radio>
        <el-radio v-model="form.state" :label="0" border>禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button @click="close" v-if="!submiting">取消</el-button>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SysRoleResponse from "@/api/modules/SysRoleResponse";
import SysModuleResponse from "@/api/modules/SysModuleResponse";
import SysRoleVO from "@/api/modules/SysRoleVO";
import { AuthApi } from "@/api";
export default {
  props: ["form", "modules", "roleModuleList"],
  data() {
    return {
      submiting: false,
      radio: 0,
      params: {},
      result: null,
      defaultProps: {
        children: "children",
        label: "mname"
      }
    };
  },
  watch: {
    roleModuleList(val) {
      this.$refs.tree.setCheckedNodes(val);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getCheckedKeys() {
      this.result = this.$refs.tree.getCheckedKeys();
      console.log(this.result);
    },
    pullTreeChecked(result) {
      this.params.midList = result;
    },
    setJsTree() {
      this.$nextTick(() => {
        this.$refs["jsTree"].setCheckedKeys();
      });
    },
    async save() {
      const rs = await AuthApi.saveOrUpdateRoleUsingPOST(
        Object.assign({ midList: this.result }, this.form)
      );
      if (rs.status == 200) {
        this.$notify({
          title: "温馨提示",
          message: "保存成功",
          type: "success",
          duration: 2000
        });
        this.$emit("emit-save", this.form);
      }
    },
    validForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.save();
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
.form {
  position: relative;
}
</style>