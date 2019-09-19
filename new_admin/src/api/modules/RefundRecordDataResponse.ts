import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class RefundRecordDataResponse {

    /**
     * 作者没写注释!!
     */
    public applySerialsId!: string;

    /**
     * 主键
     */
    public id!: number;

    /**
     * 订单号
     */
    public orderId!: string;

    /**
     * 支付方式
     */
    public payType!: number;

    /**
     * 预支付订单号
     */
    public preOrderId!: string;

    /**
     * 退款金额
     */
    public refundAmount!: any;

    /**
     * 退款编号
     */
    public refundSerialId!: string;

    /**
     * 退款时间
     */
    public refundTime!: string;

    /**
     * 备注信息
     */
    public remark!: string;

    /**
     * 退款状态: 0未退款1已退款2未知
     */
    public status!: number;


    constructor(options?:any){
        
        if(options&&options['applySerialsId']){
            this.applySerialsId=options['applySerialsId'];
        }
        else{
            this.applySerialsId=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['orderId']){
            this.orderId=options['orderId'];
        }
        else{
            this.orderId=undefined
        }
    
        if(options&&options['payType']){
            this.payType=options['payType'];
        }
        else{
            this.payType=undefined
        }
    
        if(options&&options['preOrderId']){
            this.preOrderId=options['preOrderId'];
        }
        else{
            this.preOrderId=undefined
        }
    
        if(options&&options['refundAmount']){
            this.refundAmount=options['refundAmount'];
        }
        else{
            this.refundAmount=undefined
        }
    
        if(options&&options['refundSerialId']){
            this.refundSerialId=options['refundSerialId'];
        }
        else{
            this.refundSerialId=undefined
        }
    
        if(options&&options['refundTime']){
            this.refundTime=options['refundTime'];
        }
        else{
            this.refundTime=undefined
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
    
    }
}
