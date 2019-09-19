<template>
  <LayoutPage>
    <LayoutSearch>

      <el-form-item label="号码">
        <el-input v-model="form.mobile" placeholder="输入号码查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" plain>新增</el-button>
      </el-form-item>
      <el-form-item v-if="activity == 0">
        <UploadButton :action="'mobileWhiteList/uploadMobile?type='+this.form.type+'&defId='+this.form.defId" @success="success">{{this.$route.params.type=='0'?"上传白名单":"上传黑名单"}}</UploadButton>
      </el-form-item>

      <el-form-item v-if="activity == 1">

        正常上传:
        <UploadButton v-if="uploadStatus" :action="'mobileWhiteList/uploadActRecordAdd?actId='+this.actId+'&defId='+this.form.defId+'&type='+2" @success="success">正常上传</UploadButton>
        <el-button v-else :loading="!uploadStatus">上传中</el-button>
      </el-form-item>
      <el-form-item v-if="activity == 1">
        叠加上传:<UploadButton v-if="uploadStatus" :action="'mobileWhiteList/uploadActRecordAdd?actId='+this.actId+'&defId='+this.form.defId+'&type='+1" @success="success">叠加上传</UploadButton>
        <el-button v-else :loading="!uploadStatus">上传中</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="mobileWhiteList/show_white_list" :param="form" @loaded="getActivity" showPager>
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="account" label="号码" width="200" v-if=" activity == 1">>
      </el-table-column>
      <el-table-column prop="mobile" label="号码" width="200" v-if=" activity == 0">
      </el-table-column>
      <el-table-column prop="freeNum" label="抽奖免费赠送次数" width="120" v-if="actType == 2 && activity == 1">
      </el-table-column>
      <el-table-column prop="buyNum" label="购买机会" width="100" v-if="activity == 1 ">
      </el-table-column>
      <el-table-column prop="usedNum" label="已购次数" width="100" v-if="actType == 1  && activity == 1">
      </el-table-column>
      <el-table-column prop="usedNum" label="已免费赠送次数" width="120" v-if="actType == 2  && activity == 1 ">
      </el-table-column>
      <el-table-column prop="buyedNum" label="抽奖已购次数" width="100" v-if="actType == 2 && activity == 1 ">
      </el-table-column>
      <el-table-column prop="nonDefaultTotal" label="抽奖非默认奖品次数" width="120" v-if="actType == 2 && activity == 1 ">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading" plain>编辑</el-button>
        </template>
      </el-table-column>

    </LayoutTable>
    <LayoutDialog title="号码编辑" v-model="ShowMobileDialog">
      <EditMoblieForm :bwMobile="bwMobile" @success="onSearch" @close="ShowMobileDialog=false"></EditMoblieForm>
    </LayoutDialog>
    <LayoutDialog title="号码编辑" v-model="ShowActivityMobileDialog">
      <EditActivityMoblieForm :whiteOne="whiteOne" @success="onSearch" @close="ShowActivityMobileDialog=false"></EditActivityMoblieForm>
    </LayoutDialog>
  </LayoutPage>

</template>
<script>

import EditMoblieForm from "./EditMoblieForm"
import EditActivityMoblieForm from "./EditActivityMoblieForm"
import UploadButton from "@/components/UploadButton"
export default {
  components: {
    EditMoblieForm,
    EditActivityMoblieForm,
    UploadButton
  },
  data () {
    return {
      activity: "",
      actType: "",
      whiteOne: {},
      bwMobile: {},
      uploadStatus: true,
      actId: "",
      form: {
        type: this.$route.params.type, // 0白名单 1黑名单
        defId: this.$route.params.defId
      },
      loading: false,
      ShowMobileDialog: false,
      ShowActivityMobileDialog: false
    }
  },
  methods: {
    getActivity (list, rs) {
      this.activity = rs.payload.activity
      this.actType = rs.payload.actType
      this.actId = rs.payload.actId
      this.loading = false
    },
    success (rs) {
      this.uploadStatus = false
      if (rs.status == "200") {
        this.uploadStatus = true
        this.$message({
          type: "success",
          message: "导入成功"
        })
        this.$refs.myTable.search()
        let list = rs.payload
        if (list) {
          if (list.length != 0 && list != "导入完成") {
            this.open(rs.payload)
          }
        }
      } else if (rs.status == "300") {
        this.$message({
          type: "success",
          message: "导入中"
        })
        this.findRedisKey(rs.payload)
      } else {
        this.uploadStatus = true
        this.$message({
          type: "error",
          message: rs.error

        })
      }
    },
    open (msg) {
      this.$notify({
        title: "重复号码",
        message: msg,
        duration: 0
      })
    },
    onAdd () {
      if (this.activity == 1) {
        this.whiteOne.actId = this.actId
        this.whiteOne.defId = this.form.defId
      }
      if (this.activity == 1) {
        this.ShowActivityMobileDialog = true
      } else {
        this.bwMobile.type = 0
        this.bwMobile.defId = this.form.defId
        this.ShowMobileDialog = true
      }
    },
    async findRedisKey (key) {
      let rs = await this.$post("mobileWhiteList/findRedisKey", {
        key: key
      })
      if (rs.payload) {
        this.uploadStatus = true
        this.$message({
          type: "success",
          message: "导入成功"
        })
        this.$refs.myTable.search()
        let list = rs.payload
        if (list) {
          if (list.length != 0 && list != "导入完成") {
            this.open(rs.payload)
          }
        }
      } else {
        let this_ = this
        setTimeout(function () {
          this_.findRedisKey(key)
        }, 3000)
      }
    },
    edit (object) {
      if (this.activity == 1) {
        this.whiteOne.actId = this.actId
        this.whiteOne.defId = this.form.defId
        this.whiteOne.actRecord = object
      } else {
        this.bwMobile = object
        this.bwMobile.type = 0
      }
      if (this.activity == 1) {
        this.ShowActivityMobileDialog = true
      } else {
        this.ShowMobileDialog = true
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
