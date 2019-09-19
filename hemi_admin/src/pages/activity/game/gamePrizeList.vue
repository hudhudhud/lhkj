<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item v-if="1==2">
        <el-input v-model="form.actId "></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
      <el-form-item label="上下线">
        <el-select v-model="form.status" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="activity/get_game_prize_list" :param="form" @loaded="loading=false">
      <el-table-column prop="id" label="奖励ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="actId" label="活动ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="minScore" label="奖励最小分数" width="100" align="center">
      </el-table-column>
      <el-table-column prop="maxScore" label="奖励最大分数" width="100" align="center">
      </el-table-column>
      <el-table-column prop="baseProId" label="原始商品" width="100" align="center">
      </el-table-column>
      <el-table-column prop="baseStandardCode" label="原始规格code" width="200" align="center">
      </el-table-column>
      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.status==1?"success":"info"'>{{ props.row.status==1?"上线":"下线" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="规格图片" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.standardImgUrl" v-if="props.row.standardImgUrl" style="width:100%;" />
        </template>
      </el-table-column>
      <el-table-column prop="limitTotal" label="库存" width="120" align="center">
      </el-table-column>
      <el-table-column prop="usedTotal" label="兑换数量" width="120" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="450">
        <template slot-scope="props">
          <el-button v-if="props.row.status==0" @click="online(props.row)" type="success" :loading="props.row.loading"
            plain>上线</el-button>
          <el-button v-if="props.row.status==1" @click="downline(props.row)" type="primary" :loading="props.row.loading"
            plain>下线</el-button>
          <el-button @click="edit(props.row.id)" type="success" :loading="props.row.loading" plain>编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>

  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        actId: this.$route.params.actId,
        status: "1"
      },
      loading: false,
      showDialog: false,
      activity: null
    };
  },
  methods: {
    async loadActType() {
      this.submiting = true;
      let rs = await this.$post("product/get_actType", {
        id: this.form.id,
        proId: this.form.proId
      });
      if (rs.status == "200") {
        this.form.actType = rs.payload.actType;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    edit(standardId) {
      this.$router.push({
        path:
          "/activity/product/" + this.form.actId + "/editStandard/" + standardId
      });
    },
    onAdd() {
      this.$router.push({
        path: "/activity/game/" + this.form.actId + "/addGamePrize"
      });
    },
    async editOnline(standard) {
      let rs = await this.$post("product/update_standard_online", {
        standardId: standard.id,
        standardStatus: standard.standardStatus
      });
      if (rs.status == "200") {
        this.onSearch();
      }
    },
    online(standard) {
      this.$confirm("确认要上线该规格吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editOnline(standard);
          this.$message({
            type: "success",
            message: "上线成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    downline(standard) {
      this.$confirm("确认要下线该规格吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editOnline(standard);
          this.$message({
            type: "success",
            message: "下线成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
