import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OrderSearchVo {

    /**
     * 作者没写注释!!
     */
    public actId!: string;

    /**
     * 作者没写注释!!
     */
    public actList!: string[];

    /**
     * 作者没写注释!!
     */
    public begdate!: string;

    /**
     * 作者没写注释!!
     */
    public couponNumber!: string;

    /**
     * 作者没写注释!!
     */
    public couponStatus!: string;

    /**
     * 作者没写注释!!
     */
    public creditType!: string;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 作者没写注释!!
     */
    public customId!: string;

    /**
     * 作者没写注释!!
     */
    public enddate!: string;

    /**
     * 作者没写注释!!
     */
    public fishState!: string;

    /**
     * 作者没写注释!!
     */
    public highFailNum!: string;

    /**
     * 作者没写注释!!
     */
    public isFreeze!: string;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 作者没写注释!!
     */
    public lowFailNum!: string;

    /**
     * 作者没写注释!!
     */
    public merchantId!: string;

    /**
     * 作者没写注释!!
     */
    public merchantList!: string[];

    /**
     * 作者没写注释!!
     */
    public orderCode!: string;

    /**
     * 作者没写注释!!
     */
    public orderState!: string;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 作者没写注释!!
     */
    public payState!: string;

    /**
     * 作者没写注释!!
     */
    public proId!: string;

    /**
     * 作者没写注释!!
     */
    public proList!: string[];

    /**
     * 作者没写注释!!
     */
    public proStandardId!: string;

    /**
     * 作者没写注释!!
     */
    public proStandardName!: string;

    /**
     * 作者没写注释!!
     */
    public proType!: string;

    /**
     * 作者没写注释!!
     */
    public rechargeAccount!: string;

    /**
     * 作者没写注释!!
     */
    public redisKey!: string;

    /**
     * 作者没写注释!!
     */
    public tel!: string;

    /**
     * 总条数
     */
    public totalCount!: number;

    /**
     * 作者没写注释!!
     */
    public wayId!: string;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['actList']){
            this.actList=options['actList'];
        }
        else{
            this.actList=undefined
        }
    
        if(options&&options['begdate']){
            this.begdate=options['begdate'];
        }
        else{
            this.begdate=undefined
        }
    
        if(options&&options['couponNumber']){
            this.couponNumber=options['couponNumber'];
        }
        else{
            this.couponNumber=undefined
        }
    
        if(options&&options['couponStatus']){
            this.couponStatus=options['couponStatus'];
        }
        else{
            this.couponStatus=undefined
        }
    
        if(options&&options['creditType']){
            this.creditType=options['creditType'];
        }
        else{
            this.creditType=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['enddate']){
            this.enddate=options['enddate'];
        }
        else{
            this.enddate=undefined
        }
    
        if(options&&options['fishState']){
            this.fishState=options['fishState'];
        }
        else{
            this.fishState=undefined
        }
    
        if(options&&options['highFailNum']){
            this.highFailNum=options['highFailNum'];
        }
        else{
            this.highFailNum=undefined
        }
    
        if(options&&options['isFreeze']){
            this.isFreeze=options['isFreeze'];
        }
        else{
            this.isFreeze=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['lowFailNum']){
            this.lowFailNum=options['lowFailNum'];
        }
        else{
            this.lowFailNum=undefined
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
    
        if(options&&options['orderCode']){
            this.orderCode=options['orderCode'];
        }
        else{
            this.orderCode=undefined
        }
    
        if(options&&options['orderState']){
            this.orderState=options['orderState'];
        }
        else{
            this.orderState=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['payState']){
            this.payState=options['payState'];
        }
        else{
            this.payState=undefined
        }
    
        if(options&&options['proId']){
            this.proId=options['proId'];
        }
        else{
            this.proId=undefined
        }
    
        if(options&&options['proList']){
            this.proList=options['proList'];
        }
        else{
            this.proList=undefined
        }
    
        if(options&&options['proStandardId']){
            this.proStandardId=options['proStandardId'];
        }
        else{
            this.proStandardId=undefined
        }
    
        if(options&&options['proStandardName']){
            this.proStandardName=options['proStandardName'];
        }
        else{
            this.proStandardName=undefined
        }
    
        if(options&&options['proType']){
            this.proType=options['proType'];
        }
        else{
            this.proType=undefined
        }
    
        if(options&&options['rechargeAccount']){
            this.rechargeAccount=options['rechargeAccount'];
        }
        else{
            this.rechargeAccount=undefined
        }
    
        if(options&&options['redisKey']){
            this.redisKey=options['redisKey'];
        }
        else{
            this.redisKey=undefined
        }
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
        if(options&&options['wayId']){
            this.wayId=options['wayId'];
        }
        else{
            this.wayId=undefined
        }
    
    }
}
