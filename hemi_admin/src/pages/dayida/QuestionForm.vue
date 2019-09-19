<template>
  <LayoutForm>
    <el-form :model="form" ref="form" label-width="100px">
      <!-- 隐藏参数 -->
      <el-form-item v-show="false">
        <el-input v-model="form.actId"></el-input>
        <el-input v-model="form.questionId"></el-input>
      </el-form-item>
      <el-form-item label="题目" prop="questionName">
        <el-input type="textarea" :autosize="true" v-model="form.questionName"></el-input>
      </el-form-item>
      <el-form-item label="题目选项">
        <div class="opt-box" v-for="(item,idx) in form.optionsList" :key="idx">
          <el-input v-model="item.options" class="pr-sm">
            <template slot="prepend">{{item.optionsNumber | NumToLetter}}</template>
          </el-input>
          <el-button @click="delOptions(idx)">删除</el-button>
        </div>
        <div>
          <el-button v-if="form.optionsList.length < 5" @click="addOptions">添加</el-button>
        </div>
      </el-form-item>
      <el-form-item label="题目答案" prop="answer" v-show="form.optionsList.length>0">
        <el-radio-group v-model="form.answer">
          <el-radio v-for="item in form.optionsList" :key="item.optionsNumber" :label="item.optionsNumber">{{item.optionsNumber
            | NumToLetter}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分享链接" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="picture">
        <UploadImages v-model="form.picture" action="file/upload" :max="1"></UploadImages>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import UploadImages from "@/components/UploadImages";
export default {
  components: { UploadImages },
  props: {
    activity: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      form: {
        actId: null,
        questionId: null,
        questionName: "",
        answer: "",
        optionsList: [],
        remark: "",
        title: "",
        picture: []
      },
      submiting: false
    };
  },
  methods: {
    validForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit();
        } else {
          return false;
        }
      });
    },

    addOptions() {
      const len = this.form.optionsList.length + 1;
      this.form.optionsList.push({
        options: "",
        optionsNumber: len
      });
    },
    delOptions(idx) {
      this.form.optionsList.splice(idx, 1);
      this.form.answer = "";
      // 重新排序
      this.form.optionsList.forEach((item, i) => {
        item.optionsNumber = i + 1;
      });
    },

    async loadQuestion(actId) {
      this.submiting = true;
      let rs = await this.$post("game_question/get", { actId: actId });
      if (rs.status == 200) {
        // 排除查询为空的情况
        if (rs.payload) {
          const param = rs.payload;
          this.form = {
            actId: actId,
            questionId: param.id,
            questionName: param.questionName,
            answer: param.answer,
            optionsList: param.optionsList,
            remark: param.remark,
            title: param.title,
            picture: param.picture ? [{ url: param.picture }] : []
          };
        }
      } else {
        // this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    async doSubmit() {
      this.submiting = true;
      this.form.status = 1;
      let data = { ...this.form };
      data.picture = data.picture[0].url;
      let rs = await this.$post("game_question/save", data);

      if (rs.status == 200) {
        this.$message({
          message: rs.message,
          type: "success"
        });
        // this.$emit("success", this.form);
        this.$router.go(-1);
      } else {
        this.submiting = false;
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    close() {
      this.$router.go(-1);
    }
  },
  created() {
    let actId = this.$route.params.actId;
    if (actId) {
      this.form.actId = actId;
      this.loadQuestion(actId);
    }
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
.opt-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.pr-sm {
  padding-right: 8px;
}
</style>
