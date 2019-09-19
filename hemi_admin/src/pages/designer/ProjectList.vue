<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="页面名称">
        <el-input v-model="form.pageName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="所属商户">
        <el-select v-model="form.merchantId">
          <el-option key="" value="" label="全部"></el-option>
          <el-option v-for="merchant in merchantList" :key="merchant.id" :value="merchant.id" :label="merchant.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="lego/queryForProject" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="项目ID" width="100">
      </el-table-column>
      <el-table-column prop="proName" label="项目名称" width="250">
      </el-table-column>
      <el-table-column prop="proDesc" label="项目描述" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="280" fixed="right">
        <template slot-scope="props">
          <el-button @click="pages(props.row)" :loading="props.row.loading">页面管理</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      merchantList: [],
      form: {
        pageName: "",
        merchantId: ""
      },
      loading: false
    }
  },
  methods: {
    async loadMerchant () {
      let rs = await this.$get("merchant/get_merchant_list")
      if (rs.status == 200) {
        this.merchantList = rs.payload
      }
    },
    onSearch () {
      this.$refs["myTable"].search()
    },
    pages (row) {
      this.$router.push("/lego/pages/" + row.id)
    }
  },
  created () {
    this.loadMerchant()
  }
}
</script>
