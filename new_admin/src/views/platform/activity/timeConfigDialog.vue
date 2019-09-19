<template>
  <el-dialog :visible.sync="diaVisible" title='时间配置' @closed='closed'>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="时间类型" prop="timeType">
            <el-select v-model="form.timeType" @change="empty" placeholder="请选择">
            <el-option v-for="item in timeTypeList" :key="item.id" :value="item.id" :label="item.type">
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
        <el-form-item v-if="form.timeType=='3'" label="选择日期" prop="dateTime">
            <el-checkbox-group v-model="form.dateTime">
              <el-checkbox v-for="i in 31" :label="i.toString()" :key="i">{{i}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="form.timeType=='2'||form.timeType=='3'" label="时间区间">
            <div v-for="(timeZone,ind) in form.timeInterval" :key="ind" class="timeZone">
                <el-time-picker v-model="timeZone.startTime" :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                            }" placeholder="起始时间" value-format="HH:mm:ss">
                </el-time-picker>
                <el-time-picker v-model="timeZone.endTime" :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                            }" placeholder="结束时间" value-format="HH:mm:ss">
                </el-time-picker>
                <el-button @click="delTimeZone(ind)">删除</el-button>
            </div>
            <div>
                  <el-button @click="addTimeZone">添加</el-button>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
            <el-button @click="closed " v-if="!submiting ">取消</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { ActivityApi } from "@/api";
import ActivityVO from "@/api/modules/ActivityVO";
import moment from "moment"
export default {
  props:{
      actId:Number,
      standId:Number,
      visible:Boolean,
  },
  watch:{
    visible(val){
      this.diaVisible=val
    },
    actId(val){
      if(val&&this.visible){
        this.loadTimeConfig()
      }
    },
    standId(val){
      if(val&&this.visible){
        this.loadTimeConfig()
      }
    }
  },
  data(){
      return {
          diaVisible:false,
          form: {},
          submiting: false,
          timeTypeList: [
              {
                  id: "2",
                  type: "每周"
              },
              {
                  id: "3",
                  type: "每月"
              }
          ],
          rules: {
              timeType: [
                { required: true, message: "请选择时间类型", trigger: "blur" }
              ],
              dateTime: [
                { required: true, message: "时间不能为空", trigger: "blur" }
              ]
          }
      }
  },
  methods: {
    formInit(){
      this.form= {
              actId:"",
              timeType: "",
              dateTime: [],
              startTime: "",
              endTime: "",
              dateTimeStr: "",
              timeInterval: []
            }
    },
    empty () {
      this.form.dateTime = []
      this.form.timeInterval = []
    },
    addTimeZone () {
      this.form.timeInterval.push({
        startTime: moment().format("HH:mm:ss"),
        endTime: moment().format("HH:mm:ss")
      })
    },
    delTimeZone (ind) {
      this.form.timeInterval.splice(ind, 1)
    },
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },

    async loadTimeConfig () {
      this.formInit()
      this.submiting = true
      this.form.actId=this.actId
      let rs = await ActivityApi.getActTimeCfgUsingPOST({actId:this.actId})
      if (rs.status === 200) {
        if (rs.payload.timeType != null) {
          this.form.timeType = rs.payload.timeType.toString()
          this.form.dateTime = rs.payload.dateTime.split(",")
          this.form.timeInterval = rs.payload.timeInterval.split(",").map(item => {
            return {
              startTime: item.split("-")[0],
              endTime: item.split("-")[1]
            }
          })
        }
      }
      this.submiting = false
    },

    async doSubmit () {
      this.submiting = true
      let postForm=JSON.parse(JSON.stringify(this.form))
      postForm.timeInterval=this.form.timeInterval.map(item => {
        return item.startTime + "-" + item.endTime
      }).join(",")
      postForm.dateTime = this.form.dateTime.join(",")

      let rs = await ActivityApi.saveActTimeCfgUsingPOST(postForm)

      if (rs.status === 200) {
        this.$notify({
            title: "温馨提示",
            message: "保存成功",
            type: "success",
            duration: 2000
        });
        this.diaVisible=false
        this.$emit("update:visible",false)
      }
      this.submiting = false
    },
    closed () {
      this.diaVisible=false
      this.$emit("update:visible",false)
      this.$emit("update:actId",null)
    }
  },
}
</script>
<style>
.timeZone{
  margin-top:10px;
}
</style>

