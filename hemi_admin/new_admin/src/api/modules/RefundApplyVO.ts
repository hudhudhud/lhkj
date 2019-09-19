import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class RefundApplyVO {

    /**
     * 申请备注
     */
    public applyReason!: string;

    /**
     * 申请状态: 0未受理，1已受理，2拒绝受理
     */
    public applyStatus!: string;

    /**
     * 用户id
     */
    public applyUser!: string;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 订单号
     */
    public orderId!: string;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 预支付订单号
     */
    public preOrderId!: string;

    /**
     * 退款流水号
     */
    public refundSerialsId!: string;

    /**
     * 退款状态: 0未退款1已退款2退款失败
     */
    public refundStatus!: string;

    /**
     * 总条数
     */
    public totalCount!: number;


    constructor(options?:any){
        
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
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['orderId']){
            this.orderId=options['orderId'];
        }
        else{
            this.orderId=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
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
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
    }
}
