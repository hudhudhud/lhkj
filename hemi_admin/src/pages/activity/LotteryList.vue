<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
      <el-form-item label="上下线">
        <el-select v-model="form.lotteryStatus" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="product/get_lottery_list" :param="form" @loaded="onLoad" show-pager>
      <el-table-column prop="id" label="奖品ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="prizeName" label="奖品名称" width="100" align="center">
      </el-table-column>
      <el-table-column label="奖品图标" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.standardImgUrl" v-if="props.row.standardImgUrl" style="width:100%;" />
        </template>
      </el-table-column>
      <el-table-column prop="prizeProbability" label="奖品权重" width="100" align="center">
      </el-table-column>
      <el-table-column prop="prizeProbabilityPercent" label="奖品概率" width="100" align="center">
      </el-table-column>
      <el-table-column prop="lotterySord" label="奖品顺序" width="100" align="center">
      </el-table-column>
      <el-table-column label="是否默认奖品" width="100" align="center">
        <template slot-scope="props">
          <el-switch v-model="props.row.isDefault" @change="isDefaultLottery(props.row)" active-color="#13ce66"
            inactive-color="#D3D3D3" active-value="1" inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="prizeTotal" label="奖品库存" width="100" align="center">
      </el-table-column>
      <el-table-column prop="usedTotal" label="兑换数量" width="100" align="center">
      </el-table-column>
      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.lotteryStatus=="1"?"success":"info"'>{{ props.row.lotteryStatus=="1"?"上线":"下线" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="300">
        <template slot-scope="props">
          <el-button v-if="props.row.lotteryStatus=='0'" @click="toggleOnline(props.row)" type="success"
            :loading="props.row.loading" plain>上线</el-button>
          <el-button v-if="props.row.lotteryStatus=='1'" @click="toggleOnline(props.row)" type="primary"
            :loading="props.row.loading" plain>下线</el-button>
          <el-button @click="edit(props.row)" type="success" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="winningRecord(props.row)" type="primary" :loading="props.row.loading" plain>中奖纪录
          </el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {
        actId: this.$route.params.actId,
        proId: "",
        lotteryStatus: "1"
      },
      loading: false,
      showDialog: false,
      activity: null
    };
  },
  methods: {
    async isDefaultLottery(lottery) {
      const passed = await this.$checkMail({
        actId: lottery.actId,
        sendType: "productConfig",
        proName: lottery.proName,
        proStandName: "",
        changes: [
          {
            settingName: "是否默认奖品",
            oldValue: lottery.isDefault == "1" ? "否" : "是",
            newValue: lottery.isDefault == "1" ? "是" : "否"
          }
        ]
      });
      if (passed) {
        let rs = await this.$post("product/update_default_lottery", {
          isDefault: lottery.isDefault,
          lotteryId: lottery.id,
          actId: this.form.actId
        });
        if (rs.status == "200") {
          this.onSearch();
        }
      } else {
        this.onSearch();
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    onLoad(list) {
      let total = 0;
      list.forEach(item => {
        total = total + item.prizeProbability;
      });
      list.forEach(item => {
        item.prizeProbabilityPercent =
          ((item.prizeProbability * 100) / total).toFixed(4) + "%";
      });
      this.loading = false;
    },
    winningRecord(lottery) {
      this.$router.push({
        path:
          "/activity/lottery/" +
          this.form.actId +
          "/winningRecodeList/" +
          lottery.standardId
      });
    },
    edit(lottery) {
      this.$router.push({
        path:
          "/activity/lottery/" + this.form.actId + "/editLottery/" + lottery.id
      });
    },
    onAdd() {
      this.$router.push({
        path: "/activity/lottery/" + this.form.actId + "/addLottery"
      });
    },
    async editOnline(lottery) {
      let rs = await this.$post("product/update_lottery_online", {
        lotteryId: lottery.id,
        lotteryStatus: lottery.lotteryStatus
      });
      if (rs.status == "200") {
        this.onSearch();
        this.$message({
          type: "success",
          message: "操作成功"
        });
      }
    },
    async toggleOnline(lottery) {
      const passed = await this.$checkMail({
        actId: lottery.actId,
        sendType: "productConfig",
        proName: lottery.proName,
        proStandName: "",
        changes: [
          {
            settingName: "上架状态",
            oldValue: lottery.lotteryStatus == "0" ? "否" : "是",
            newValue: lottery.lotteryStatus == "0" ? "是" : "否"
          }
        ]
      });
      if (passed) {
        this.editOnline(lottery);
      }
    },
    async dodel(lottery) {
      let rs = await this.$post("product/del_lottery", { id: lottery.id });
      if (rs.status == "200") {
        this.onSearch();
      }
    },
    del(lottery) {
      this.$confirm("此操作将永久删除该奖品,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dodel(lottery);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    created() {}
  }
};
</script>

<style scoped>
</style>
