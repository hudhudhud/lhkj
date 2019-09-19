<template>
    <LayoutPage :showPager="false" :pager='pager' >
        <LayoutSearch>
            <el-form-item label=订单状态>
                <el-select v-model="queryForm.orderState" placeholder="请选择订单状态" >
                <el-option label="所有订单" value=""></el-option>
                <el-option v-for='(item,i) in orderEnum.orderState' :label="item.desc" :value="item.code" :key='i'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label=支付状态>
                <el-select v-model="queryForm.payState" placeholder="请选择支付状态" >
                <el-option label="所有订单" value=""></el-option>
                <el-option v-for='(item,i) in orderEnum.paymentState' :label="item.desc" :value="item.code" :key='i'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label=飞鱼订单状态 v-show='currentTab==="old"'>
                <el-select v-model="queryForm.rechargeState" placeholder="请选择飞鱼订单状态" >
                <el-option label="所有订单" value=""></el-option>
                <el-option v-for='(item,i) in Object.values(orderEnumOld.fishOrder)' :label="item.name" :value="item.value" :key='i'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=充值状态 v-show='currentTab==="new"'>
                <el-select v-model="queryForm.rechargeState" placeholder="请选择充值状态" >
                <el-option label="所有订单" value=""></el-option>
                <el-option v-for='(item,i) in orderEnum.rechargeState' :label="item.desc" :value="item.code" :key='i'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=冻结状态>
                <el-select v-model="queryForm.isFreeze" placeholder="是否冻结" >
                <el-option label="所有订单" value=""></el-option>
                <el-option label="未冻结" value="0"></el-option>
                <el-option label="冻结" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=充值类型>
                <el-select v-model="queryForm.proType" placeholder="充值类型" >
                <el-option label="所有订单" value=""></el-option>
                <el-option v-for='(item,i) in orderEnum.proType' :label="item.desc" :value="item.code" :key='i'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=商户>
                <el-select v-model="queryForm.merchantId" placeholder="请选择商户"  filterable clearable @change="findActivity">
                <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=活动>
                <el-select v-model="queryForm.actId" placeholder="请选择活动" filterable clearable >
                <el-option v-for="(activity,i) in activityList" :key="activity.id" :label="activity.actName" :value="activity.actId">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=客户注册号码>
                <el-input v-model="queryForm.tel" placeholder="请输入客户号码" clearable></el-input>
            </el-form-item>
            <el-form-item label=订单号>
                <el-input v-model="queryForm.orderCode" placeholder="请输入订单号" clearable></el-input>
            </el-form-item>
            <el-form-item label=充值号码>
                <el-input v-model="queryForm.rechargeAccount" placeholder="请输入充值号码" clearable></el-input>
            </el-form-item>
            <el-form-item label=查询时间范围>
                <el-date-picker v-model="queryForm.beginTime" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00"
                format= "yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label=——>
                <el-date-picker v-model="queryForm.endTime" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" 
                format= "yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-button v-waves  type="primary" icon="el-icon-search" @click="handleSearch" :loading='loading'>
                查询
            </el-button>
             <el-button v-waves type="info"  @click="batchDoFreeze(1)" >
                批量冻结
            </el-button>
             <el-button v-waves type="info"  @click="batchDoFreeze(0)" >
                批量解冻
            </el-button>
        </LayoutSearch>
        <el-tabs type="border-card" v-model='currentTab'>
          <el-tab-pane label="老订单" name='old'>
            <div class='staBtn'>
              <el-button @click='sendFishOrder' type="primary" plain :loading='sendFishOrderLoading'>重发飞鱼</el-button>
              <el-button v-waves  type="primary" @click="statisticsTbVisible=true" >
                  统计价格
              </el-button>
              <span v-if="statisticsTbVisible">
                {{'总计用户支付金额:'+statistics.tbTotalPayAmount+'元'+'，总计飞鱼成本'+statistics.tbTotalFishAmount+'元; '}}
              </span>
              <span v-if="statisticsTbVisible">
                {{'当页统计：总计用户支付金额:'+statistics.tbCurrentPageTotalPayAmount+'元'+'，总计飞鱼成本'+statistics.tbCurrentPageTotalFishAmount+'元'}}
              </span>
            </div>
            <baseTable :columns='columnsOld' :list='listOld'  :loading='loading' @setRemark='setRemark' @resend='resend'
              @setSuccess='setOrderRecharge($event,true)' @setFail='setOrderRecharge($event,false)'  @setFreezeBreakShow='freeze($event,0)'  @setOrderFreeze='freeze($event,1)'
              @applyRefund='applyRefund' @selectionChange='selectionChange' :disableAutoHeight='true' @setFishStatus='setFishStatus'
              :param='queryForm'  @search='handleSearch'> 
                <template slot-scope="{scope}" slot='expand'>
                    <base-table :columns="columnsExpandOld" :list="scope.row.creditGoodsDetailList" @comfirmFishOrder='comfirmFishOrder'>
                        <template slot-scope="{scope}" slot="status">
                        <tagColumn :item='orderEnumOld.fishOrder[scope.row.status]'></tagColumn>
                        </template>
                    </base-table>
                </template>
                <template slot-scope="{scope}" slot="orderState">
                    <tagColumn :item='orderEnumOld.orderStateOld[scope.row.orderState]'></tagColumn>
                </template> 
                <template slot-scope="{scope}" slot="fishState">
                    <tagColumn :item='orderEnumOld.fishOrder[scope.row.fishState]'></tagColumn>
                </template>
                <template slot-scope="{scope}" slot="paymentState">
                    <tagColumn :item='orderEnumOld.paymentStateOld[scope.row.paymentState]'></tagColumn>
                </template>
            </baseTable>
            <div class="paginate-pager">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.currentPage"
                :page-sizes="[2,10,30,50]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagerOld.totalCount">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="新订单" name='new'>
              <div class='staBtn'>
                <el-button v-waves  type="primary" @click="statisticsCmVisible=true" >
                    统计价格
                </el-button>
                <span v-if="statisticsCmVisible">
                  {{'总计用户支付金额:'+statistics.cmTotalPayAmount+'元'+'，总计飞鱼成本'+statistics.cmTotalFishAmount+'元; '}}
                </span>
                <span v-if="statisticsCmVisible">
                  {{'当页统计：总计用户支付金额:'+statistics.cmCurrentPageTotalPayAmount+'元'+'，总计飞鱼成本'+statistics.cmCurrentPageTotalFishAmount+'元'}}
                </span>
              </div>
              <baseTable :columns='columns' :list='list'  :loading='loading' @setRemark='setRemark' @resend='resend'
                @setSuccess='setOrderRecharge($event,true)' @setFail='setOrderRecharge($event,false)'  @setFreezeBreakShow='freeze($event,0)'  @setOrderFreeze='freeze($event,1)' 
                @applyRefund='applyRefund' @selectionChange='selectionChange' :disableAutoHeight='true'
                :param='queryForm'  @search='handleSearch'> 
                  <template slot-scope="{scope}" slot='expand'>
                      <base-table :columns="columnsExpand" :list="scope.row.ticketDetails" @comfirmFishOrder='comfirmFishOrder'>
                          <template slot-scope="{scope}" slot="status">
                           <tagColumn :item='orderEnum.ticketStatus.find(item=>item.code===scope.row.status)' nameKey='desc' valueKey='code'></tagColumn>
                          </template>
                      </base-table>
                  </template>
                  <template slot-scope="{scope}" slot="orderState">
                      <tagColumn :item='orderEnum.orderState&&orderEnum.orderState.find(item=>item.code===scope.row.orderState)' nameKey='desc' valueKey='code'></tagColumn>
                  </template> 
                  <template slot-scope="{scope}" slot="rechargeState">
                      <tagColumn :item='orderEnum.rechargeState&&orderEnum.rechargeState.find(item=>item.code===scope.row.rechargeState)' nameKey='desc' valueKey='code'></tagColumn>
                  </template>
                  <template slot-scope="{scope}" slot="paymentState">
                      <tagColumn :item='orderEnum.paymentState&&orderEnum.paymentState.find(item=>item.code===scope.row.paymentState)' nameKey='desc' valueKey='code'></tagColumn>
                  </template>
                  <template slot-scope="{scope}" slot="creditUseStatus">
                      <tagColumn :item='orderEnum.useStatus&&orderEnum.useStatus.find(item=>item.code===scope.row.creditUseStatus)' nameKey='desc' valueKey='code'></tagColumn>
                  </template>
                  <template slot-scope="{scope}" slot="couponStatus">
                      <tagColumn :item='orderEnum.useStatus&&orderEnum.useStatus.find(item=>item.code===scope.row.couponStatus)' nameKey='desc' valueKey='code'></tagColumn>
                  </template> 
                  <template slot-scope="{scope}" slot="lotteryUseStatus">
                      <tagColumn :item='orderEnum.useStatus&&orderEnum.useStatus.find(item=>item.code===scope.row.lotteryUseStatus)' nameKey='desc' valueKey='code'></tagColumn>
                  </template>
              </baseTable>
              <div class="paginate-pager">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.currentPage"
                  :page-sizes="[2,10,30,50]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.totalCount">
                </el-pagination>
              </div>
          </el-tab-pane>
        </el-tabs>

         <el-dialog title="订单处理备注" :visible.sync="remarkDialogVisible" >
             <el-form label-width="100px" :model='remarkForm'>
              <el-form-item label="订单号" prop="orderCode" hidden>
                <el-input v-model="remarkForm.orderCode"></el-input>
              </el-form-item>
              <el-form-item label="备注信息" prop="remark">
                <el-input type="textarea" v-model="remarkForm.mark"></el-input>
              </el-form-item>
              <div>
                  <el-button @click="remarkDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveRemark" >确 定</el-button>
              </div>
            </el-form>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="progressVisible" width="70%">
          <span>
            <el-progress :percentage="progress" color="#8e71c7"></el-progress>
          </span>
        </el-dialog>
        <resendFishOrderDialog  :order.sync='currentRow' :visible.sync='resendFishOrderDialogVisible'/>
    </LayoutPage>
</template>
<script  lang="ts">
import Vue from 'vue'
import LayoutSearch from '@/components/layout/LayoutSearch.vue'
import MerchantVO from "@/api/modules/MerchantVO";
import ActivityVO from "@/api/modules/ActivityVO";
import OrderSearchVo from "@/api/modules/OrderSearchVo";
import OrderUpdateVO from "@/api/modules/OrderUpdateVO";
import AdminOrderListSearchVO from "@/api/modules/AdminOrderListSearchVO";
import MerchantResponse from "@/api/modules/MerchantResponse";
import ActivityResponse from "@/api/modules/ActivityResponse";
import AdminOrderPageResponse from "@/api/modules/AdminOrderPageResponse";
import EnumEntityObject from "@/api/modules/EnumEntityObject";
import { MerchantApi,OrderApi,ActivityApi,EnumsApi } from "@/api";
import { waves } from "@/directive/waves"; // waves directive
import tagColumn from "@/components/tagColumn.vue";
import Pager from "@/api/base/Pager";
import orderEnumOld from '@/views/platform/enum.ts'
import ApiResult from '../../../api/base/ApiResult';
import resendFishOrderDialog from './resendFishOrderDialog.vue';

//为了用数组的方式读对象key，value
interface forQueryForm extends AdminOrderListSearchVO{
    [key:string]: any; // Add index signature
}

export default Vue.extend({
  components: {
    LayoutSearch,
    tagColumn,
    resendFishOrderDialog
  },
  directives: { waves },
  data():{
    pager:Pager<object>,
    pagerOld:Pager<object>,
    queryForm:forQueryForm,
    merchantList:MerchantResponse[],
    activityList:any[],
    fishOrderList:Array<object>,
    loading:boolean,
    sendFishOrderLoading:boolean,
    columns:Array<object>,
    columnsExpand:Array<object>,
    columnsOld:Array<object>,
    columnsExpandOld:Array<object>,
    list:AdminOrderPageResponse[],
    listOld:AdminOrderPageResponse[],
    orderEnum:object,
    orderEnumOld:object,
    remarkDialogVisible:boolean,
    currentRow:any,
    remarkForm:OrderUpdateVO,
    selectedRows:any[],
    statisticsTbVisible:boolean,
    statisticsCmVisible:boolean,
    statistics:object,
    progressVisible:boolean,
    progress:number,
    timerId:any,
    currentTab:string,
    resendFishOrderDialogVisible:boolean,
  }{
    return {
      pager:new Pager<object>(),
      pagerOld:new Pager<object>(),
      queryForm:new AdminOrderListSearchVO(),
      merchantList:[],
      activityList:[],
      fishOrderList:[],
      loading:false,
      sendFishOrderLoading:false,
      columns:[],
      columnsExpand:[],
      columnsOld:[],
      columnsExpandOld:[],
      list:[],
      listOld:[],
      orderEnum:{},
      orderEnumOld,
      remarkDialogVisible:false,
      currentRow:null,
      remarkForm:new OrderUpdateVO(),
      selectedRows:[],
      statisticsTbVisible:false,
      statisticsCmVisible:false,
      statistics:{
        cmCurrentPageTotalFishAmount: 0,
        cmCurrentPageTotalPayAmount: 0,
        cmTotalFishAmount: 0,
        cmTotalPayAmount: 0,
        tbCurrentPageTotalFishAmount: 0,
        tbCurrentPageTotalPayAmount: 0,
        tbTotalFishAmount: 0,
        tbTotalPayAmount: 0,
      },
      progressVisible:false,
      progress:0,
      timerId:null,
      currentTab:'old',
      resendFishOrderDialogVisible:false,
    }
  },

  created(){
    this.columns=[
        {key:'',title:'',type:'selection'},
        {key:'',title:'',type:'expand',slot:'expand',width:50},
        {key:'orderCode',title:'订单号',width:200},
        {key:'isFreeze',title:'是否冻结',format:(val:number)=>{
            return val===1?'冻结':'否'
        }},
        {key:'',title:'订单状态',slot:'orderState',width:120},
        //{key:'',title:'飞鱼订单状态',slot:'fishState'},
        {key:'',title:'支付状态',slot:'paymentState',width:120},
        {key:'originalPrice',title:'原价',width:100},
        {key:'actualPrice',title:'实际支付',width:100},
        {key:'createdAt',title:'下单时间',width:200},
        {key:'tel',title:'用户手机号',width:200},
        {key:'actName',title:'活动名称'},
        {key:'goodsNum',title:'商品数量'},
        {key:'rechargeAccount',title:'充值账号'},
        {key:'rechargeState',title:'充值状态',slot:'rechargeState',width:120},
        {key:'totalCredit',title:'积分值'},
        {key:'creditUseStatus',title:'积分使用情况',slot:'creditUseStatus',width:160},
        {key:'couponName',title:'使用卡券'},
        {key:'couponId',title:'优惠券码'},
        {key:'couponPrice',title:'卡券优惠金额',width:160},
        {key:'couponStatus',title:'卡券消费情况',slot:'couponStatus',width:160},
        {key:'fishCost',title:'飞鱼成本价',width:120},
        {key:'lotteryUseStatus',title:'抽奖机会扣除状态',slot:'lotteryUseStatus',width:160},
        {key:'customId',title:'客户id',width:200},
       // {key:'orderNumber',title:'飞鱼订单号'},
        {key:'isRisk',title:'是否风控',format:(val:number)=>{
            return val===1?'是':'否'
        }},
        {type:'operate',title:'操作','minWidth':300,
            operates:[
            {name:'处理备注',emitKey:'setRemark',btntype:'success'} ,
            // {name:'重新发起',emitKey:'resend',btnType:'warning',showFun:(row:any)=>{
            //   return (row.fishState === 3 || row.fishState === 5) && (row.proType === 1 || row.proType === 14) && (row.orderState === 3 ) && (row.isFreeze === 0)
            // }},
            {name:'标记订单成功',emitKey:'setSuccess',btnType:'danger',showFun:(row:any)=>{
                //订单完成&rechargeState不是不需要&rechargeState不是成功
                return row['orderState']===30&&row['rechargeState']!==0&&row['rechargeState']!==40
              }
            },
            {name:'标记订单未提货',emitKey:'setFail',btnType:'danger',showFun:(row:any)=>{
              //订单完成&rechargeState不是不需要&rechargeState不是失败
                return row['orderState']===30&&row['rechargeState']!==0&&row['rechargeState']!==50
            }},
            {name:'解冻',emitKey:'setFreezeBreakShow',btnType:'danger',showKey:'isFreeze',show:1},
            {name:'冻结',emitKey:'setOrderFreeze',btnType:'danger',showFun:(row:any)=>{
              return row['isFreeze']!==1
            }},
            {name:'申请退款',emitKey:'applyRefund',btnType:'danger',showFun:(row:any)=>{
                return  row.actualPrice>0 && row.paymentState===20
            }}
             ]
        }
    ]
    this.columnsExpand=[
      {key:'orderCode',title:'订单号'},
      {key:'originOrderId',title:'第三方订单号（创旅）'},
      {key:'clientName',title:'客户名称',},
      {key:'payPrice',title:'实际支付金额'},
      {key:'price',title:'票价'},
      {key:'status',title:'订单状态',slot:'status'},
    ]


    this.columnsOld=[
        {key:'',title:'',type:'selection'},
        {key:'',title:'',type:'expand',slot:'expand',width:50},
        {key:'orderCode',title:'订单号',width:200},
        {key:'isFreeze',title:'是否冻结',format:(val:number)=>{
            return val===1?'冻结':'否'
        }},
        {key:'',title:'订单状态',slot:'orderState',width:120},
        {key:'',title:'飞鱼订单状态',slot:'fishState',width:150},
        {key:'',title:'支付状态',slot:'paymentState',width:120},
        {key:'originalPrice',title:'原价',width:100},
        {key:'actualPrice',title:'实际支付',width:100},
        {key:'createdAt',title:'下单时间',width:200},
        {key:'tel',title:'用户手机号',width:200},
        {key:'actName',title:'活动名称',width:150},
        {key:'proName',title:'商品名称',width:200},
        {key:'proStandardName',title:'商品规格',width:200},
        {key:'commodityNum',title:'商品数量'},
        {key:'rechargeAccount',title:'充值账号',width:200},
        {key:'credit',title:'使用积分'},
        {key:'couponName',title:'使用卡券'},
        {key:'couponId',title:'优惠券码'},
        {key:'orderNumber',title:'飞鱼订单号',width:200},
        {key:'isRisk',title:'是否风控',format:(val:number)=>{
            return val===1?'是':'否'
        }},
        {type:'operate',title:'操作','minWidth':300,
            operates:[
            {name:'处理备注',emitKey:'setRemark',btntype:'success'} ,
            {name:'重新发起',emitKey:'resend',btnType:'warning',showFun:(row:any)=>{
              //受理失败或提货失败 且 直冲或自定义充值 且 订单完成 且 未冻结
              return (row.fishState === 3 || row.fishState === 5) && (row.proType === 1 || row.proType === 14) && (row.orderState === 3 ) && (row.isFreeze === 0)
            }},
            {name:'标记订单成功',emitKey:'setSuccess',btnType:'danger',showKey:'fishState',show:0},
            {name:'标记订单未提货',emitKey:'setFail',btnType:'danger',showFun:(row:any)=>{
              // 提货成功 且 订单完成 且 支付成功 
              return (row.fishState === 4 && row.orderState === 3 && row.paymentState === 2 && row.orderNumber == null)
            }},
            {name:'解冻',emitKey:'setFreezeBreakShow',btnType:'danger',showKey:'isFreeze',show:1},
            {name:'冻结',emitKey:'setOrderFreeze',btnType:'danger',showFun:(row:any)=>{
              return row['isFreeze']!==1
            }},
            {name:'申请退款',emitKey:'applyRefund',btnType:'danger',showFun:(row:any)=>{
                return  row.actualPrice>0 && row.paymentState=='2'
            }},
            {name:'核查飞鱼订单',emitKey:'setFishStatus',btnType:'danger',showFun:(row:any)=>{
              return row.fishState=== 1 //提货中才显示
            }}
            ]
        }
    ]
    this.columnsExpandOld=[
      {key:'orderNumber',title:'飞鱼订单号'},
      {key:'fishOrderCode',title:'飞鱼平台订单号'},
      {key:'notifiedMsg',title:'飞鱼请求返回信息',},
      {key:'sendTimeString',title:'飞鱼请求时间'},
      {key:'status',title:'订单状态',slot:'status'},
      // {type:'operate',title:'操作',
      //    operates:[
      //       {name:'核查飞鱼订单',emitKey:'comfirmFishOrder',btntype:'success'}
      //    ]
      // }
    ]

    this.pager.currentPage=1;
    this.pager.pageSize=30;
    this.pagerOld.currentPage=1;
    this.pagerOld.pageSize=30;

    this.loadMerchantList()
    this.handleSearch()
    this.enumLoad()
  },
  
  methods:{
    handleSizeChange(size:number){
        this.pager.pageSize=size
        this.pagerOld.pageSize=size
        this.dataLoad()
    },
    handleCurrentChange(current:number){
        this.pager.currentPage=current
        this.pagerOld.currentPage=current
        this.dataLoad()
    },
    async loadMerchantList() {
      let { payload } = await MerchantApi.findMerchantListUsingPOST();
      if(payload){
        this.merchantList=payload
      }
    },
    async findActivity() {
        if (this.queryForm.merchantId != null) {
          //this.findActivityByMerchantId();
          let param=new ActivityVO()
          param.merchantId=this.queryForm.merchantId
          param.pageSize=1000
          param.currentPage=1
          let { payload } =await ActivityApi.showActListUsingPOST(param)
          if(payload){
              this.activityList = payload.list;
          }
        } else {
          this.activityList = [];
        }
    },
    async enumLoad(){
        EnumsApi.getEnumByTypeUsingGET({type:'OrderCommonStatusEnum'}).then(({payload})=>{
          this.$set(this.orderEnum,"orderState",payload)
        })
        EnumsApi.getEnumByTypeUsingGET({type:'OrderCommonChargeStatusEnum'}).then(({payload})=>{
          this.$set(this.orderEnum,"rechargeState",payload)
        })
        EnumsApi.getEnumByTypeUsingGET({type:'OrderCommonPayStatusEnum'}).then(({payload})=>{
          this.$set(this.orderEnum,"paymentState",payload)
        })
        EnumsApi.getEnumByTypeUsingGET({type:'OrderCommonConsumeEnum'}).then(({payload})=>{
          this.$set(this.orderEnum,"useStatus",payload)
        })
        EnumsApi.getEnumByTypeUsingGET({type:'ProType'}).then(({payload})=>{
          this.$set(this.orderEnum,"proType",payload)
        })
        EnumsApi.getEnumByTypeUsingGET({type:'OrderTicketRefundStatusEnum'}).then(({payload})=>{
          this.$set(this.orderEnum,"ticketStatus",payload)
        })
    },
    async handleSearch(){
      this.pager.currentPage=1;
      this.pagerOld.currentPage=1;
      this.dataLoad()
    },
    async dataLoad(){
        //去除查询里的空格
      for(let key in this.queryForm){
        if(typeof this.queryForm[key] === 'string'){
           this.queryForm[key]=this.queryForm[key].trim()
        }
      }
      //商品里的规格购买记录或活动的奖品中奖纪录过来
      if(this.$route.params.standardId){
        this.queryForm.proStandardId=Number(this.$route.params.standardId)
      }
      this.loading=true
      let {payload}=await OrderApi.queryOrderListUsingPOST({...this.queryForm,...this.pager})
      if(payload){
        this.list=payload.cmOrderPager.list.map((item:any)=>{
          Object.assign(item,item.commonInfo)
          return item
        })
        this.pager.totalCount=payload.cmOrderPager.totalCount

        this.listOld=payload.tbOrderPager.list.map((item:any)=>{
          Object.assign(item,item.baseInfo)
          return item
        })
        this.pagerOld.totalCount=payload.tbOrderPager.totalCount

        this.statistics=payload.statistics
      }
      this.loading=false
    },
    //处理备注
    setRemark(row:any){
      this.remarkDialogVisible=true
      this.$set(this.remarkForm,'orderCode',row.orderCode)
      this.$set(this.remarkForm,'mark',row.remark)
    },
    async saveRemark(){
        let res = await OrderApi.updateOrderRemarkUsingPOST(this.remarkForm)
        if(res.status===200){
            this.remarkDialogVisible = false
            this.$notify({
                title: "温馨提示",
                message: "保存成功",
                type: "success",
                duration: 2000
            });
            this.handleSearch()
        }
    },
    //重新发起
    resend(row:any){
      this.currentRow=row
      this.resendFishOrderDialogVisible=true
    },
    //标记订单成功或失败
    setOrderRecharge(row:any,success:boolean){
      this.$confirm(success?"确认标记订单成功?":"确认标记订单未提货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async () => {
         let param=new OrderUpdateVO() 
         param.orderCode=row.orderCode
         param.rechargeState=success?40:50 //回调成功/回调失败
         let res = await OrderApi.updateRechargeStatusUsingPOST(param)
         if(res.status===200){
           this.$notify({
                title: "温馨提示",
                message: "保存成功",
                type: "success",
                duration: 2000
            });
            this.handleSearch()
         }
      })
    },
    //申请退款
    applyRefund(row:any){
      this.$router.push('/platform/orderManage/applyRefund/'+row.orderCode)
    },
    selectionChange(rows:any){
        this.selectedRows=rows
    },
    freeze(row:any,status:number){
       this.selectedRows=[row]
       this.batchDoFreeze(status)
    },
    //批量冻结/解冻
    batchDoFreeze(type:number){
      let self=this
      if(!this.selectedRows||!this.selectedRows.length){
        this.$message('请选择要操作的行！')
        return 
      }
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async () => {
         let res= new ApiResult()
         let orderCodes=self.selectedRows.map(item=>item.orderCode)
         //批量冻结
         if(type===1){
            res = await OrderApi.batchFreezeOrderUsingPOST(orderCodes)
         }
         //批量解冻
         else if(type===0){
            res = await OrderApi.batchUnFreezeOrderUsingPOST(orderCodes)
         }
         if(res.status===200){
            this.$notify({
                title: "温馨提示",
                message: "保存成功",
                type: "success",
                duration: 2000
            });
            await this.handleSearch()
         }
      })
    },
    
    //核查飞鱼订单
    comfirmFishOrder(){

    },

    //重发飞鱼订单
    async sendFishOrder(){
      if(!this.selectedRows||!this.selectedRows.length){
        this.$message('请选择要操作的行！')
        return 
      }
      let rows=this.selectedRows.filter(item => 
          (item.proType == 1 || item.proType == 14)   && //直冲或自定义充值类
          (item.fishState == 3 || item.fishState == 5) && //受理失败或提货失败
          item.isFreeze == 0 &&   //未冻结
          item.orderState == 3    //订单完成
      );
      if(!rows.length){
        this.$message('选中的行不符合重发条件！')
        return 
      }

      await this.$confirm("请谨慎操作, 是否继续?", "提示", {type: "warning"})
      this.sendFishOrderLoading=true
     
      let orderCodes=rows.map(item=>item.orderCode)
      let res = await OrderApi.batchSendFishUsingPOST(orderCodes)
      if(res.status===300){
        this.findRedisKey(res.payload);
      }
      else if(res.status===200){
         this.$notify({
                title: "温馨提示",
                message: "操作成功",
                type: "success",
                duration: 2000
           });
      }
      this.sendFishOrderLoading=false
    },
    async findRedisKey(key:string){
       let res= await OrderApi.getFishRedisKeyUsingPOST(key)
       if (res.status == 200) {
        this.progressVisible = false;
        clearTimeout(this.timerId)
        if (res.payload != "重新发送成功") {
          this.$message(res.payload);
        }
        else{
          this.$notify({
              title: "温馨提示",
              message: "重新发起成功",
              type: "success",
              duration: 2000
          });
        }
        this.handleSearch();
      } 
      else {
        this.progressVisible = true;
        this.progress = parseInt(res.payload);
        let this_ = this;
        this.timerId=setTimeout(function() {
          this_.findRedisKey(key);
        }, 2000);
      }
    },

    async setFishStatus(row:any){
      let param = new OrderSearchVo()
      param.orderCode=row.orderCode
      let res = await OrderApi.checkFishStatusUsingPOST(param)
      if(res.payload>0){
        this.$notify({
            title: "温馨提示",
            message: "操作成功",
            type: "success",
            duration: 2000
        });
        this.handleSearch()
      }
    }

  },
  beforeDestroy(){
    if(this.timerId){
      clearTimeout(this.timerId)
    }
  }
 
})
</script>
<style scoped lang='scss'>
.el-pagination{
  padding-top:10px;
  text-align:center;
}
.el-tabs{
  margin:10px;
}
.staBtn{
  padding:10px;
  span{
    font-size: 14px;
    color: #606266;
  }
}
</style>
