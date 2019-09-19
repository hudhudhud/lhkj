<template>
      <LayoutPage :showPager="false" >
        <div class="app-container">
            <LayoutSearch>
                <el-form-item label='订单号' >
                    <el-input v-model='queryForm.orderCode'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click='search'>查询</el-button>
                </el-form-item>
            </LayoutSearch>
            <base-table :columns='columns' :list='list' :default-expand-all='true'
            :param='queryForm'  @search='search' :loading='loading'>
                <template slot-scope="{scope}" slot='expand'>
                    <base-table :columns='columns_expand' :list='list' @apply='apply'>
                    </base-table>
                </template>
            </base-table>
            <el-dialog title='退款审核' :visible.sync='dialogVisible'>
                <el-form :model="form" :rules="rules" ref="form" label-width="130px">
                    <el-form-item label="订单号" prop="orderId">
                        <el-input v-model="form.orderId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="预支付订单号" prop="preOrderId">
                        <el-input v-model="form.preOrderId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额" prop="amount">
                        <el-input v-model="form.amount" :disabled='true'></el-input>
                    </el-form-item>
                    <el-form-item label="订单处理">
                        <el-switch v-model="form.needCancelOrder" active-value='1' inactive-value='0' active-text="取消订单" inactive-text="不取消订单">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="退款原因" prop="applyReason">
                        <el-input v-model="form.applyReason" type="textarea" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="validForm" :loading="submiting">提交</el-button>
                        <el-button @click="dialogVisible=false" v-if="!submiting">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </LayoutPage>
</template>
<script lang='ts'>
import Vue from 'vue'
import {CashierApi,EnumsApi} from '@/api'
import { Form as ElForm } from "element-ui";
import orderEnumOld from '@/views/platform/enum.ts'
import ApplyRefundRecordVo from '@/api/modules/ApplyRefundRecordVo'
import RefundApplyResponse from '@/api/modules/RefundApplyResponse'

export default Vue.extend({
    data():{
        queryForm:any,
        columns:Array<object>,
        columns_expand:Array<object>,
        list:any,
        submiting:Boolean,
        dialogVisible:Boolean,
        form:ApplyRefundRecordVo,
        loading:Boolean,
        rules:Object,
    }{
        return {
            queryForm:{orderCode:''},
            columns:[],
            columns_expand:[],
            list:[],
            submiting:false,
            dialogVisible:false,
            form:new ApplyRefundRecordVo(),
            loading:false,
            rules: {
                applyReason: [
                {
                    required: true,
                    message: "请输入50字内的退款原因",
                    trigger: "change"
                },
                {
                    min: 1,
                    max: 50,
                    trigger: "change"
                }
                ],
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
                ]
            },
        }
    },
    created(){
        this.columns=[
            {type:'expand',slot:'expand',width:50},
            {key:'merchantId',title:'商户ID'},
            {key:'merchantOrder',title:'商户订单号'},
            {key:'proDescribe',title:'购买物品'},
            {key:'totalFee',title:'支付金额'},
            {key:'payTime',title:'支付时间'},
            {key:'tel',title:'用户手机号'},
            {key:'rechargeAccount',title:'充值账号'},
            {key:'remark',title:'备注'},
        ]

        this.columns_expand=[
            {key:'customId',title:'用户ID'},
            {key:'preOrderId',title:'预支付订单号'},
            {key:'preOrderTime',title:'预支付订单时间'},
            {key:'rechargeStatus',title:'提货状态',format:(val:number)=>{
                let ob= Object.getOwnPropertyDescriptor(orderEnumOld.fishOrder,val)
                return ob&&ob.value?ob.value.name:''
            }},
            {key:'status',title:'支付状态',format:(val:number)=>{
                let vals={1:'未支付',2:'已支付'}
                let ob= Object.getOwnPropertyDescriptor(vals,val)
                return ob?ob.value:'未知'
            }},
            {key:'refundStatus',title:'退款状态',format:(val:number)=>{
                let vals={0:'未退款',1:'已退款',2:'退款失败'}
                let ob= Object.getOwnPropertyDescriptor(vals,val)
                return ob?ob.value:'未知'
            }},
            {type:'operate',title:'操作',
            operates:[
               {name:'申请退款',emitKey:'apply'},
            ]},
        ]

        this.queryForm.orderCode=this.$route.params.orderCode
        this.search()
    },
    methods:{
        async search(){
            this.loading=true
            let {payload} =  await  CashierApi.queryPreOrderListUsingGET({orderCode:this.queryForm.orderCode})
            if(payload){
                this.list=payload
            }
            this.loading=false
        },
        async apply(row:any){
            this.dialogVisible=true
            Object.assign(this.form,row)
            this.form.orderId=row.merchantOrder
            this.form.preOrderId=row.preOrderId
            this.form.amount=row.totalFee
        },
        validForm () {
            (this.$refs["form"] as ElForm).validate((valid:boolean) => {
                if (valid) {
                    this.sumbit()
                } else {
                    return false
                }
            })
        },
        async sumbit(){
            this.submiting=true
            let res = await  CashierApi.commitApplyRefundRecordUsingPOST(this.form)
            if(res.status===200){
                this.$notify({
                    title: "温馨提示",
                    message: "提交成功",
                    type: "success",
                    duration: 2000
                });
                this.dialogVisible=false
            }
            this.submiting=false
        }
    }
})
</script>
