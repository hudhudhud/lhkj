import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ProductStandardResponse {

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
     * 作者没写注释!!
     */
    public currentPrice!: any;

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
    public expiredTime!: string;

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
    public isHidden!: number;

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
     * 作者没写注释!!
     */
    public merchantPrice!: any;

    /**
     * 作者没写注释!!
     */
    public originalPrice!: any;

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
    public proId!: number;

    /**
     * 作者没写注释!!
     */
    public proType!: string;

    /**
     * 作者没写注释!!
     */
    public relatedStandardId!: number;

    /**
     * 作者没写注释!!
     */
    public repertory!: number;

    /**
     * 作者没写注释!!
     */
    public riskReturnMsg!: string;

    /**
     * 作者没写注释!!
     */
    public standardActUrl!: string;

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
    public standardSort!: string;

    /**
     * 作者没写注释!!
     */
    public standardStatus!: string;

    /**
     * 作者没写注释!!
     */
    public surplusStock!: number;

    /**
     * 作者没写注释!!
     */
    public thirdPartStandardId!: string;

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
    
        if(options&&options['currentPrice']){
            this.currentPrice=options['currentPrice'];
        }
        else{
            this.currentPrice=undefined
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
    
        if(options&&options['expiredTime']){
            this.expiredTime=options['expiredTime'];
        }
        else{
            this.expiredTime=undefined
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
    
        if(options&&options['isHidden']){
            this.isHidden=options['isHidden'];
        }
        else{
            this.isHidden=undefined
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
    
        if(options&&options['merchantPrice']){
            this.merchantPrice=options['merchantPrice'];
        }
        else{
            this.merchantPrice=undefined
        }
    
        if(options&&options['originalPrice']){
            this.originalPrice=options['originalPrice'];
        }
        else{
            this.originalPrice=undefined
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
    
        if(options&&options['proId']){
            this.proId=options['proId'];
        }
        else{
            this.proId=undefined
        }
    
        if(options&&options['proType']){
            this.proType=options['proType'];
        }
        else{
            this.proType=undefined
        }
    
        if(options&&options['relatedStandardId']){
            this.relatedStandardId=options['relatedStandardId'];
        }
        else{
            this.relatedStandardId=undefined
        }
    
        if(options&&options['repertory']){
            this.repertory=options['repertory'];
        }
        else{
            this.repertory=undefined
        }
    
        if(options&&options['riskReturnMsg']){
            this.riskReturnMsg=options['riskReturnMsg'];
        }
        else{
            this.riskReturnMsg=undefined
        }
    
        if(options&&options['standardActUrl']){
            this.standardActUrl=options['standardActUrl'];
        }
        else{
            this.standardActUrl=undefined
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
    
        if(options&&options['standardSort']){
            this.standardSort=options['standardSort'];
        }
        else{
            this.standardSort=undefined
        }
    
        if(options&&options['standardStatus']){
            this.standardStatus=options['standardStatus'];
        }
        else{
            this.standardStatus=undefined
        }
    
        if(options&&options['surplusStock']){
            this.surplusStock=options['surplusStock'];
        }
        else{
            this.surplusStock=undefined
        }
    
        if(options&&options['thirdPartStandardId']){
            this.thirdPartStandardId=options['thirdPartStandardId'];
        }
        else{
            this.thirdPartStandardId=undefined
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
