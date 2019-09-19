<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onNew">新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <template>
      <div class="custom-tree-container">
        <div class="block">
          <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.data.label }}</span>

              <el-button type="text" @click="() => onAdd(data)">
                新增
              </el-button>
              <el-button type="text" size="mini" @click="() => onEdit(data)">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="() => act(data)">
                机构活动管理
              </el-button>
              <el-button type="text" size="mini" @click="() => delnode(data)">
                删除
              </el-button>

            </span>
          </el-tree>
        </div>
      </div>
    </template>
  </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      loading: false,
      data: [],
      clickdata: []
    }
  },
  methods: {
    onSearch () {
      this.$refs.myTable.search()
    },

    act (data) {
      this.$router.push({
        path: this.$route.params.merchantId + "/actConfig/" + data.id
      })
    },

    onAdd (data) {
      this.$router.push({
        path: this.$route.params.merchantId + "/addInstitution/" + data.id
      })
    },
    onNew () {
      console.log(this.$router.path)
      this.$router.push({
        path: this.$route.params.merchantId + "/addInstitution"
      })
    },
    async onEdit (data) {
      let rs = await this.$post("activity/get_merchant_local_one", {institutionId: data.id})
      if (rs.status == 200) {
        console.info(rs.payload.localNum)
        if (rs.payload.localNum) {
          this.$router.push({
            path: this.$route.params.merchantId + "/editInstitution/" + data.id
          })
        } else {
          this.$router.push({
            path: this.$route.params.merchantId + "/editSubInstitution/" + data.id
          })
        }
      }
    },
    handleNodeClick (data) {
      this.clickdata = data
      this.getChildrenlist(data)
    },
    async getChildrenlist (data) {
      let rs = await this.$post("activity/get_sub_institution", {
        higherInstitution: data.id
      })
      if (rs.status == "200") {
        data.children = []
        rs.payload.forEach(element => {
          data.children.push({
            id: element.id,
            label: element.localName,
            children: []
          })
        })
      } else {
      }
    },
    async getinit () {
      let merchantId = this.$route.params.merchantId
      let rs = await this.$post("activity/get_first_institution", {merchantId: merchantId})
      if (rs.status == "200") {
        this.data = []
        rs.payload.forEach(element => {
          this.data.push({
            id: element.id,
            label: element.localName,
            children: []
          })
        })
      } else {
        alert(rs.msg)
      }
    },
    async delLocal (data) {
      let rs = await this.$post("activity/del_local", { id: data.id })
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "删除成功!"
        })
        this.onSearch()
      } else {
        this.$message({
          type: "info",
          message: "删除失败！"
        })
      }
    },

    delnode (data) {
      this.$confirm("此操作将永久删除该机构及其子机构, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delLocal(data)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }

  },
  created () {
    // this.onSearch()
    console.log("---", this.data.length == 0)
    console.log("===", this.clickdata.length != 0)

    if (this.data.length == 0) {
      this.getinit()
    }
    if (this.clickdata.length != 0) {
      this.getChildrenlist(this.clickdata)
    }
  }
}
</script>

<style scoped>
.custom-tree-container {
  height: calc(100% - 50px);
  margin: 10px;
  overflow: auto;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
