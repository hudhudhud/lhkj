<template>
   <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
       <div class="app-container">
            <LayoutSearch>
                <el-form-item label="活动类型" prop="actType">
                    <el-select v-model="form.actType" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="actType in actTypeList" :key="actType.code" :label="actType.desc" :value="actType.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input v-model="form.actName" placeholder="输入名称查询" clearable></el-input>
                </el-form-item>
                <el-form-item label="商户名称" prop="merchantId">
                    <el-select v-model="form.merchantId" filterable clearable placeholder="请选择">
                    <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上下线">
                    <el-select v-model="form.actStatus" placeholder="可用状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="上线" value="1"></el-option>
                    <el-option label="下线" value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否白名单">
                    <el-radio-group v-model="form.isWhite" size="small">
                    <el-radio-button label="">全部</el-radio-button>
                    <el-radio-button label="1">是</el-radio-button>
                    <el-radio-button label="0">否</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch()">
                    查询
                </el-button>
                <el-button v-waves type="success" @click="handleAdd()">
                    新增
                </el-button>
            </LayoutSearch>
            <baseTable :columns='columns' :list='activityList' @productOpera='productOpera':loading='loading' @edit="edit"
            @del='del' @getLink='getLink' @timeConfig='timeConfig' @editActTpl="editActTpl" @onLine='updateLine($event,1)'
            @downLine='updateLine($event,0)' @limit='limit'  @lottery='lottery' @lotterySet='lotterySet'
            :param='form'  @search='handleSearch'> 
                <template slot-scope="{scope}" slot="actIcon">
                    <img :src="scope.row.actIcon" v-if="scope.row.actIcon" style="max-height:50px;" />
                </template>
                <template slot-scope="{scope}" slot="actType">
                   <tagColumn :item='actTypeList&&actTypeList.find(item=>item.code===scope.row.actType)' nameKey='desc' valueKey='code'></tagColumn> 
                </template>
                <template slot-scope="{scope}" slot="actStatus">
                    <el-tag :type='scope.row.actStatus==="1"?"success":"info"'>{{ scope.row.actStatus==="1"?"上线":"下线" }}</el-tag>
                </template>
               <template slot-scope="{scope}" slot="isWhite">
                    <el-switch v-model="scope.row.isWhite" @change="updateIsWhite(scope.row)" active-color="#13ce66"
                        inactive-color="#D3D3D3" active-value="1" inactive-value="0">
                    </el-switch>
                    <el-button v-if="scope.row.isWhite=='1'" @click="addWhite(scope.row)" type="primary" size='small'
                        :loading="scope.row.loading" plain>查看白名单</el-button>
                </template>
            </baseTable>
            <el-dialog :visible.sync='linkDialogVisible' title='查看链接'>
                <p>{{link}}</p>
            </el-dialog>
            <timeConfigDialog :actId.sync='currentActId.timeConfig' :visible.sync='timeConfigDialogVisible' ></timeConfigDialog>
            <whiteDialog :actId.sync='currentActId.white' :actName='currentActName' :visible.sync='whiteDialogVisible' ></whiteDialog>
            <lotteryWhiteDialog :actId.sync='currentActId.lotteryWhite' :visible.sync='lotteryWhiteDialogVisible' ></lotteryWhiteDialog>
        </div>
    </LayoutPage>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import LayoutSearch from '@/components/layout/LayoutSearch.vue';
import ActivityVO from "@/api/modules/ActivityVO";
import ActivityResponse from "@/api/modules/ActivityResponse";
import MerchantVO from "@/api/modules/MerchantVO";
import MerchantResponse from "@/api/modules/MerchantResponse";
import { ActivityApi ,MerchantApi,EnumsApi} from "@/api";
import Pager from "@/api/base/Pager";
import { waves } from "@/directive/waves"; // waves directive
import config from "@/config";
import timeConfigDialog from "./timeConfigDialog.vue";
import whiteDialog from "./whiteDialog.vue";
import lotteryWhiteDialog from "./lotteryWhiteDialog.vue"
import tagColumn from "@/components/tagColumn.vue";
@Component({
  components: {
    LayoutSearch,
    timeConfigDialog,
    whiteDialog,
    lotteryWhiteDialog,
    tagColumn
  },
  directives: { waves },
})

export default class Order extends Vue {
    private form= {
        actName: "",
        actStatus: "1",
        merchantId: "",
        actType: "",
        isWhite: ""
    };
    private actTypeList: any[] = [];
    private pager = new Pager<object>();
    private loading:boolean=false;
    private merchantList:MerchantResponse[]=[];
    private activityList:any[]=[];//ActivityResponse[]=[];
    private postParam:any = {};
    private linkDialogVisible:boolean=false;
    private timeConfigDialogVisible:boolean=false;
    private whiteDialogVisible:boolean=false;
    private lotteryWhiteDialogVisible:boolean=false;
    private link:string='';
    private currentActId={
        timeConfig:null,
        white:null,
        lotteryWhite:null
    }
    private currentActName=''
    private columns:any[]=[];

    async created(){
        this.pager.currentPage=1;
        this.pager.pageSize=30;        
        await this.loadMerchantList()
        await this.loadActTypeList()
        this.handleSearch()
        this.columns=[
        {key:'actId',title:'活动ID',width:100},
        {key:'actName',title:'活动名称',width:150},
        {key:'actType',title:'活动类型',width:150,slot:'actType'},
        {key:'merchantId',title:'商户编号',width:100},
        {key:'merchantId',title:'商户名称',width:170,format:(val:any)=>{
            let item = this.merchantList.find(item=>item.id===val)
            return item?item.name:''
        }},
        {key:'remarks',title:'活动备注',width:200},
        {key:'actIcon',title:'活动图标',slot:'actIcon',width:100},
        {key:'actStatus',title:'上下线',slot:'actStatus',width:100},
        {key:'startTime',title:'活动开始时间',width:150},
        {key:'endTime',title:'活动结束时间',width:150},
        {key:'overTime',title:'订单过期时间/秒',width:150},
        {key:'isWhite',title:'是否白名单',slot:'isWhite',width:200},
        {key:'endTime',title:'活动结束时间',width:150}, 
        {type:'operate',title:'操作', maxWidth:650, width:500,operates:[
            {name:'商品',emitKey:'productOpera',showFun:(row:any)=>{
                return ["1","3","6","8","14"].indexOf(row.actType)>-1 //特卖、秒杀、券购、线下送积分活动、传绣球活动
            }} ,
            {name:'奖品',emitKey:'lottery',showKey:'actType',show:"2"} ,//抽奖
            // {name:'奖励规则',emitKey:'productOpera',showKey:'actType',show:"5"} ,//签到
            // {name:'游戏商品',emitKey:'productOpera',showKey:'actType',show:"7"} ,//游戏
            {name:'上线',emitKey:'onLine',showKey:'actStatus',show:"0"},
            {name:'下线',emitKey:'downLine',showFun:(row:any)=>{
                return row.actStatus!=='0'
            }} ,
            {name:'限制',emitKey:'limit'} ,
            {name:'编辑',emitKey:'edit',} ,
            {name:'时间配置',emitKey:'timeConfig',showFun:(row:any)=>{
                return ["3","5"].indexOf(row.actType)<0
            }},
            { name: "模板设置", emitKey: "editActTpl" },
            {name:'查看链接',emitKey:'getLink'},
            {name:'删除',emitKey:'del',btnType:'danger'},
            {name:'多概率配置',emitKey:'lotterySet',showKey:'actType',show:"2"},//抽奖
        ]},
    ]
    }
    private handleSizeChange(size:number){
        this.pager.pageSize=size
        this.dataLoad()
    }

    private handleCurrentChange(current:number){
        this.pager.currentPage=current
        this.dataLoad()
    }


    private async loadMerchantList() {
        let { payload } = await MerchantApi.findMerchantListUsingPOST();
        if(payload){
            this.merchantList=payload
        }
    }

    private async loadActTypeList(){
        let {payload}=await EnumsApi.getEnumByTypeUsingGET({type:'ActType'})
        if(payload){
            this.actTypeList=payload
        }
    }

    private handleSearch(){
       this.pager.currentPage=1
       this.dataLoad()
    }

    private async dataLoad(){
        this.loading=true
        Object.assign(this.postParam,this.form)
        
        //去除查询里的空格
        for(let key in this.postParam){
            if(typeof this.postParam[key] === 'string'){
             this.postParam[key]=this.postParam[key].trim()
            }
        }

        let query={...this.postParam,...this.pager}
        let { payload } = await ActivityApi.showActListUsingPOST(query);
        if(payload){
            this.activityList = payload.list;
            this.pager.totalCount=payload.totalCount
        }
        this.loading=false
    }
    private async handleAdd(){
        this.$router.push('/platform/activityManage/activity/add')
    }
    
    private edit(row:any){
        this.$router.push("/platform/activityManage/activity/add?actId=" + row.actId);
    }

    private async del(row:any){
        await this.$confirm("此操作将永久删除该活动,请谨慎操作,是否继续?", "提示", { type: "warning"})
        let param=new ActivityVO();
        param.actId=row.actId
        let res = await ActivityApi.deleteActUsingPOST(param);
        if(res.status===200){
            this.$notify({
                title: "温馨提示",
                message: "删除成功",
                type: "success",
                duration: 2000
            });
            this.handleSearch()
        }
    }

    private editActTpl(row: any) {
        if(row.actTemplate && row.actTemplate!='OutsideLink') {
            this.$router.push(`/designer/SGT?actId=${row.actId}&templateCode=${row.actTemplate}`)
        } else{
        this.$router.push(`/designer/tplView?actId=${row.actId}&actType=${row.actType}`);

        }
    }
    private productOpera(row:any){
        this.$router.push('/platform/activityManage/activity/product/'+row.actId)
    }    

    private async getLink(row:any){
        this.linkDialogVisible = true;
        let param=new ActivityVO()
        param.actId=row.actId
        let {payload} = await ActivityApi.getMerchantAppIdUsingPOST(param)
        if(payload){
            this.link =window.location.protocol+'//'+config.apiBasePath.split('/')[2] +'/'+ payload.appId + "/merchant/index/act/" + row.actId;
        }
    }

    private async updateLine(row:any,status:number){
        await this.$confirm(status===1?"确认上线该活动?":"确认下线该活动?", "提示",{ type: "warning"})
        let res=await ActivityApi.updateActStatusUsingGET({actId:row.actId,status})
        if(res.status===200){
            this.$notify({
                title: "温馨提示",
                message: "操作成功",
                type: "success",
                duration: 2000
            });
            this.handleSearch()
        }
    }   
    
    private  async updateIsWhite(row:any) {
      let param = new ActivityVO()
      param.isWhite=row.isWhite
      param.actId=row.actId
      let rs = await ActivityApi.updateWhiteStatusUsingPOST(param)
      if (rs.status === 200) {
        this.handleSearch();
      }
    }

    private async timeConfig(row:any){
        this.currentActId.timeConfig=row.actId
        this.timeConfigDialogVisible=true
    }

    //查看白名单
    private addWhite(row:any) {
        this.currentActId.white=row.actId
        this.currentActName=row.actName
        this.whiteDialogVisible=true
    }

    //限制
    private  limit(row:any){
        this.$router.push(`/platform/activityManage/activity/limit/${row.actId}`)
    }

    //奖品
    private lottery(row:any){
        this.$router.push(`/platform/activityManage/activity/lottery/${row.actId}`)
    }

    //中奖概率设置
    private lotterySet(row:any){
        this.currentActId.lotteryWhite=row.actId
        this.lotteryWhiteDialogVisible=true
    }
}
</script>
