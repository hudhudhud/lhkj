<template>
   <LayoutPage :showPager="false">
        <div class="app-container product-page">
            <LayoutSearch>
                <el-form-item label="上下线">
                    <el-select v-model="queryForm.standardStatus" placeholder="可用状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="上线" value="1"></el-option>
                    <el-option label="下线" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onAdd" type="success" plain>新增</el-button>
                </el-form-item>
            </LayoutSearch> 
            <baseTable :columns='columns' :list='list' @edit='onAdd' @del='del' @online='updateOnLineStatus($event,"1")'
             @buyRecord='buyRecord' @timeConfig='timeConfig'
             @downLine='updateOnLineStatus($event,"0")'
             :param='queryForm'  @search='onSearch'>
                <template slot-scope="{scope}" slot="standardImgUrl">
                    <img :src="scope.row.standardImgUrl" v-if="scope.row.standardImgUrl" style="max-height:40px;" />
                </template> 
                <template slot-scope="{scope}" slot="standardStatus">
                   <el-tag :type='scope.row.standardStatus=="1"?"success":"info"'>{{ scope.row.standardStatus=="1"?"上线":"下线" }}</el-tag>
                </template>
            </baseTable>
        </div>
        <timeConfigDialog :actId='currentActId' 
        :standId='currentStandId'
        :visible.sync='timeConfigDialogVisible' ></timeConfigDialog>
   </LayoutPage>  
</template>
<script lang='ts'>
import Vue from 'vue'
import LayoutSearch from '@/components/layout/LayoutSearch.vue'
import ProductVO from "@/api/modules/ProductVO";
import ActivityVO from "@/api/modules/ActivityVO";
import { ProductApi,ActivityApi } from "@/api";
import { waves } from "@/directive/waves"; // waves directive
import ProductResponse from '../../../api/modules/ProductResponse';
import timeConfigDialog from "./timeConfigDialog.vue";
import activity from '../../../routers/platform/activity';
export default Vue.extend({
    components:{
        LayoutSearch,
        timeConfigDialog
    },
  directives: { waves },
  data():{
        queryForm:ProductVO,
        loading:Boolean,
        columns:Array<object>,
        list:any[],
        currentActId:number,
        currentStandId:number,
        timeConfigDialogVisible:boolean,
    }{
        return {
            queryForm:new ProductVO(),
            loading:false,
            columns:[],
            list:[],
            currentActId:-1,
            currentStandId:-1,
            timeConfigDialogVisible:false,
        }
    },
    async created(){
        this.queryForm.actId=Number(this.$route.params.actId)
        this.queryForm.proId=Number(this.$route.params.proId)
        this.$set(this.queryForm,'standardStatus','1')//默认查上线
        this.columns=[
            {key:'id',title:'规格ID',width:80},
            {key:'standardName',title:'规格名称',width:200},
            {key:'baseProId',title:'原始商品',width:120},
            {key:'baseStandardCode',title:'原始规格code',width:120},
            {key:'standardImgUrl',title:'规格图片',slot:'standardImgUrl',width:100},
            {key:'standardSort',title:'排序',width:120},
            {key:'originalPrice',title:'原价',width:120},
            {key:'currentPrice',title:'现价',width:120},
            {key:'integralNum',title:'积分数量',width:120},
            {key:'standardStatus',title:'上下线',slot:'standardStatus'},
            {key:'limitTotal',title:'库存',width:120,showFun:(row:any)=>{
                return this.queryForm.actType!=3
            }},
            {key:'limitPerTime',title:'每时段限制数量',width:120,showFun:(row:any)=>{
                return this.queryForm.actType==3
            }},
            {key:'usedTotal',title:'兑换数量',width:120},
            {type:'operate',title:'操作','minWidth':300,
                operates:[
                    {name:'上线',emitKey:'online',showKey:'standardStatus',show:"0",btnType:'warning'},
                    {name:'下线',emitKey:'downLine',showKey:'standardStatus',show:"1",btnType:'warning'},
                    {name:'购买记录',emitKey:'buyRecord',btntype:'success'} ,
                    // {name:'时间配置',emitKey:'timeConfig',btntype:'success',showFun:()=>{
                    //     return this.queryForm.actType==3
                    // }} ,
                    {name:'编辑',emitKey:'edit',btnType:'warning'},
                    {name:'删除',emitKey:'del',btnType:'danger'},
                ]
            }
        ]
        await this.actLoad()
        this.onSearch()
    },
    methods:{
        async actLoad(){
            let param= new ActivityVO()
            param.actId=this.queryForm.actId
            let res = await ActivityApi.getActTypeUsingPOST(param)
            if(res&&res.status===200){
                this.queryForm.actType=res.payload.actType
            }
        },
        async onSearch(){
            this.loading=true
            let {payload}=await ProductApi.getStandardUsingPOST(this.queryForm)
            if(payload){
               this.list=payload
            }
            this.loading=false
        },
        async onAdd(row?:any){
            let hash=`/platform/activityManage/activity/product/${this.queryForm.actId}/standard/${this.queryForm.proId}/add`
            if(row&&row.id){
                this.$router.push(hash+'?standardId='+row.id)
            }
            else{
                this.$router.push(hash)
            }
        },
        async del(row:any){
            await this.$confirm("确认删除该规格?", "提示", {type: "warning"})
            let param=new ProductVO();
            param.actId=this.queryForm.actId
            param.proId=this.queryForm.proId
            param.standardId=row.id
            let res = await ProductApi.delStandardUsingPOST(param);
            if(res.status===200){
                this.$notify({
                    title: "温馨提示",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                });
                this.onSearch()
            }
        },
        async updateOnLineStatus(row:any,status:string){
            await this.$confirm(status==="0"?'确认下线该规格?':'确认上线该规格?', '提示', {type: 'warning'});
            let sta=Number(status)
            let res = await ProductApi.updateStandardStatusUsingGET({standardId:row.id,status:sta});
            if(res.status===200){
                this.$notify({
                    title: "温馨提示",
                    message: "操作成功",
                    type: "success",
                    duration: 2000
                });
                this.onSearch()
            }
        },
        buyRecord(row:any){
             let hash=`/platform/activityManage/activity/product/${this.queryForm.actId}/standard/${this.queryForm.proId}/buyRecord/${row.id}`
             this.$router.push(hash)
        },
        timeConfig(row:any){
            this.currentActId=this.queryForm.actId
            this.currentStandId=row.id
            this.timeConfigDialogVisible=true
        }
    }
})
</script>

<style lang='scss'>
.product-page{
    .el-dialog{
        height: 80%;
        overflow: scroll;
    }
}
</style>
