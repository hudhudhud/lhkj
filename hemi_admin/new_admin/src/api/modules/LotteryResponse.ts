import Pager from "../base/Pager";
import LotteryProbabilitySaveAndUpdateVO from "./LotteryProbabilitySaveAndUpdateVO";

/**
 * 作者没有写注释!!!
 */
export default class LotteryResponse {

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
    public classifyId!: number;

    /**
     * 作者没写注释!!
     */
    public creditIconUrl!: string;

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
    public isDefault!: string;

    /**
     * 作者没写注释!!
     */
    public isFirstOrder!: number;

    /**
     * 作者没写注释!!
     */
    public isHidden!: string;

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
    public lotteryProbabilitySaveAndUpdateVOList!: LotteryProbabilitySaveAndUpdateVO[];

    /**
     * 作者没写注释!!
     */
    public lotterySord!: string;

    /**
     * 作者没写注释!!
     */
    public lotteryStatus!: string;

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
    public overTime!: string;

    /**
     * 作者没写注释!!
     */
    public prizeName!: string;

    /**
     * 作者没写注释!!
     */
    public prizeProbability!: any;

    /**
     * 作者没写注释!!
     */
    public prizeTotal!: number;

    /**
     * 作者没写注释!!
     */
    public proCreditExtendId!: number;

    /**
     * 作者没写注释!!
     */
    public proDesc!: string;

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
    public proType!: string;

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
    public standardPrompt!: string;

    /**
     * 作者没写注释!!
     */
    public usedTotal!: number;


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
    
        if(options&&options['classifyId']){
            this.classifyId=options['classifyId'];
        }
        else{
            this.classifyId=undefined
        }
    
        if(options&&options['creditIconUrl']){
            this.creditIconUrl=options['creditIconUrl'];
        }
        else{
            this.creditIconUrl=undefined
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
    
        if(options&&options['isDefault']){
            this.isDefault=options['isDefault'];
        }
        else{
            this.isDefault=undefined
        }
    
        if(options&&options['isFirstOrder']){
            this.isFirstOrder=options['isFirstOrder'];
        }
        else{
            this.isFirstOrder=undefined
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
    
        if(options&&options['lotteryProbabilitySaveAndUpdateVOList']){
            this.lotteryProbabilitySaveAndUpdateVOList=options['lotteryProbabilitySaveAndUpdateVOList'];
        }
        else{
            this.lotteryProbabilitySaveAndUpdateVOList=undefined
        }
    
        if(options&&options['lotterySord']){
            this.lotterySord=options['lotterySord'];
        }
        else{
            this.lotterySord=undefined
        }
    
        if(options&&options['lotteryStatus']){
            this.lotteryStatus=options['lotteryStatus'];
        }
        else{
            this.lotteryStatus=undefined
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
    
        if(options&&options['overTime']){
            this.overTime=options['overTime'];
        }
        else{
            this.overTime=undefined
        }
    
        if(options&&options['prizeName']){
            this.prizeName=options['prizeName'];
        }
        else{
            this.prizeName=undefined
        }
    
        if(options&&options['prizeProbability']){
            this.prizeProbability=options['prizeProbability'];
        }
        else{
            this.prizeProbability=undefined
        }
    
        if(options&&options['prizeTotal']){
            this.prizeTotal=options['prizeTotal'];
        }
        else{
            this.prizeTotal=undefined
        }
    
        if(options&&options['proCreditExtendId']){
            this.proCreditExtendId=options['proCreditExtendId'];
        }
        else{
            this.proCreditExtendId=undefined
        }
    
        if(options&&options['proDesc']){
            this.proDesc=options['proDesc'];
        }
        else{
            this.proDesc=undefined
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
    
        if(options&&options['proType']){
            this.proType=options['proType'];
        }
        else{
            this.proType=undefined
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
    
        if(options&&options['standardPrompt']){
            this.standardPrompt=options['standardPrompt'];
        }
        else{
            this.standardPrompt=undefined
        }
    
        if(options&&options['usedTotal']){
            this.usedTotal=options['usedTotal'];
        }
        else{
            this.usedTotal=undefined
        }
    
    }
}
