<template>
  <LayoutPage>
    <LayoutSearch>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="activity/get_project_list" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="项目ID" width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="250" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="props">
          <el-button @click="act(props.row.id)" type="success" :loading="props.row.loading" plain>活动配置</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      loading: false,
      showDialog: false
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    act(projectId) {
      this.$router.push({
        path: "/project/actConfig/" + projectId
      });
    }
  },
  created() {
    // if (this.$route.params.proId) {
    //   this.form.relationId = this.$route.params.proId;
    //   this.form.relationType = "3";
    //   this.form.id = "1";
    // } else {
    //   this.form.relationId = this.$route.params.actId;
    //   this.form.relationType = "2";
    //   this.form.id = "2";
    // }
  }
};
</script>

<style scoped>
</style>
