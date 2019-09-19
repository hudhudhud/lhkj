<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="活动名称">
        <el-input v-model="form.actName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="上下线">
        <el-select v-model="form.actStatus" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="activity/getQuestionActList" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="actId" label="活动ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="actName" label="活动名称" width="200" align="center">
      </el-table-column>
      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.actStatus=="1"?"success":"info"'>{{ props.row.actStatus=="1"?"上线":"下线" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="活动开始时间" width="250" align="center">
      </el-table-column>
      <el-table-column prop="endTime" label="活动结束时间" width="250" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="400">
        <template slot-scope="props">
          <el-button @click="question(props.row.actId) " type="primary " :loading="props.row.loading " plain>题目</el-button>
          <el-button v-if="props.row.actStatus=='0' " @click="online(props.row) " type="success " :loading="props.row.loading "
            plain>上线</el-button>
          <el-button v-if="props.row.actStatus=='1' " @click="downline(props.row) " type="primary " :loading="props.row.loading "
            plain>下线</el-button>
          <el-button @click="previewImg(props.row.actId, props.row.merchantId, props.row.endTime) " type="success "
            :loading="props.row.loading " plain>生成图片</el-button>
          <el-button @click="edit(props.row.actId) " type="success " :loading="props.row.loading " plain>编辑</el-button>
          <el-button @click="del(props.row.actId) " type="danger " :loading="props.row.loading " plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <!-- 生成图片预览弹窗 -->
    <el-dialog :visible.sync="showPreview" width="416px">
      <template slot="title">
        <!-- click 触发ImgPreview的createImg方法 -->
        <el-button type="primary" @click="$refs.child.createImg()">下载到本地</el-button>
      </template>
      <ImgPreview ref="child" :time="endTime" :questionData="currentQues" :qrcode="qrcode"></ImgPreview>
    </el-dialog>
  </LayoutPage>

</template>

<script>
import ImgPreview from "./ImgPreview";
export default {
  components: { ImgPreview },
  data() {
    return {
      form: {
        actName: "",
        actStatus: ""
      },
      loading: false,
      showPreview: false,
      endTime: "", // 用于图片弹窗内截止时间
      currentQues: null, // 生成图片获取question数据
      qrcode: "" // 生成图片获取的二维码地址
    };
  },
  methods: {
    question(actId) {
      this.$router.push({
        path: "/dayida/editQuestion/" + actId
      });
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    async dodel(actId) {
      let rs = await this.$post("activity/del", { actId: actId });
      if (rs.status == "200") {
        this.onSearch();
      }
    },
    onAdd() {
      this.$router.push({
        path: "/dayida/addActivity/"
      });
    },
    async previewImg(actId, merchantId, endTime) {
      let rs = await this.$post("game_question/get", { actId: actId });
      if (rs.status == 200) {
        // 排除查询为空的情况
        if (rs.payload) {
          this.$get(
            `custom/get/question/pic?questionId=${
              rs.payload.id
            }&merchantId=${merchantId}&actId=${actId}`
          ).then(data => {
            if (data.status == 200) {
              this.qrcode = data.payload;
              this.currentQues = rs.payload;
              this.endTime = endTime.slice(0, 10);
              this.showPreview = true;
            }
          });
        } else {
          this.$message("请新增题目！");
        }
      }
    },
    edit(actId) {
      this.$router.push({
        path: "/dayida/editActivity/" + actId
      });
    },
    del(activity) {
      this.$confirm("此操作将永久删除该活动,请谨慎操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dodel(activity);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async editOnline(activity) {
      let rs = await this.$post("activity/update_online", {
        actId: activity.actId,
        actStatus: activity.actStatus
      });
      if (rs.status == "200") {
        this.onSearch();
      }
    },
    online(activity) {
      this.$confirm("确认要上线该活动吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editOnline(activity);
          this.$message({
            type: "success",
            message: "上线成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    downline(activity) {
      this.$confirm("确认要下线该活动吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editOnline(activity);
          this.$message({
            type: "success",
            message: "下线成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
