<template>
 <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
       <div class="app-container vote-object">
            <LayoutSearch>
                <el-form-item label="单位或学校" prop="unitId">
                    <el-select v-model="searchParam.unitId" placeholder="请选择" @change='activeListLoad'>
                        <el-option label="全部" :value="undefined" ></el-option>
                        <el-option :label="item.unitName" :value="item.id" v-for='(item,i) in unitList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动" prop="activityId">
                    <el-select v-model="searchParam.activityId" placeholder="请选择">
                        <el-option :label="item.activityName" :value="item.id" v-for='(item,i) in activeList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch()" :loading="loadingSearchBtn">
                    查询
                </el-button>
                <el-button v-waves type="success" @click="addDialogVisible=true;" v-if='!isCheck'>
                    新增
                </el-button>
                <el-button v-waves type="success" @click="exportData" :loading="loadingExportBtn" v-if='!isCheck'>
                    导出对象与票数
                </el-button>
                <el-button v-waves type="success" @click="batchCheck" v-if='isCheck'>
                    批量审核通过
                </el-button>
            </LayoutSearch>
            <baseTable :columns='columns' :list='list' @edit='edit' @del='del' :loading='loading'  @check='check' @selectionChange='selectionChange'> 
                <template slot-scope="{scope}" slot="pictureUrl">
                    <img :src="scope.row.pictureUrl" v-if="scope.row.pictureUrl" style="max-height:50px;" />
                </template> 
                <template slot-scope="{scope}" slot="description">
                    <span :title='scope.row.description'>{{scope.row.description}}</span>
                </template>
            </baseTable>
        </div>

        <el-dialog :title="addParam.id?'修改投票对象':'新增投票对象'" :visible.sync="addDialogVisible" @closed='dialogClosed'>
            <el-form :model="addParam" label-width="100px">
                <el-form-item label="单位或学校" prop="unitId" v-if='!addParam.id'>
                    <el-select v-model="addParam.unitId" placeholder="请选择" @change='addActiveListLoad'>
                        <el-option :label="item.unitName" :value="item.id" v-for='(item,i) in unitList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动" prop="activityId" v-if='!addParam.id'>
                    <el-select v-model="addParam.activityId" placeholder="请选择">
                        <el-option :label="item.activityName" :value="item.id" v-for='(item,i) in addActiveList' :key='i' ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" >
                    <el-input v-model="addParam.name" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="图片" >
                   <UploadImages v-model="imgList" action="file/upload" :max="1"></UploadImages>
                </el-form-item>   
                <el-form-item label="描述" >
                    <el-input v-model="addParam.description"  type="textarea" :rows="5"></el-input>
                </el-form-item>    
                <el-form-item label="排序" >
                    <el-input v-model="addParam.orderNumber" autocomplete="off" width='200px'></el-input>
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
import JoinDepartmentVO from "@/api/modules/JoinDepartmentVO";
import JoinActivityVO from "@/api/modules/JoinActivityVO";
import JoinObjectVO from "@/api/modules/JoinObjectVO";
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
        searchParam:JoinObjectVO,
        addParam:JoinObjectVO,
        columns:Array<object>,
        addDialogVisible:boolean,
        activeList:Array<JoinActivityVO>,
        addActiveList:Array<JoinActivityVO>,
        loading:boolean,
        loadingSearchBtn:boolean,
        loadingSaveBtn:boolean,
        loadingExportBtn:boolean,
        unitList:Array<JoinUnitVO>,
        imgList:Array<{url:string}>,
        isCheck:boolean,
        selectRows:any
        
    }{
        return {
            pager:new Pager<object>(),
            list:[],
            searchParam:new JoinObjectVO(),
            addParam:new JoinObjectVO(),
            columns:[],
            addDialogVisible:false,
            activeList:[],
            addActiveList:[],
            loading:false,
            loadingSearchBtn:false,
            loadingSaveBtn:false,
            loadingExportBtn:false,
            unitList:[],
            imgList:[],
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
            {key:'name',title:'投票对象名称'},
            {key:'pictureUrl',title:'图片',slot:'pictureUrl'},
            {key:'description',title:'描述',width:200,slot:'description'},
            {key:'joinNumbers',title:'票数'},
            {key:'orderNumber',title:'排序',width:50},
            {key:'checkFlag',title:'审核状态',format:(val:number)=>{
                return val===1?'审核通过':'未审核'
            }},
            {key:'createTime',title:'创建时间',width:150,format:(val:string)=>{
                let date=new Date(val)
                return date.toLocaleDateString().replace(/\//gim,'-')+` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }},
            {type:'operate',title:'操作',width:200,
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
        dialogClosed(){
            this.addParam=new JoinObjectVO()
            this.imgList=[]
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
            if(!this.searchParam.unitId){
                this.$set(this.searchParam,'activityId',undefined)
                this.activeList=[]
                return
            }
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
        async addActiveListLoad(){
            let query=new JoinActivityVO()
            query.unitId=this.addParam.unitId
            let {payload}=  await JoinApi.selectActivityListUsingPOST(query);
            if(payload){
                this.addActiveList = payload
                if(this.addActiveList.length){
                    this.$set(this.addParam,'activityId',this.activeList[0].id)
                }
                else{
                    this.$set(this.addParam,'activityId',null)
                }
            }
        },
        async handleSearch(){
            this.loading=true
            this.loadingSearchBtn=true
            let query={...this.searchParam,...this.pager}
            let { payload } =  await JoinApi.selectObjectListUsingPOST(query);
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
            this.addParam.pictureUrl=this.imgList[0]?this.imgList[0].url:''
            if(this.addParam.id){
                res = await JoinApi.updateObjectUsingPOST(this.addParam);
            }
            else{
                res = await JoinApi.addObjectUsingPOST(this.addParam);
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
            if(row.pictureUrl){
                this.imgList=[{url:row.pictureUrl}]
            }
            this.addDialogVisible=true
        },
        del(row:any){
            this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                let param=new JoinObjectVO()
                param.id=row.id
                let res=await JoinApi.deleteObjectUsingPOST(param);
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
            let param=new JoinObjectVO()
            param.activityId=this.searchParam.activityId
            let {payload}=await JoinApi.exportObjectAndJoinNumbersUsingPOST(param)
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
        check(row:any){
            this.selectRows = [row]
            this.batchCheck()
        },
        async batchCheck(){
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
                let param=new JoinObjectVO();
                param.idList=ids
                let res = await JoinApi.updateObjectUsingPOST(param)
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
.vote-object{
    .el-table .cell{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

</style>
