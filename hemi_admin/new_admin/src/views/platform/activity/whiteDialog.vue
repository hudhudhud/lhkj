<template>
<section class="white">
  <el-dialog :visible.sync="diaVisible" title='白名单配置' @closed='closed' :modal-append-to-body='false'>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="活动id" prop="actId">
          <el-input v-model="form.actId" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="actName">
          <el-input v-model="form.actName" disabled></el-input>
        </el-form-item>
        <el-form-item label="提示用户信息" prop="whiteReturnMsg">
          <el-input v-model="form.whiteReturnMsg"></el-input>
        </el-form-item>
        <el-form-item label="白名单列表">
          <template>
            <el-transfer filterable :filter-method="filterMethod" :titles="['未选择白名单', '已选择白名单']" filter-placeholder="请输入白名单名称" v-model="form.whiteChooseList" :data="whiteList">
            </el-transfer>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
          <el-button @click="closed" v-if="!submiting">取消</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</section>
</template>
<script>
import { ActivityApi,MobileApi } from "@/api";
import WhiteDefSearchVO from "@/api/modules/WhiteDefSearchVO";
import ActivityVO from "@/api/modules/ActivityVO";

export default {
  props:{
      actId:Number,
      actName:String,
      visible:Boolean,
  },
  watch:{
    visible(val){
      this.diaVisible=val
    },
    actId(val){
      if(val&&this.visible){
        this.formInit()
        this.loadActWhite()
      }
    }
  },
  data(){
      return {
          diaVisible:false,
          form: {},
          submiting: false,
          filterMethod (query, item) {
              return item.defName.indexOf(query) > -1
          },
          rules: {
            id: [
              { required: true, message: "请输入活动id", trigger: "change" },
              { min: 1, max: 20,message: "长度在 1 到 20 个字符",trigger: "change"}
            ]
          },
          whiteList: [],
      }
  },
  methods: {
    formInit(){
      this.form= {
              actId: this.actId,
              actName: this.actName,
              whiteReturnMsg: "",
              whiteChooseList: []
            }
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
    async loadActWhite () {
      this.submiting = true
      var {payload}= await ActivityApi.getActivityUsingGET({actId:this.actId})
      if(payload){
        this.form.whiteReturnMsg = payload.whiteReturnMsg
        this.form.whiteChooseList=payload.whiteIds?payload.whiteIds.split(',').map(item=>item-''):[]
      }
      //没数据才调用接口
      if(!this.whiteList.length){
          let param = new WhiteDefSearchVO()
          param.pageSize=10000
          param.currentPage=1
          var {payload} =await MobileApi.queryMobileWhiteListUsingPOST(param)
          if (payload) {
            this.whiteList =payload.list.map(item => {
              item.label = item.defName
              item.key = item.id
              return item
            })
          }
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true
      let param=new ActivityVO()
      param.actId=this.actId
      param.whiteIds=this.form.whiteChooseList.join(',')
      param.whiteReturnMsg=this.form.whiteReturnMsg
      let res = await ActivityApi.saveActivityWhiteUsingPOST(param)
      if(res.status===200){
          this.$notify({
              title: "温馨提示",
              message: "保存成功",
              type: "success",
              duration: 2000
          });
          this.closed()
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
<style lang='scss'>
.white{
  .el-dialog{
    min-width:700px;
  }
}

</style>

