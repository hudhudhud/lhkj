<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="IP号">
        <el-input v-model="form.ip" placeholder="输入ip查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-button @click="onAdd">新增</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="merchantIp/getIpByMid" :param="form" @loaded="loading = false" show-pager>
      <!-- <el-table-column prop="id" label="编号" width="110">
            </el-table-column> -->
      <el-table-column label="商户名称" width="180" prop="name">
      </el-table-column>
      <el-table-column label="IP" width="180" prop="ip">
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
          <el-button @click="del(props.row)" :loading="props.row.loading">删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="IP配置" v-model="ipShowDialog">
      <EditMerchantIpFrom :merchant="merchant" @success="onSearch" @close="ipShowDialog=false"></EditMerchantIpFrom>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import EditMerchantIpFrom from "./ipDispose/EditMerchantIpFrom"
export default {
  components: {
    EditMerchantIpFrom
  },
  data () {
    return {
      form: {
        id: this.$route.params.id
      },
      ipShowDialog: false,
      loading: false,
      merchant: ""
    }
  },
  methods: {
    edit (merchant) {
      this.merchant = merchant
      this.ipShowDialog = true
    },
    onAdd () {
      this.merchant = {}
      this.ipShowDialog = true
    },
    async del (white) {
      if (confirm("确定删除IP吗？")) {
        white.loading = true
        let rs = await this.$post("merchantIp/delMerchantIpByid", {
          id: white.id,
          mid: this.$route.params.id
        })
        if (rs.status == "200") {
          this.$message({
            message: "删除成功",
            type: "success"
          })
          this.$emit("success")
          this.$emit("close")
          this.$refs.myTable.search()
        } else {
          this.$message.error(rs.msg)
        }
        white.loading = false
      }
    },
    onSearch () {
      this.loading = true
      this.catalog = null
      this.$refs.myTable.search()
    }
  },
  activated () {
    this.onSearch()
  }
}
</script>

<style scoped>
</style>
