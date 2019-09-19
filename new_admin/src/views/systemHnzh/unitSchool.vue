<template>
 <LayoutPage :showPager="true" :pager='pager' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'>
       <div class="app-container unit-school">
            <LayoutSearch>
                <el-form-item label="单位类型" prop="unitType">
                    <el-select v-model="searchParam.unitType" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="单位" :value="0"></el-option>
                        <el-option label="学校" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-radio-group v-model="searchParam.showFlag" size="small">
                        <el-radio-button label="undefined">全部</el-radio-button>
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
                <el-button v-waves type="success" @click="batchCheck" v-if='isCheck'>
                    批量审核通过
                </el-button>
            </LayoutSearch>
            <baseTable :columns='columns' :list='list' @edit='edit' @del='del' :loading='loading'  @check='check' @selectionChange='selectionChange'> 
            </baseTable>
        </div>

        <el-dialog :title="addParam.id?'修改单位或学校':'新增单位或学校'" :visible.sync="addDialogVisible" @closed='dialogClosed'>
            <el-form :model="addParam" label-width="100px">
                <el-form-item label="名称" >
                    <el-input v-model="addParam.unitName" autocomplete="off" width='200px'></el-input>
                </el-form-item>
                <el-form-item label="类型" >
                    <el-select v-model="addParam.unitType" placeholder="请选择">
                        <el-option label="单位" :value="0"></el-option>
                        <el-option label="学校" :value="1"></el-option>
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
import { Component, Vue, Watch } from "vue-property-decorator";
import LayoutSearch from '@/components/layout/LayoutSearch.vue';
import JoinUnitVO from "@/api/modules/JoinUnitVO";
import { JoinApi } from "@/api";
import Pager from "@/api/base/Pager";
import { waves } from "@/directive/waves"; // waves directive

@Component({
  components: {
    LayoutSearch,
  },
  directives: { waves },
})
export default class UnitSchool extends Vue {
    private pager = new Pager<object>();
    private list:JoinUnitVO[]=[];
    private searchParam=new JoinUnitVO();
    private addParam=new JoinUnitVO();
    private columns:Object[]=[];
    private addDialogVisible:boolean=false;
    private loading:boolean=false;
    private loadingSearchBtn:boolean=false;
    private loadingSaveBtn:boolean=false;
    private isCheck:boolean=false;
    private selectRows:any[]=[]
    created(){
        this.isCheck=this.$route.path.indexOf('check')>-1
        if(this.isCheck){
            this.searchParam.checkFlag=0
            this.columns=[{key:'',title:'',type:'selection'}]
        }
       
        this.columns=this.columns.concat([
            {key:'id',title:'id',width:50},
            {key:'unitName',title:'单位或学校名称'},
            {key:'unitType',title:'类型',width:200,format:(val:number)=>{
                return val===0?'单位':'学校'
            }},
            {key:'orderNumber',title:'排序',width:100},
            {key:'showFlag',title:'是否显示',width:100,format:(val:number)=>{
                return val===0?'否':'是'
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
        this.handleSearch()
    }
    private handleSizeChange(size:number){
        this.pager.pageSize=size
        this.handleSearch()
    }

    private handleCurrentChange(current:number){
        this.pager.currentPage=current
        this.handleSearch()
    }

    private dialogClosed(){
        this.addParam=new JoinUnitVO()
    }
    private async handleSearch(){
        this.loading=true
        this.loadingSearchBtn=true
        let query={...this.searchParam,...this.pager}
        let { payload } =  await JoinApi.selectUnitListUsingPOST(query);
        if(payload){
            this.list = payload.records;
            this.pager.totalCount=payload.total
        }
        this.loading=false
        this.loadingSearchBtn=false
    }
    private async save(){
        this.loadingSaveBtn=true
        let res = null;
        if(this.addParam.id){
            res= await JoinApi.updateUnitByIdUsingPOST(this.addParam);
        }
        else{
            res =  await JoinApi.addUnitUsingPOST(this.addParam);
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
    }
    private edit(row:any){
        this.addParam=JSON.parse(JSON.stringify(row))
        this.addDialogVisible=true
    }
    private  del(row:any){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            let param=new JoinUnitVO()
            param.id=row.id
            let res=await JoinApi.deleteUnitByIdUsingPOST(param);
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
    }
    private selectionChange(rows:any){
       this.selectRows=rows
    }
    private async check(row:any){
        this.selectRows = [row]
        this.batchCheck()
    }
    private  async batchCheck(){
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
            let param=new JoinUnitVO();
            param.idList=ids
            let res = await JoinApi.updateUnitByIdUsingPOST(param)
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

</script>
<style lang='scss'>


</style>
