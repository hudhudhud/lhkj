import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OrderTicketDetailResponse {

    /**
     * 改签差价，正 -&gt; 需补充，负 -&gt; 需退还
     */
    public changePriceDiff!: any;

    /**
     * 改签手续费
     */
    public changeServiceCharge!: any;

    /**
     * 改签后新订单号
     */
    public changedOrderCode!: string;

    /**
     * 改签退款状态 0. 不需要, 10. 已申请, 20. 退款中, 21. 退款失败, 30. 退款成功
     */
    public changedRefundStatus!: number;

    /**
     * 改签后的票id
     */
    public changedTicketId!: number;

    /**
     * 客户名称
     */
    public clientName!: string;

    /**
     * 证件号
     */
    public clientPapersNo!: string;

    /**
     * 证件类型
     */
    public clientPapersType!: string;

    /**
     * 客户性别
     */
    public clientSex!: string;

    /**
     * 发车时间
     */
    public drawTime!: string;

    /**
     * 始发站
     */
    public fromStation!: string;

    /**
     * 主键
     */
    public id!: number;

    /**
     * 保险费（没有保险费为0）
     */
    public insuranceCharge!: any;

    /**
     * 是否改签票 0: 否 1: 是
     */
    public isTicketChanging!: number;

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     * 第三方订单号: 创旅
     */
    public originOrderId!: string;

    /**
     * 第三方乘客编号: 创旅
     */
    public originPassengerId!: string;

    /**
     * 票类型 1: 成人票 2: 儿童票
     */
    public passengerType!: string;

    /**
     * 票的实际支付金额--不含优惠券等
     */
    public payPrice!: any;

    /**
     * 票价
     */
    public price!: any;

    /**
     * 取票码
     */
    public pticketNo!: string;

    /**
     * 退款金额
     */
    public refundPrice!: any;

    /**
     * 退款状态 0. 不需要, 10. 已申请, 20. 退款中, 21. 退款失败, 30. 退款成功
     */
    public refundStatus!: number;

    /**
     * 坐席类型
     */
    public seatClass!: string;

    /**
     * 车厢
     */
    public seatNo!: string;

    /**
     * 座位号
     */
    public seatNumber!: string;

    /**
     * 配送费（非配送票为0）
     */
    public serviceCharge!: any;

    /**
     * 状态 10. 已占票, 20. 出票中, 21. 出票失败, 30. 已出票, 40. 退票中, 41. 退票失败 50. 已退票 60. 申请改签 70. 改签中 71. 改签失败 80. 改签成功
     */
    public status!: number;

    /**
     * 结束站
     */
    public toStation!: string;

    /**
     * 车次
     */
    public trainNo!: string;

    /**
     * 更新时间
     */
    public updateAt!: string;


    constructor(options?:any){
        
        if(options&&options['changePriceDiff']){
            this.changePriceDiff=options['changePriceDiff'];
        }
        else{
            this.changePriceDiff=undefined
        }
    
        if(options&&options['changeServiceCharge']){
            this.changeServiceCharge=options['changeServiceCharge'];
        }
        else{
            this.changeServiceCharge=undefined
        }
    
        if(options&&options['changedOrderCode']){
            this.changedOrderCode=options['changedOrderCode'];
        }
        else{
            this.changedOrderCode=undefined
        }
    
        if(options&&options['changedRefundStatus']){
            this.changedRefundStatus=options['changedRefundStatus'];
        }
        else{
            this.changedRefundStatus=undefined
        }
    
        if(options&&options['changedTicketId']){
            this.changedTicketId=options['changedTicketId'];
        }
        else{
            this.changedTicketId=undefined
        }
    
        if(options&&options['clientName']){
            this.clientName=options['clientName'];
        }
        else{
            this.clientName=undefined
        }
    
        if(options&&options['clientPapersNo']){
            this.clientPapersNo=options['clientPapersNo'];
        }
        else{
            this.clientPapersNo=undefined
        }
    
        if(options&&options['clientPapersType']){
            this.clientPapersType=options['clientPapersType'];
        }
        else{
            this.clientPapersType=undefined
        }
    
        if(options&&options['clientSex']){
            this.clientSex=options['clientSex'];
        }
        else{
            this.clientSex=undefined
        }
    
        if(options&&options['drawTime']){
            this.drawTime=options['drawTime'];
        }
        else{
            this.drawTime=undefined
        }
    
        if(options&&options['fromStation']){
            this.fromStation=options['fromStation'];
        }
        else{
            this.fromStation=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['insuranceCharge']){
            this.insuranceCharge=options['insuranceCharge'];
        }
        else{
            this.insuranceCharge=undefined
        }
    
        if(options&&options['isTicketChanging']){
            this.isTicketChanging=options['isTicketChanging'];
        }
        else{
            this.isTicketChanging=undefined
        }
    
        if(options&&options['orderCode']){
            this.orderCode=options['orderCode'];
        }
        else{
            this.orderCode=undefined
        }
    
        if(options&&options['originOrderId']){
            this.originOrderId=options['originOrderId'];
        }
        else{
            this.originOrderId=undefined
        }
    
        if(options&&options['originPassengerId']){
            this.originPassengerId=options['originPassengerId'];
        }
        else{
            this.originPassengerId=undefined
        }
    
        if(options&&options['passengerType']){
            this.passengerType=options['passengerType'];
        }
        else{
            this.passengerType=undefined
        }
    
        if(options&&options['payPrice']){
            this.payPrice=options['payPrice'];
        }
        else{
            this.payPrice=undefined
        }
    
        if(options&&options['price']){
            this.price=options['price'];
        }
        else{
            this.price=undefined
        }
    
        if(options&&options['pticketNo']){
            this.pticketNo=options['pticketNo'];
        }
        else{
            this.pticketNo=undefined
        }
    
        if(options&&options['refundPrice']){
            this.refundPrice=options['refundPrice'];
        }
        else{
            this.refundPrice=undefined
        }
    
        if(options&&options['refundStatus']){
            this.refundStatus=options['refundStatus'];
        }
        else{
            this.refundStatus=undefined
        }
    
        if(options&&options['seatClass']){
            this.seatClass=options['seatClass'];
        }
        else{
            this.seatClass=undefined
        }
    
        if(options&&options['seatNo']){
            this.seatNo=options['seatNo'];
        }
        else{
            this.seatNo=undefined
        }
    
        if(options&&options['seatNumber']){
            this.seatNumber=options['seatNumber'];
        }
        else{
            this.seatNumber=undefined
        }
    
        if(options&&options['serviceCharge']){
            this.serviceCharge=options['serviceCharge'];
        }
        else{
            this.serviceCharge=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
        if(options&&options['toStation']){
            this.toStation=options['toStation'];
        }
        else{
            this.toStation=undefined
        }
    
        if(options&&options['trainNo']){
            this.trainNo=options['trainNo'];
        }
        else{
            this.trainNo=undefined
        }
    
        if(options&&options['updateAt']){
            this.updateAt=options['updateAt'];
        }
        else{
            this.updateAt=undefined
        }
    
    }
}
