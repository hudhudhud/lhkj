<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="product/get_ticket_list" :param="form" @loaded="loading=false">
      <el-table-column prop="standardId" label="ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="standardName" label="商品名称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="baseProId" label="原始商品" width="100" align="center">
      </el-table-column>
      <el-table-column prop="baseStandardCode" label="原始规格code" width="200" align="center">
      </el-table-column>
      <el-table-column label="商品图片" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.standardImgUrl" v-if="props.row.standardImgUrl" style="width:100%;" />
        </template>
      </el-table-column>

      <el-table-column prop="staSord" label="排序" width="120" align="center">
      </el-table-column>
      <el-table-column prop="limitTotal" label="库存" width="100" align="center">
      </el-table-column>
      <el-table-column prop="usedTotal" label="领取数量" width="100" align="center">
      </el-table-column>
      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.standardStatus=="1"?"success":"info"'>{{ props.row.standardStatus=="1"?"上线":"下线" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="300">
        <template slot-scope="props">
          <el-button v-if="props.row.standardStatus=='0'" @click="online(props.row)" type="success" :loading="props.row.loading" plain>上线</el-button>
          <el-button v-if="props.row.standardStatus=='1'" @click="downline(props.row)" type="primary" :loading="props.row.loading" plain>下线</el-button>
          <el-button @click="edit(props.row)" type="success" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="del(props.row)" type="danger" :loading="props.row.loading" plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      form: {
        actId: this.$route.params.actId,
        proId: ""
      },
      loading: false,
      showDialog: false,
      activity: null
    }
  },
  methods: {

    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },

    edit (ticket) {
      this.$router.push({
        path: "/activity/ticket/" + this.form.actId + "/editTicket/" + ticket.standardId
      })
    },
    onAdd () {
      this.$router.push({
        path: "/activity/ticket/" + this.form.actId + "/addTicket"
      })
    },
    async editOnline (ticket) {
      let rs = await this.$post("product/update_standard_online", {standardId: ticket.standardId, standardStatus: ticket.standardStatus})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    online (ticket) {
      this.$confirm("确认要上线该商品吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.editOnline(ticket)
        this.$message({
          type: "success",
          message: "上线成功"
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        })
      })
    },
    downline (ticket) {
      this.$confirm("确认要下线该商品吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.editOnline(ticket)
        this.$message({
          type: "success",
          message: "下线成功"
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        })
      })
    },
    async dodel (ticket) {
      let rs = await this.$post("product/del_standard", {standardId: ticket.standardId})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    del (ticket) {
      this.$confirm("此操作将永久删除该商品,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.dodel(ticket)
        this.$message({
          type: "success",
          message: "删除成功"
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },

    created () {
    }
  }
}
</script>

<style scoped>
</style>
