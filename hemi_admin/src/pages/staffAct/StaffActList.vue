<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="sql">
                <el-input v-model="sql" placeholder="sql"></el-input>
            </el-form-item>
            <el-form-item label="logoImg">
                <el-input v-model="logoImg" placeholder="logoImg"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
            <el-form-item>
                <UploadButton ref="uploadused" :action="'staffAct/upload'+sql+'?logoImg='+logoImg" @success="success"></UploadButton>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="staffAct/query" :param="form" @loaded="loading=false" show-pager>
        </LayoutTable>
    </LayoutPage>
</template>

<script>
import UploadButton from "@/components/UploadButton2"
export default {
  components: {
    UploadButton
  },
  data () {
    return {
      form: {},
      loading: false,
      sql: "/商户ID/活动ID/规格ID/规格名",
      logoImg: "http://static.lianhaikeji.com/images/20181109/c6424fb6f1db47568199590b7a09ef44.jpg"
    }
  },
  methods: {
    onSearch () {
      this.loading = true
    },
    success (res) {
      this.uploading = true
      if (res.status == "200") {
        alert("完事完事")
      } else {
        this.$alert(res.error)
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
