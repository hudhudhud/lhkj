<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="卡券类型">
        <el-radio-group v-model="form.couponType" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">满减</el-radio-button>
          <el-radio-button label="2">抵用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="卡券名称">
        <el-input v-model="form.couponName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="coupon/queryCoupon" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="卡券ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="couponType" label="卡券类型" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-if="props.row.couponType=='1'">满减</el-tag>
          <el-tag v-if="props.row.couponType=='2'">抵用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="couponName" label="卡券名称" width="100" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="550">
        <template slot-scope="props">
          <el-button @click="exportList(props.row.id)" type="primary " :loading="props.row.loading " plain>导出券码</el-button>
          <el-button @click="edit(props.row.id) " type="success " :loading="props.row.loading " plain>编辑</el-button>
          <el-button @click="del(props.row.id) " type="danger " :loading="props.row.loading " plain>删除</el-button>
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
        relationId: "",
        couponType: "",
        couponName: "",
        couponRuleInstruction: "",
        couponRang: ""
      },
      merchantList: [],
      loading: false,
      showDialog: false,
      activity: null,
      dialogVisible: false,
      link: ""

    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    edit (id) {
      this.$router.push({
        path: "/coupon/editCoupon/" + id
      })
    },
    onAdd () {
      this.$router.push({
        path: "/coupon/addCoupon"
      })
    },
    async dodel (id) {
      let rs = await this.$post("coupon/delCoupon", {id: id})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    del (id) {
      this.$confirm("此操作将永久删除该卡券,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.dodel(id)
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
    exportList (id) {
      this.$router.push({
        path: "/coupon/exportCouponStock/" + id
      })
    },
    async editOnline (activity) {
      let rs = await this.$post("activity/update_online", {actId: activity.actId, actStatus: activity.actStatus})
      if (rs.status == "200") {
        this.onSearch()
      }
    }
  },
  created () {
  }
}
</script>
