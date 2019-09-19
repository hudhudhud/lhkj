<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="商户ID">
        <el-input v-model="searform.mid" placeholder="输入商户ID查询"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="searform.name" placeholder="输入员工姓名查询"></el-input>
      </el-form-item>
      <el-form-item label="员工号">
        <el-input v-model="searform.ehr" placeholder="输入员工号查询"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="searform.mobile" placeholder="输入手机号码查询"></el-input>
      </el-form-item>
      <el-form-item label="机构号">
        <el-input v-model="searform.organCode" placeholder="输入机构号查询"></el-input>
      </el-form-item>
      <el-form-item label="回复状态">
        <el-select v-model="searform.hasReturn">
          <el-option label="全部" value=""></el-option>
          <el-option label="已回复" value="Y"></el-option>
          <el-option label="未回复" value="N"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="searform.createTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" align="right"
                        unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/shpartner/staff/listFeedbackAll" :param="searform" @loaded="loading=false" showPager>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="merchantId" label="商户号" width="80">
      </el-table-column>
      <el-table-column prop="name" label="员工姓名" width="100">
      </el-table-column>
      <el-table-column prop="ehr" label="员工号" width="100">
      </el-table-column>
      <el-table-column prop="organCode" label="机构号" width="100">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号码" width="150">
      </el-table-column>
      <el-table-column prop="msg" label="反馈内容" width="150">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="answerAuthorName" label="客服姓名" width="100">
      </el-table-column>
      <el-table-column prop="answerMsg" label="回复内容" width="150">
      </el-table-column>
      <el-table-column prop="answerTime" label="回复时间" width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="primary" @click="edit(props.row)" :loading="props.row.loading" plain>回复</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="回复反馈" v-model="showBox">
      <template>
        <div class="form">
          <p><span style="color: #3190e8">{{form.name}}：</span>{{form.msg}}</p>
          <el-form>
            <el-form-item label="答复：">
              <el-input type="textarea" rows="5" v-model="form.answerMsg"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit" :loading="submiting">提交</el-button>
              <el-button @click="showBox = false" v-if="!submiting">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </LayoutDialog>
  </LayoutPage>
</template>
<script>
export default {
  data () {
    return {
      submiting: false,
      form: {
        id: "",
        mid: "",
        cusId: "",
        answerMsg: ""
      },
      showBox: false,
      searform: {
        mid: "",
        name: "",
        mobile: "",
        ehr: "",
        organCode: "",
        hasReturn: "",
        createTime: []
      },
      loading: false,
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
    edit (item) {
      this.form = item
      this.showBox = true
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    async submit() {
      let rs = await this.$post("/shpartner/staff/saveFeedback", this.form)
      if (rs.status == 200) {
        this.$message({
          message: "回复成功",
          type: "success"
        })
      } else {
        this.$message.error(rs.msg)
      }
      this.onSearch()
      this.submiting = false
      this.showBox = false
    }
  }
}
</script>

<style scoped>
  .form {
    position: relative;
  }
</style>
