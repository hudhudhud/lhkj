<template>
   <LayoutPage :showPager="false">
        <div class="app-container limit-page">
            <LayoutSearch>
                <el-form-item>
                    <el-button @click="onAdd" type="success" plain>新增</el-button>
                </el-form-item>
            </LayoutSearch> 
            <baseTable :columns='columns' :list='list' @edit='onAdd' @del='del' >
            </baseTable>
            <el-dialog :visible.sync="addDialogVisible" title="新增限制">
                <el-form :model="addForm" ref="form" label-width="100px" >
                    <el-form-item label="配置项" prop="limitStrategyId">
                        <el-select v-model="addForm.limitStrategyId" placeholder="请选择">
                        <el-option v-for="config in configList" :key="config.limitStrategyId" :value="config.limitStrategyId" :label="config.limitStrategyName">
                            {{config.limitStrategyName}}
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="限制名称" prop="limitName">
                        <el-input v-model="addForm.limitName"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="proSort">
                        <el-input-number v-model="addForm.sort"></el-input-number>
                    </el-form-item>
                    <el-form-item v-for="configItem in configItemList" :key="'config_'+configItem.key" :label="configItem.name" :prop='configItem.key'>
                        <el-input v-model="configForm[configItem.key]" v-if="configItem.type=='text'"></el-input>
                        <el-input-number v-model="configForm[configItem.key]" v-if="configItem.type=='number'"></el-input-number>
                        <el-radio-group v-model="configForm[configItem.key]" v-if="configItem.type=='radio'">
                            <el-radio :label="1">日</el-radio>
                            <el-radio :label="2">周</el-radio>
                            <el-radio :label="3">月</el-radio>
                            <el-radio :label="4">年</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary " @click="doSubmit" :loading="submiting ">保存</el-button>
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
import ActivityLimitVO from "@/api/modules/ActivityLimitVO";
import { ActApi} from "@/api";
import { waves } from "@/directive/waves"; // waves directive

export default Vue.extend({
    components:{
        LayoutSearch,
    },
    directives: { waves },
    computed: {
        currentConfig ():any {//当前选择的配置类型
            for (let i = 0; i < this.configList.length; i++) {
                if (this.addForm.limitStrategyId === this.configList[i].limitStrategyId) {
                     return this.configList[i]
                }
            }
            return null
        }
    },
    watch: {
        currentConfig (val) :void {
            if (val && val.configure) {
                this.configItemList = JSON.parse(val.configure)
                let form = {}
                this.configItemList.forEach(item => {
                    Object.assign(form,{[item.key]:item.default || ""})
                })
                this.configForm = form
            }
        }
    },
    data():{
        addForm:ActivityLimitVO,
        loading:Boolean,
        columns:Array<object>,
        list:any[],
        addDialogVisible:Boolean,
        submiting:Boolean,
        configList:any[],
        configItemList:any[],
        configForm:any,
    }{
        return {
            addForm:new ActivityLimitVO(),
            loading:false,
            columns:[],
            list:[],
            addDialogVisible:false,
            submiting:false,
            configList:[],
            configItemList:[],
            configForm:null,
        }
    },
    created(){
        this.addForm.relationId = Number(this.$route.params.actId)
        this.addForm.relationType = "2"
        this.addForm.limitId=2
        this.columns=[
            {key:'limitId',title:'限制ID',width:80},
            {key:'limitName',title:'限制名称',width:200},
            {key:'limitStrategyName',title:'限制策略名称',width:200},
            {key:'limitConfigure',title:'限制配置'},
            {key:'className',title:'类名',slot:'standardImgUrl',width:100},
            {key:'sort',title:'排序',width:80},
            {type:'operate',title:'操作',width:100,
                operates:[
                    {name:'删除',emitKey:'del',btnType:'danger'},
                ]
            }
        ]
        this.onSearch()
    },
    methods:{
        async onSearch(){
            this.loading=true
            let {payload}=await ActApi.getLimitUsingPOST(this.addForm)
            if(payload){
               this.list=payload
            }
            this.loading=false
        },
        async onAdd(){
          this.addDialogVisible=true
          this.loadConfig()        
        },
        async del(row:any){
            await this.$confirm("确认删除该限制?", "提示", {type: "warning"})
            let res = await ActApi.deleteLimitUsingGET({limitId:row.limitId});
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
        async loadConfig(limitId?:number){
            this.addForm.sort="1"
            let param = new ActivityLimitVO()
            param.relationId=this.addForm.relationId
            param.relationType=this.addForm.relationType
            let res = await ActApi.getLimitIdUsingPOST(param)
            if(res&&res.payload){
                let ary=res.payload
                param.limitStrategyIdList=ary
                res = await ActApi.getConfigureUsingPOST(param)
                if(res&&res.payload){
                    this.configList=res.payload
                }
            }
        },
        async doSubmit () {
            this.submiting = true
            this.addForm.limitConfigure = JSON.stringify(this.configForm)
            let rs = await ActApi.saveLimitUsingPOST(this.addForm)
            if (rs.status === 200) {
                this.addDialogVisible = false
                this.$notify({
                    title: "温馨提示",
                    message: "保存成功",
                    type: "success",
                    duration: 2000
                });
                this.onSearch()
            }
            this.submiting = false
        },
    }
})
</script>