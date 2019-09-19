<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">

      <!-- <el-form-item label="时间设置" prop="timeScope">
        <el-select v-model="form.timeScope" placeholder="请选择">
          <el-option v-for="timeScope in timeScopeList" :key="timeScope.id" :value="timeScope.id" :label="timeScope.type">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="时间类型" prop="timeType">
        <el-select v-model="form.timeType" @change="empty" placeholder="请选择">
          <el-option v-for="timeType in timeTypeList" :key="timeType.id" :value="timeType.id" :label="timeType.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.timeType=='1'" label="开始时间" prop="startTime">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="form.timeType=='1'" label="结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="form.timeType=='2'" label="周" prop="dateTime">
        <el-checkbox-group v-model="form.dateTime">
          <el-checkbox label=1>周一</el-checkbox>
          <el-checkbox label=2>周二</el-checkbox>
          <el-checkbox label=3>周三</el-checkbox>
          <el-checkbox label=4>周四</el-checkbox>
          <el-checkbox label=5>周五</el-checkbox>
          <el-checkbox label=6>周六</el-checkbox>
          <el-checkbox label=7>周日</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      {{form.dateTime}}
      <el-form-item v-if="form.timeType=='3'" label="选择日期" prop="dateTime">
        <el-checkbox-group v-model="form.dateTime">
          <el-checkbox v-for="i in 31" :label="i.toString()" :key="i">{{i}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item v-if="form.timeType=='2'||form.timeType=='3'" label="时间区间">
        <div v-for="(timeZone,ind) in form.timeInterval" :key="ind">
          <el-time-picker v-model="timeZone.startTime" :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59'
                    }"
            placeholder="起始时间" value-format="HH:mm:ss">
          </el-time-picker>
          <el-time-picker v-model="timeZone.endTime" :picker-options="{
                     selectableRange: '00:00:00 - 23:59:59'
                     }"
            placeholder="结束时间" value-format="HH:mm:ss">
          </el-time-picker>
          <el-button @click="delTimeZone(ind)">删除</el-button>
        </div>
        <div>
          <el-button @click="addTimeZone">添加</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
        <el-button @click="close " v-if="!submiting ">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      form: {
        actId: this.$route.params.actId,
        timeType: "",
        timeScope: "STD",
        dateTime: [],
        startTime: "",
        endTime: "",
        dateTimeStr: "",
        timeInterval: [],
        id: "",
        standardId: this.$route.params.standardId
      },
      submiting: false,

      timeTypeList: [
        {
          id: "1",
          type: "绝对时间"
        },
        {
          id: "2",
          type: "每周"
        },
        {
          id: "3",
          type: "每月"
        }
      ],
      // timeScopeList: [
      //   {
      //     id: "ACT",
      //     type: "活动"
      //   },
      //   {
      //     id: "PRO",
      //     type: "商品"
      //   }, {
      //     id: "STD",
      //     type: "商品规格"
      //   }
      // ],
      rules: {
        timeScope: [
          { required: true, message: "请选择时间设置", trigger: "blur" }
        ],
        timeType: [
          { required: true, message: "请选择时间类型", trigger: "blur" }
        ],
        dateTime: [{ required: true, message: "时间不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    empty() {
      this.form.dateTime = [];
      this.form.timeInterval = [];
    },
    addTimeZone() {
      this.form.timeInterval.push({
        startTime: moment().format("HH:mm:ss"),
        endTime: moment().format("HH:mm:ss")
      });
    },
    delTimeZone(ind) {
      this.form.timeInterval.splice(ind, 1);
    },
    validForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit();
        } else {
          return false;
        }
      });
    },

    async loadTimeConfig() {
      this.submiting = true;
      let rs = await this.$post("activity/get_seckill_time_config", {
        standardId: this.form.standardId
      });
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.form.id = rs.payload.id;
          this.form.actId = rs.payload.actId;
          this.form.timeType = rs.payload.timeType;
          this.form.timeScope = rs.payload.timeScope;
          this.form.startTime = rs.payload.startTime;
          this.form.endTime = rs.payload.endTime;
          if (rs.payload.dateTime) {
            this.form.dateTime = rs.payload.dateTime.split(",");
          }
          if (rs.payload.timeInterval) {
            this.form.timeInterval = rs.payload.timeInterval
              .split(",")
              .map(item => {
                return {
                  startTime: item.split("-")[0],
                  endTime: item.split("-")[1]
                };
              });
          }
        }
      }
      this.submiting = false;
    },

    async doSubmit() {
      this.submiting = true;

      this.form.timeIntervalStr = this.form.timeInterval
        .map(item => {
          return item.startTime + "-" + item.endTime;
        })
        .join(",");
      this.form.dateTime = this.form.dateTime.sort((a, b) => {
        return a - b;
      });
      this.form.dateTimeStr = this.form.dateTime.join(",");
      console.log(this.form.timeIntervalStr);

      let rs = await this.$post("activity/save_seckill_time_config", this.form);

      if (rs.status == "200") {
        console.info("rs===" + rs.message);
        this.$message({
          message: rs.message,
          type: "success"
        });
        this.$emit("success", this.form);
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
    this.loadTimeConfig();
  }
};
</script>

<style scoped>
.form {
  position: relative;
}
</style>
