<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="机构号">
        <el-input v-model="form.mainMobile" placeholder="输入机构号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" plain>新增</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <UploadButton v-if="!uploading" ref="uploadused" action="staffWhileList/upload/act" @success="success">点击上传</UploadButton>
        <el-button v-else :loading="true">上传中</el-button>
      </el-form-item> -->
    </LayoutSearch>
    <LayoutTable ref="myTable" url="staffWhileList/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="记录ID" width="100">
      </el-table-column>
      <el-table-column prop="organCode" label="机构号" width="160">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="props">
          <el-tag type="success" v-if="props.row.status=='1'">正常</el-tag>
          <el-tag type="info" v-if="props.row.status=='0'">冻结</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="authId" label="customId" width="150">
      </el-table-column> -->

      <!-- <el-table-column label="操作" fixed="right" min-width="200">
        <template slot-scope="props">
          <el-button @click="resend(props.row)" :disabled="props.row.isadd == '1' || props.row.issuccess == '0'" plain>重新发送</el-button>
        </template>
      </el-table-column> -->
    </LayoutTable>
    <LayoutDialog title="新增" v-model="ShowDialog">
      <ttStaffWhileListForm :staff="staff" @success="onSearch" @close="ShowDialog=false"></ttStaffWhileListForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import ttStaffWhileListForm from "./ttStaffWhileListForm";
import UploadButton from "@/components/UploadButton";
export default {
  components: {
    ttStaffWhileListForm,
    UploadButton
  },
  data() {
    return {
      form: {},
      loading: false,
      key: "",
      stop: false,
      index: 0,
      uploading: false,
      msg: "",
      ShowDialog: false,
      staff: {}
    };
  },
  methods: {
    lookModule() {
      this.lookModuleStatus = true;
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    onAdd() {
      this.staff = {};
      this.ShowDialog = true;
    },
    async resend(obj) {
      let rs = await this.$post("refereeAudit/resendByCredit", {
        id: obj.id,
        defType: "business"
      });
      if (rs.status == "200") {
        this.onSearch();
      } else {
        this.$message.error(rs.error);
      }
    },
    success(res) {
      this.uploading = true;
      if (res.status == "200") {
        this.$alert(res.payload);
        this.$refs.myTable.search();
        this.emitChild(false);
      } else {
        this.$message.error(res.message + res.error);
      }
    },
    emitChild(val) {
      this.$refs.uploadused.$emit("loading", val);
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
