<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="卡券名称" prop="couponName">
        <el-input v-model="form.couponName"></el-input>
      </el-form-item>

      <el-form-item label="卡券类型" prop="couponType">
        <el-select v-model="form.couponType" placeholder="请选择">
          <el-option v-for="item in couponTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="关联类型" prop="couponRang">
        <el-select v-model="form.couponRang" placeholder="请选择">
          <el-option v-for="item in couponRangList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="关联ID" prop="relationId">
        <el-input type="number" v-model="form.relationId"></el-input>
      </el-form-item>

      <el-form-item label="起始时间" prop="startTime">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <div v-if="form.couponType==1">
        <el-form-item label="满钱" prop="limitPrice">
          <el-input type="number" v-model.number="form.limitPrice "></el-input>
        </el-form-item>

        <el-form-item label="减少的钱" prop="couponPrice">
          <el-input type="number" v-model.number="form.couponPrice "></el-input>
        </el-form-item>
      </div>

      <el-form-item label="卡券使用规则描述" prop="couponRuleInstruction">
        <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" v-model="form.couponRuleInstruction"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>

import UploadImages from "@/components/UploadImages"

export default {
  components: {
    UploadImages
  },
  props: {
    activity: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      form: {
        id: "",
        relationId: "",
        couponType: "",
        couponName: "",
        couponRuleInstruction: "",
        couponRang: "",
        startTime: "",
        endTime: "",
        limitPrice: "",
        couponPrice: ""
      },
      imglist: [],
      submiting: false,

      roleList: [],
      merchantList: [],
      couponRangList: [
        {
          id: 1,
          name: "商户"
        },
        {
          id: 2,
          name: "活动"
        },
        {
          id: 3,
          name: "商品"
        }
      ],
      couponTypeList: [
        {
          id: 1,
          name: "满减"
        },
        {
          id: 2,
          name: "抵用"
        }
      ],
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
    async loadCoupon (id) {
      this.submiting = true
      let rs = await this.$post("coupon/queryCoupon", {id: id})
      if (rs.status == "200") {
        let coupon = rs.payload.list[0]
        this.form.id = coupon.id
        this.form.relationId = coupon.relationId
        this.form.couponType = coupon.couponType
        this.form.couponName = coupon.couponName
        this.form.couponRuleInstruction = coupon.couponRuleInstruction
        this.form.couponRang = coupon.couponRang
        this.form.startTime = coupon.startTime
        this.form.endTime = coupon.endTime
        this.form.limitPrice = coupon.limitPrice
        this.form.couponPrice = coupon.couponPrice
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true

      let rs = await this.$post("coupon/saveCoupon", this.form)

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
      this.loadCoupon(this.form.id)
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
