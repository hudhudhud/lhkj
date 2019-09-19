<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="券定义ID" prop="couponDefineId">
        <el-select v-model="form.couponDefineId" @change="selectBatch" placeholder="请选择">
          <el-option v-for="item in batchList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成本单价" prop="sellSinglePrice">
        <el-input v-model="form.sellSinglePrice"></el-input>
      </el-form-item>
      <el-form-item label="过期时间" prop="passTime">
        <el-date-picker v-model="form.passTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择过期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
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
    batch: {
      require: true,
      type: Object
    }
  },
  data() {
    let form = {};
    if (this.batch) {
      form = {
        id: this.batch.id,
        couponDefineId: this.batch.couponDefineId,
        passTime: this.batch.ptime,
        sellSinglePrice: this.batch.sellSinglePrice,
        num: this.batch.num,
        remark: this.batch.remark
      };
    }
    return {
      submiting: false,
      form: form,
      batchList: [],
      rules: {
        ip: [
          { required: true, message: "请输入IP", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    selectBatch(e) {
      console.log(e);
      this.batchList.forEach(element => {
        if (element.id == this.form.couponDefineId) {
          this.form.sellSinglePrice = element.defaultCost;
        }
      });
    },
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
      let rs = await this.$post("colo/couponBatch/save", this.form);
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$emit("success", this.form);
        this.close();
      } else {
        this.submiting = false;
        this.$message.error(rs.error);
      }
      this.submiting = false;
    },
    async getBatchList() {
      var res = await this.$post("colo/couponDefine/get/list", {});
      console.log("res,", res);
      if (res.status == "200") {
        this.batchList = res.payload;
      } else {
        this.$message.error(res.error);
      }
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.getBatchList();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
