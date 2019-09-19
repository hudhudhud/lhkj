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
        <el-select v-model="form.standardStatus" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="product/get_standard" :param="form" @loaded="loading=false">
      <el-table-column prop="id" label="规格ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="standardName" label="规格名称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="baseProId" label="原始商品" width="100" align="center">
      </el-table-column>
      <el-table-column prop="baseStandardCode" label="原始规格code" width="200" align="center">
      </el-table-column>
      <el-table-column label="规格图片" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.standardImgUrl" v-if="props.row.standardImgUrl" style="width:100%;" />
        </template>
      </el-table-column>
      <el-table-column prop="standardSort" label="排序" width="120" align="center">
      </el-table-column>
      <el-table-column prop="originalPrice" label="原价" width="120" align="center">
      </el-table-column>
      <el-table-column prop="currentPrice" label="现价" width="120" align="center">
      </el-table-column>
      <el-table-column prop="integralNum" label="积分数量" width="120" align="center">
      </el-table-column>
      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.standardStatus=="1"?"success":"info"'>{{ props.row.standardStatus=="1"?"上线":"下线" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="this.form.actType!=3" prop="limitTotal" label="库存" width="120" align="center">
      </el-table-column>
      <el-table-column v-if="this.form.actType==3" prop="limitPerTime" label="每时段限制数量" width="120" align="center">
      </el-table-column>
      <el-table-column prop="usedTotal" label="兑换数量" width="120" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="450">
        <template slot-scope="props">
          <el-button v-if="props.row.standardStatus=='0'" @click="toggleOnline(props.row)" type="success"
            :loading="props.row.loading" plain>上线</el-button>
          <el-button v-if="props.row.standardStatus=='1'" @click="toggleOnline(props.row)" type="primary"
            :loading="props.row.loading" plain>下线</el-button>
          <el-button @click="buyRecord(props.row.id)" type="success" :loading="props.row.loading" plain>购买记录</el-button>
          <el-button v-if="form.actType==3 " @click="timeConfig(props.row.id) " type="primary "
            :loading="props.row.loading " plain>时间配置</el-button>
          <el-button @click="edit(props.row.id)" type="success" :loading="props.row.loading" plain>编辑</el-button>
          <el-button @click="del(props.row)" type="danger" :loading="props.row.loading" plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>

  </LayoutPage>
</template>

<script>
import ActivityForm from "./ActivityForm";

export default {
  components: {
    ActivityForm
  },
  data() {
    return {
      form: {
        proId: this.$route.params.proId,
        actId: this.$route.params.actId,
        actName: "",
        standardStatus: "1",
        isDeleted: "",
        actType: ""
      },
      loading: false,
      showDialog: false,
      activity: null
    };
  },
  methods: {
    timeConfig(standardId) {
      this.$router.push({
        path:
          "/activity/product/" + this.form.actId + "/timeConfig/" + standardId
      });
    },
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
        path:
          "/activity/product/" +
          this.form.actId +
          "/addStandard/" +
          this.form.proId
      });
    },
    buyRecord(standardId) {
      this.$router.push({
        path:
          "/activity/product/" + this.form.actId + "/buyRecord/" + standardId
      });
    },
    async dodel(standard) {
      let rs = await this.$post("product/del_standard", {
        standardId: standard.id
      });
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.onSearch();
      }
    },
    async del(standard) {
      const passed = await this.$checkMail({
        proId: standard.proId,
        sendType: "deleteStandard",
        proStandName: standard.standardName,
        changes: [
          {
            settingName: "删除",
            oldValue: "否",
            newValue: "是"
          }
        ]
      });
      if (passed) {
        this.dodel(standard);
      }
    },
    async editOnline(standard) {
      let rs = await this.$post("product/update_standard_online", {
        standardId: standard.id,
        standardStatus: standard.standardStatus
      });
      if (rs.status == "200") {
        this.onSearch();
        this.$message({
          type: "success",
          message: "操作成功"
        });
      }
    },
    async toggleOnline(standard) {
      const passed = await this.$checkMail({
        proId: standard.proId,
        sendType: "configStandard",
        proStandName: standard.standardName,
        changes: [
          {
            settingName: "上架状态",
            oldValue: standard.standardStatus == "0" ? "否" : "是",
            newValue: standard.standardStatus == "0" ? "是" : "否"
          }
        ]
      });
      if (passed) {
        this.editOnline(standard);
      }
    }
  },
  created() {
    this.loadActType();
  }
};
</script>

<style scoped>
</style>
