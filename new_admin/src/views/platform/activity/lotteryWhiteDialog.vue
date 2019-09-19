<template>
<section class="lottery_white">
  <el-dialog :visible.sync="diaVisible" title='活动概率配置' @closed='closed' :modal-append-to-body='false'>
    <el-form :model="form"  ref="form" label-width="100px">
        <el-form-item label="白名单列表">
          <template>
            <el-transfer filterable :filter-method="filterMethod" :titles="['未选择白名单', '已选择白名单']" filter-placeholder="请输入白名单名称" v-model="form.whiteChooseList" :data="whiteList">
            </el-transfer>
          </template>
        </el-form-item>
        <el-form-item label='配置白名单'>
            <el-select v-model='form.whiteId' placeholder="请选择白名单">
                <el-option v-for='(item,i) in whiteSelectList' :label='item.label' :value='item.key' :key='i'></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label='奖品概率配置' v-if='form.whiteId&&this.whiteSelectList'>
            <baseTable :columns='lotteryColumns' :list='lotteryList' :loading='loading'>
              <template slot='probability' slot-scope="{scope}"  >
                <el-input v-if='currentLotterySet&&currentLotterySet.find(item=>item.lotteryId==scope.row.id)'
                          v-model="currentLotterySet.find(item=>item.lotteryId==scope.row.id).probability" 
                          max="200">
                    <template slot="append">%</template>
                </el-input>
              </template>
            </baseTable>
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
import { ActivityApi,MobileApi,ProductApi } from "@/api";
import WhiteDefSearchVO from "@/api/modules/WhiteDefSearchVO";
import ActivityVO from "@/api/modules/ActivityVO";
import LotteryWhiteProbabilityVO from "@/api/modules/LotteryWhiteProbabilityVO";
import LotteryProbabilitySaveAndUpdateVO from "@/api/modules/LotteryProbabilitySaveAndUpdateVO";
import productVue from './product.vue';

export default {
  props:{
      actId:Number,
      visible:Boolean,
  },
  watch:{
    visible(val){
      this.diaVisible=val
    },
    async actId(val){
      if(val&&this.visible){
        this.formInit()
        await this.loadLottery()
        await this.loadActWhite()
        await this.loadData()
      }
    },
    'form.whiteId'(val){
        this.currentLotterySet=this.lotterySet[val]
    },
  },
  computed:{
    whiteSelectList(){
        if(this.form.whiteChooseList){
          let res = this.whiteList.filter(item=>this.form.whiteChooseList.indexOf(item.key)>-1)
          //加入新加的白名单
          res.forEach(async (item)=>{
              if(!this.lotterySet.hasOwnProperty(item.key)){
                let setList = this.lotteryList.map(item=>{return {
                            lotteryId:item.id,
                            probability:null
                        }})
                this.lotterySet[item.key]=setList
              }
          })
          //删除已经去掉的白名单
          let keys=Object.keys(this.lotterySet)
          let originKeys=res.map(item=>item.key)
          keys.forEach(key=>{
              if(originKeys.indexOf(key-'')==-1){
                delete this.lotterySet[key]
                if(this.form.whiteId==key){
                    this.form.whiteId=''
                }
              }
          })
          return res
        }
        else return []
    },
  },
  data(){
      return {
          diaVisible:false,
          form: {},
          submiting: false,
          loading:false,
          filterMethod (query, item) {
              return item.defName.indexOf(query) > -1
          },
          whiteList: [],
          isWhite:true,
          lotteryColumns:[],
          lotteryList:[],
          lotterySet:{},
          currentLotterySet:[],
      }
  },
  created(){
        this.lotteryColumns=[
            {key:'id',title:'奖品ID',width:80},
            {key:'prizeName',title:'奖品名称'},
            {key:'prizeProbability',title:'奖品权重',width:120},
            {key:'probability',title:'奖品概率',width:120,slot:'probability'},
        ]
  },
  methods: {
    formInit(){
        this.form= {
              actId: this.actId,
              whiteId:'',
              whiteChooseList: []
            }
        this.lotteryList=[]
        this.lotterySet={}
        this.currentLotterySet=[]
        this.isWhite=true
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
    //获取活动白名单
    async loadActWhite () {
      this.submiting = true
      var {payload}= await ActivityApi.getActivityUsingGET({actId:this.actId})
      if(payload){
          if(payload.isWhite==='1'){
               this.isWhite=true
               this.form.whiteChooseList=payload.whiteIds?payload.whiteIds.split(',').map(item=>item-''):[]
          }
          else{
              this.isWhite=false
              this.form.whiteChooseList=payload.lotteryWhiteIds?payload.lotteryWhiteIds.split(',').map(item=>item-''):[]
          }
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
      this.whiteList.forEach(item=>{item.disabled=this.isWhite})
      this.submiting = false
    },
    //获取已经配置的获奖概率数据
    async loadData(){
     let res = await ProductApi.getLotteryWhiteProbabilityUsingGET({actId:this.actId})
     if(res&&res.status===200&&res.payload.lotteryProbabilitySaveAndUpdateVOList.length){
       let list = res.payload.lotteryProbabilitySaveAndUpdateVOList
       for(let data of list){
          if(this.form.whiteChooseList.indexOf(data.whiteId)>-1){//配置数据必须包含在已选择的白名单里
              this.lotterySet[data.whiteId]= this.lotteryList.map(item1=>{
                let obj = {lotteryId:item1.id}
                let lottery=data.lotteryWhiteProbabilityVOS.find(item2=>item2.lotteryId==item1.id)
                if(lottery){
                  obj.probability=lottery.probability
                }
                return obj
            })
          }
       }
       this.form.whiteId=this.form.whiteChooseList[0]
     }
    },
    //获取奖品列表
    async loadLottery(){
        this.loading=true
        let {payload} = await ProductApi.getLotteryListUsingPOST({pageSize:100,currentPage:1,actId:this.actId,lotteryStatus:'1'})
        if(payload){
            this.lotteryList=payload.list
        }
        this.loading=false
    },
    async doSubmit () {
        this.submiting = true
        let params = new ActivityVO()
        params.actId=this.actId
        params.lotteryWhiteIds =this.form.whiteChooseList.join(',')
        let res = await ActivityApi.savelotteryWhiteIdsUsingPOST(params)
        if(res&&res.status===200){
            params = new LotteryProbabilitySaveAndUpdateVO()
            params.actId=this.actId
            params.whiteId=this.form.whiteId
            let arys=this.currentLotterySet.filter(item=>item.probability).map(item=>{
              let obj={}
              obj.actId=this.actId
              obj.lotteryId=item.lotteryId
              obj.probability=item.probability
              obj.whiteId=this.form.whiteId
              return obj
            })
            params.lotteryWhiteProbabilityVOS=arys
            let res = await ProductApi.saveLotteryWhiteProbabilityUsingPOST(params)
            if(res.status===200){
                this.$notify({
                    title: "温馨提示",
                    message: "保存成功",
                    type: "success",
                    duration: 2000
                });
                this.closed()
            }
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
.lottery_white{
  .el-dialog{
    min-width:700px;
  }
  .el-input-group__append, .el-input-group__prepend{
      padding:0 10px;
  }
}

</style>

