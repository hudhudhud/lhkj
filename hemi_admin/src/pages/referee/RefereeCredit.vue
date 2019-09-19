<template>
    <LayoutPage>
        <LayoutSearch>
            <el-form-item label="推荐人号码">
                <el-input v-model="form.mobile" placeholder="输入推荐人号码查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
                页面访问总数:{{count}}
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="derived" :loading="derivedloading">导出交易记录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="deriveReferee" :loading="derivedloading">导出推荐详情</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="deriveRefereeCustom" :loading="derivedloading">导出被推荐人信息</el-button>
            </el-form-item>
        </LayoutSearch>
        <LayoutTable ref="myTable" url="referee/query" :param="form" @loaded="setTable" show-pager>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.shareList" border>
                        <el-table-column prop="shareCtime" label="推荐时间" width="280">
                        </el-table-column>
                        <el-table-column prop="sharedMobile" label="被推荐人手机号" width="280">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="推荐人号码" width="150">
            </el-table-column>
            <el-table-column prop="shareNum" label="推荐人数" width="100">
            </el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="isadd" label="状态" width="120">
                <template slot-scope="props">
                    <el-tag type="info" v-model="props.row.isadd" v-if="props.row.isadd=='0'">未增加</el-tag>
                    <el-tag type="success" v-model="props.row.isadd" v-else-if="props.row.isadd=='1'">增加成功</el-tag>
                    <el-tag type="danger" v-model="props.row.isadd" v-else-if="props.row.isadd=='2'">增加失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="accumulatedCredit" label="累计积分" width="100">
            </el-table-column>
            <el-table-column prop="freezeCredit" label="冻结积分" width="100">
            </el-table-column>
            <el-table-column prop="useableCredit" label="可用积分" width="100">
            </el-table-column>
            <el-table-column label="操作" min-width="500">
                <template slot-scope="props">
                    <el-button @click="resend(props.row)" :disabled="props.row.isadd == '1'" plain>重新发送</el-button>
                </template>
            </el-table-column>
        </LayoutTable>
        <iframe id="exelIframe" style="display:none;"></iframe>
    </LayoutPage>
</template>

<script>

export default {
  data () {
    return {
      form: {},
      loading: false,
      derivedloading: false,
      count: 0
    }
  },
  methods: {
    async deriveRefereeCustom () {
      this.derivedloading = true
      let rs = await this.$post("referee/deriveRefereeCustom", this.form)
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.derivedloading = false
    },
    async deriveReferee () {
      this.derivedloading = true
      let rs = await this.$post("referee/deriveReferee", this.form)
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.derivedloading = false
    },
    async derived () {
      this.derivedloading = true
      let rs = await this.$post("referee/derive", this.form)
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
      } else {
        this.$message.error(rs.msg)
      }
      this.derivedloading = false
    },
    setTable (val1, val2) {
      this.loading = false
      this.count = val2.payload.count
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    async resend (obj) {
      let rs = await this.$post("referee/resendByCredit", {
        customId: obj.customId,
        defType: "register"
      })
      if (rs.status == "200") {
        this.onSearch()
      } else {
        this.$message.error(rs.error)
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
