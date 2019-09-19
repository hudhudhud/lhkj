<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="号码">
        <el-input v-model="form.mobile" placeholder="输入推荐人号码查询"></el-input>
      </el-form-item>
      <el-form-item label="推荐人custId">
        <el-input v-model="form.customId" placeholder="输入推荐人custId查询"></el-input>
      </el-form-item>
      <el-form-item label="开卡状态">
        <el-select v-model="form.applicationCardStatus" placeholder="开卡状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="未开卡" value="0"></el-option>
          <el-option label="已开卡" value="1"></el-option>
        </el-select>
      </el-form-item><br/>
      <el-form-item label="推荐人角色">
        <el-select v-model="form.type" placeholder="推荐人角色">
          <el-option label="全部" value=""></el-option>
          <el-option label="学生" value="2"></el-option>
          <el-option label="员工" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>

      上传办卡信息
      <el-form-item>
        <UploadButton v-if="UploadButtonStatus" :action="'/shpartner/application_card/import'" @success="dealSuccess"></UploadButton>
        <el-button v-else :loading="!UploadButtonStatus">上传中</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="/shpartner/bind_relation_search" :param="form" @loaded="loading=false" showPager>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="merchantId" label="所属商户号" width="80">
      </el-table-column>
      <el-table-column prop="customId" label="推荐人custId" width="150">
      </el-table-column>
      <el-table-column prop="mobile" label="推荐人号码" width="100">
      </el-table-column>
      <el-table-column prop="partnerCustomId" label="被推荐人custId" width="150">
      </el-table-column>
      <el-table-column prop="partnerMobile" label="被推荐人手机号" width="100">
      </el-table-column>
      <el-table-column prop="applicationCardStatus" label="被推荐人办卡状态" width="100">
        <template slot-scope="props">
          <el-tag type="info" v-if="props.row.applicationCardStatus=='0'">未办卡</el-tag>
          <el-tag type="success" v-else-if="props.row.applicationCardStatus=='1'">已办卡</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTimeStr" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="applicationCardTimeStr" label="办卡时间" width="200">
      </el-table-column>
    </LayoutTable>

  </LayoutPage>
</template>
<script>

import UploadButton from "@/components/UploadButton"
export default {
  components: {
    UploadButton
  },
  data () {
    return {
      form: {
        type: this.$route.params.type, // 0白名单 1黑名单
        defId: this.$route.params.defId
      },
      loading: false,
      ShowDialog: false,
      UploadButtonStatus: true
    }
  },
  methods: {
    dealSuccess (rs) {
      this.UploadButtonStatus = false
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: rs.payload
        })
        this.UploadButtonStatus = true
        this.$refs.myTable.search()
      } else if (rs.status == "300") {
        this.key = rs.payload

        this.findRedisKey(rs.payload)
      } else {
        this.UploadButtonStatus = true
        this.$message({
          type: "error",
          message: rs.message
        })
      }
    },
    async findRedisKey (key) {
      let rs = await this.$get("/shpartner/redis_key/find/" + key)
      if (rs.payload) {
        this.UploadButtonStatus = true
        this.$alert(rs.payload, "运行结果", {
          confirmButtonText: "确定",
          callback: action => {

          }
        });
        this.$refs.myTable.search()
      } else {
        let this_ = this
        setTimeout(function () {
          this_.findRedisKey(key)
        }, 1000)
      }
    },
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    }
  },
  created () {

  }
}
</script>

<style scoped>
</style>
