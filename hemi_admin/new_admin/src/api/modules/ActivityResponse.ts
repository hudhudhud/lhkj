import Pager from "../base/Pager";
import ProductResponse from "./ProductResponse";

/**
 * 作者没有写注释!!!
 */
export default class ActivityResponse {

    /**
     * 图标
     */
    public actIcon!: string;

    /**
     * 活动参与次数
     */
    public actJoinNum!: number;

    /**
     * 活动名称
     */
    public actName!: string;

    /**
     * 活动状态 0-下线  1-上线
     */
    public actStatus!: string;

    /**
     * 活动模板编号
     */
    public actTemplate!: string;

    /**
     * 活动类型
     */
    public actType!: string;

    /**
     * 作者没写注释!!
     */
    public activityFriendPicture!: string;

    /**
     * 作者没写注释!!
     */
    public activityFriendUrl!: string;

    /**
     * 活动限制类型 0 进入不限制 1进入判断限制
     */
    public activityLimitType!: number;

    /**
     * 0-关闭检查登录   1-开启检测登录
     */
    public checkLogin!: number;

    /**
     * 下单类型   1-新接口  0-旧接口
     */
    public createOrderType!: number;

    /**
     * 创建时间
     */
    public createdAt!: string;

    /**
     * 创建人
     */
    public createdBy!: number;

    /**
     * 每日是否向订单进行数据传输
     */
    public dataProjectStatus!: number;

    /**
     * 日   例如：1,3,5  多个时间用逗号隔开
     */
    public dateTime!: string;

    /**
     * 删除时间
     */
    public deletedAt!: string;

    /**
     * 删除人
     */
    public deletedBy!: number;

    /**
     * 部门id
     */
    public departmentId!: number;

    /**
     * 活动详情
     */
    public detail!: string;

    /**
     * 活动结束时间
     */
    public endTime!: string;

    /**
     * 0-关闭全屏   1-开启全屏
     */
    public fullScreen!: number;

    /**
     * 抽奖购买最高价格
     */
    public highestPrice!: any;

    /**
     * 活动id
     */
    public id!: number;

    /**
     * 删除状态  0-未删除  1-已删除
     */
    public isDeleted!: string;

    /**
     * 是否抽奖首单  0-否  1-是
     */
    public isFirstOrder!: number;

    /**
     * 退款金额
     */
    public isRefund!: number;

    /**
     * 是否白名单  0-否 1-是
     */
    public isWhite!: number;

    /**
     * 抽奖多种白名单id
     */
    public lotteryWhiteIds!: string;

    /**
     * 抽奖购买最低价格
     */
    public lowestPrice!: any;

    /**
     * 最多购买次数
     */
    public maxBuyNum!: number;

    /**
     * 最大积分数量
     */
    public maxIntegralNum!: number;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 最小积分数量
     */
    public minIntegralNum!: number;

    /**
     * 非默认奖品总量
     */
    public nonDefaultTotal!: number;

    /**
     * 订单过期时间 默认900秒  15分钟
     */
    public overTime!: string;

    /**
     * 支付配置
     */
    public payConfig!: string;

    /**
     * 支付类型
     */
    public payTypes!: string;

    /**
     * 商品列表
     */
    public productResponseList!: ProductResponse[];

    /**
     * 项目id
     */
    public projectId!: number;

    /**
     * 退款比例
     */
    public refundRatio!: any;

    /**
     * 关联actId
     */
    public relationActId!: number;

    /**
     * 备注
     */
    public remarks!: string;

    /**
     * 是否进行风控  0-否   1-是
     */
    public riskStatus!: number;

    /**
     * 活动开始时间
     */
    public startTime!: string;

    /**
     * 活动模板配置
     */
    public templateConfig!: string;

    /**
     * 时间段    例如：08:00-09:00,12:00-14:00,19:00-20:00
     */
    public timeInterval!: string;

    /**
     * 1-绝对时间  2-周  3-月
     */
    public timeType!: string;

    /**
     * 更新时间
     */
    public updatedAt!: string;

    /**
     * 更新人
     */
    public updatedBy!: string;

    /**
     * 计价类型： 1-纯现金 2-纯积分
     */
    public valuationType!: number;

    /**
     * 白名单ids
     */
    public whiteIds!: string;

    /**
     * 白名单限制类型 0活动为准 1白名单为准
     */
    public whiteLimitType!: number;

    /**
     * 白名单主要id
     */
    public whiteMainId!: number;

    /**
     * 白名单返回信息
     */
    public whiteReturnMsg!: string;


    constructor(options?:any){
        
        if(options&&options['actIcon']){
            this.actIcon=options['actIcon'];
        }
        else{
            this.actIcon=undefined
        }
    
        if(options&&options['actJoinNum']){
            this.actJoinNum=options['actJoinNum'];
        }
        else{
            this.actJoinNum=undefined
        }
    
        if(options&&options['actName']){
            this.actName=options['actName'];
        }
        else{
            this.actName=undefined
        }
    
        if(options&&options['actStatus']){
            this.actStatus=options['actStatus'];
        }
        else{
            this.actStatus=undefined
        }
    
        if(options&&options['actTemplate']){
            this.actTemplate=options['actTemplate'];
        }
        else{
            this.actTemplate=undefined
        }
    
        if(options&&options['actType']){
            this.actType=options['actType'];
        }
        else{
            this.actType=undefined
        }
    
        if(options&&options['activityFriendPicture']){
            this.activityFriendPicture=options['activityFriendPicture'];
        }
        else{
            this.activityFriendPicture=undefined
        }
    
        if(options&&options['activityFriendUrl']){
            this.activityFriendUrl=options['activityFriendUrl'];
        }
        else{
            this.activityFriendUrl=undefined
        }
    
        if(options&&options['activityLimitType']){
            this.activityLimitType=options['activityLimitType'];
        }
        else{
            this.activityLimitType=undefined
        }
    
        if(options&&options['checkLogin']){
            this.checkLogin=options['checkLogin'];
        }
        else{
            this.checkLogin=undefined
        }
    
        if(options&&options['createOrderType']){
            this.createOrderType=options['createOrderType'];
        }
        else{
            this.createOrderType=undefined
        }
    
        if(options&&options['createdAt']){
            this.createdAt=options['createdAt'];
        }
        else{
            this.createdAt=undefined
        }
    
        if(options&&options['createdBy']){
            this.createdBy=options['createdBy'];
        }
        else{
            this.createdBy=undefined
        }
    
        if(options&&options['dataProjectStatus']){
            this.dataProjectStatus=options['dataProjectStatus'];
        }
        else{
            this.dataProjectStatus=undefined
        }
    
        if(options&&options['dateTime']){
            this.dateTime=options['dateTime'];
        }
        else{
            this.dateTime=undefined
        }
    
        if(options&&options['deletedAt']){
            this.deletedAt=options['deletedAt'];
        }
        else{
            this.deletedAt=undefined
        }
    
        if(options&&options['deletedBy']){
            this.deletedBy=options['deletedBy'];
        }
        else{
            this.deletedBy=undefined
        }
    
        if(options&&options['departmentId']){
            this.departmentId=options['departmentId'];
        }
        else{
            this.departmentId=undefined
        }
    
        if(options&&options['detail']){
            this.detail=options['detail'];
        }
        else{
            this.detail=undefined
        }
    
        if(options&&options['endTime']){
            this.endTime=options['endTime'];
        }
        else{
            this.endTime=undefined
        }
    
        if(options&&options['fullScreen']){
            this.fullScreen=options['fullScreen'];
        }
        else{
            this.fullScreen=undefined
        }
    
        if(options&&options['highestPrice']){
            this.highestPrice=options['highestPrice'];
        }
        else{
            this.highestPrice=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['isDeleted']){
            this.isDeleted=options['isDeleted'];
        }
        else{
            this.isDeleted=undefined
        }
    
        if(options&&options['isFirstOrder']){
            this.isFirstOrder=options['isFirstOrder'];
        }
        else{
            this.isFirstOrder=undefined
        }
    
        if(options&&options['isRefund']){
            this.isRefund=options['isRefund'];
        }
        else{
            this.isRefund=undefined
        }
    
        if(options&&options['isWhite']){
            this.isWhite=options['isWhite'];
        }
        else{
            this.isWhite=undefined
        }
    
        if(options&&options['lotteryWhiteIds']){
            this.lotteryWhiteIds=options['lotteryWhiteIds'];
        }
        else{
            this.lotteryWhiteIds=undefined
        }
    
        if(options&&options['lowestPrice']){
            this.lowestPrice=options['lowestPrice'];
        }
        else{
            this.lowestPrice=undefined
        }
    
        if(options&&options['maxBuyNum']){
            this.maxBuyNum=options['maxBuyNum'];
        }
        else{
            this.maxBuyNum=undefined
        }
    
        if(options&&options['maxIntegralNum']){
            this.maxIntegralNum=options['maxIntegralNum'];
        }
        else{
            this.maxIntegralNum=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['minIntegralNum']){
            this.minIntegralNum=options['minIntegralNum'];
        }
        else{
            this.minIntegralNum=undefined
        }
    
        if(options&&options['nonDefaultTotal']){
            this.nonDefaultTotal=options['nonDefaultTotal'];
        }
        else{
            this.nonDefaultTotal=undefined
        }
    
        if(options&&options['overTime']){
            this.overTime=options['overTime'];
        }
        else{
            this.overTime=undefined
        }
    
        if(options&&options['payConfig']){
            this.payConfig=options['payConfig'];
        }
        else{
            this.payConfig=undefined
        }
    
        if(options&&options['payTypes']){
            this.payTypes=options['payTypes'];
        }
        else{
            this.payTypes=undefined
        }
    
        if(options&&options['productResponseList']){
            this.productResponseList=options['productResponseList'];
        }
        else{
            this.productResponseList=undefined
        }
    
        if(options&&options['projectId']){
            this.projectId=options['projectId'];
        }
        else{
            this.projectId=undefined
        }
    
        if(options&&options['refundRatio']){
            this.refundRatio=options['refundRatio'];
        }
        else{
            this.refundRatio=undefined
        }
    
        if(options&&options['relationActId']){
            this.relationActId=options['relationActId'];
        }
        else{
            this.relationActId=undefined
        }
    
        if(options&&options['remarks']){
            this.remarks=options['remarks'];
        }
        else{
            this.remarks=undefined
        }
    
        if(options&&options['riskStatus']){
            this.riskStatus=options['riskStatus'];
        }
        else{
            this.riskStatus=undefined
        }
    
        if(options&&options['startTime']){
            this.startTime=options['startTime'];
        }
        else{
            this.startTime=undefined
        }
    
        if(options&&options['templateConfig']){
            this.templateConfig=options['templateConfig'];
        }
        else{
            this.templateConfig=undefined
        }
    
        if(options&&options['timeInterval']){
            this.timeInterval=options['timeInterval'];
        }
        else{
            this.timeInterval=undefined
        }
    
        if(options&&options['timeType']){
            this.timeType=options['timeType'];
        }
        else{
            this.timeType=undefined
        }
    
        if(options&&options['updatedAt']){
            this.updatedAt=options['updatedAt'];
        }
        else{
            this.updatedAt=undefined
        }
    
        if(options&&options['updatedBy']){
            this.updatedBy=options['updatedBy'];
        }
        else{
            this.updatedBy=undefined
        }
    
        if(options&&options['valuationType']){
            this.valuationType=options['valuationType'];
        }
        else{
            this.valuationType=undefined
        }
    
        if(options&&options['whiteIds']){
            this.whiteIds=options['whiteIds'];
        }
        else{
            this.whiteIds=undefined
        }
    
        if(options&&options['whiteLimitType']){
            this.whiteLimitType=options['whiteLimitType'];
        }
        else{
            this.whiteLimitType=undefined
        }
    
        if(options&&options['whiteMainId']){
            this.whiteMainId=options['whiteMainId'];
        }
        else{
            this.whiteMainId=undefined
        }
    
        if(options&&options['whiteReturnMsg']){
            this.whiteReturnMsg=options['whiteReturnMsg'];
        }
        else{
            this.whiteReturnMsg=undefined
        }
    
    }
}
