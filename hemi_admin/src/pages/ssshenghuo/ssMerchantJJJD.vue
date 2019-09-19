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
    <LayoutTable :disableAutoHeight="true" ref="myTable" url="homeCar/sz/hl/store/like/name" :param="searchForm"
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
      <el-table-column align="center" min-width="180" label="商品">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="openType(scope.row)" plain>类型</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="250" label="操作">
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
    <el-dialog :visible.sync="isShow" @close="onCancel" width="30%" :close-on-click-modal="false">
      <div style="line-height: 36px;">
        <el-tag :key="tag" v-for="(tag, index) in types" size="medium" :closable="true" @close="tagClose(index)"
          effect="plain">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="iptVisible" v-model="typeValue" ref="saveTagInput" size="mini"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="mini" @click="showInput">+</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSave" :loading="loading">确定</el-button>
      </div>
    </el-dialog>
  </LayoutPage>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        type: "ENTERPRISE_APPLIANCES"
      },
      loading: false,
      isShow: false,
      iptVisible: false,
      curId: null, // 当前操作的商户ID
      types: [],
      typeValue: ""
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    add() {
      this.$router.push("/ssshenghuo/addMerchant/jjjd");
    },
    handleView(row) {
      this.$router.push("/ssshenghuo/ssProductJJJD?id=" + row.id);
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
      this.$router.push("/ssshenghuo/addMerchant/jjjd?id=" + id);
    },
    showInput() {
      this.iptVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let typeValue = this.typeValue;
      if (typeValue) {
        this.types.push(typeValue);
      }
      this.iptVisible = false;
      this.typeValue = "";
    },
    openType(row) {
      this.curId = row.id;
      this.types = row.merchantStoreName ? [...row.merchantStoreName] : [];
      this.isShow = true;
    },
    tagClose(index) {
      this.types.splice(index, 1);
    },
    onCancel() {
      this.isShow = false;
      this.types = [];
    },
    onSave() {
      this.$post("/homeCar/backSaveStore", {
        merchantId: this.curId,
        merchantStoreName: this.types
      }).then(rs => {
        if (rs.status == 200) {
          this.$message.success(rs.message);
          this.search();
          this.onCancel();
        } else {
          this.$message.error(rs.message);
        }
      });
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
  }
}
.el-pagination {
  text-align: center;
  padding: 30px 0;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 28px;
  line-height: 26px;
  padding-top: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
