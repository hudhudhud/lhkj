import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OrderCreditGoodsDetailResponse {

    /**
     * 积分类型id
     */
    public creditTypeId!: number;

    /**
     * 积分类型名称
     */
    public creditTypeName!: string;

    /**
     * 兑换比
     */
    public exchangeRate!: number;

    /**
     * 积分过期时间
     */
    public expiredTime!: string;

    /**
     * 商品积分价值
     */
    public goodCreditValue!: number;

    /**
     * 商品id
     */
    public goodId!: string;

    /**
     * 商品名称
     */
    public goodName!: string;

    /**
     * 商品数量
     */
    public goodNum!: number;

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     * 总积分值
     */
    public totalAmount!: number;


    constructor(options?:any){
        
        if(options&&options['creditTypeId']){
            this.creditTypeId=options['creditTypeId'];
        }
        else{
            this.creditTypeId=undefined
        }
    
        if(options&&options['creditTypeName']){
            this.creditTypeName=options['creditTypeName'];
        }
        else{
            this.creditTypeName=undefined
        }
    
        if(options&&options['exchangeRate']){
            this.exchangeRate=options['exchangeRate'];
        }
        else{
            this.exchangeRate=undefined
        }
    
        if(options&&options['expiredTime']){
            this.expiredTime=options['expiredTime'];
        }
        else{
            this.expiredTime=undefined
        }
    
        if(options&&options['goodCreditValue']){
            this.goodCreditValue=options['goodCreditValue'];
        }
        else{
            this.goodCreditValue=undefined
        }
    
        if(options&&options['goodId']){
            this.goodId=options['goodId'];
        }
        else{
            this.goodId=undefined
        }
    
        if(options&&options['goodName']){
            this.goodName=options['goodName'];
        }
        else{
            this.goodName=undefined
        }
    
        if(options&&options['goodNum']){
            this.goodNum=options['goodNum'];
        }
        else{
            this.goodNum=undefined
        }
    
        if(options&&options['orderCode']){
            this.orderCode=options['orderCode'];
        }
        else{
            this.orderCode=undefined
        }
    
        if(options&&options['totalAmount']){
            this.totalAmount=options['totalAmount'];
        }
        else{
            this.totalAmount=undefined
        }
    
    }
}
