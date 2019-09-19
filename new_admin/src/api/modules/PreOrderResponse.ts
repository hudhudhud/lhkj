import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class PreOrderResponse {

    /**
     * 用户id
     */
    public customId!: string;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 商户订单号
     */
    public merchantOrder!: string;

    /**
     * 支付时间
     */
    public payTime!: string;

    /**
     * 预支付订单号
     */
    public preOrderId!: string;

    /**
     * 预支付订单时间
     */
    public preOrderTime!: string;

    /**
     * 商品简单描述
     */
    public proDescribe!: string;

    /**
     * 充值账号
     */
    public rechargeAccount!: string;

    /**
     * 充值状态
     */
    public rechargeStatus!: number;

    /**
     * 退款状态
     */
    public refundStatus!: string;

    /**
     * 备注信息
     */
    public remark!: string;

    /**
     * 状态
     */
    public status!: string;

    /**
     * 用户手机号
     */
    public tel!: string;

    /**
     * 支付金额
     */
    public totalFee!: any;


    constructor(options?:any){
        
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['merchantOrder']){
            this.merchantOrder=options['merchantOrder'];
        }
        else{
            this.merchantOrder=undefined
        }
    
        if(options&&options['payTime']){
            this.payTime=options['payTime'];
        }
        else{
            this.payTime=undefined
        }
    
        if(options&&options['preOrderId']){
            this.preOrderId=options['preOrderId'];
        }
        else{
            this.preOrderId=undefined
        }
    
        if(options&&options['preOrderTime']){
            this.preOrderTime=options['preOrderTime'];
        }
        else{
            this.preOrderTime=undefined
        }
    
        if(options&&options['proDescribe']){
            this.proDescribe=options['proDescribe'];
        }
        else{
            this.proDescribe=undefined
        }
    
        if(options&&options['rechargeAccount']){
            this.rechargeAccount=options['rechargeAccount'];
        }
        else{
            this.rechargeAccount=undefined
        }
    
        if(options&&options['rechargeStatus']){
            this.rechargeStatus=options['rechargeStatus'];
        }
        else{
            this.rechargeStatus=undefined
        }
    
        if(options&&options['refundStatus']){
            this.refundStatus=options['refundStatus'];
        }
        else{
            this.refundStatus=undefined
        }
    
        if(options&&options['remark']){
            this.remark=options['remark'];
        }
        else{
            this.remark=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
        if(options&&options['totalFee']){
            this.totalFee=options['totalFee'];
        }
        else{
            this.totalFee=undefined
        }
    
    }
}
