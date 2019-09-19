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
        <div class="all">
            <div class="left">
                <p class="title">整体参与情况统计</p>
                <div class="sta">
                    <p>参与人数：{{all.joinNum}}</p>
                    <p>分享人数：{{all.shareNum}}</p>
                </div>
            </div>
            <div id='chart'></div>
        </div>
        <ul class='xy clear-fix'>
            <li>
                <p class="title">幸运有鲤活动数据统计</p>
                <div class="sta">
                    <p>参与购买笔数：{{luck.buyNum}}</p>
                    <p>参与购买人数：{{luck.buyManNum}}</p>
                    <p>邀请成功人数：{{luck.shareNum}}</p>
                    <p>化龙人数：{{luck.dragonNum}}</p>
                </div>
            </li>
            <li class='right'>
                <div class='top'>
                    <p class="title">趣味打卡活动数据统计</p>
                    <div class="sta">
                        <p>参与打卡人数：{{qw.cardNum}}</p>
                    </div>                                              
                </div>
                <div>
                    <p class="title">答一答活动数据统计</p>
                    <div class="sta">
                        <p>参与答题人数：{{da.joinNum}}</p>
                        <p>转发人数:{{da.shareNum}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import {AssetApi,CustomApi,OrderApi,ActivityApi} from '@/api'
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
                joinNum:0,
                shareNum:0,
            },
            luck:{
                buyNum:0,
                buyManNum:0,
                shareNum:0,
                dragonNum:0
            },
            qw:{
                cardNum:0,
            },
            da:{
                joinNum:0,
                shareNum:0,
            },
        }
    },
    async mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            this.all.shareNum=0
            this.all.joinNum=0
            this.getByNum()
            this.getShareNum()
            this.getDragonNum()
            this.echartInit()

            await this.getActList()
            this.getDaJoinNum()
            this.getDaShareNum()
        },
        async echartInit(){
            await this.getBuyManNum()
            await this.getCardNum()
            let myChart = echarts.init(document.getElementById('chart'));
            let option={
                   title : {
                    text: '参与人数',
                    padding:20,
                    textStyle:{
                        fontSize:'20',
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['幸运有鲤','答一答', '趣味打卡']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [this.luck.buyManNum,this.da.joinNum,this.qw.cardNum],
                    type: 'bar'
                }]
            }
            myChart.setOption(option)
        },
        async getByNum(){
            let {payload} = await OrderApi.getOrderNumberUsingPOST(
                {
                    actId:isTest?'565236317':'565593704',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                    paymentState:2,//已支付
                    proType:3,//（抽奖）
                }
            )
            this.luck.buyNum=payload?payload:0
        },
        async getBuyManNum(){
            let {payload} = await OrderApi.getCustomNumberUsingPOST(
                {
                    actId:isTest?'565236317':'565593704',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                    paymentState:2,//已支付
                }
            )
            this.luck.buyManNum=payload?payload:0
            this.all.joinNum+=this.luck.buyManNum
        },
        async getShareNum(){
            let {payload} = await ActivityApi.getInviteSuccessNumberUsingPOST(
                {
                    actIds:isTest?'565236317':'565593704',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.luck.shareNum=payload?payload:0
            this.all.shareNum+=this.luck.shareNum
        },
        async getDragonNum(){
            let {payload} = await ActivityApi.getTurnIntoDragonNumberUsingPOST(
                {
                    actIds:isTest?'558334807,558334904,558334950':'562124058,562124134,562124193',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.luck.dragonNum=payload?payload:0
        },
        async getCardNum(){
            let {payload} = await OrderApi.getCustomNumberUsingPOST(
                {
                    actId:isTest?'557368025':'562205734',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.qw.cardNum=payload?payload:0
            this.all.joinNum+=this.qw.cardNum
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
        async getDaJoinNum(){
            let actIds = this.actList.map(item=>item.actId).join(',')
            let {payload} = await OrderApi.getCustomNumberUsingPOST(
                {
                    actIds:actIds,
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.da.joinNum=payload?payload:0
            this.all.joinNum+=this.da.joinNum
        },
        async getDaShareNum(){
            let {payload} = await OrderApi.getCustomNumberUsingPOST(
                {
                    actId:isTest?'562501836':'562508142',
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,
                }
            )
            this.da.shareNum=payload?payload:0
            this.all.shareNum+=this.da.shareNum
        }
    }
}
</script>
<style scoped lang='scss'>
.page-award{
    padding:10px;
    box-sizing:border-box;
    font-size:20px;
    .all{
        border:1px solid #e4e4e4;
        width:920px;
        height:330px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        box-sizing: border-box;
        margin-right:10px;
        .left{
            margin-left:80px;
        }
        #chart{
            min-width:450px;
            height:300px;
        }
    }
    ul{
        text-align: center;
        margin:0;
        padding:0;
        margin-top:10px;
        li{
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
            width:450px;
            list-style:none;
            float:left;
            margin-right:20px;
            height:250px;
            &.right{
                border:none;
                >div{
                    border:1px solid #e4e4e4;
                    height:120px;
                    &.top{
                        margin-bottom:10px;
                    }
                }
            }
        }
    }
    .clear-fix:after{
        content:'';
        display:block;
        clear:both;
    }
}

</style>