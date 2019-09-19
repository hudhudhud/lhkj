<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="导入:">
        <UploadButton :action="'white/uploadWhite?actId='+this.form.actId" @success="success "></UploadButton>
      </el-form-item>

      <el-form-item>
        <el-button @click="close " v-if="!submiting ">取消</el-button>
      </el-form-item>
    </el-form>
    <Layout-Dialog title="导入数据确认 " v-model="showDialog ">
      <div style="overflow:hidden">
        <div style="float:left;width:48%;margin-right:2%;">
          <el-table :data="previewList" style="width: f% " :max-height="500 " border>
            <el-table-column prop="account" label="充值号码 " width="180 ">
            </el-table-column>
          </el-table>
        </div>

      </div>
      <div style="text-align:right;margin-top:20px; ">
        <el-button @click="validForm " type="primary " :loading="importing ">确定导入</el-button>
      </div>
    </Layout-Dialog>

  </div>
</template>
<script>
import UploadButton from "@/components/UploadButton"
export default {
  components: {
    UploadButton
  },
  data () {
    return {
      previewList: [],
      importing: false,
      showDialog: false,

      form: {
        key: "",
        actId: this.$route.params.actId
      },
      submiting: false,
      activeName2: "first"
    }
  },
  created () {

  },
  methods: {

    success (res) {
      if (res.status == 200) {
        this.previewList = res.payload.previewList
        this.form.key = res.payload.key
        this.showDialog = true
      } else {
        this.$alert(res.msg)
      }
    },

    validForm (form) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    async doSubmit () {
      this.importing = true
      let rs = await this.$post("white/importWhite", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "导入成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
        this.importing = false
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
      this.showDialog = false
    },
    close () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
.textarea {
  box-sizing: border-box;
  min-height: 136px;
  max-height: 300px;
  margin-left: auto;
  margin-right: 300px;
  padding: 3px;
  outline: 0;
  border: 1px solid #a0b3d6;
  font-size: 14px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  _overflow-y: visible;
  -webkit-user-modify: read-write-plaintext-only;
  line-height: 18px;
}
.el-dialog__body {
  overflow: hidden;
}

.el-table__body,
.el-table__header {
  width: 100% !important;
}
</style>
