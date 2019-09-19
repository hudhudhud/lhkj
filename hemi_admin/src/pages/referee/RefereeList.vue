<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item v-if="!wdh" label="支行">
        <el-select v-model="form.subbranch" @change="form.organ_code=''">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in subbranchList" :key="index" :label="item.subbranch" :value="item.subbranch"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网点">
        <el-select v-model="form.organ_code">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in refereeStoreList" v-if="!form.subbranch || form.subbranch==item.subbranch" :key="item.organCode" :label="item.storeName" :value="item.organCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="form.type">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, key) in typeMap" :label="item" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活跃状态">
        <el-select v-model="form.state">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, key) in stateMap" :label="item.name" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营销状态">
        <el-select v-model="form.yxstate">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, key) in yxstateMap" :label="item.name" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="推荐人手机号">
        <el-input v-model="form.parentMobile"></el-input>
      </el-form-item>
      <!-- <el-form-item label="推荐人身份">
        <el-select v-model="form.parentType">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, key) in typeMap" :label="item" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="绑定时间">
        <el-date-picker v-model="form.bindTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" align="right"
                        unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="onSearch" :loading="loading" type="primary" plain>查询</el-button>
        <el-button @click="derive" :loading="loading" type="primary">导出</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="referee/queryRefereeListWithPage" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="subbranch" label="支行名称" width="100">
      </el-table-column>
      <el-table-column prop="storeName" label="网点名称" width="150">
      </el-table-column>
      <el-table-column prop="organCode" label="机构号" width="100">
      </el-table-column>
      <el-table-column prop="shareMobile" label="推荐人手机号" width="100">
      </el-table-column>
      <el-table-column label="身份" width="100">
        <template slot-scope="props">
          {{props.row.type ? typeMap[props.row.type] : '普通用户'}}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="surname" label="姓氏" width="100">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="score" label="绩效" width="100">
      </el-table-column>
      <el-table-column label="活跃状态" width="120">
        <template slot-scope="props">
          <el-tag v-if="props.row.state" :type="stateMap[props.row.state].type">{{stateMap[props.row.state].name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="营销状态" width="120">
        <template slot-scope="props">
          <el-tag v-if="props.row.yxstate" :type="yxstateMap[props.row.yxstate].type">{{yxstateMap[props.row.yxstate].name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="注册时间" width="120">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="120">
      </el-table-column>
      <el-table-column prop="bindTime" label="绑定时间" width="120">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" plain>编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="编辑备注" v-model="showEdit">
      <template>
        <div class="form">
          <el-form>
            用户手机号：{{refereeItem.mobile}}
            <el-form-item v-if="!wdh" label="网点号">
              <el-input style="width: 50%" v-model="refereeItem.organCode"></el-input>
            </el-form-item>
            <el-form-item v-if="!wdh" label="身份">
              <el-select v-model="refereeItem.type">
                <el-option v-for="(item, key) in typeMap" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="!wdh" label="状态">
              <el-select v-model="refereeItem.state">
                <el-option v-for="(item, key) in stateMap" :key="key" :label="item.name" :value="key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input rows="5" type="textarea" v-model="refereeItem.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save" :loading="submiting">提交</el-button>
              <el-button @click="showEdit = false" v-if="!submiting">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </LayoutDialog>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      wdh: true,
      form: {
        subbranch: "cxq1994",
        organ_code: "",
        type: "",
        mobile: "",
        state: "",
        yxstate: "",
        parentMobile: "",
        parentType: "",
        bindTime: []
      },
      loading: false,
      submiting: false,
      showEdit: false,
      refereeItem: {},
      refereeStoreList: [],
      subbranchList: [],
      typeMap: {
        "": "普通用户",
        "1": "大堂经理",
        "2": "外拓人员",
        "3": "商户",
        "4": "一类营销人员"
      },
      stateMap: {
        "1": {
          name: "未签约未活跃",
          type: "info"
        },
        "2": {
          name: "已签约未活跃",
          type: "primary"
        },
        "3": {
          name: "已签约已活跃",
          type: "success"
        }
      },
      yxstateMap: {
        "1": {
          name: "新活",
          type: "success"
        },
        "2": {
          name: "存活",
          type: "primary"
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近三个月",
            onClick (picker) {
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
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    user (val) {
      if (val) {
        this.getWdh(val)
      }
    }
  },
  methods: {
    async getWdh (user) {
      let rs = await this.$get("referee/getWdhByUserName/" + user.username)
      if (rs.status == "200") {
        this.wdh = rs.payload
        this.form.subbranch = rs.payload
      } else if (rs.status == "300") {
        this.wdh = false
        this.form.subbranch = ""
      }
    },
    async derive () {
      this.loading = true
      let rs = await this.$post("referee/deriveRefereeList", this.form)
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload
        this.loading = false
      } else {
        this.$message.error(rs.error)
      }
      this.loading = false
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    edit (item) {
      this.refereeItem = item
      this.showEdit = true
    },
    // 加载网点信息
    async loadRefereeStoreList () {
      let rs = await this.$post("referee/queryRefereeStoreList")
      if (rs.status == "200") {
        this.subbranchList = rs.payload.subbranchList
        this.refereeStoreList = rs.payload.refereeStoreList
      } else {
        this.$message.error(rs.error)
      }
    },
    async save () {
      this.submiting = true
      let rs = await this.$post("referee/updateRemark", {
        cusId: this.refereeItem.customId,
        remark: this.refereeItem.remark,
        state: this.refereeItem.state,
        type: this.refereeItem.type,
        organCode: this.refereeItem.organCode
      })
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
      } else {
        this.$message.error(rs.error)
      }
      this.submiting = false
      this.showEdit = false
      this.onSearch()
    }
  },
  created () {
    // 加载网点信息
    this.loadRefereeStoreList()
  },
  mounted () {
    if (this.user) {
      this.getWdh(this.user)
    }
  }
}
</script>

<style scoped>
</style>
