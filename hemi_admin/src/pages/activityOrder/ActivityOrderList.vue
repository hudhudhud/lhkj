<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="登陆手机号">
        <el-input v-model="form.tel" placeholder="输入登陆手机号查询"></el-input>
      </el-form-item>
      <el-form-item label="登陆充值账号">
        <el-input v-model="form.rechargeAccount" placeholder="输入登陆充值账号查询"></el-input>
      </el-form-item>
      <el-form-item label="充值状态">
        <el-select v-model="form.fishState" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="充值成功" value="4"></el-option>
          <el-option label="充值中" value="888"></el-option>
          <el-option label="充值失败" value="999"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=查询时间范围>
        <el-date-picker v-model="form.begdate" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=——>
        <el-date-picker v-model="form.enddate" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="derived" :loading="derivedloading">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
        实际扣款总计:{{count}}元
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="activityOrder/query" :param="form" @loaded="lod" show-pager>
      <el-table-column prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column prop="tel" label="登陆手机号" width="150">
      </el-table-column>
      <el-table-column prop="rechargeAccount" label="充值账号" width="140">
      </el-table-column>
      <el-table-column prop="proStandardName" label="奖品" width="180">
      </el-table-column>
      <el-table-column prop="merchantPrice" label="实际扣款" width="120">
      </el-table-column>
      <el-table-column prop="originalPrice" label="话费扣款" width="90">
      </el-table-column>
      <el-table-column prop="fishState" label="充值状态" width="120">
        <template slot-scope="props">
          <el-tag v-if="props.row.orderStatus=='2'">订单取消</el-tag>
          <el-tag type="info" v-else-if="props.row.fishState=='0'">未领取</el-tag>
          <el-tag type="success" v-else-if="props.row.fishState=='4'">充值成功</el-tag>
          <el-tag type="info" v-else>充值中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="参与时间" width="180">
      </el-table-column>
      <!-- <el-table-column label="操作" min-width="500">
                <template slot-scope="props">
                </template>
            </el-table-column> -->
    </LayoutTable>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fishState: "",
        actId:
          process.env.NODE_ENV === "production"
            ? window.location.href.indexOf("hemitest") > 0
              ? 171
              : 154
            : 171
      },
      count: 0,
      loading: false,
      derivedloading: false
    };
  },
  methods: {
    lod(rs, rs2) {
      this.loading = false;
      this.count = rs2.payload.count;
    },
    async derived() {
      this.derivedloading = true;
      let rs = await this.$post("activityOrder/derived", this.form);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.derivedloading = false;
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
