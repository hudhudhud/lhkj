import Pager from "../base/Pager";
import ActTypeBo from "./ActTypeBo";

/**
 * 作者没有写注释!!!
 */
export default class ActivityBo {

    /**
     * 作者没写注释!!
     */
    public actIcon!: string;

    /**
     * 作者没写注释!!
     */
    public actId!: number;

    /**
     * 作者没写注释!!
     */
    public actJoinNum!: number;

    /**
     * 作者没写注释!!
     */
    public actName!: string;

    /**
     * 作者没写注释!!
     */
    public actStatus!: string;

    /**
     * 作者没写注释!!
     */
    public actTemplate!: string;

    /**
     * 作者没写注释!!
     */
    public actType!: string;

    /**
     * 作者没写注释!!
     */
    public activityList!: ActTypeBo[];

    /**
     * 作者没写注释!!
     */
    public checkLogin!: number;

    /**
     * 作者没写注释!!
     */
    public createdAt!: string;

    /**
     * 作者没写注释!!
     */
    public createdBy!: number;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 作者没写注释!!
     */
    public deletedAt!: string;

    /**
     * 作者没写注释!!
     */
    public deletedBy!: number;

    /**
     * 作者没写注释!!
     */
    public detail!: string;

    /**
     * 作者没写注释!!
     */
    public endTime!: string;

    /**
     * 作者没写注释!!
     */
    public endTimeStr!: string;

    /**
     * 作者没写注释!!
     */
    public fullScreen!: number;

    /**
     * 作者没写注释!!
     */
    public highestPrice!: any;

    /**
     * 作者没写注释!!
     */
    public isDeleted!: string;

    /**
     * 作者没写注释!!
     */
    public isFirstOrder!: number;

    /**
     * 作者没写注释!!
     */
    public isRefund!: number;

    /**
     * 作者没写注释!!
     */
    public isShow!: number;

    /**
     * 作者没写注释!!
     */
    public isWhite!: string;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 作者没写注释!!
     */
    public lowestPrice!: any;

    /**
     * 作者没写注释!!
     */
    public maxBuyNum!: number;

    /**
     * 作者没写注释!!
     */
    public maxIntegralNum!: number;

    /**
     * 作者没写注释!!
     */
    public merchantId!: number;

    /**
     * 作者没写注释!!
     */
    public merchantList!: string[];

    /**
     * 作者没写注释!!
     */
    public minIntegralNum!: number;

    /**
     * 作者没写注释!!
     */
    public nonDefaultTotal!: number;

    /**
     * 作者没写注释!!
     */
    public overTime!: string;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 作者没写注释!!
     */
    public payTypes!: string;

    /**
     * 作者没写注释!!
     */
    public projectId!: number;

    /**
     * 作者没写注释!!
     */
    public refundRatio!: any;

    /**
     * 作者没写注释!!
     */
    public remarks!: string;

    /**
     * 作者没写注释!!
     */
    public riskStatus!: number;

    /**
     * 作者没写注释!!
     */
    public startTime!: string;

    /**
     * 作者没写注释!!
     */
    public startTimeStr!: string;

    /**
     * 作者没写注释!!
     */
    public templateConfig!: string;

    /**
     * 总条数
     */
    public totalCount!: number;

    /**
     * 作者没写注释!!
     */
    public updatedAt!: string;

    /**
     * 作者没写注释!!
     */
    public updatedBy!: string;

    /**
     * 作者没写注释!!
     */
    public valuationType!: number;

    /**
     * 作者没写注释!!
     */
    public whiteIds!: string;

    /**
     * 作者没写注释!!
     */
    public whiteLimitType!: number;

    /**
     * 作者没写注释!!
     */
    public whiteReturnMsg!: string;


    constructor(options?:any){
        
        if(options&&options['actIcon']){
            this.actIcon=options['actIcon'];
        }
        else{
            this.actIcon=undefined
        }
    
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
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
    
        if(options&&options['activityList']){
            this.activityList=options['activityList'];
        }
        else{
            this.activityList=undefined
        }
    
        if(options&&options['checkLogin']){
            this.checkLogin=options['checkLogin'];
        }
        else{
            this.checkLogin=undefined
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
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
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
    
        if(options&&options['endTimeStr']){
            this.endTimeStr=options['endTimeStr'];
        }
        else{
            this.endTimeStr=undefined
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
    
        if(options&&options['isShow']){
            this.isShow=options['isShow'];
        }
        else{
            this.isShow=undefined
        }
    
        if(options&&options['isWhite']){
            this.isWhite=options['isWhite'];
        }
        else{
            this.isWhite=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
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
    
        if(options&&options['merchantList']){
            this.merchantList=options['merchantList'];
        }
        else{
            this.merchantList=undefined
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
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['payTypes']){
            this.payTypes=options['payTypes'];
        }
        else{
            this.payTypes=undefined
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
    
        if(options&&options['startTimeStr']){
            this.startTimeStr=options['startTimeStr'];
        }
        else{
            this.startTimeStr=undefined
        }
    
        if(options&&options['templateConfig']){
            this.templateConfig=options['templateConfig'];
        }
        else{
            this.templateConfig=undefined
        }
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
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
    
        if(options&&options['whiteReturnMsg']){
            this.whiteReturnMsg=options['whiteReturnMsg'];
        }
        else{
            this.whiteReturnMsg=undefined
        }
    
    }
}
