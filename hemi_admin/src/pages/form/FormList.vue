<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item>
        <el-button @click="toCreateForm" type="success" plain>新增表单</el-button>
      </el-form-item>
    </LayoutSearch>

    <LayoutTable ref="myTable" url="form/forms/search/specification" :param="searchForm" @loaded="loading=false"
                 show-pager @expand-change="showItems">
      <el-table-column type="expand">
        <template slot-scope="props">

          <el-table
            :data="props.row.items"
            border
            style="width: 100%">
            <el-table-column
              prop="label"
              label="label"
              width="100">
            </el-table-column>
            <el-table-column
              prop="dataKey"
              label="dataKey"
              width="100">
            </el-table-column>
            <el-table-column
              prop="formItemType"
              label="表单项类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="verifyRegex"
              label="正则"
              width="100">
            </el-table-column>
            <el-table-column
              label="是否必填"
              width="80">

              <template slot-scope="scope">
                <h1 v-if="scope.row.necessary">是</h1>
                <h1 v-else>否</h1>
              </template>
            </el-table-column>
            <el-table-column
              prop="hidden"
              label="是否隐藏"
              width="80">
              <template slot-scope="scope">
                <h1 v-if="scope.row.hidden">是</h1>
                <h1 v-else>否</h1>
              </template>
            </el-table-column>
            <el-table-column
              prop="resourceKey"
              label="资源key"
              width="100">
            </el-table-column>
            <el-table-column
              prop="extraResourceUrl"
              label="资源链接"
              width="180">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>

    <LayoutDialog v-model="formConfigPageShowDialog">
      <FormConfigPage @success="onSearch" @close="formConfigPageShowDialog=false"></FormConfigPage>
    </LayoutDialog>

    <LayoutDialog v-model="formItemConfigPageShowDialog">
      <FormItemConfigPage :itemForm="itemForm" @success="onSearch" @close="formItemConfigPageShowDialog=false"></FormItemConfigPage>
    </LayoutDialog>

    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
import FormConfigPage from "./FormConfigPage.vue";
import FormItemConfigPage from "./FormItemConfigPage.vue";

export default {
  components: {
    FormConfigPage,
    FormItemConfigPage
  },
  data() {
    return {
      formConfigPageShowDialog: false,
      formItemConfigPageShowDialog: false,
      wdh: true,
      searchForm: {
        searchCriteria: [
          {
            merchantId: 12
          }
        ]
      },
      loading: false,
      submiting: false,
      showEdit: false,
      itemForm: {
        id: null,
        formId: null,
        formItemType: null,
        label: "",
        dataKey: "",
        resourceKey: "",
        extraResourceUrl: null,
        cssStyle: "",
        hidden: false,
        necessary: true,
        options: null,
        verifyRegex: null
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit("pick", [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    editItem(item) {
      console.info(item)
      this.$set(this.itemForm, item);
      this.itemForm = item;
      this.formItemConfigPageShowDialog = true;
    },
    showItems(row, expandedRows) {
      this.$get(`/form/formItems/form/${row.id}`)
        .then(function (response) {
          row.items = response.payload;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    toCreateForm() {
      this.formConfigPageShowDialog = true;
    },
    onSearch() {
      this.loading = true
      this.$refs.myTable.search()
    },
    edit(item) {
      this.refereeItem = item
      this.showEdit = true
    }
  }
}
</script>

<style scoped>
</style>
