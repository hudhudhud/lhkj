import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class RefundRecordVO {

    /**
     * 查询时间范围开始
     */
    public begdate!: string;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 查询时间范围结束
     */
    public enddate!: string;

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
     * 支付类型 2.微信支付 3.中行支付 4.工行支付 5.建行支付 6.工行融e联支付 7.建行信用卡支付 8.建行网关信用卡支付 9.建行网关储蓄卡支付
     */
    public payType!: string;

    /**
     * 退款订单号
     */
    public preOrderId!: string;

    /**
     * 退款流水号
     */
    public refundSerialld!: string;

    /**
     * 备注
     */
    public remark!: string;

    /**
     * 退款状态 0.未退款 1.已退款 2.未知
     */
    public status!: string;

    /**
     * 总条数
     */
    public totalCount!: number;


    constructor(options?:any){
        
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
    
        if(options&&options['enddate']){
            this.enddate=options['enddate'];
        }
        else{
            this.enddate=undefined
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
    
        if(options&&options['refundSerialld']){
            this.refundSerialld=options['refundSerialld'];
        }
        else{
            this.refundSerialld=undefined
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
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
    }
}
