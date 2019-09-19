<template>
  <LayoutPage>
    <LayoutSearch>

      <!-- <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/signIn/get_sign_prize" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="奖励规则ID" width="100" align="center">
      </el-table-column>
      <el-table-column label="签到类型" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-if="props.row.signType=='1'">连续签到</el-tag>
          <el-tag v-if="props.row.signType=='2'">累计签到</el-tag>
          <el-tag v-if="props.row.signType=='3'">日期签到</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="signTimes" label="目标天数" width="100" align="center">
      </el-table-column>
      <el-table-column label="领奖条件" width="150" align="center">
        <template slot-scope="props">
          <el-tag>{{compareMap[props.row.compare?props.row.compare:"="]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="领奖限制" width="150" align="center">
        <template slot-scope="props">
          <el-tag>{{resetPeriodMap[props.row.resetPeriod]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="signDate" label="签到日期" width="100" align="center">
        <template slot-scope="props" v-if="props.row.signDate">
          {{props.row.signDate.substr(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="prizeType" label="奖品类型" width="100" align="center">
        <template slot-scope="props">
          {{proTypeList[props.row.prizeType]}}
        </template>
      </el-table-column>
      <el-table-column prop="prizeName" label="奖品名称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="prizeTotal" label="奖品总量" width="100" align="center">
      </el-table-column>
      <el-table-column prop="usedNum" label="已使用量" width="100" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="300">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" type="success" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="del(props.row) " type="danger " :loading="props.row.loading " plain>删除</el-button>
          <!-- <el-button @click="winningRecord(props.row)" type="primary" :loading="props.row.loading" plain>中奖纪录</el-button> -->
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      resetPeriodMap: {
        "0": "每人限领一次",
        "1": "每周限领一次",
        "2": "每月限领一次",
        "3": "每天限领一次",
        "4": "不限领取次数"
      },
      compareMap: {
        "=": "等于目标天数",
        ">": "大于目标天数",
        ">=": "大于等于目标天数",
        "<": "小于目标天数",
        "<=": "小于等于目标天数",
        "%=": "整除目标天数"
      },
      proTypeList: {
        "1": "充值",
        "2": "卡密",
        "3": "抽奖机会",
        "5": "积分"
      },
      form: {
        actId: this.$route.params.actId
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
    edit (signPrize) {
      this.$router.push({
        path: "/activity/signPrize/" + this.form.actId + "/editSignPrize/" + signPrize.id
      })
    },
    onAdd () {
      this.$router.push({
        path: "/activity/signPrize/" + this.form.actId + "/addSignPrize"
      })
    },
    async delSignPrize (signPrize) {
      let rs = await this.$post("signIn/del_sign_prize", {id: signPrize.id})
      if (rs.status == "200") {
        this.onSearch()
      }
    },
    del (signPrize) {
      this.$confirm("确认要删除该奖励规则吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"

      }).then(() => {
        this.delSignPrize(signPrize)
        this.$message({
          type: "success",
          message: "删除成功"
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        })
      })
    },
    async dodel (lottery) {
      let rs = await this.$post("product/del_lottery", {id: lottery.id})
      if (rs.status == "200") {
        this.onSearch()
      }
    }
  }
}
</script>

<style scoped>
</style>
