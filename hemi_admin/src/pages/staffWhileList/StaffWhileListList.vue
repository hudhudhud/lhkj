<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="手机号">
                <el-input v-model="form.mobile" placeholder="输入号码查询"></el-input>
            </el-form-item>
            <el-form-item label="员工号">
                <el-input v-model="form.ehr" placeholder="输入员工号查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onAdd" plain>新增</el-button>
            </el-form-item>
            <el-form-item>
                <UploadButton v-if="uploading" ref="uploadused" action="staffWhileList/upload" @success="success"></UploadButton>
                <el-button v-else :loading="!uploading">上传中</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="staffWhileList/query" :param="form" @loaded="loading=false" show-pager>
            <el-table-column prop="ehr" label="员工号" width="150">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="150">
            </el-table-column>
            <!-- <el-table-column prop="status" label="状态" width="150">
                <template slot-scope="props">
                    <el-tag type="info" v-model="props.row.status" v-if="props.row.status=='0'">无效</el-tag>
                    <el-tag type="success" v-model="props.row.status" v-else-if="props.row.status=='1'">有效</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" fixed="right" min-width="200">
                <template slot-scope="props">
                    <el-button @click="edit(props.row)" plain>编辑</el-button>
                </template>
            </el-table-column>
        </LayoutTable>
        <LayoutDialog title="编辑" v-model="ShowDialog">
            <StaffWhileListForm :merchant="merchant" @success="onSearch" @close="ShowDialog=false"></StaffWhileListForm>
        </LayoutDialog>
    </LayoutPage>
</template>

<script>
import UploadButton from "@/components/UploadButton"
import StaffWhileListForm from "./StaffWhileListForm"
export default {
  components: {
    UploadButton,
    StaffWhileListForm
  },
  data () {
    return {
      form: {},
      loading: false,
      uploadused: false,
      merchant: null,
      ShowDialog: false,
      uploading: true
    }
  },
  methods: {
    onAdd () {
      this.merchant = null
      this.ShowDialog = true
    },
    edit (merchant) {
      this.ShowDialog = true
      this.merchant = merchant
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    success (res) {
      this.uploading = false
      if (res.status == "200") {
        this.uploading = true
        this.$message({
          type: "success",
          message: "共导入" + res.payload.count + ";导入成功" + res.payload.addCount + ";重复" + res.payload.noAddCount
        })
        if (res.payload.errList) {
          let list = res.payload.errList
          let msg = ""

          list.forEach(element => {
            msg += "号码:" + element.mobile + ",员工号:" + element.ehr + ""
          })
          this.$notify({
            title: "重复信息",
            message: msg,
            duration: 0,
            type: "warning"
          })
        }
        this.$refs.myTable.search()
      } else if (res.status == "300") {
        this.findRedisKey(res.payload)
      } else {
        this.$message.error("导入失败")
        this.uploading = true
      }
    },
    async findRedisKey (key) {
      let res = await this.$post("staffWhileList/findRedisKey", {
        key: key
      })
      if (res.payload.count) {
        this.uploading = true
        this.$message({
          type: "success",
          message: "共导入" + res.payload.count + ";导入成功" + res.payload.addCount + ";重复" + res.payload.noAddCount
        })
        if (res.payload.err) {
          this.$notify({
            title: "重复信息",
            message: res.payload.err,
            duration: 0,
            type: "warning"
          })
        }
        this.$refs.myTable.search()
      } else {
        setTimeout(() => {
          this.findRedisKey(key)
        }, 5000)
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
