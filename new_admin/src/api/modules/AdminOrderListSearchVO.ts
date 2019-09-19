import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class AdminOrderListSearchVO {

    /**
     * 活动id
     */
    public actId!: number;

    /**
     * 下单起始时间
     */
    public begdate!: string;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 用户id
     */
    public customId!: string;

    /**
     * 下单截止时间
     */
    public enddate!: string;

    /**
     * 第三方充值状态
     */
    public fishState!: number;

    /**
     * 筛选失败最大次数
     */
    public highFailNum!: number;

    /**
     * 冻结状态
     */
    public isFreeze!: number;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 筛选失败最小次数
     */
    public lowFailNum!: number;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 商户id列表--权限限制
     */
    public merchantIdList!: number[];

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     * 订单状态
     */
    public orderState!: number;

    /**
     * 订单类型
     */
    public orderType!: number;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 支付状态
     */
    public payState!: number;

    /**
     * 商品规格id
     */
    public proStandardId!: number;

    /**
     * 商品类型
     */
    public proType!: number;

    /**
     * 充值号码
     */
    public rechargeAccount!: string;

    /**
     * 客户手机号
     */
    public tel!: string;

    /**
     * 总条数
     */
    public totalCount!: number;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['begdate']){
            this.begdate=options['begdate'];
        }
        else{
            this.begdate=undefined
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
    
        if(options&&options['merchantIdList']){
            this.merchantIdList=options['merchantIdList'];
        }
        else{
            this.merchantIdList=undefined
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
    
        if(options&&options['orderType']){
            this.orderType=options['orderType'];
        }
        else{
            this.orderType=undefined
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
    
        if(options&&options['proStandardId']){
            this.proStandardId=options['proStandardId'];
        }
        else{
            this.proStandardId=undefined
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
    
    }
}
