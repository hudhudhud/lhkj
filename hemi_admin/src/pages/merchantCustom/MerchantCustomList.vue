<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname" placeholder="输入昵称查询"></el-input>
            </el-form-item>
            <el-form-item label="号码">
                <el-input v-model="form.tel" placeholder="输入号码查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="custom/query" :param="form" @loaded="loading=false" show-pager>
            <el-table-column prop="nickname" label="昵称" width="170">
            </el-table-column>
            <el-table-column prop="tel" label="号码" width="140">
            </el-table-column>
            <el-table-column prop="ctime" label="注册时间" width="180">
            </el-table-column>
            <el-table-column label="头像" width="150">
                <template slot-scope="props">
                    <img :src="props.row.headImgUrl" v-if="props.row.headImgUrl" style="width:35%;" />
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
                <template slot-scope="props">
                    <el-button @click="setStatusCode(props.row)" :type="props.row.statusCode=='1'?'success':'danger'" :loading="props.row.loading">{{props.row.statusCode=='1'?'有效':'冻结'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="props">
                    <!-- <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button> -->
                </template>
            </el-table-column>
        </LayoutTable>
    </LayoutPage>
</template>

<script>

export default {
  data () {
    return {
      form: {},
      loading: false
    }
  },
  methods: {
    async setStatusCode (custom) {
      this.loading = false
      var rs = await this.$post("custom/updateStatusCode", {
        id: custom.id,
        statusCode: custom.statusCode == "1" ? "0" : "1"
      })
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "修改成功"
        })
        this.onSearch()
      } else {
        this.$message({
          type: "error",
          message: rs.message
        })
      }
      this.loading = true
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
