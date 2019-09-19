<template>
 <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
       <div class="app-container vote-record">
            <LayoutSearch>
                <el-form-item label="单位或学校" prop="unitId">
                    <el-select v-model="searchParam.unitId" placeholder="请选择" @change='activeListLoad'>
                        <el-option :label="item.unitName" :value="item.id" v-for='(item,i) in unitList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动" prop="activityId">
                    <el-select v-model="searchParam.activityId" placeholder="请选择">
                        <el-option :label="item.activityName" :value="item.id" v-for='(item,i) in activeList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch()" :loading='loadingSearchBtn'>
                    查询
                </el-button>
                 <el-button v-waves type="success" @click="exportData" :loading="loadingExportBtn">
                    导出客户参与详情
                </el-button>
            </LayoutSearch>
            <baseTable :columns='columns' :list='list' :loading='loading'> 
            </baseTable>
        </div>
    </LayoutPage>
</template>
<script lang='ts'>
import Vue from 'vue'
import LayoutSearch from '@/components/layout/LayoutSearch.vue';
import JoinUnitVO from "@/api/modules/JoinUnitVO";
import JoinDepartmentVO from "@/api/modules/JoinDepartmentVO";
import JoinActivityVO from "@/api/modules/JoinActivityVO";
import JoinObjectVO from "@/api/modules/JoinDepartmentVO";
import JoinRecordVO from "@/api/modules/JoinRecordVO";
import { JoinApi } from "@/api";
import Pager from "@/api/base/Pager";
import UploadImages from "@/components/UploadImages.vue";
import { waves } from "@/directive/waves"; // waves directive


export default Vue.extend({
    components:{
        LayoutSearch,
        UploadImages
    },
    directives: { waves },
    data():{
        pager:Pager<object>,
        list:Array<object>,
        searchParam:JoinRecordVO,
        addParam:JoinRecordVO,
        columns:Array<object>,
        addDialogVisible:boolean,
        activeList:Array<JoinActivityVO>,
        addActiveList:Array<JoinActivityVO>,
        loading:boolean,
        loadingSearchBtn:boolean,
        loadingExportBtn:boolean,
        unitList:Array<JoinUnitVO>,
        
    }{
        return {
            pager:new Pager<object>(),
            list:[],
            searchParam:new JoinRecordVO(),
            addParam:new JoinRecordVO(),
            columns:[],
            addDialogVisible:false,
            activeList:[],
            addActiveList:[],
            loading:false,
            loadingSearchBtn:false,
            loadingExportBtn:false,
            unitList:[],
        }
    },
    async created(){
        this.columns=[
            {key:'customName',title:'投票人'},
            {key:'phone',title:'电话'},
            {key:'departmentName',title:'部门/院系',width:200},
            {key:'className',title:'班级'},
            {key:'joinObject',title:'投票对象',width:100},
            {key:'activityName',title:'活动名称',width:100},
            {key:'paymentAmount',title:'支付金额',width:100},
            {key:'unitType',title:'单位或学校',width:100,format:(val:number)=>{
                return val===0?'单位':'学校'
            }},
        ]
        this.pager.currentPage=1;
        this.pager.pageSize=30;
        await this.unitListLoad()
        await this.activeListLoad()
        await this.handleSearch()
    },
    methods:{
        handleSizeChange(size:number){
            this.pager.pageSize=size
            this.handleSearch()
        },
        handleCurrentChange(current:number){
            this.pager.currentPage=current
            this.handleSearch()
        },
        async unitListLoad(){
            let query=new JoinUnitVO()
            let {payload}=  await JoinApi.selectUnitListUsingPOST(query);
            if(payload){
                this.unitList = payload
                this.$set(this.searchParam,'unitId',this.unitList[0].id)
            }
        },
        async activeListLoad(){
            let query=new JoinActivityVO()
            query.unitId=this.searchParam.unitId
            let {payload}=  await JoinApi.selectActivityListUsingPOST(query);
            if(payload){
                this.activeList = payload
                if(this.activeList.length){
                    this.$set(this.searchParam,'activityId',this.activeList[0].id)
                }
                else{
                    this.$set(this.searchParam,'activityId',null)
                }
            }
        },
        async handleSearch(){
            this.loading=true
            this.loadingSearchBtn=true
            let query={...this.searchParam,...this.pager}
            let { payload } =  await JoinApi.selectRecordListUsingPOST(query);
            if(payload){
                this.list = payload.records;
                this.pager.totalCount=payload.total
            }
            this.loading=false
            this.loadingSearchBtn=false
        },
        async exportData(){
            this.loadingExportBtn=true
            let param=new JoinRecordVO()
            param.activityId=this.searchParam.activityId
            let {payload}=await JoinApi.exportJoinRecordUsingPOST(param)
            if(payload){
                let a=window.document.createElement('a')
                a.setAttribute('href',payload)
                a.click()
            }
            this.loadingExportBtn=false
        }
    }
  
})

</script>
<style lang='scss'>

</style>
