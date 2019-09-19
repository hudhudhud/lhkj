<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="用户名称">
        <el-input v-model="form.username" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="user/query/user_merchant_auth" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="用户ID" width="100">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.status=="1"?"success":"info"'>{{ props.row.status=="1"?"有效":"无效" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button @click="authMerchant(props.row)" type="success" :loading="props.row.loading">商户配置</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="商户配置信息" v-model="showDialog">
      <MerchantAuth :user="user" @success="onSearch" @close="showDialog=false"></MerchantAuth>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import MerchantAuth from "./MerchantAuth"

export default {
  components: {
    MerchantAuth
  },
  data () {
    return {
      form: { username: "" },
      loading: false,
      showDialog: false,
      user: null
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    authMerchant (user) {
      this.user = user
      this.showDialog = true
    }
  }
}
</script>

<style scoped>
</style>
