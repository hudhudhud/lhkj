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
        <UploadButton :action="'mobileWhiteList/uploadMobile?type='+this.form.type+'&defId='+this.form.defId" @success="success">{{this.$route.params.type=='0'?"上传白名单":"上传黑名单"}}</UploadButton>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="mobileWhiteList/getBWMobileList" :param="form" @loaded="loading=false" showPager>
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="mobile" label="号码" width="200">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
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
      ShowDialog: false
    }
  },
  methods: {
    success (rs) {
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "导入成功"
        })
        this.$refs.myTable.search()
      } else {
        this.$message({
          type: "error",
          message: rs.message
        })
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
