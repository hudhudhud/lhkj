<template>
    <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
        <div class="app-container">
            <LayoutSearch>
               <el-form-item label="订单号">
                    <el-input v-model="searchForm.orderId" placeholder="输入订单号查询"></el-input>
                </el-form-item>
                <el-form-item label="预支付订单号">
                    <el-input v-model="searchForm.preOrderId" placeholder="输入预支付订单号查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
            </LayoutSearch>
            <baseTable :columns='columns' :list='list' :loading='loading'  :param='searchForm'  @search='onSearch'>>
            </baseTable>   
        </div>
    </LayoutPage>  
</template>
<script>
import {CashierApi} from '@/api'
import RefundApplyVO from '@/api/modules/RefundApplyVO'
import Pager from "@/api/base/Pager";
import orderEnum from '@/views/platform/enum.ts'
export default{
    data(){
        return {
            columns:[],
            list:[],
            searchForm:new RefundApplyVO(),
            pager:new Pager(),
            loading:false,
            orderEnum,
        }
    },
    created(){
        this.columns=[
            {key:'id',title:'ID',width:50},
            {key:'orderId',title:'订单号',width:150},
            {key:'preOrderId',title:'预支付订单号',width:150},
            {key:'amount',title:'退款金额',width:100},
            {key:'applyCommitTime',title:'申请提交时间',width:150},
            {key:'applyReason',title:'退款原因',},
            {key:'applyStatus',title:'处理状态',width:100,format:(val)=>{
                return orderEnum.refundApplyStatus[val]
            }},
            {key:'refundStatus',title:'退款状态',width:100,format:(val)=>{
                return orderEnum.refundStatus[val]
            }},
            {key:'needCancelOrder',title:'订单处理',width:100,format:(val)=>{
                return val==1?'取消订单':'不取消订单'
            }},
            {key:'refuseReason',title:'驳回理由',},
            {key:'refundSerialsId',title:'退款流水',width:150},
            {key:'remark',title:'退款失败原因'},
        ]
        this.pager.currentPage=1
        this.pager.pageSize=30
        this.onSearch()
    },
    methods:{
        async onSearch(){
            this.pager.currentPage=1
            this.dataLoad()
        },
        async dataLoad(){
            this.loading=true
            let res = await CashierApi.kefuQueryUsingPOST({...this.searchForm,...this.pager})
            if(res.status===200){
                this.list=res.payload.list
                this.pager.totalCount=res.payload.totalCount
            }
            this.loading=false
        },
        onAdd() {

        },
        handleSizeChange(size){
            this.pager.pageSize=size
            this.dataLoad()
        },
        handleCurrentChange(current){
            this.pager.currentPage=current
            this.dataLoad()
        },
    }
}
</script>
