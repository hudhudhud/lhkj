<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="目标地址" prop="tagetUrl">
        <el-input v-model="form.tagetUrl"></el-input>
      </el-form-item>

      <el-form-item label="限制时长" prop="duration">
        <el-input v-model="form.duration" type="number"></el-input>
      </el-form-item>

      <el-form-item label="时长单位" prop="durationUnit">
        <el-select v-model="form.durationUnit" placeholder="请选择">
          <el-option v-for="item in durationUnits" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="冻结时长" prop="freezeDuration">
        <el-input v-model="form.freezeDuration" type="number"></el-input>
      </el-form-item>

      <el-form-item label="冻结时长单位" prop="freezeDurationUnit">
        <el-select v-model="form.freezeDurationUnit" placeholder="请选择">
          <el-option v-for="item in durationUnits" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最多访问次数" prop="requestMaxTimes">
        <el-input type="number" v-model="form.requestMaxTimes"></el-input>
      </el-form-item>

      <el-form-item label="优先级（越大越优先）" prop="priority">
        <el-input type="number" v-model="form.priority"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: "",
        tagetUrl: "",
        duration: "",
        durationUnit: "",
        requestMaxTimes: "",
        freezeDuration: "",
        freezeDurationUnit: "",
        priority: ""
      },
      durationUnits: [
        {
          "id": 0,
          "name": "毫秒"
        },
        {
          "id": 1,
          "name": "秒"
        },
        {
          "id": 2,
          "name": "分钟"
        },
        {
          "id": 3,
          "name": "小时"
        },
        {
          "id": 4,
          "name": "天"
        }
      ],
      submiting: false,
      roleList: [],
      rules: {
      }
    }
  },
  methods: {
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    async loadForm (id) {
      this.submiting = true
      let rs = await this.$post("apiRequestLimit/queryApiRequestLimitWhithPage", {id: id})
      if (rs.status == "200") {
        let item = rs.payload
        this.form.id = item.id
        this.form.tagetUrl = item.tagetUrl
        this.form.duration = item.duration
        this.form.durationUnit = item.durationUnit
        this.form.freezeDuration = item.freezeDuration
        this.form.freezeDurationUnit = item.freezeDurationUnit
        this.form.requestMaxTimes = item.requestMaxTimes
        this.form.priority = item.priority
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true
      let rs = await this.$post("apiRequestLimit/saveApiRequestLimit", this.form)
      if (rs.status == "200") {
        console.info("rs===" + rs.message)
        this.$message({
          message: rs.message,
          type: "success"
        })
        this.$emit("success", this.form)
        this.$router.go(-1)
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    this.form.id = this.$route.params.id
    if (this.form.id) {
      this.loadForm(this.form.id)
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
