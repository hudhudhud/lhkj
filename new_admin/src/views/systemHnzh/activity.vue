<template>
 <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
       <div class="app-container activity">
            <LayoutSearch>
                <el-form-item label="单位或学校" prop="unitId">
                    <el-select v-model="searchParam.unitId" placeholder="请选择" >
                        <el-option label="全部" :value="undefined" ></el-option>
                        <el-option :label="item.unitName" :value="item.id" v-for='(item,i) in unitList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-radio-group v-model="searchParam.showFlag" size="small">
                        <el-radio-button :label="undefined">全部</el-radio-button>
                        <el-radio-button :label="0">否</el-radio-button>
                        <el-radio-button :label="1">是</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch()" :loading='loadingSearchBtn'>
                    查询
                </el-button>
                <el-button v-waves type="success" @click="addDialogVisible=true" v-if='!isCheck'>
                    新增
                </el-button>
                <el-button v-waves type="success" @click="exportData" :loading='loadingExportBtn' v-if='!isCheck'>
                    导出活动及参与人数
                </el-button>
                <el-button v-waves type="success" @click="batchCheck" v-if='isCheck'>
                    批量审核通过
                </el-button>
            </LayoutSearch>
            <baseTable :columns='columns' :list='list' @edit='edit' @del='del' :loading='loading'  @check='check' @selectionChange='selectionChange'> 
            </baseTable>
        </div>

        <el-dialog :title="addParam.id?'修改活动':'新增活动'" :visible.sync="addDialogVisible" @closed='dialogClosed' >
            <el-form :model="addParam" label-width="100px">
                <el-form-item label="单位或学校" prop="unitId" >
                    <el-select v-model="addParam.unitId" placeholder="请选择">
                        <el-option :label="item.unitName" :value="item.id" v-for='(item,i) in unitList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称" >
                    <el-input v-model="addParam.activityName" autocomplete="off" width='200px'></el-input>
                </el-form-item>
                <el-form-item label="活动类型" >
                    <el-select v-model="addParam.activityType" placeholder="请选择">
                        <el-option label="投票" :value="0"></el-option>
                        <el-option label="报名" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="样式" >
                    <el-select v-model="addParam.styleCode" placeholder="请选择">
                        <el-option :label="styleCode[key]" :value="key-''" v-for="(key,i) in Object.keys(styleCode)" :key='i'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input v-model="addParam.orderNumber" autocomplete="off" width='200px'></el-input>
                </el-form-item>   
                <el-form-item label="是否显示" v-if='addParam.id'>
                   <el-switch v-model="addParam.showFlag"  :active-value="1" :inactive-value="0" ></el-switch>
                </el-form-item>     
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save" :loading='loadingSaveBtn'>确 定</el-button>
            </div>
        </el-dialog>
    </LayoutPage>
</template>
<script lang='ts'>
import Vue from 'vue'
import LayoutSearch from '@/components/layout/LayoutSearch.vue';
import JoinUnitVO from "@/api/modules/JoinUnitVO";
import JoinActivityVO from "@/api/modules/JoinActivityVO";
import { JoinApi } from "@/api";
import Pager from "@/api/base/Pager";
import { waves } from "@/directive/waves"; // waves directive


export default Vue.extend({
    components:{
        LayoutSearch,
    },
    directives: { waves },
    data():{
        pager:Pager<object>,
        list:Array<object>,
        searchParam:JoinActivityVO,
        addParam:JoinActivityVO,
        columns:Array<object>,
        addDialogVisible:boolean,
        unitList:Array<JoinUnitVO>,
        loading:boolean,
        loadingSearchBtn:boolean,
        loadingSaveBtn:boolean,
        loadingExportBtn:boolean,
        styleCode:any,
        isCheck:boolean,
        selectRows:any
        
    }{
        return {
            pager:new Pager<object>(),
            list:[],
            searchParam:new JoinActivityVO(),
            addParam:new JoinActivityVO(),
            columns:[],
            addDialogVisible:false,
            unitList:[],
            loading:false,
            loadingSearchBtn:false,
            loadingSaveBtn:false,
            loadingExportBtn:false,
            styleCode:{
                0:'a（名字／图片／文字说明）',
                1:'b（名字／文字说明）',
                2:'c（名字）'
            },
            isCheck:false,
            selectRows:[]
        }
    },
    async created(){
        this.isCheck=this.$route.path.indexOf('check')>-1
        if(this.isCheck){
            this.searchParam.checkFlag=0
            this.columns=[{key:'',title:'',type:'selection'}]
        }
       
        this.columns=this.columns.concat([
            {key:'id',title:'id',width:50},
            //{key:'unitName',title:'单位或学校名称'},
            {key:'activityType',title:'活动类型',width:200,format:(val:number)=>{
                return val===0?'投票':'报名'
            }},
            {key:'activityName',title:'活动名称'},
            {key:'orderNumber',title:'排序',width:100},
            {key:'showFlag',title:'是否显示',width:100,format:(val:number)=>{
                return val===0?'否':'是'
            }},
            {key:'styleCode',title:'样式',width:200,format:(val:number)=>{
                return this.styleCode[val]
            }},
            {key:'checkFlag',title:'审核状态',format:(val:number)=>{
                return val===1?'审核通过':'未审核'
            }},
            {key:'createTime',title:'创建时间',format:(val:string)=>{
                let date=new Date(val)
                return date.toLocaleDateString().replace(/\//gim,'-')+` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }},
            {type:'operate',title:'操作',width:250,
                operates:[
                    {name:'编辑',emitKey:'edit',showFun:()=>{
                        return !this.isCheck
                    }} ,
                    {name:'删除',emitKey:'del',showFun:()=>{
                        return !this.isCheck
                    }}  ,
                    {name:'审核通过',emitKey:'check',showFun:()=>{
                        return this.isCheck
                    }}  ,
                ]
            }
        ])
        this.pager.currentPage=1;
        this.pager.pageSize=30;
        await this.unitListLoad()
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
        dialogClosed(){
            this.addParam=new JoinActivityVO()
        },
        async unitListLoad(){
            let query=new JoinUnitVO()
            let {payload}=  await JoinApi.selectUnitListUsingPOST(query);
            if(payload){
                this.unitList = payload
                this.$set(this.searchParam,'unitId',this.unitList[0].id)
            }
        },
        async handleSearch(){
            this.loading=true
            this.loadingSearchBtn=true
            let query={...this.searchParam,...this.pager}
            let { payload } =  await JoinApi.selectActivityListUsingPOST(query);
            if(payload){
                this.list = payload.records;
                this.pager.totalCount=payload.total
            }
            this.loading=false
            this.loadingSearchBtn=false
        },
        async save(){
            this.loadingSaveBtn=true
            let res = null;
            if(this.addParam.id){
                res= await JoinApi.updateActivityUsingPOST(this.addParam);
            }
            else{
                res =  await JoinApi.addActivityUsingPOST(this.addParam);
            }
            if(res.status===200){
                this.addDialogVisible = false
                this.$notify({
                    title: "温馨提示",
                    message: "保存成功",
                    type: "success",
                    duration: 2000
                });
                this.handleSearch()
            }
            this.loadingSaveBtn=false
        },
        edit(row:any){
            this.addParam=JSON.parse(JSON.stringify(row))
            this.addDialogVisible=true
        },
        del(row:any){
            this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                let param=new JoinActivityVO()
                param.id=row.id
                let res=await JoinApi.deleteActivityUsingPOST(param);
                if(res.status===200){
                    this.$notify({
                        title: "温馨提示",
                        message: "删除成功",
                        type: "success",
                        duration: 2000
                    });
                    this.handleSearch()
                }
            })
        },
        async exportData(){
            this.loadingExportBtn=true
            let param=new JoinActivityVO()
            param.unitId=this.searchParam.unitId
            let {payload}=await JoinApi.exportActivityAndJoinNumbersUsingPOST(param)
            if(payload){
                let a=window.document.createElement('a')
                a.setAttribute('href',payload)
                a.click()
            }
            this.loadingExportBtn=false
        },
        selectionChange(rows:any){
            this.selectRows=rows
        },  
        async check(row:any){
            this.selectRows = [row]
            this.batchCheck()
        },
        batchCheck(){
            let self=this
            if(!this.selectRows||!this.selectRows.length){
                this.$message('请选择要操作的行！')
                return 
            }
            this.$confirm("确认审核通过?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
                let ids=self.selectRows.map((item:any)=>item.id)
                let param=new JoinActivityVO();
                param.idList=ids
                let res = await JoinApi.updateActivityUsingPOST(param)
                if(res.status===200){
                    this.$notify({
                        title: "温馨提示",
                        message: "操作成功",
                        type: "success",
                        duration: 2000
                    });
                    await this.handleSearch()
                }
            })
        }
    }
  
})

</script>
<style lang='scss'>


</style>
