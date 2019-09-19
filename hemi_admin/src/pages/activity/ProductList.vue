<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="商品名称">
        <el-input v-model="form.proName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="上下线">
        <el-select v-model="form.proStatus" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="product/show_pro_list" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="proId" label="商品ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="proName" label="商品名称" width="100" align="center">
      </el-table-column>

      <el-table-column prop="proDetails" label="商品描述" width="200" align="center">
      </el-table-column>

      <el-table-column label="商品图标" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.proIconUrl" v-if="props.row.proIconUrl" style="max-height:50px;" />
        </template>
      </el-table-column>
      <el-table-column label="商品封面" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.proHomeImgUrl" v-if="props.row.proHomeImgUrl" style="max-height:40px;" />
        </template>
      </el-table-column>

      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.proStatus=="1"?"success":"info"'>{{ props.row.proStatus=="1"?"上线":"下线" }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="370">
        <template slot-scope="props">
          <el-button @click="standard(props.row)" type="primary" :loading="props.row.loading" plain>规格</el-button>
          <el-button v-if="props.row.proStatus=='0'" @click="toggleOnline(props.row)" type="success"
            :loading="props.row.loading" plain>上线</el-button>
          <el-button v-if="props.row.proStatus=='1'" @click="toggleOnline(props.row)" type="primary"
            :loading="props.row.loading" plain>下线</el-button>
          <el-button @click="limit(props.row)" type="primary" :loading="props.row.loading" plain>限制</el-button>
          <el-button @click="edit(props.row)" type="success" :loading="props.row.loading" plain>编辑</el-button>
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
    // MerchantShowDialog,
    // PayConfig
  },
  data() {
    return {
      form: {
        actId: this.$route.params.actId,
        proName: "",
        proStatus: "",
        isDeleted: ""
      },
      loading: false,
      showDialog: false,
      activity: null
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    edit(product) {
      this.$router.push({
        path: "/activity/editProduct/" + product.proId
      });
    },
    standard(product) {
      this.$router.push({
        path:
          "/activity/product/" + product.actId + "/standard/" + product.proId
      });
    },
    limit(product) {
      this.$router.push({
        path:
          "/activity/product/" + product.actId + "/proLimit/" + product.proId
      });
    },
    onAdd() {
      this.$router.push({
        path: "/activity/addProduct/" + this.form.actId
      });
    },
    async editOnline(product) {
      let rs = await this.$post("product/update_online", {
        proId: product.proId,
        proStatus: product.proStatus
      });
      if (rs.status == "200") {
        this.onSearch();
        this.$message({
          type: "success",
          message: "操作成功"
        });
      }
    },
    async toggleOnline(product) {
      const passed = await this.$checkMail({
        actId: product.actId,
        sendType: "productConfig",
        proName: product.proName,
        proStandName: "",
        changes: [
          {
            settingName: "上架状态",
            oldValue: product.proStatus == "0" ? "否" : "是",
            newValue: product.proStatus == "0" ? "是" : "否"
          }
        ]
      });
      if (passed) {
        this.editOnline(product);
      }
    },
    async dodel(product) {
      let rs = await this.$post("product/del", { proId: product.proId });
      if (rs.status == "200") {
        this.onSearch();
        this.$message({
          type: "success",
          message: "删除成功"
        });
      }
    },
    async del(product) {
      const passed = await this.$checkMail({
        actId: product.actId,
        sendType: "deleteProduct",
        proName: product.proName,
        proStandName: "",
        changes: [
          {
            settingName: "删除",
            oldValue: "否",
            newValue: "是"
          }
        ]
      });
      if (passed) {
        this.dodel(product);
      }
    },

    created() {
      // this.form.actId = this.$route.params.actId
    }
  }
};
</script>

<style scoped>
</style>
