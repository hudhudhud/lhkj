<template>
  <LayoutPage class="content-mer">
    <LayoutSearch>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="门店名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :loading="loading">查询</el-button>
          <el-button type="primary" @click="add" :loading="loading">新增合作门店</el-button>
        </el-form-item>
      </el-form>
    </LayoutSearch>
    <LayoutTable :disableAutoHeight="true" ref="myTable" url="/homeCar/sz/hl/store/like/name" :param="searchForm"
      @loaded="loading=false" show-pager>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" prop="id" label="序号">
      </el-table-column>
      <!-- <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="type" label="品牌">
      </el-table-column> -->
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="name" label="门店名称">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" label="LOGO图片">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" label="门头照片">
        <template slot-scope="scope">
          <img :src="scope.row.showPicture" alt="">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="address" label="地址">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="phone" label="电话">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="synopsis" label="简介">
      </el-table-column>
      <el-table-column align="center" min-width="100" label="商品">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="300" label="操作">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="updateStatus($event,scope.row.popular,scope.row.id)"
            active-color="#13ce66" inactive-color="#D3D3D3">
          </el-switch>
          <el-button size="mini" type="primary" @click="onEdit(scope.row.id)">编辑</el-button>
          <el-checkbox size="mini" v-model="scope.row.popular" label="精选" border
            @change="updateStatus(scope.row.status, $event, scope.row.id)"></el-checkbox>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        type: "ENTERPRISE_DECORATE"
      },
      loading: false
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    add() {
      this.$router.push("/ssshenghuo/addMerchant/zxsj");
    },
    handleView(row) {
      this.$router.push("/ssshenghuo/ssProductZXSJ?id=" + row.id);
    },
    // 后台接口问题，需要同时传递status和popular
    updateStatus(status, popular, id) {
      this.$post("/homeCar/add/merchant", { status, popular, id }).then(rs => {
        if (rs.status === 200) {
          this.search();
          this.$message.success(rs.message);
        } else {
          this.$message.error(rs.error);
        }
      });
    },
    onEdit(id) {
      this.$router.push("/ssshenghuo/addMerchant/zxsj?id=" + id);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang='scss'>
.content-mer {
  .el-table {
    img {
      width: 50px;
      height: 50px;
    }
    .cell {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
