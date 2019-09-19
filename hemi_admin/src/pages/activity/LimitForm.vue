<template>
  <LayoutForm>
    <el-form :model="form" ref="form" label-width="100px">

      <el-form-item label="配置项" prop="limitStrategyId">
        <el-select v-model="form.limitStrategyId" placeholder="请选择">
          <el-option v-for="config in configList" :key="config.limitStrategyId" :value="config.limitStrategyId" :label="config.limitStrategyName">
            {{config.limitStrategyName}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="限制名称" prop="limitName">
        <el-input v-model="form.limitName"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="proSort">
        <el-input-number v-model="form.sort"></el-input-number>
      </el-form-item>

      <el-form-item v-for="configItem in configItemList" :key="'config_'+configItem.key" :label="configItem.name">
        <el-input v-model="configForm[configItem.key]" v-if="configItem.type=='text'"></el-input>
        <el-input-number v-model="configForm[configItem.key]" v-if="configItem.type=='number'"></el-input-number>
        <el-radio-group v-model="configForm[configItem.key]" v-if="configItem.type=='radio'">
          <el-radio :label="1">日</el-radio>
          <el-radio :label="2">周</el-radio>
          <el-radio :label="3">月</el-radio>
          <el-radio :label="4">年</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
        <el-button @click="close " v-if="!submiting ">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>

export default {

  data () {
    return {
      form: {
        relationId: this.$route.params.actId,
        limitStrategyId: "",
        limitName: "",
        limitConfigure: "",
        relationType: "",
        sort: ""
      },
      configItemList: [],
      configForm: null,
      configList: [],
      limitList: []
    }
  },
  computed: {
    currentConfig () {
      for (let i = 0; i < this.configList.length; i++) {
        if (this.form.limitStrategyId === this.configList[i].limitStrategyId) {
          return this.configList[i]
        }
      }
      return null
    }
  },
  watch: {
    currentConfig (val) {
      if (val && val.configure) {
        this.configItemList = JSON.parse(val.configure)
        let form = {}
        this.configItemList.forEach(item => {
          form[item.key] = item.default || ""
        })
        this.configForm = form
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

    async loadConfig () {
      this.submiting = true
      let rs = await this.$post("limit/get_configure", this.limitList)
      if (rs.status == "200") {
        this.configList = rs.payload
      } else {
        this.submiting = false
        this.$message.error("加载配置项失败！")
      }
      this.submiting = false
    },

    async selectLimitId (relationId, relationType) {
      this.submiting = true
      let rs = await this.$post("limit/get_limit_id",
        {relationId: relationId,
          relationType: relationType})

      if (rs.status == "200") {
        this.limitList = rs.payload
        this.loadConfig()
      } else {
        this.submiting = false
        this.$message.error("查询限制ID失败！")
      }
      this.submiting = false
    },

    async doSubmit () {
      this.submiting = true
      this.form.limitConfigure = this.configForm

      let rs = await this.$post("limit/", this.form)

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
    if (this.$route.params.id == "1") {
      this.form.relationType = "3"
    } else {
      this.form.relationType = "2"
    }

    this.selectLimitId(this.form.relationId, this.form.relationType)
    // this.loadConfig()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
