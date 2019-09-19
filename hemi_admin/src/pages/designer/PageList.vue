<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="页面名称">
        <el-input v-model="form.pageName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="lego/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="页面ID" width="100">
      </el-table-column>
      <el-table-column prop="pageKey" label="页面Key" width="250">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="200">
      </el-table-column>
      <el-table-column prop="merchantId" label="商户" width="100">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" width="100">
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="150">
      </el-table-column>
      <el-table-column prop="modifyUser" label="修改人" width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="280" fixed="right">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">修改</el-button>
          <el-button @click="copy(props.row)" :loading="props.row.loading">复制</el-button>
          <el-button @click="design(props.row)" :loading="props.row.loading">设计器</el-button>
          <el-button @click="remove(props.row)" :loading="props.row.loading">删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      merchantList: [],
      form: {
        pageName: "",
        merchantId: "",
        proId: this.$route.params.proId
      },
      loading: false
    }
  },
  watch: {
    "$route.params.proId": function (val) {
      if (val) {
        this.form.proId = val
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf("/lego/form") >= 0) {
      next(vm => {
        vm.onSearch()
      })
    } else {
      next()
    }
  },
  methods: {
    onSearch () {
      this.$refs["myTable"].search()
    },
    onAdd () {
      this.$router.push("/lego/form/add?proId=" + this.$route.params.proId)
    },
    edit (row) {
      this.$router.push("/lego/form/" + row.id)
    },
    copy (row) {
      this.$prompt("请输入新页面名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.+/,
        inputErrorMessage: "请输入页面名称",
        inputValue: row.pageName
      }).then(({ value }) => {
        this.doCopy(row, value)
      }).catch(() => {
      })
    },
    async doCopy (row, value) {
      let rs = await this.$post("lego/copyPage", {
        pageId: row.id,
        newName: value
      })
      if (rs.status == 200) {
        let pageId = rs.payload
        this.$confirm("复制成功,是否马上进入设计", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        }).then(() => {
          this.$router.push("/lego/designer/" + pageId)
        }).catch(() => {
        })
        this.onSearch()
      } else {
        this.$message.error(rs.error)
      }
    },
    remove (row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.doRemove(row)
      }).catch(() => {
      })
    },
    async doRemove (row) {
      let rs = await this.$get("lego/deleteById/" + row.id)
      if (rs.status == 200) {
        this.$message({
          type: "success",
          message: "删除成功!"
        })
        this.onSearch()
      } else {
        this.$message.error(rs.error)
      }
    },
    design (row) {
      this.$router.push("/lego/designer/" + row.id)
    }
  },
  created () {
  }
}
</script>
