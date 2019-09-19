<template>
  <LayoutPage>
    <LayoutForm>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="卡券数量" prop="relationId">
          <el-input type="number" v-model="form.num"></el-input>
        </el-form-item>

        <el-form-item label="券码格式" prop="couponRang">
          <el-select v-model="form.numType" placeholder="请选择">
            <el-option v-for="item in couponRangList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="短链转换 ">
          <el-switch v-model="form.urlType" active-color="#13ce66" inactive-color="#D3D3D3" active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="form.urlType!='0'" label="短链域名">
          <el-input v-model="form.doMainurl"></el-input>
        </el-form-item>
        <el-form-item v-if="form.urlType!='0'" label="转换头域名">
          <el-input v-model="form.actUrl"></el-input>
        </el-form-item>
        <el-form-item label="渠道代码" prop="limitPrice">
          <el-input v-model.number="form.wayId "></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="validForm" :loading="submiting">导出</el-button>
          <el-button @click="close" v-if="!submiting">取消</el-button>
        </el-form-item>
      </el-form>
    </LayoutForm>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        couponId: "",
        wayId: "",
        num: "",
        numType: "",
        urlType: 0,
        doMainurl: "",
        actUrl: ""
      },
      submiting: false,
      roleList: [],
      couponRangList: [
        {
          id: 1,
          name: "12位数字组合"
        },
        {
          id: 2,
          name: "4位大写英文字母+4位数字+4位大写英文字母组合"
        },
        {
          id: 3,
          name: "12位数字组合特殊加密"
        }
      ],
      rules: {}
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
    async doSubmit() {
      this.submiting = true;

      let rs = await this.$post("coupon/getCouponStockList", this.form);

      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
        this.$message({
          message: rs.message,
          type: "success"
        });
        this.$emit("success", this.form);
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    close() {
      this.$router.go(-1);
    }
  },
  created() {
    this.form.couponId = this.$route.params.id;
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
