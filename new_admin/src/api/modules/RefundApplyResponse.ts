import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class RefundApplyResponse {

    /**
     * 金额
     */
    public amount!: any;

    /**
     * 申请提交时间
     */
    public applyCommitTime!: string;

    /**
     * 作者没写注释!!
     */
    public applyProcessTime!: string;

    /**
     * 原因
     */
    public applyReason!: string;

    /**
     * 申请状态: 0未受理，1已受理，2拒绝受理
     */
    public applyStatus!: number;

    /**
     * 退款申请人id
     */
    public applyUser!: string;

    /**
     * 退款申请人名称
     */
    public applyUserName!: string;

    /**
     * 主键
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public needCancelOrder!: number;

    /**
     * 订单号
     */
    public orderId!: string;

    /**
     * 预支付订单号
     */
    public preOrderId!: string;

    /**
     * 退款流水
     */
    public refundSerialsId!: string;

    /**
     * 退款状态0未退款1已退款2退款失败 3未知
     */
    public refundStatus!: number;

    /**
     * 拒绝理由
     */
    public refuseReason!: string;

    /**
     * 备注
     */
    public remark!: string;


    constructor(options?:any){
        
        if(options&&options['amount']){
            this.amount=options['amount'];
        }
        else{
            this.amount=undefined
        }
    
        if(options&&options['applyCommitTime']){
            this.applyCommitTime=options['applyCommitTime'];
        }
        else{
            this.applyCommitTime=undefined
        }
    
        if(options&&options['applyProcessTime']){
            this.applyProcessTime=options['applyProcessTime'];
        }
        else{
            this.applyProcessTime=undefined
        }
    
        if(options&&options['applyReason']){
            this.applyReason=options['applyReason'];
        }
        else{
            this.applyReason=undefined
        }
    
        if(options&&options['applyStatus']){
            this.applyStatus=options['applyStatus'];
        }
        else{
            this.applyStatus=undefined
        }
    
        if(options&&options['applyUser']){
            this.applyUser=options['applyUser'];
        }
        else{
            this.applyUser=undefined
        }
    
        if(options&&options['applyUserName']){
            this.applyUserName=options['applyUserName'];
        }
        else{
            this.applyUserName=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['needCancelOrder']){
            this.needCancelOrder=options['needCancelOrder'];
        }
        else{
            this.needCancelOrder=undefined
        }
    
        if(options&&options['orderId']){
            this.orderId=options['orderId'];
        }
        else{
            this.orderId=undefined
        }
    
        if(options&&options['preOrderId']){
            this.preOrderId=options['preOrderId'];
        }
        else{
            this.preOrderId=undefined
        }
    
        if(options&&options['refundSerialsId']){
            this.refundSerialsId=options['refundSerialsId'];
        }
        else{
            this.refundSerialsId=undefined
        }
    
        if(options&&options['refundStatus']){
            this.refundStatus=options['refundStatus'];
        }
        else{
            this.refundStatus=undefined
        }
    
        if(options&&options['refuseReason']){
            this.refuseReason=options['refuseReason'];
        }
        else{
            this.refuseReason=undefined
        }
    
        if(options&&options['remark']){
            this.remark=options['remark'];
        }
        else{
            this.remark=undefined
        }
    
    }
}
