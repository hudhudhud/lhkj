<template>
   <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
        <div class="app-container lottery-page">
            <LayoutSearch>
                <el-form-item label="上下线">
                    <el-select v-model="queryForm.lotteryStatus" placeholder="可用状态">
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
             @buyRecord='buyRecord'
             @downLine='updateOnLineStatus($event,"0")'
             :param='queryForm'  @search='onSearch'>
                <template slot-scope="{scope}" slot="standardImgUrl">
                    <img :src="scope.row.standardImgUrl" v-if="scope.row.standardImgUrl" style="max-height:40px;" />
                </template> 
                <template slot-scope="{scope}" slot="lotteryStatus">
                   <el-tag :type='scope.row.lotteryStatus=="1"?"success":"info"'>{{ scope.row.lotteryStatus=="1"?"上线":"下线" }}</el-tag>
                </template>
                <template slot-scope="{scope}" slot="isDefault">
                    <el-switch v-model="scope.row.isDefault" @change="isDefaultLottery(scope.row)" active-color="#13ce66"
                        inactive-color="#D3D3D3" active-value="1" inactive-value="0">
                    </el-switch>
                </template>
            </baseTable>
        </div>
   </LayoutPage>  
</template>
<script lang='ts'>
import Vue from 'vue'
import LayoutSearch from '@/components/layout/LayoutSearch.vue'
import LotteryVO from "@/api/modules/LotteryVO";
import { ProductApi } from "@/api";
import { waves } from "@/directive/waves"; // waves directive
import ProductResponse from '../../../api/modules/ProductResponse';
import Pager from '@/api/base/Pager'

export default Vue.extend({
    components:{
        LayoutSearch,
    },
  directives: { waves },
  data():{
        queryForm:LotteryVO,
        loading:Boolean,
        columns:Array<object>,
        list:any[],
        pager:Pager<object>,
    }{
        return {
            queryForm:new LotteryVO(),
            loading:false,
            columns:[],
            list:[],
            pager:new Pager<object>(),
        }
    },
    created(){
        this.queryForm.actId=Number(this.$route.params.actId)
        this.queryForm.proId=Number(this.$route.params.proId)
        this.$set(this.queryForm,'lotteryStatus','1')//默认查上线
        this.columns=[
            {key:'id',title:'奖品ID',width:80},
            {key:'prizeName',title:'奖品名称',width:200},
            {key:'standardImgUrl',title:'奖品图标',slot:'standardImgUrl',width:120},
            {key:'prizeProbability',title:'奖品权重',width:120},
            {key:'prizeProbabilityPercent',title:'奖品概率',width:120},
            {key:'lotterySord',title:'奖品顺序',width:120},
            {key:'isDefault',title:'是否默认奖品',slot:'isDefault',width:120},
            {key:'prizeTotal',title:'奖品库存',width:120},
            {key:'usedTotal',title:'兑换数量',width:120},
            {key:'lotteryStatus',title:'上下线',slot:'lotteryStatus'},
            {type:'operate',title:'操作','minWidth':300,
                operates:[
                    {name:'编辑',emitKey:'edit',btnType:'warning',showKey:'lotteryStatus',show:'1'},//上线的才能编辑
                    {name:'中奖记录',emitKey:'buyRecord',btntype:'success'} ,
                    {name:'上线',emitKey:'online',showKey:'lotteryStatus',show:"0",btnType:'warning'},
                    {name:'下线',emitKey:'downLine',showKey:'lotteryStatus',show:"1",btnType:'warning'},
                    {name:'删除',emitKey:'del',btnType:'danger'},
                ]
            }
        ]
        this.pager.currentPage=1
        this.pager.pageSize=30
        this.onSearch()
    },
    methods:{
        handleSizeChange(size:number){
            this.pager.pageSize=size
            this.dataLoad()
        },
        handleCurrentChange(current:number){
            this.pager.currentPage=current
            this.dataLoad()
        },
        onSearch(){
            this.pager.currentPage=1
            this.dataLoad()
        },
        async dataLoad(){
            this.loading=true
            let {payload}=await ProductApi.getLotteryListUsingPOST({...this.pager,...this.queryForm})
            if(payload){
                this.list=payload.list
                let total=0
                this.list.forEach(item => {
                    total = total + item.prizeProbability;
                });
                this.list.forEach(item => {
                    item.prizeProbabilityPercent =
                    ((item.prizeProbability * 100) / total).toFixed(4) + "%";
                })
               this.pager.totalCount=payload.totalCount
            }
            this.loading=false
        },
        async onAdd(row?:any){
            let hash=`/platform/activityManage/activity/lottery/${this.queryForm.actId}/add`
            if(row&&row.id){
                this.$router.push(hash+'?lotteryId='+row.id)
            }
            else{
                this.$router.push(hash)
            }
        },
        async del(row:any){
            await this.$confirm("确认删除该奖品?", "提示", {type: "warning"})
            let param=new LotteryVO();
            param.actId=this.queryForm.actId
            param.id=row.id
            let res = await ProductApi.delLotteryUsingPOST(param);
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
            await this.$confirm(status==="0"?'确认下线该奖品?':'确认上线该奖品?', '提示', {type: 'warning'});
            let sta=Number(status)
            let res = await ProductApi.updateLotteryStatusUsingGET({lotteryId:row.id,status:sta});
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
             let hash=`/platform/activityManage/activity/lottery/${this.queryForm.actId}/winningRecode/${row.id}`
             this.$router.push(hash)
        },
        async isDefaultLottery(row:any){
            let param = new LotteryVO()
            param.isDefault=row.isDefault
            param.id=row.id
            param.actId=row.actId
            let res = await ProductApi.updateDefaultLotteryUsingPOST(param)
            if(res&&res.status===200){
                this.onSearch()
            }
        }
    }
})
</script>

<style lang='scss'>
</style>
