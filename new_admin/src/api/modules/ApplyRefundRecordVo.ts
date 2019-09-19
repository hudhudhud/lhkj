import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ApplyRefundRecordVo {

    /**
     * 作者没写注释!!
     */
    public amount!: any;

    /**
     * 作者没写注释!!
     */
    public applyCommitTime!: string;

    /**
     * 作者没写注释!!
     */
    public applyProcessTime!: string;

    /**
     * 作者没写注释!!
     */
    public applyReason!: string;

    /**
     * 作者没写注释!!
     */
    public applyStatus!: number;

    /**
     * 作者没写注释!!
     */
    public applyUser!: string;

    /**
     * 作者没写注释!!
     */
    public applyUserName!: string;

    /**
     * 作者没写注释!!
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public needCancelOrder!: number;

    /**
     * 作者没写注释!!
     */
    public orderId!: string;

    /**
     * 作者没写注释!!
     */
    public preOrderId!: string;

    /**
     * 作者没写注释!!
     */
    public refundSerialsId!: string;

    /**
     * 作者没写注释!!
     */
    public refundStatus!: number;

    /**
     * 作者没写注释!!
     */
    public refuseReason!: string;


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
    
    }
}
