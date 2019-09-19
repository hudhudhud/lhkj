<template>
  <LayoutPage>
    <el-button type="primary" @click="add">新增</el-button>

    <section class="content-vmer">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="type" label="车辆名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.logoUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="synopsis" label="参考价">
        </el-table-column>
      </el-table>
      <el-pagination v-if='list.length' background layout="prev, pager, next" :total="totalCount"
        @current-change='pageChange'>
      </el-pagination>
    </section>
    <el-dialog title="新增车辆" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="品牌">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="车辆名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="车辆价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="上传车辆图片">
          <UploadImages v-model="carImgs" action="file/upload"></UploadImages>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </LayoutPage>
</template>
<script>
import UploadImages from "@/components/UploadImages";
export default {
  components: {
    UploadImages
  },
  data() {
    return {
      searchForm: {
        merchantId: "",
        currentPage: 1,
        pageSize: 10,
        type: "VEHICL_SHOWALL"
      },
      form: {
        name: "",
        price: "",
        carUrl: ""
      },
      list: [],
      totalCount: 0,
      dialogVisible: false,
      carImgs: []
    };
  },
  created() {},
  mounted() {
    this.searchForm.merchantId = this.$route.params.id;
    this.search();
  },
  methods: {
    search() {
      this.$get("homeCar/sz/hl/BymerchantId", { params: this.searchForm }).then(
        res => {
          res = res.payload.payload;
          this.list = res.list;
          this.totalCount = res.totalCount;
        }
      );
    },
    add() {
      // this.$router.push("/ssshenghuo/ssMerchantList/addMerchant")
      this.dialogVisible = true;
    },
    pageChange(n) {
      this.searchForm.currentPage = n;
      this.search();
    },
    async onSubmit() {
      if (this.carImgs.length > 0) {
        this.form.carUrl = this.carImgs[0].url;
      }
      let res = await this.$post("homeCar/save/merchandise", this.form);
      if (res.status === "200") {
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content-mer {
  padding: 10px;
}
</style>
<style lang='scss'>
.content-vmer {
  .el-table {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
