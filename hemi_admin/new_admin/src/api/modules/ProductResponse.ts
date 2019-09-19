import Pager from "../base/Pager";
import ProductStandardResponse from "./ProductStandardResponse";

/**
 * 作者没有写注释!!!
 */
export default class ProductResponse {

    /**
     * 作者没写注释!!
     */
    public accountName!: string;

    /**
     * 作者没写注释!!
     */
    public accountPattern!: string;

    /**
     * 作者没写注释!!
     */
    public actId!: number;

    /**
     * 作者没写注释!!
     */
    public actType!: number;

    /**
     * 作者没写注释!!
     */
    public baseProId!: number;

    /**
     * 作者没写注释!!
     */
    public baseStandardCode!: string;

    /**
     * 作者没写注释!!
     */
    public couponLimitPrice!: any;

    /**
     * 作者没写注释!!
     */
    public createdAt!: string;

    /**
     * 作者没写注释!!
     */
    public createdBy!: number;

    /**
     * 作者没写注释!!
     */
    public creditTypeId!: number;

    /**
     * 作者没写注释!!
     */
    public creditValue!: number;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 作者没写注释!!
     */
    public currentPrice!: any;

    /**
     * 作者没写注释!!
     */
    public defStandardId!: number;

    /**
     * 作者没写注释!!
     */
    public fishCost!: any;

    /**
     * 作者没写注释!!
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public integralNum!: number;

    /**
     * 作者没写注释!!
     */
    public isCoupon!: number;

    /**
     * 作者没写注释!!
     */
    public isDeleted!: string;

    /**
     * 作者没写注释!!
     */
    public isOpenRecharge!: number;

    /**
     * 作者没写注释!!
     */
    public isSms!: string;

    /**
     * 作者没写注释!!
     */
    public limitPerTime!: number;

    /**
     * 作者没写注释!!
     */
    public limitTotal!: number;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 作者没写注释!!
     */
    public merchantPrice!: any;

    /**
     * 作者没写注释!!
     */
    public minChangeThirdPrice!: any;

    /**
     * 作者没写注释!!
     */
    public originalPrice!: any;

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
    public proCreditExtendId!: number;

    /**
     * 作者没写注释!!
     */
    public proDescript!: string;

    /**
     * 作者没写注释!!
     */
    public proDetails!: string;

    /**
     * 作者没写注释!!
     */
    public proHomeImgUrl!: string;

    /**
     * 作者没写注释!!
     */
    public proIconUrl!: string;

    /**
     * 作者没写注释!!
     */
    public proId!: number;

    /**
     * 作者没写注释!!
     */
    public proName!: string;

    /**
     * 作者没写注释!!
     */
    public proSort!: string;

    /**
     * 作者没写注释!!
     */
    public proStatus!: string;

    /**
     * 作者没写注释!!
     */
    public proType!: string;

    /**
     * 作者没写注释!!
     */
    public productStandardResponseList!: ProductStandardResponse[];

    /**
     * 作者没写注释!!
     */
    public riskReturnMsg!: string;

    /**
     * 作者没写注释!!
     */
    public riskStatus!: number;

    /**
     * 作者没写注释!!
     */
    public staSord!: string;

    /**
     * 作者没写注释!!
     */
    public standardActUrl!: string;

    /**
     * 作者没写注释!!
     */
    public standardId!: number;

    /**
     * 作者没写注释!!
     */
    public standardImgUrl!: string;

    /**
     * 作者没写注释!!
     */
    public standardInstruction!: string;

    /**
     * 作者没写注释!!
     */
    public standardName!: string;

    /**
     * 作者没写注释!!
     */
    public standardPrompt!: string;

    /**
     * 作者没写注释!!
     */
    public standardStatus!: string;

    /**
     * 作者没写注释!!
     */
    public thirdChangePartStandardId!: string;

    /**
     * 作者没写注释!!
     */
    public thirdPartStandardId!: string;

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
    public usedTotal!: number;

    /**
     * 作者没写注释!!
     */
    public valuationType!: number;


    constructor(options?:any){
        
        if(options&&options['accountName']){
            this.accountName=options['accountName'];
        }
        else{
            this.accountName=undefined
        }
    
        if(options&&options['accountPattern']){
            this.accountPattern=options['accountPattern'];
        }
        else{
            this.accountPattern=undefined
        }
    
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['actType']){
            this.actType=options['actType'];
        }
        else{
            this.actType=undefined
        }
    
        if(options&&options['baseProId']){
            this.baseProId=options['baseProId'];
        }
        else{
            this.baseProId=undefined
        }
    
        if(options&&options['baseStandardCode']){
            this.baseStandardCode=options['baseStandardCode'];
        }
        else{
            this.baseStandardCode=undefined
        }
    
        if(options&&options['couponLimitPrice']){
            this.couponLimitPrice=options['couponLimitPrice'];
        }
        else{
            this.couponLimitPrice=undefined
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
    
        if(options&&options['creditTypeId']){
            this.creditTypeId=options['creditTypeId'];
        }
        else{
            this.creditTypeId=undefined
        }
    
        if(options&&options['creditValue']){
            this.creditValue=options['creditValue'];
        }
        else{
            this.creditValue=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['currentPrice']){
            this.currentPrice=options['currentPrice'];
        }
        else{
            this.currentPrice=undefined
        }
    
        if(options&&options['defStandardId']){
            this.defStandardId=options['defStandardId'];
        }
        else{
            this.defStandardId=undefined
        }
    
        if(options&&options['fishCost']){
            this.fishCost=options['fishCost'];
        }
        else{
            this.fishCost=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['integralNum']){
            this.integralNum=options['integralNum'];
        }
        else{
            this.integralNum=undefined
        }
    
        if(options&&options['isCoupon']){
            this.isCoupon=options['isCoupon'];
        }
        else{
            this.isCoupon=undefined
        }
    
        if(options&&options['isDeleted']){
            this.isDeleted=options['isDeleted'];
        }
        else{
            this.isDeleted=undefined
        }
    
        if(options&&options['isOpenRecharge']){
            this.isOpenRecharge=options['isOpenRecharge'];
        }
        else{
            this.isOpenRecharge=undefined
        }
    
        if(options&&options['isSms']){
            this.isSms=options['isSms'];
        }
        else{
            this.isSms=undefined
        }
    
        if(options&&options['limitPerTime']){
            this.limitPerTime=options['limitPerTime'];
        }
        else{
            this.limitPerTime=undefined
        }
    
        if(options&&options['limitTotal']){
            this.limitTotal=options['limitTotal'];
        }
        else{
            this.limitTotal=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['merchantPrice']){
            this.merchantPrice=options['merchantPrice'];
        }
        else{
            this.merchantPrice=undefined
        }
    
        if(options&&options['minChangeThirdPrice']){
            this.minChangeThirdPrice=options['minChangeThirdPrice'];
        }
        else{
            this.minChangeThirdPrice=undefined
        }
    
        if(options&&options['originalPrice']){
            this.originalPrice=options['originalPrice'];
        }
        else{
            this.originalPrice=undefined
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
    
        if(options&&options['proCreditExtendId']){
            this.proCreditExtendId=options['proCreditExtendId'];
        }
        else{
            this.proCreditExtendId=undefined
        }
    
        if(options&&options['proDescript']){
            this.proDescript=options['proDescript'];
        }
        else{
            this.proDescript=undefined
        }
    
        if(options&&options['proDetails']){
            this.proDetails=options['proDetails'];
        }
        else{
            this.proDetails=undefined
        }
    
        if(options&&options['proHomeImgUrl']){
            this.proHomeImgUrl=options['proHomeImgUrl'];
        }
        else{
            this.proHomeImgUrl=undefined
        }
    
        if(options&&options['proIconUrl']){
            this.proIconUrl=options['proIconUrl'];
        }
        else{
            this.proIconUrl=undefined
        }
    
        if(options&&options['proId']){
            this.proId=options['proId'];
        }
        else{
            this.proId=undefined
        }
    
        if(options&&options['proName']){
            this.proName=options['proName'];
        }
        else{
            this.proName=undefined
        }
    
        if(options&&options['proSort']){
            this.proSort=options['proSort'];
        }
        else{
            this.proSort=undefined
        }
    
        if(options&&options['proStatus']){
            this.proStatus=options['proStatus'];
        }
        else{
            this.proStatus=undefined
        }
    
        if(options&&options['proType']){
            this.proType=options['proType'];
        }
        else{
            this.proType=undefined
        }
    
        if(options&&options['productStandardResponseList']){
            this.productStandardResponseList=options['productStandardResponseList'];
        }
        else{
            this.productStandardResponseList=undefined
        }
    
        if(options&&options['riskReturnMsg']){
            this.riskReturnMsg=options['riskReturnMsg'];
        }
        else{
            this.riskReturnMsg=undefined
        }
    
        if(options&&options['riskStatus']){
            this.riskStatus=options['riskStatus'];
        }
        else{
            this.riskStatus=undefined
        }
    
        if(options&&options['staSord']){
            this.staSord=options['staSord'];
        }
        else{
            this.staSord=undefined
        }
    
        if(options&&options['standardActUrl']){
            this.standardActUrl=options['standardActUrl'];
        }
        else{
            this.standardActUrl=undefined
        }
    
        if(options&&options['standardId']){
            this.standardId=options['standardId'];
        }
        else{
            this.standardId=undefined
        }
    
        if(options&&options['standardImgUrl']){
            this.standardImgUrl=options['standardImgUrl'];
        }
        else{
            this.standardImgUrl=undefined
        }
    
        if(options&&options['standardInstruction']){
            this.standardInstruction=options['standardInstruction'];
        }
        else{
            this.standardInstruction=undefined
        }
    
        if(options&&options['standardName']){
            this.standardName=options['standardName'];
        }
        else{
            this.standardName=undefined
        }
    
        if(options&&options['standardPrompt']){
            this.standardPrompt=options['standardPrompt'];
        }
        else{
            this.standardPrompt=undefined
        }
    
        if(options&&options['standardStatus']){
            this.standardStatus=options['standardStatus'];
        }
        else{
            this.standardStatus=undefined
        }
    
        if(options&&options['thirdChangePartStandardId']){
            this.thirdChangePartStandardId=options['thirdChangePartStandardId'];
        }
        else{
            this.thirdChangePartStandardId=undefined
        }
    
        if(options&&options['thirdPartStandardId']){
            this.thirdPartStandardId=options['thirdPartStandardId'];
        }
        else{
            this.thirdPartStandardId=undefined
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
    
        if(options&&options['usedTotal']){
            this.usedTotal=options['usedTotal'];
        }
        else{
            this.usedTotal=undefined
        }
    
        if(options&&options['valuationType']){
            this.valuationType=options['valuationType'];
        }
        else{
            this.valuationType=undefined
        }
    
    }
}
