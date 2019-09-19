<template>
   <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
        <div class="app-container product-page">
            <LayoutSearch>
                <el-form-item label="商品名称">
                    <el-input v-model="queryForm.proName" placeholder="输入名称查询" clearable></el-input>
                </el-form-item>
                <el-form-item label="上下线">
                    <el-select v-model="queryForm.proStatus" placeholder="可用状态">
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
            :param='queryForm'  @search='onSearch'
                @downLine='updateOnLineStatus($event,"0")'
                @goStandard='goStandard'
                >
                <template slot-scope="{scope}" slot="proIconUrl">
                    <img :src="scope.row.proIconUrl" v-if="scope.row.proIconUrl" style="max-height:50px;" />
                </template> 
                <template slot-scope="{scope}" slot="proHomeImgUrl">
                    <img :src="scope.row.proHomeImgUrl" v-if="scope.row.proHomeImgUrl" style="max-height:40px;" />
                </template> 
                <template slot-scope="{scope}" slot="proStatus">
                     <el-tag :type='scope.row.proStatus=="1"?"success":"info"'>{{ scope.row.proStatus=="1"?"上线":"下线" }}</el-tag>
                </template>
            </baseTable>
           <el-dialog :visible.sync="addDialogVisible" :title='addForm.proId?"修改商品":"新增商品"'>
                <el-form :model="addForm" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="商品名称" prop="proName">
                        <el-input v-model="addForm.proName"></el-input>
                    </el-form-item>
                    <el-form-item label="商品排序" prop="proSort">
                        <template>
                        <el-input-number v-model="addForm.proSort" :min="1" :max="10"></el-input-number>
                        </template>
                    </el-form-item>
                    <el-form-item label="商品描述 " prop="proDetails ">
                        <el-input type="textarea" v-model="addForm.proDetails "></el-input>
                    </el-form-item>
                    <el-form-item label="商品详情" prop="proDescript ">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 7}" v-model="addForm.proDescript "></el-input>
                    </el-form-item>
                    <el-form-item label="商品封面上传 " prop="homeImgList ">
                        <UploadImages v-model="homeImgList " action="file/upload" :max='1'></UploadImages>
                    </el-form-item>
                    <el-form-item label="商品图标上传 " prop="iconList ">
                        <UploadImages v-model="iconList " action="file/upload" :max='1'></UploadImages>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
                        <el-button @click="addDialogVisible=false" v-if="!submiting ">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog> 
        </div>
   </LayoutPage>  
</template>
<script lang='ts'>
import Vue from 'vue'
import LayoutSearch from '@/components/layout/LayoutSearch.vue'
import ProductVO from "@/api/modules/ProductVO";
import { ProductApi } from "@/api";
import Pager from "@/api/base/Pager";
import { waves } from "@/directive/waves"; // waves directive
import ProductResponse from '../../../api/modules/ProductResponse';
import UploadImages from '@/components/UploadImages.vue'

export default Vue.extend({
    components:{
        LayoutSearch,
        UploadImages
    },
  directives: { waves },
  data():{
        pager:Pager<object>,
        queryForm:ProductVO,
        loading:Boolean,
        columns:Array<object>,
        list:any[],
        actId:number,
        addDialogVisible:boolean,
        addForm:ProductVO,
        rules:object,
        submiting:Boolean,
        homeImgList:any[],
        iconList:any[],
    }{
        return {
            pager:new Pager<object>(),
            queryForm:new ProductVO(),
            loading:false,
            columns:[],
            list:[],
            actId:-1,
            addDialogVisible:false,
            addForm:new ProductVO(),
            rules: {
                proName: [
                    { required: true, message: "请输入商品名称", trigger: "blur" },
                    {
                        min: 1,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "change"
                    }
                ],
                proType: [
                    { required: true, message: "请选择商品类型", trigger: "blur" }
                ]
            },
            submiting:false,
            homeImgList:[],
            iconList:[],
        }
    },
    created(){
        this.pager.currentPage=1;
        this.pager.pageSize=30;
        this.actId=Number(this.$route.params.actId)
        this.queryForm.actId=this.actId
        this.$set(this.queryForm,'proStatus','1')//默认查上线
        this.columns=[
            {key:'proId',title:'商品ID',width:80},
            {key:'proName',title:'商品名称',width:200},
            {key:'proDetails',title:'商品描述',width:120},
            {key:'proIconUrl',title:'商品图标',slot:'proIconUrl',width:120},
            {key:'proHomeImgUrl',title:'商品封面',slot:'proHomeImgUrl',width:100},
            {key:'proStatus',title:'上下线',slot:'proStatus'},
            {type:'operate',title:'操作','minWidth':300,
                operates:[
                    {name:'规格',emitKey:'goStandard',btntype:'success'} ,
                    {name:'上线',emitKey:'online',showKey:'proStatus',show:"0",btnType:'warning'},
                    {name:'下线',emitKey:'downLine',showKey:'proStatus',show:"1",btnType:'warning'},
                    {name:'编辑',emitKey:'edit',btnType:'warning'},
                    {name:'删除',emitKey:'del',btnType:'danger'},
                ]
            }
        ]
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
        async onSearch(){
            this.pager.currentPage=1;
            this.dataLoad()
        },
        async dataLoad(){
            this.loading=true
            let {payload}=await ProductApi.getProListUsingPOST({...this.pager,...this.queryForm})
            if(payload){
               this.list=payload.list
               this.pager.totalCount=payload.totalCount
            }
            this.loading=false
        },
        async onAdd(row?:any){
            this.addForm=new ProductVO()
            this.homeImgList=[]
            this.iconList=[]

            this.addDialogVisible=true
            if(row&&row.proId){
                this.addForm.proId=row.proId
                let param = new ProductVO()
                param.actId=this.actId
                param.proId=row.proId
                let { payload } = await ProductApi.getProductOneUsingPOST(param)
                if(payload){
                    this.homeImgList = [{url: payload.proHomeImgUrl}]
                    this.iconList = [{url: payload.proIconUrl}]
                    this.addForm=JSON.parse(JSON.stringify(payload))
                }
                this.addForm.proId=row.proId
            }   
            this.addForm.actId=this.actId
        },
        validForm () {
            (this.$refs["form"] as HTMLFormElement).validate((valid:any) => {
                if (valid) {
                    this.doSubmit()
                } else {
                    return false
                }
            })
        },
        async doSubmit(){
            this.submiting=true
            if (this.homeImgList.length) {
                this.addForm.proHomeImgUrl = this.homeImgList[0].url
            }
            if (this.iconList.length) {
                this.addForm.proIconUrl = this.iconList[0].url
            }
            let res =  await ProductApi.saveProductUsingPOST(this.addForm)
            if(res.status===200){
                this.$notify({
                    title: "温馨提示",
                    message: "保存成功",
                    type: "success",
                    duration: 2000
                });
                this.addDialogVisible=false
                this.onSearch()
            }
            this.submiting=false
        },
        
        async del(row:any){
            await this.$confirm("确认删除该商品?", "提示", {type: "warning"})
            let param=new ProductVO();
            param.actId=row.actId
            param.proId=row.proId
            let res = await ProductApi.delProductUsingPOST(param);
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
            await this.$confirm(status==="0"?'确认下线该商品?':'确认上线该商品?', '提示', {type: 'warning'});
            let sta=Number(status)
            let res = await ProductApi.updateProStatusUsingGET({proId:row.proId,status:sta});
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
        goStandard(row:any){
            this.$router.push(`/platform/activityManage/activity/product/${this.actId}/standard/${row.proId}`)
        },
       
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
