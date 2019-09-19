<template>
    <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
        <div class="app-container">
            <LayoutSearch>
                 <el-form-item label="订单号">
                    <el-input v-model="searchForm.orderId" placeholder="输入预商户订单号查询"></el-input>
                </el-form-item>
                <el-form-item label="预支付订单号">
                    <el-input v-model="searchForm.preOrderId" placeholder="输入预支付订单号查询"></el-input>
                </el-form-item>
                <el-form-item label="处理状态">
                    <el-select v-model="searchForm.applyStatus" placeholder="处理状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for='(key,i) in Object.keys(orderEnum.refundApplyStatus)' :value='key' :label='orderEnum.refundApplyStatus[key]' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退款状态">
                    <el-select v-model="searchForm.refundStatus" placeholder="退款状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for='(key,i) in Object.keys(orderEnum.refundStatus)' :value='key' :label='orderEnum.refundStatus[key]' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
                </el-form-item>
            </LayoutSearch>
            <baseTable :columns='columns' :list='list' :loading='loading' @refundAudit='refundAudit'
            :param='searchForm'  @search='onSearch'>
            </baseTable>   
            <el-dialog title='退款审核' :visible.sync='applyDialogVisible'>
                <el-form :model="applyForm" :rules="rules" ref="form" label-width="130px">
                   <el-form-item label="订单号" prop="orderId">
                        <el-input v-model="applyForm.orderId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="预支付订单号" prop="preOrderId">
                        <el-input v-model="applyForm.preOrderId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额(元)" prop="amount">
                        <el-input v-model="applyForm.amount" :disabled='true'></el-input>
                    </el-form-item>
                    <el-form-item label="审核处理" prop="applyStatus">
                        <el-radio v-model="applyForm.applyStatus" label="1">通过</el-radio>
                        <el-radio v-model="applyForm.applyStatus" label="2">驳回</el-radio>
                    </el-form-item>
                    <el-form-item label="驳回原因" v-if="applyForm.applyStatus == '2'">
                        <el-input v-model="applyForm.refuseReason" type="textarea" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="validForm" :loading="submiting">提交</el-button>
                        <el-button @click="applyDialogVisible=false" v-if="!submiting">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </LayoutPage>  
</template>
<script>
import {CashierApi} from '@/api'
import RefundApplyVO from '@/api/modules/RefundApplyVO'
import ApplyRefundRecordVo from  '@/api/modules/ApplyRefundRecordVo'
import Pager from "@/api/base/Pager";
import orderEnum from '@/views/platform/enum.ts'

export default {
    data(){
        return {
            columns:[],
            list:[],
            searchForm:new RefundApplyVO(),
            pager:new Pager(),
            loading:false,
            orderEnum,
            applyForm:new ApplyRefundRecordVo(),
            applyDialogVisible:false,
            submiting:false,
            rules: {
                orderId: [
                {
                    required: true,
                    message: "订单号不能为空",
                    trigger: "change"
                }
                ],
                preOrderId: [
                {
                    required: true,
                    message: "预支付订单号不能为空",
                    trigger: "change"
                }
                ],
                amount: [
                {
                    required: true,
                    message: "金额不能为空",
                    trigger: "change"
                }
                ],
                applyStatus: [
                {
                    required: true,
                    message: "请选择审核处理类型",
                    trigger: "change"
                }
                ]
            }
        }
    },
    created(){
        this.columns=[
            {key:'id',title:'ID',width:50},
            {key:'orderId',title:'订单号',width:150},
            {key:'preOrderId',title:'预支付订单号',width:150},
            {key:'amount',title:'金额',width:100},
            {key:'applyReason',title:'退款原因',},
            {key:'applyStatus',title:'处理状态',width:100,format:(val)=>{
                // let item = Object.getOwnPropertyDescriptor(orderEnum.refundApplyStatus,val)
                // return item?item.value:''
                return orderEnum.refundApplyStatus[val]
            }},
            {key:'applyCommitTime',title:'申请提交时间',width:150},
            {key:'refundStatus',title:'退款状态',width:100,format:(val)=>{
                // let item = Object.getOwnPropertyDescriptor(orderEnum.refundStatus,val)
                // return item?item.value:''
                return orderEnum.refundStatus[val]
            }},
            {key:'applyUserName',title:'申请人',width:100},
            {key:'applyProcessTime',title:'申请处理时间',width:150},
            {key:'refundSerialsId',title:'退款流水',width:150},
            {key:'remark',title:'退款失败原因',width:100},
            {type:'operate',title:'操作',width:100,
                operates:[
                    {name:'审核',emitKey:'refundAudit',showFun:(row)=>{
                        return row.applyStatus==0
                    }}
                ]
            }
        ]
        this.pager.currentPage=1
        this.pager.pageSize=30
        this.onSearch()
    },
    methods:{
        onSearch(){
            this.pager.currentPage=1
            this.dataLoad()
        },
        async dataLoad(){
            this.loading=true
            let res = await CashierApi.queryRefundApplyRecordListUsingPOST({...this.searchForm,...this.pager})
            if(res.status===200){
               this.list=res.payload.list
               this.pager.totalCount=res.payload.totalCount
            }
            this.loading=false
        },
        refundAudit(row){
            this.applyDialogVisible=true
            this.applyForm=row
        },
        handleSizeChange(size){
            this.pager.pageSize=size
            this.dataLoad()
        },
        handleCurrentChange(current){
            this.pager.currentPage=current
            this.dataLoad()
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
        async doSubmit () {
            this.submiting = true
            let rs=null
            //通过
            if(this.applyForm.applyStatus=='1'){
                rs = await CashierApi.refundApplyPassUsingPOST(this.applyForm)
            }
            //驳回
            else if(this.applyForm.applyStatus=='2'){
                rs = await CashierApi.overruleUsingPOST(this.applyForm)
            }
            if (rs.status == "200") {
                this.$message({
                message: "保存成功",
                type: "success"
                })
                this.applyDialogVisible=false
                this.onSearch()
            } else {
                this.submiting = false
                this.$message.error(rs.message)
            }
            this.submiting = false
        },
    }
}
</script>
