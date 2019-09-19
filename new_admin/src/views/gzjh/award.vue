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
        <div class="item txt left">
            <p class="title">所有活动发放奖励统计</p>
            <div class="sta">
                <p>CC币：{{all.ccNum}}</p>
            </div>
        </div>
        <div class="item txt">
            <p class="title">趣味打卡奖励发放统计-滴滴券</p>
            <div class="sta">
                <p>滴滴券：{{di.num}}</p>
            </div>
        </div>
        <div class="item chart">
             <div id='chart'></div>
             <p>总发放总数：{{all.ccNum}}</p>
        </div>
        <div class="item chart">
             <div id='chart1'></div>
             <p>总发放总数：{{chart1.joinNum+chart1.shareNum}}</p>
        </div>
    </section>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import {OrderApi,ActivityApi} from '@/api'
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
                ccNum:0,
                ddNum:0,
            },
            di:{
                num:0,
            },
            chart:{
                dragonNum:0,
                paoNum:0,
                shareNum:0,
            },
            chart1:{
                joinNum:0,
                shareNum:0,
            },
            chartData:[{name:'化龙发放',value:0},
                       {name:'每日泡泡',value:0},
                       {name:'邀请发放',value:0},
            ],
            chartData1:[
                {name:'参与答题发放',value:0},
                {name:'转发发放',value:0},
            ],
            actList:[]
        }
    },
    async mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            this.all.ccNum=0;
            this.all.ddNum=0;
            this.getDiNum()
            this.getShareNum()
            this.getDragonNum()
            this.echartInit()

            this.echartInit1()
        },
        async echartInit(){
            await this.getDragonNum()
            await this.getPaoNum()
            await this.getShareNum()
            this.chartData=[{name:'化龙发放',value:this.chart.dragonNum},
                       {name:'每日泡泡',value:this.chart.paoNum},
                       {name:'邀请发放',value:this.chart.shareNum},
            ]
            this.all.ccNum=Object.values(this.chart).reduce((res,item,i)=>{return res+item},0)
            this.chartData.forEach(item=>{
                    let percent= this.all.ccNum?(item.value*100/this.all.ccNum).toFixed(2):0
                    item.name=item.name+':'+item.value+' ('+percent+'%)'
                })
            let myChart = echarts.init(document.getElementById('chart'));
            let option={
                title:{
                    text:'幸运有鲤奖励发放统计-CC币',
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
                        center: ['50%', '55%'],
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
        async echartInit1(){
            await this.getActList()
            await this.getChart1Num()
            this.chartData1=[{name:'参与答题发放',value:this.chart1.joinNum},
                       {name:'转发发放',value:this.chart1.shareNum},
            ]
            let sum=this.chart1.joinNum+this.chart1.shareNum
            this.chartData1.forEach(item=>{
                    let percent= sum?(item.value*100/sum).toFixed(2):0
                    item.name=item.name+':'+item.value+' ('+percent+'%)'
                })
            let myChart = echarts.init(document.getElementById('chart1'));
            let option={
                title:{
                    text:'答一答奖励发放统计-CC币',
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
                        center: ['50%', '55%'],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data:this.chartData1,
                    }
                ]
            };
            myChart.setOption(option)
        },
        //化龙发放
        async getDragonNum(){
            let {payload} = await OrderApi.getRewardIntegralNumberUsingPOST(
                {
                    actIds:isTest?'558598462,558600290,558600625':'562126606,562132958,562133026',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.chart.dragonNum=payload?payload:0
        },
        //每日泡泡
        async getPaoNum(){
            let {payload} = await OrderApi.getRewardIntegralNumberUsingPOST(
                {
                    actIds:isTest?'558334807,558334904,558334950':'562124058,562124134,562124193',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.chart.paoNum=payload?payload:0
        },
        //邀请发放
        async getShareNum(){
            let {payload} = await OrderApi.getRewardIntegralNumberUsingPOST(
                {
                    actId:isTest?'562834662':'562900542',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.chart.shareNum=payload?payload:0
        },
        async getDiNum(){
            let {payload} = await OrderApi.getOrderNumberUsingPOST(
                {
                    actId:isTest?'557368025':'562205734',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.di.num=payload?payload:0
        },
        //获取答一答活动列表
		async getActList(){
			let param={ "merchantId":isTest?229:218,
						"actStatus":"1",
						"isShow":1,
						"currentPage":1,
						"pageSize":100000}
			let {payload}=await ActivityApi.showActListUsingPOST(param)
			if(payload){
				this.actList=payload.list
			}
		},
        async getChart1Num(){
            let actIds = this.actList.map(item=>item.actId).join(',')
            var {payload} = await OrderApi.getRewardIntegralNumberUsingPOST({
                    actIds:actIds,
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
            })
            this.chart1.joinNum=payload?payload:0
            var {payload} = await OrderApi.getRewardIntegralNumberUsingPOST({
                    actId:isTest?'562501836':'562508142',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
            })
            this.chart1.shareNum=payload?payload:0            
        }
    }
}
</script>
<style scoped lang='scss'>
.page-award{
    padding:10px;
    box-sizing:border-box;
    font-size:20px;
    padding-top:10px;
    .item{
        margin-top:10px;
        border:1px solid #e4e4e4;
        height:100px;
        padding:10x;
        box-sizing: border-box;
        &.left{
            margin-right:20px;
        }
        &.txt{
            width:450px;
            display:inline-block;
            text-align:center;
        }
        &.chart{
            margin-top:10px;
            width:920px;
            height:400px;
            text-align:center;
             #chart,#chart1{
                width:900px;
                height:350px;
            }
        }
    }
   
}

</style>