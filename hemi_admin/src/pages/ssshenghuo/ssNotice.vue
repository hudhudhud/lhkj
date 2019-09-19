<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="标题">
        <el-input v-model="searchForm.name" placeholder="输入标题查询"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker v-model="searchForm.beginDateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker v-model="searchForm.endDateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchNotice" :loading="loading" type="primary" plain>查询</el-button>
        <el-button @click="openModal(false)" type="primary">新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable :disableAutoHeight="true" ref="noticeTable" url="homeCar/backShowAll" :param="searchForm"
      @loaded="loading=false" show-pager>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="100" prop="id" label="序号">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="name" label="标题">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" min-width="200" prop="submitDateTime" label="发布时间">
      </el-table-column>
      <el-table-column align="center" min-width="200" label="操作">
        <template slot-scope="props">
          <el-switch v-model="props.row.sign" @change="changeStatus($event,props.row)" active-color="#13ce66"
            inactive-color="#D3D3D3">
          </el-switch>
          <el-button @click="openModal(true,props.row)" type="primary" :loading="props.row.loading" plain>编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <el-dialog :visible.sync="isShow">
      <el-form :model="form" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <template>
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="saveNotice" :loading="isSaving">确定</el-button>
        </template>
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
        beginDateTime: "",
        endDateTime: ""
      },
      form: {
        name: ""
      },
      loading: false,
      isSaving: false,
      isShow: false,
      currentId: null
    };
  },
  methods: {
    searchNotice() {
      this.loading = true;
      this.$refs.noticeTable.search();
    },
    async saveNotice() {
      if (!this.form.name) {
        this.$message("请完善信息！");
        return false;
      }
      this.isSaving = true;
      let data;
      if (this.currentId) {
        data = {
          name: this.form.name,
          id: this.currentId
        };
      } else {
        data = {
          name: this.form.name
        };
      }
      let rs = await this.$post("homeCar/homeLideTips/saveAndUpdata", data);
      if (rs.status == "200") {
        this.$refs.noticeTable.search();
        this.isShow = false;
      } else {
        this.$message.error(rs.error);
      }
      this.isSaving = false;
    },
    // 打开弹窗
    openModal(isEdit, data) {
      if (isEdit) {
        this.form.name = data.name;
        this.currentId = data.id;
      } else {
        this.form.name = "";
        this.currentId = null;
      }
      this.isShow = true;
    },
    // 改变状态
    async changeStatus(status, data) {
      let rs = await this.$post("homeCar/homeLideTips/saveAndUpdata", {
        sign: status,
        id: data.id
      });
      if (rs.status == "200") {
        this.searchNotice();
      }
    }
  }
};
</script>

<style scoped>
</style>
