<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="号码">
        <el-input v-model="form.mobile" placeholder="输入号码查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" plain>新增</el-button>
      </el-form-item>
      <el-form-item>
        {{this.$route.params.type=='0'?"上传白名单":"上传黑名单"}}
        <UploadButton v-if="UploadButtonStatus" :action="'mobileWhiteList/uploadMobile?type='+this.form.type+'&defId='+this.form.defId" @success="success">{{this.$route.params.type=='0'?"上传白名单":"上传黑名单"}}</UploadButton>
        <el-button v-else :loading="!UploadButtonStatus">上传中</el-button>
      </el-form-item>
      <el-form-item>
        {{this.$route.params.type=='0'?"上传删除白名单":"上传删除黑名单"}}
        <UploadButton v-if="UploadButtonStatus" :action="'mobileWhiteList/delUploadMobile?type='+this.form.type+'&defId='+this.form.defId" @success="delSuccess">{{this.$route.params.type=='0'?"上传删除白名单":"上传删除黑名单"}}</UploadButton>
        <el-button v-else :loading="!UploadButtonStatus">上传中</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="mobileWhiteList/getBWMobileList" :param="form" @loaded="loading=false" showPager>
      <el-table-column prop="id" label="ID" width="100">
      </el-table-column>
      <el-table-column prop="mobile" label="号码" width="200">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="del(props.row)" :loading="props.row.loading" plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="号码编辑" v-model="ShowDialog">
      <EditMoblieForm :bwMobile="bwMobile" @success="onSearch" @close="ShowDialog=false"></EditMoblieForm>
    </LayoutDialog>
  </LayoutPage>
</template>
<script>

import EditMoblieForm from "./EditMoblieForm"
import UploadButton from "@/components/UploadButton"
export default {
  components: {
    EditMoblieForm,
    UploadButton
  },
  data () {
    return {
      bwMobile: {},
      form: {
        type: this.$route.params.type, // 0白名单 1黑名单
        defId: this.$route.params.defId
      },
      loading: false,
      ShowDialog: false,
      UploadButtonStatus: true
    }
  },
  methods: {
    delSuccess (rs) {
      this.UploadButtonStatus = false
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: rs.payload
        })
        this.UploadButtonStatus = true
        this.$refs.myTable.search()
      } else if (rs.status == "300") {
        this.key = rs.payload
        this.delFindRedisKey(rs.payload)
      } else {
        this.UploadButtonStatus = true
        this.$message({
          type: "error",
          message: rs.message
        })
      }
    },
    success (rs) {
      this.UploadButtonStatus = false
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "导入成功"
        })
        this.UploadButtonStatus = true
        this.$refs.myTable.search()
      } else if (rs.status == "300") {
        this.key = rs.payload
        this.findRedisKey(rs.payload)
      } else {
        this.UploadButtonStatus = true
        this.$message({
          type: "error",
          message: rs.message
        })
      }
    },
    async findRedisKey (key) {
      let rs = await this.$post("mobileWhiteList/findRedisKey", {
        key: key
      })
      if (rs.payload) {
        this.UploadButtonStatus = true
        this.$message({
          type: "success",
          message: "上传完成"
        })
        this.$refs.myTable.search()
      } else {
        let this_ = this
        setTimeout(function () {
          this_.findRedisKey(key)
        }, 1000)
      }
    },
    async delFindRedisKey (key) {
      let rs = await this.$post("mobileWhiteList/findRedisKey", {
        key: key
      })
      if (rs.payload) {
        this.UploadButtonStatus = true
        this.$message({
          type: "success",
          message: rs.payload

        })
        this.$refs.myTable.search()
      } else {
        let this_ = this
        setTimeout(function () {
          this_.delFindRedisKey(key)
        }, 1000)
      }
    },
    onAdd () {
      this.bwMobile = {
        type: this.$route.params.type,
        defId: this.$route.params.defId
      }
      this.ShowDialog = true
    },
    edit (bwMobile) {
      this.bwMobile = bwMobile
      this.ShowDialog = true
    },
    del (bwMobile) {
      this.$confirm("此操作将永久删除该号码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delMobile(bwMobile)
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    async delMobile (bwMobile) {
      let rs = this.$post("mobileWhiteList/delMobile", {
        defId: bwMobile.defId,
        type: bwMobile.type,
        id: bwMobile.id
      })
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "删除成功!"
        })
      } else {
        this.$message({
          type: "error",
          message: rs.message
        })
      }
      this.$refs.myTable.search()
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    }
  },
  created () {

  }
}
</script>

<style scoped>
</style>
