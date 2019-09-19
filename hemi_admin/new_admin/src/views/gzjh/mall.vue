<template>
    <section class='page-award'>
        <LayoutSearch>
            <el-form>
                <el-form-item label="开始日期">
                        <el-date-picker
                            v-model="searchForm.beginDate"
                            type="date"
                            placeholder="开始日期" format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>  
                    </el-form-item>
                    <el-form-item label="结束日期">
                        <el-date-picker
                            v-model="searchForm.endDate"
                            type="date"
                            placeholder="结束日期" format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                        </el-date-picker> 
                    <el-button @click='getData' :loading='loading'>查询</el-button>
                </el-form-item>
            </el-form>
        </LayoutSearch>
        <div class='top'>
            <div class="item txt">
                <p class="title">销售情况整体统计</p>
                <div class="sta">
                    <p>总销售笔数：{{all.sellNum}}</p>
                    <p>总购买人数：{{all.buyNum}}</p>
                    <p>总销售CC币金额：{{all.ccMoney}}</p>
                </div>
            </div>
            <div class="item chart">
                <div id='chart'></div>
                <p>销售总数：{{all.ccMoney}}</p>
            </div>
        </div>      
        <div class="item table">
           <p>商品劵销售详情</p>
            <el-form inline>
                <el-form-item label="类型">
                    <el-select v-model='search.type' filterable @change='getStandard'>
                        <el-option v-for='(item,i) in typeList' :key='i' :value='item.id' :label='item.name'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格">
                    <el-select v-model='search.standard' filterable @change='searchQuan'>
                        <el-option v-for='(item,i) in standardList' :key='i' :value='item.id' :label='item.standardName'></el-option>
                    </el-select>
                </el-form-item>          
            </el-form>
            <baseTable :columns='columns' :list='table' />
        </div>
    </section>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import {OrderApi,ActivityApi,ProductApi} from '@/api'
import LayoutSearch from '@/components/layout/LayoutSearch'

const isTest=process.env.VUE_APP_CURRENTMODE === 'test'

export default {
    components:{
        LayoutSearch,
    },
    data(){
        return {
            loading:false,
            searchForm:{
				beginDate:moment().startOf('month').format('YYYY-MM-DD'),
				endDate:moment().endOf('month').format('YYYY-MM-DD'),
            },
            all:{
                sellNum:0,
                buyNum:0,
                ccMoney:0,
            },
            di:{
                num:0,
            },
            chart:{
                entain:0,
                shop:0,
                food:0,
            },
            chartData:[{name:'娱乐视听',value:0},
                       {name:'购物出行',value:0},
                       {name:'美食餐饮',value:0},
            ],
            standardList:[],
            search:{
                type:'',
                standard:''
            },
            typeList:[
               {id:0,name:'娱乐视听'},
               {id:1,name:'购物出行'},
               {id:2,name:'美食餐饮'}
            ],
            table:[{
                bsCount:0,
                userCount:0,
                ccCount:0,
            }],
            columns:[
                 {key:'bsCount',title:'消耗CC币笔数'},
                 {key:'userCount',title:'消耗CC币总人数'},
                 {key:'ccCount',title:'消耗CC币总数量'},
            ]
        }
    },
    async mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.all.ccMoney=0
            this.all.sellNum=0
            this.all.buyNum=0
            this.getAllBuyNum()
            this.getAllSellNum()
            this.echartInit()
        },
        async echartInit(){
            await this.getFoodNum()
            await this.getEntainNum()
            await this.getShopNum()
            this.chartData=[{name:'美食餐饮',value:this.chart.food},
                       {name:'娱乐视听',value:this.chart.entain},
                       {name:'购物出行',value:this.chart.shop},
            ],
            this.chartData.forEach(item=>{
                let percent= this.all.ccMoney?(item.value*100/this.all.ccMoney).toFixed(2):0
                item.name=item.name+':'+item.value+' ('+percent+'%)'
            })
            let myChart = echarts.init(document.getElementById('chart'));
            let option={
                title:{
                    text:'已发放CC币状态统计',
                    x:'center',
                    y:'top',
                    padding:20,
                    textStyle:{
                        fontSize:'20',
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}"
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        center: ['50%', '57%'],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data:this.chartData,
                    }
                ]
            };
            myChart.setOption(option)
        },
        async getAllBuyNum(){
            let {payload} = await OrderApi.getOrderNumberUsingPOST(
                {
                    actIds:isTest?'557230783,557743429,557743488':'562205555,562205608,562205663',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.all.sellNum=payload?payload:0
        },
        async getAllSellNum(){
            let {payload} = await OrderApi.getCustomNumberUsingPOST(
                {
                    actIds:isTest?'557230783,557743429,557743488':'562205555,562205608,562205663',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.all.buyNum=payload?payload:0
        },
        async getFoodNum(){
            let {payload} = await OrderApi.getSpendIntegralNumberUsingPOST(
                {
                    actIds:isTest?'557230783':'562205555',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.chart.food=payload?payload:0
            this.all.ccMoney+=this.chart.food
        },
        async getEntainNum(){
            let {payload} = await OrderApi.getSpendIntegralNumberUsingPOST(
                {
                    actId:isTest?'562834662':'562900542',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.chart.entain=payload?payload:0
            this.all.ccMoney+=this.chart.entain
        },        
        async getShopNum(){
            let {payload} = await OrderApi.getSpendIntegralNumberUsingPOST(
                {
                    actIds:isTest?'557743488':'562205663',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.chart.shop=payload?payload:0
            this.all.ccMoney+=this.chart.shop
        },
        getStandard(val){
            this.search.standard=''
            switch(val){
                case 0:{
                    this.getStandardEnt();
                    break;
                };
                case 1:{
                    this.getStandardFood();
                    break;
                }
                case 2:{
                    this.getStandardFood();
                    break;
                }
            }
        },
        async searchQuan(val){
            if(!val)return 
            let param = {
                    proStandardId:val,
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            var {payload} = await  OrderApi.getOrderNumberUsingPOST(param)
            this.table[0].bsCount=payload?payload:0
            var {payload} = await  OrderApi.getCustomNumberUsingPOST(param)
            this.table[0].userCount = payload?payload:0
            var {payload} = await  OrderApi.getSpendIntegralNumberUsingPOST(param)
            this.table[0].ccCount=payload?payload:0
        },
        //获取美食活动规格
		async getStandardFood(){
			let param = {
				"actId":isTest?'557230783':'562205555',
				"proId":isTest?'748':'1501',
				"standardStatus":"1"
			}
			let {payload}=await ProductApi.getStandardUsingPOST(param)
			if(payload){
				this.standardList=payload
			}
		},
		//获取娱乐活动规格
		async getStandardEnt(){
			let param = {
				"actId":isTest?'557743429':'562205608',
				"proId":isTest?'750':'1503',
				"standardStatus":"1"
			}
			let {payload}=await ProductApi.getStandardUsingPOST(param)
			if(payload){
				this.standardList=payload
			}
		},
		//获取旅行活动规格
		async getStandardTraval(){
			let param = {
				"actId":isTest?'557743488':'562205555',
				"proId":isTest?'751':'1501',
				"standardStatus":"1"
			}
			let {payload}=await ProductApi.getStandardUsingPOST(param)
			if(payload){
				this.standardList=payload
			}
		},
    }
}
</script>
<style scoped lang='scss'>
.page-award{
    padding:10px;
    box-sizing:border-box;
    font-size:20px;
    padding-top:10px;
    .top{
        display:flex;
    }
    .item{
        margin-top:10px;
        border:1px solid #e4e4e4;
        height:400px;
        padding:10x;
        box-sizing: border-box;
        margin-right:10px;
        &.left{
            margin-right:20px;
        }
        &.txt{
            width:450px;
            display:inline-block;
           
        }
        box-sizing: border-box;
        .title{
            text-align:center;
            white-space:nowrap;
        }
        .sta{
            display:flex;
            justify-content:space-between;
            flex-wrap:wrap;
            padding:20px;
            box-sizing:border-box;
            p{
                display:inline-block;
                xtext-align:center;
                white-space:nowrap;
            }
        }
        &.chart{
            width:450px;
            height:400px;
            text-align: center;
             #chart{
                width:400px;
                height:350px;
            }
        }
        &.table{
            width:910px;
            height:250px;
            padding:10px;
            box-sizing:border-box;
            text-align:center;
            .el-form{
                text-align:left;
            }
        }
    }
   
}

</style>