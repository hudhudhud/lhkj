<template>
  <div class="password-reset">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="密码" prop="oldPassword">
        <el-input v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="newPasswordConfirm">
        <el-input v-model="form.newPasswordConfirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">修改</el-button>
        <el-button @click="$emit('close')" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { AuthApi } from "@/api";
export default {
  props: {
    show: {
      require: true,
      type: Boolean
    },
    uid: {
      require: true,
      type: Number
    },
  },
  data() {
    return {
      submiting: false,
      form: {
        uid: this.uid,
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ],
        newPasswordConfirm: [
          { required: true, message: "请确认新密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ]
      }
    }
  },
  watch: {
    show(val) {
      if (!val) {
        this.$refs["form"].resetFields()
      }
    }
  },
  methods: {
    validForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    async doSubmit() {
      this.submiting = true
      let rs = await AuthApi.changePasswordUsingPOST(this.form)
      if (rs.status == "200") {
        this.$message({
          message: "密码修改成功",
          type: "success"
        })
        this.$emit("close")
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    }
  }
}
</script>

<style scoped>
.password-reset {
  position: relative;
}
</style>
