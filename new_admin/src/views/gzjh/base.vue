<template>
    <section class="page-base">
        <ul class='content'>
            <li>
                <p class="title">今日数据统计</p>
                <div class="sta">
                    <p>今日新增注册人数：{{todayNum}}</p>
                    <p>累计注册人数：{{allNum}}</p>
                    <p>今日发放CC币：{{todayCC}}</p>
                    <p>今日消耗CC币：{{todaySpendCC}}</p>
                </div>
            </li>
            <li>
                <div id='chart' ></div>
                <p>累计发放总数：{{fafang}}</p>
            </li>
        </ul>
    </section>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import {AssetApi,CustomApi,OrderApi,ActivityApi} from '@/api'

const isTest=process.env.VUE_APP_CURRENTMODE === 'test'
const now=moment().format('YYYY-MM-DD')+' 00:00:00';
const tom=moment(moment().add(1,'days')._d).format('YYYY-MM-DD')+' 00:00:00';
export default {
    data(){
        return {
            fafang:0,
            todayNum:0,
            allNum:0,
            todayCC:0,
            todaySpendCC:0,
            merchantId:isTest?'229':'218',
            chartData:[{name:'剩余可用',value:0},
                       {name:'过期',value:0},
                       {name:'消耗',value:0},
            ],
            actList:[]
        }
    },
    created(){
       console.log(process.env.VUE_APP_CURRENTMODE,isTest)
       this.getTodayNum()
       this.getAllNum()
       this.getTodayCC()
       this.getTodaySpendCC()
    },
    async mounted(){
        await this.getChartData()
        let myChart = echarts.init(document.getElementById('chart'));
        let option = {
                title:{
                    text:'已发放CC币状态统计',
                    x:'center',
                    y:'top',
                    padding:10,
                    textStyle:{
                        fontSize:'17',
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}" //{b}: {c} ({d}%)
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        center: ['50%', '50%'],
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
    methods:{
        async getTodayNum(){
            let {payload} = await CustomApi.getCumtomNumberUsingPOST(
                {merchantId:this.merchantId,startTime:now,endTime:tom}
            )
            this.todayNum=payload?payload:0
        },
        async getAllNum(){
            let {payload} = await CustomApi.getCumtomNumberUsingPOST(
                {merchantId:this.merchantId}
            )
            this.allNum=payload?payload:0
        },
         //获取答一答活动列表
		async getActList(){
			let param={ "merchantId":this.merchantId,
						"actStatus":"1",
						"isShow":1,
						"currentPage":1,
						"pageSize":100000}
			let {payload}=await ActivityApi.showActListUsingPOST(param)
			if(payload){
				this.actList=payload.list
			}
		},
        async getTodayCC(){
            await this.getActList()
            let actIds=isTest?'562834662,558334807,558334904,558334950,558598462,558600290,558600625,562501836':
                            '562900542,562124058,562124134,562124193,562126606,562132958,562133026,562508142'
            if(this.actList.length){
                actIds+=','+this.actList.map(item=>item.actId).join(',')
            }
            let {payload} = await OrderApi.getRewardIntegralNumberUsingPOST(
                {actIds:actIds,beginDate:now,endDate:tom}
            )
            this.todayCC=payload?payload:0
        },
        async getTodaySpendCC(){
            let actIds=isTest?'557230783,557743429,557743488':'562205555,562205608,562205663'
            let {payload} = await OrderApi.getSpendIntegralNumberUsingPOST(
                {actIds:actIds,beginDate:now,endDate:tom}
            )
            this.todaySpendCC=payload?payload:0
        },
        async getChartData(){
             let {payload} = await AssetApi.getUserCreditByMerchantIdUsingPOST(
                {merchantId:this.merchantId}
            )
            if(payload){
                let xiaohao =  payload.accumulatedCredit-(payload.useableCredit?payload.useableCredit:0)-(payload.expiredAmount?payload.expiredAmount:0)
                this.chartData=[{name:'剩余可用',value:payload.useableCredit?payload.useableCredit:0},
                                {name:'过期',value:payload.expiredAmount?payload.expiredAmount:0},
                                {name:'消耗',value: xiaohao},
                                ]
                this.chartData.forEach(item=>{
                    item.name=item.name+':'+item.value+' ('+(item.value*100/payload.accumulatedCredit).toFixed(2)+'%)'
                })
                this.fafang=payload.accumulatedCredit
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.page-base{
    .content{
        width:900px;
        font-size:20px;
        li{
            padding:10px;
            box-sizing: border-box;
            .title{
                text-align:center;
            }
            .sta{
                p{
                    display:inline-block;
                    width:45%;                    
                }
            }
            border:1px solid #e4e4e4;
            width:100%;
            list-style:none;
            &:first-child{
                height:200px;
                margin-bottom:10px;
            }
            text-align:center;
            #chart{
                width:900px;
                min-width:450px;
                height:350px;
            }
        }
    }
}
</style>