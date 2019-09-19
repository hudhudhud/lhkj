<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="推荐人号码">
        <el-input v-model="form.mainMobile" placeholder="输入推荐人号码查询"></el-input>
      </el-form-item>
      <el-form-item label="被推荐人号码">
        <el-input v-model="form.subMobile" placeholder="输入被推荐人号码查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <UploadButton ref="uploadused" action="refereeAudit/upload" @success="success"></UploadButton>
      </el-form-item>
      <el-form-item>
        <el-button @click="lookModule">查看上传样式</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="refereeAudit/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="记录ID" width="100">
      </el-table-column>
      <el-table-column prop="mainMobile" label="推荐人号码" width="150">
      </el-table-column>
      <el-table-column prop="subMobile" label="被推荐人号码" width="150">
      </el-table-column>
      <el-table-column prop="finishedTradeNum" label="已完成交易笔数" width="150">
      </el-table-column>
      <el-table-column prop="unfinishedTradeNum" label="未完成笔数" width="100">
      </el-table-column>
      <el-table-column prop="ctime" label="审核时间" width="180">
      </el-table-column>
      <el-table-column prop="issuccess" label="营销成功与否" width="150">
        <template slot-scope="props">
          <el-tag type="info" v-model="props.row.issuccess" v-if="props.row.issuccess=='0'">未成功</el-tag>
          <el-tag type="success" v-model="props.row.issuccess" v-else-if="props.row.issuccess=='1'">成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isAdd" label="营销成功发送积分状态" width="150">
        <template slot-scope="props">
          <el-tag type="info" v-model="props.row.isadd" v-if="props.row.isadd=='0'">未发送</el-tag>
          <el-tag type="success" v-model="props.row.isadd" v-else-if="props.row.isadd=='1'">发送成功</el-tag>
          <el-tag type="danger" v-model="props.row.isadd" v-else-if="props.row.isadd=='2'">发送失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="200">
        <template slot-scope="props">
          <el-button @click="resend(props.row)" :disabled="props.row.isadd == '1' || props.row.issuccess == '0'" plain>重新发送</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <span>{{msg}}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <LayoutDialog title="Excel模版" v-model="lookModuleStatus">
      <lookModuleForm @close="lookModuleStatus=false"></lookModuleForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import UploadButton from "@/components/UploadButton2"
import lookModuleForm from "./lookModuleForm"
export default {
  components: {
    UploadButton,
    lookModuleForm
  },
  data () {
    return {
      form: {},
      loading: false,
      key: "",
      stop: false,
      index: 0,
      uploading: false,
      dialogVisible: false,
      msg: "",
      lookModuleStatus: false
    }
  },
  methods: {
    lookModule () {
      this.lookModuleStatus = true
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    async resend (obj) {
      // console.log(obj)
      let rs = await this.$post("refereeAudit/resendByCredit", {
        id: obj.id,
        defType: "business"
      })
      if (rs.status == "200") {
        this.onSearch()
      } else {
        this.$message.error(rs.error)
      }
    },
    success (res) {
      this.uploading = true
      if (res.status == "200") {
        this.$alert(res.payload)
        this.$refs.myTable.search()
        this.emitChild(false)
      } else {
        if (res.status == "300") {
          this.key = res.payload
          this.findRedisKey(res.payload)
        } else {
          this.$alert(res.error)
        }
      }
    },
    async findRedisKey (key) {
      let res = await this.$post("refereeAudit/findRedisKey", {
        key: key
      })
      // console.log(res)
      if (res.status == "200") {
        if (res.message === "success") {
          // console.log("运行结束")
          this.uploading = false
          this.msg = res.payload
          this.dialogVisible = true
          this.$refs.myTable.search()
          this.emitChild(false)
        } else {
          setTimeout(() => {
            this.findRedisKey(key)
          }, 5000)
        }
      }
    },
    emitChild (val) {
      // console.log(this.$refs.uploadused)
      this.$refs.uploadused.$emit("loading", val)
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
