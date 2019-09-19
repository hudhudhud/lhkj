<template>
<section class="gzjh-page">
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
			  </el-form-item>
		</el-form>
	</LayoutSearch>
	<el-collapse v-model='activeNames'>
		<el-collapse-item title="幸运有鲤" name="1">
				<ul>
					<li>
						<el-form  :inline="true">
								<!-- <el-form-item label="支付状态">
									<el-select v-model='searchFormOther.getOrderNumber.paymentState' placeholder="请选择支付状态">
											<el-option v-for='(item,i) in paymentStateList' :key="item.value"
										:label="item.name"
										:value="item.value"></el-option>
									</el-select>
								</el-form-item> -->
								<el-form-item>
										<el-button @click='getData("getOrderNumber")' :loading='loading.getOrderNumber'>查询</el-button>
										<span>参与购买笔数：{{result.getOrderNumber}}</span>
								</el-form-item>
						</el-form>
					</li>
					<li>
						<el-form  :inline="true">
								<!-- <el-form-item label="支付状态">
									<el-select v-model='searchFormOther.getCustomNumber.paymentState' placeholder="请选择支付状态">
											<el-option v-for='(item,i) in paymentStateList' :key="item.value"
										:label="item.name"
										:value="item.value"></el-option>
									</el-select>
								</el-form-item> -->
								<el-form-item>
									<el-button @click='getData("getCustomNumber")' :loading='loading.getCustomNumber'>查询</el-button>
									<span>参与购买人数：{{result.getCustomNumber}}</span>
								</el-form-item>
						</el-form>
					</li>
					<li>
						<el-button @click='getData("getInviteSuccessNumber","act")' :loading='loading.getInviteSuccessNumber'>查询</el-button>
						<span>转发邀请（成功）人数：{{result.getInviteSuccessNumber}}</span>
					</li>
					<li>
						<el-button @click='getData("getTurnIntoDragonNumber","act")' :loading='loading.getTurnIntoDragonNumber'>查询</el-button>
						<span>化龙人数：{{result.getTurnIntoDragonNumber}}</span>
					</li>
					<li>
						<el-button @click='getData("getRewardIntegralNumber_yq")'  :loading='loading.getRewardIntegralNumber_yq'>查询</el-button>
						<span>邀请发放CC币数量：{{result.getRewardIntegralNumber_yq}}</span>
					</li>
					<li>
						<el-button @click='getData("getRewardIntegralNumber_mr")' :loading='loading.getRewardIntegralNumber_mr'>查询</el-button>
						<span>每日泡泡CC币数量：{{result.getRewardIntegralNumber_mr}}</span>
					</li>
					<li>
						<el-button @click='getData("getRewardIntegralNumber_hl")' :loading='loading.getRewardIntegralNumber_hl'>查询</el-button>
						<span>化龙发放CC币数量：{{result.getRewardIntegralNumber_hl}}</span>
					</li>
				</ul>
		</el-collapse-item>
		<el-collapse-item title="答一答" name="2">
			<ul>
				<li>
						<el-form  :inline="true">
								<el-form-item label="活动">
									<el-select v-model='searchFormOther.getCustomNumber_dt.actId' filterable>
										  <el-option value='' label='全部'></el-option>
											<el-option v-for='(item,i) in actList' :key='i' :value='item.actId' :label='item.actName'></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
										<el-button @click='getData("getCustomNumber_dt")' :loading='loading.getCustomNumber_dt'>查询</el-button>
										<span>答题人数：{{result.getCustomNumber_dt}}</span>
								</el-form-item>
						</el-form>
				</li>
				<li>
					<el-button @click='getData("getCustomNumber_zf")' :loading='loading.getCustomNumber_zf'>查询</el-button>
					<span>转发人数：{{result.getCustomNumber_zf}}</span>
				</li>
				<li>
						<el-form  :inline="true">
								<el-form-item label="活动">
									<el-select v-model='searchFormOther.getRewardIntegralNumber_dt.actId' filterable>
										  <el-option value='' label='全部'></el-option>
											<el-option v-for='(item,i) in actList' :key='i' :value='item.actId' :label='item.actName'></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button @click='getData("getRewardIntegralNumber_dt")' :loading='loading.getRewardIntegralNumber_dt'>查询</el-button>
									<span>答题奖励cc币数量：{{result.getRewardIntegralNumber_dt}}</span>
							  </el-form-item>
						</el-form>
				</li>
				<li>
					<el-button @click='getData("getRewardIntegralNumber_zf")' :loading='loading.getRewardIntegralNumber_zf'>查询</el-button>
					<span>转发奖励cc币数量：{{result.getRewardIntegralNumber_zf}}</span>
				</li>
			</ul>
		</el-collapse-item>
		<el-collapse-item title="趣味打卡" name="3">
			<ul>
				<li>
					<el-button @click='getData("getCustomNumber_dk")' :loading='loading.getCustomNumber_dk'>查询</el-button>
					<span>打卡人数：{{result.getCustomNumber_dk}}</span>
				</li>
				<li>
					<el-button @click='getData("getOrderNumber_ff")' :loading='loading.getOrderNumber_ff'>查询</el-button>
					<span>发放滴滴券数量：{{result.getOrderNumber_ff}}</span>
				</li>
			</ul>
		</el-collapse-item>
		<el-collapse-item title="CC币商城" name="4">
			<p>汇总</p>
			<ul>
				<li>
					<el-button @click='getData("getOrderNumber_xhbs1")' :loading='loading.getOrderNumber_xhbs1'>查询</el-button>
					<span>消耗CC币总笔数：{{result.getOrderNumber_xhbs1}}</span>
				</li>
				<li>
					<el-button @click='getData("getCustomNumber_xhrs1")' :loading='loading.getCustomNumber_xhrs1'>查询</el-button>
					<span>消耗CC币总人数：{{result.getCustomNumber_xhrs1}}</span>
				</li>
				<li>
					<el-button @click='getData("getSpendIntegralNumber_xhsl1")' :loading='loading.getSpendIntegralNumber_xhsl1'>查询</el-button>
					<span>消耗CC币总数量：{{result.getSpendIntegralNumber_xhsl1}}</span>
				</li>
			</ul>	
			<p>券</p>
			<ul>
				<li>
						<el-form  :inline="true">
							<el-form-item label="规格">
								<el-select v-model='searchFormOther.getOrderNumber_xhbs2.proStandardId' filterable>
										<el-option value='' label='全部'></el-option>
										<el-option v-for='(item,i) in standardList.one' :key='i' :value='item.id' :label='item.standardName'></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button @click='getData("getOrderNumber_xhbs2")' :loading='loading.getOrderNumber_xhbs2'>查询</el-button>
								<span>消耗CC币笔数：{{result.getOrderNumber_xhbs2}}</span>
							</el-form-item>
						</el-form>
				</li>
				<li>
					<el-form  :inline="true">
							<el-form-item label="规格">
								<el-select v-model='searchFormOther.getCustomNumber_xhrs2.proStandardId' filterable>
										<el-option value='' label='全部'></el-option>
										<el-option v-for='(item,i) in standardList.two' :key='i' :value='item.id' :label='item.standardName'></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button @click='getData("getCustomNumber_xhrs2")' :loading='loading.getCustomNumber_xhrs2'>查询</el-button>
								<span>消耗CC币总人数：{{result.getCustomNumber_xhrs2}}</span>
							</el-form-item>
						</el-form>
				</li>
				<li>
					<el-form  :inline="true">
							<el-form-item label="规格">
								<el-select v-model='searchFormOther.getSpendIntegralNumber_xhsl2.proStandardId' filterable>
										<el-option value='' label='全部'></el-option>
										<el-option v-for='(item,i) in standardList.three' :key='i' :value='item.id' :label='item.standardName'></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button @click='getData("getSpendIntegralNumber_xhsl2")' :loading='loading.getSpendIntegralNumber_xhsl2'>查询</el-button>
								<span>消耗CC币总数量：{{result.getSpendIntegralNumber_xhsl2}}</span>
					</el-form-item>
						</el-form>
				</li>
			</ul>
		</el-collapse-item>
</el-collapse>
</section>
</template>
<script>
import moment from 'moment'
import {ActivityApi,ProductApi,OrderApi} from '@/api'
import  LayoutSearch from '@/components/layout/LayoutSearch'
import ActTemplateResponse from '../../api/modules/ActTemplateResponse';

const isTest=process.env.VUE_APP_PUBLISH_ENV !== 'prod'

export default {
    components:{
        LayoutSearch,
    },
    data(){
        return {
			activeNames:["1","2","3","4"],
			searchForm:{
				beginDate:moment().startOf('month').format('YYYY-MM-DD'),
				endDate:moment().endOf('month').format('YYYY-MM-DD'),
			},
			searchFormOther:{
				getOrderNumber:{paymentState:2},
				getCustomNumber:{paymentState:2},
				getCustomNumber_dt:{actId:''},
				getRewardIntegralNumber_dt:{actId:''},
				getOrderNumber_xhbs2:{proStandardId:''},
				getCustomNumber_xhrs2:{proStandardId:''},
				getSpendIntegralNumber_xhsl2:{proStandardId:''},
			},
			actList:[],
			standardList:{
				one:[],
				two:[],
				three:[],
			},
			paymentStateList:[
				{name:'全部',value:''},
				{name:'未支付',value:1},
				{name:'已支付',value:2},
				{name:'退款中',value:3},
				{name:'退款完成',value:4},
				{name:'超时支付(待退款)',value:5},
			],

			actIds:{
				getOrderNumber:isTest?'558062966':'562123052',//（鲤鱼荷塘-抽奖-送鱼活动id）
				getCustomNumber:isTest?'558062966':'562123052',//(鲤鱼荷塘-抽奖-送鱼活动id)
				getInviteSuccessNumber:isTest?'558598462,558600290,558600625':'562126606,562132958,562133026',//（锦鲤分享送CC币、金鲤分享送CC币、龙鲤分享送CC币）
				getTurnIntoDragonNumber:isTest?'558334950':'562124193',//（龙鲤抽奖活动id）
				getRewardIntegralNumber_yq:isTest?'558598462,558600290,558600625':'562126606,562132958,562133026',//（锦鲤分享送CC币、金鲤分享送CC币、龙鲤分享送CC币）
				getRewardIntegralNumber_mr:isTest?'558334807,558334904':'562124058,562124134',//(锦鲤抽奖、金鲤抽奖)
				getRewardIntegralNumber_hl:isTest?'558334950':'562124193',//（龙鲤抽奖活动id）
				getCustomNumber_zf:isTest?'562501836':'562508142',//（答一答分享送CC币活动id）
				getRewardIntegralNumber_zf:isTest?'562501836':'562508142',//（答一答分享送CC币活动id）
				getCustomNumber_dk:isTest?'557368025':'562205734',//（签到发薪水活动id）
				getOrderNumber_ff:isTest?'557368025':'562205734',//（签到发薪水活动id）
				getOrderNumber_xhbs1:isTest?'557230783,557743429,557743488':'562205555,562205608,562205663',//（美食、娱乐、旅行活动id）
				getCustomNumber_xhrs1:isTest?'557230783,557743429,557743488':'562205555,562205608,562205663',
				getSpendIntegralNumber_xhsl1:isTest?'557230783,557743429,557743488':'562205555,562205608,562205663',
			},
			result:{
				getOrderNumber:0,
				getCustomNumber:0,
				getInviteSuccessNumber:0,
				getTurnIntoDragonNumber:0,
				getRewardIntegralNumber_yq:0,
				getRewardIntegralNumber_mr:0,
				getRewardIntegralNumber_hl:0,
				getCustomNumber_dt:0,
				getCustomNumber_zf:0,
				getRewardIntegralNumber_dt:0,
				getRewardIntegralNumber_zf:0,
				getCustomNumber_dk:0,
				getOrderNumber_ff:0,
				getOrderNumber_xhbs1:0,
				getCustomNumber_xhrs1:0,
				getSpendIntegralNumber_xhsl1:0,
				getOrderNumber_xhbs2:0,
				getCustomNumber_xhrs2:0,
				getSpendIntegralNumber_xhsl2:0,
			},
			loading:{
				getOrderNumber:false,
				getCustomNumber:false,
				getInviteSuccessNumber:false,
				getTurnIntoDragonNumber:false,
				getRewardIntegralNumber_yq:false,
				getRewardIntegralNumber_mr:false,
				getRewardIntegralNumber_hl:false,
				getCustomNumber_dt:false,
				getCustomNumber_zf:false,
				getRewardIntegralNumber_dt:false,
				getRewardIntegralNumber_zf:false,
				getCustomNumber_dk:false,
				getOrderNumber_ff:false,
				getOrderNumber_xhbs1:false,
				getCustomNumber_xhrs1:false,
				getSpendIntegralNumber_xhsl1:false,
				getOrderNumber_xhbs2:false,
				getCustomNumber_xhrs2:false,
				getSpendIntegralNumber_xhsl2:false,
			}
		}
		},
		async created(){
			this.getActList()
			this.getStandardFood()
			this.getStandardEnt()
			this.getStandardTraval()			
		},
    methods:{
		async getData(name,apiType){
			//确定活动id参数
			if(this.actIds[name]){
					if(this.actIds[name].indexOf(',')>-1){
						this.searchForm.actIds=this.actIds[name]
						delete this.searchForm.actId
					}
					else{
						this.searchForm.actId=this.actIds[name]
						delete this.searchForm.actIds
					}
			}
			//api方法
			let methodName=name
			let apiMethod=null
			if(name.indexOf('_')>-1){
				methodName=name.split('_')[0]
			}
			methodName=methodName+'UsingPOST'
			if(apiType==='act'){
				apiMethod=ActivityApi[methodName]
				if(!apiMethod){
					this.$message.error(`未找到api方法：`+methodName)
					return 
				}
			}
			else {
				apiMethod=OrderApi[methodName]
				if(!apiMethod){
					this.$message.error(`未找到api方法：`+methodName)
					return 
				}
			}
			//查询参数
			let param={...this.searchForm}
			if(this.searchFormOther[name]){
				Object.assign(param,this.searchFormOther[name])
			}				
			//答一答 如果活动选了所有，则查全部
			if(name==='getCustomNumber_dt'&&!this.searchFormOther[name].actId){
				param.actIds=this.actList.map(item=>item.actId).join(',')
				delete param.actId
			}
			if(name==='getRewardIntegralNumber_dt'&&!this.searchFormOther[name].actId){
				param.actIds=this.actList.map(item=>item.actId).join(',')
				delete param.actId
			}
			//cc币 券 规格
			if(name==='getOrderNumber_xhbs2'&&!this.searchFormOther[name].proStandardId){
				param.proStandardIds=this.standardList.one.map(item=>item.id).join(',')
				delete param.proStandardId
			}
			if(name==='getCustomNumber_xhrs2'&&!this.searchFormOther[name].proStandardId){
				param.proStandardIds=this.standardList.two.map(item=>item.id).join(',')
				delete param.proStandardId
			}
			if(name==='getSpendIntegralNumber_xhsl2'&&!this.searchFormOther[name].proStandardId){
				param.proStandardIds=this.standardList.three.map(item=>item.id).join(',')
				delete param.proStandardId
			}
			//调用接口
			this.loading[name]=true
			let {payload} = await apiMethod(param)
			this.result[name]=payload?payload:0
			this.loading[name]=false
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
		//获取美食活动规格
		async getStandardFood(){
				let param = {
				"actId":isTest?557230783:562205555,
				"proId":isTest?748:1501,
				"standardStatus":"1"
			}
			let {payload}=await ProductApi.getStandardUsingPOST(param)
			if(payload){
				this.standardList.one=payload
			}
		},
		//获取娱乐活动规格
		async getStandardEnt(){
				let param = {
				"actId":isTest?557743429:562205608,
				"proId":isTest?750:1503,
				"standardStatus":"1"
			}
			let {payload}=await ProductApi.getStandardUsingPOST(param)
			if(payload){
				this.standardList.two=payload
			}
		},
		//获取旅行活动规格
		async getStandardTraval(){
				let param = {
				"actId":isTest?557743488:562205555,
				"proId":isTest?751:1501,
				"standardStatus":"1"
			}
			let {payload}=await ProductApi.getStandardUsingPOST(param)
			if(payload){
				this.standardList.three=payload
			}
		},
    }
}
</script>
<style lang='scss'>
.gzjh-page{
	.el-collapse{
		margin:10px;
		ul{
			li{
				height:40px;
				margin-top:10px;
			}
		}
		.el-collapse-item__header{
			font-size:15px;
			padding-left:5px;
			background-color:rgba(0,0,0,0.05)
		}
	}
	.el-button{
		margin-right:10px;
	}
}
</style>

