import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OrderCommonInfoResponse {

    /**
     * 活动id
     */
    public actId!: number;

    /**
     * 活动名称
     */
    public actName!: string;

    /**
     * 活动类型 1.特卖 2.抽奖 3.秒杀 4.签到
     */
    public actType!: number;

    /**
     * 实际支付价格 = 订单原价 - 已经支付金额 - 随机立减金额 - 卡卷优惠金额 - 随机立减 - 其它优惠等
     */
    public actualPrice!: any;

    /**
     * 已经支付金额
     */
    public alreadyPayPrice!: any;

    /**
     * 渠道 0. 默认
     */
    public channel!: number;

    /**
     * 卡券码
     */
    public couponId!: string;

    /**
     * 卡券名称
     */
    public couponName!: string;

    /**
     * 卡卷优惠金额
     */
    public couponPrice!: any;

    /**
     * 卡券消费情况: 0. 不使用, 10. 未消费, 20. 消费成功, 30: 退还中, 40: 退换成功:, 50. 消费失败
     */
    public couponStatus!: number;

    /**
     * 下单时间
     */
    public createdAt!: string;

    /**
     * 积分消费情况: 0. 不使用, 10. 未消费, 20. 消费成功, 30: 退还中, 40: 退换成功:, 50. 消费失败
     */
    public creditUseStatus!: number;

    /**
     * 客户id
     */
    public customId!: string;

    /**
     * 超时时间
     */
    public expireTime!: string;

    /**
     * 飞鱼成本价
     */
    public fishCost!: any;

    /**
     * 商品数量
     */
    public goodsNum!: number;

    /**
     * 商品所在表名
     */
    public goodsTable!: string;

    /**
     * 冻结状态 0: 为冻结 1: 已冻结
     */
    public isFreeze!: number;

    /**
     * 是否隐藏订单 0:不隐藏 1:隐藏
     */
    public isHidden!: number;

    /**
     * 是否经过风险控制 0:未 1:是
     */
    public isRisk!: number;

    /**
     * 抽奖机会扣除状态: 0. 不使用, 10. 未消费, 20. 消费成功, 30: 退还中, 40: 退换成功:, 50. 消费失败
     */
    public lotteryUseStatus!: number;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     *      * 订单状态 10. 初始状态, 20. 订单取消 30. 订单完成, 40. 订单过期, 50. 无效订单
     */
    public orderState!: number;

    /**
     * 下单时间
     */
    public orderTime!: string;

    /**
     * 订单原价
     */
    public originalPrice!: any;

    /**
     * 支付时间
     */
    public payTime!: string;

    /**
     * 支付方式
     */
    public payType!: number;

    /**
     * 支付编号
     */
    public paymentCode!: string;

    /**
     * 支付状态  0. 不需要支付, 10. 未支付, 20. 已支付, 30. 退款中, 40.退款完成, 50. 超时支付(待退款)
     */
    public paymentState!: number;

    /**
     * 结算价格
     */
    public primeCost!: any;

    /**
     * 商品类型: 1直冲 2卡密 3抽奖 4卡券 5 积分
     */
    public proType!: number;

    /**
     * 随机立减金额
     */
    public randomDiscountPrice!: any;

    /**
     * 充值状态  0. 不需要, 10. 未调用,  20. 调用中, 21. 调用失败 30. 已受理, 40. 回调成功, 50. 回调失败, 60. 重新发起
     */
    public rechargeState!: number;

    /**
     * 退款金额
     */
    public refundPrice!: any;

    /**
     * 备注
     */
    public remark!: string;

    /**
     * 用户登录手机号
     */
    public tel!: string;

    /**
     * 积分价值
     */
    public totalCredit!: number;

    /**
     * 更新时间
     */
    public updateAt!: string;

    /**
     * 卡卷渠道码
     */
    public wayCode!: string;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['actName']){
            this.actName=options['actName'];
        }
        else{
            this.actName=undefined
        }
    
        if(options&&options['actType']){
            this.actType=options['actType'];
        }
        else{
            this.actType=undefined
        }
    
        if(options&&options['actualPrice']){
            this.actualPrice=options['actualPrice'];
        }
        else{
            this.actualPrice=undefined
        }
    
        if(options&&options['alreadyPayPrice']){
            this.alreadyPayPrice=options['alreadyPayPrice'];
        }
        else{
            this.alreadyPayPrice=undefined
        }
    
        if(options&&options['channel']){
            this.channel=options['channel'];
        }
        else{
            this.channel=undefined
        }
    
        if(options&&options['couponId']){
            this.couponId=options['couponId'];
        }
        else{
            this.couponId=undefined
        }
    
        if(options&&options['couponName']){
            this.couponName=options['couponName'];
        }
        else{
            this.couponName=undefined
        }
    
        if(options&&options['couponPrice']){
            this.couponPrice=options['couponPrice'];
        }
        else{
            this.couponPrice=undefined
        }
    
        if(options&&options['couponStatus']){
            this.couponStatus=options['couponStatus'];
        }
        else{
            this.couponStatus=undefined
        }
    
        if(options&&options['createdAt']){
            this.createdAt=options['createdAt'];
        }
        else{
            this.createdAt=undefined
        }
    
        if(options&&options['creditUseStatus']){
            this.creditUseStatus=options['creditUseStatus'];
        }
        else{
            this.creditUseStatus=undefined
        }
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['expireTime']){
            this.expireTime=options['expireTime'];
        }
        else{
            this.expireTime=undefined
        }
    
        if(options&&options['fishCost']){
            this.fishCost=options['fishCost'];
        }
        else{
            this.fishCost=undefined
        }
    
        if(options&&options['goodsNum']){
            this.goodsNum=options['goodsNum'];
        }
        else{
            this.goodsNum=undefined
        }
    
        if(options&&options['goodsTable']){
            this.goodsTable=options['goodsTable'];
        }
        else{
            this.goodsTable=undefined
        }
    
        if(options&&options['isFreeze']){
            this.isFreeze=options['isFreeze'];
        }
        else{
            this.isFreeze=undefined
        }
    
        if(options&&options['isHidden']){
            this.isHidden=options['isHidden'];
        }
        else{
            this.isHidden=undefined
        }
    
        if(options&&options['isRisk']){
            this.isRisk=options['isRisk'];
        }
        else{
            this.isRisk=undefined
        }
    
        if(options&&options['lotteryUseStatus']){
            this.lotteryUseStatus=options['lotteryUseStatus'];
        }
        else{
            this.lotteryUseStatus=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
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
    
        if(options&&options['orderTime']){
            this.orderTime=options['orderTime'];
        }
        else{
            this.orderTime=undefined
        }
    
        if(options&&options['originalPrice']){
            this.originalPrice=options['originalPrice'];
        }
        else{
            this.originalPrice=undefined
        }
    
        if(options&&options['payTime']){
            this.payTime=options['payTime'];
        }
        else{
            this.payTime=undefined
        }
    
        if(options&&options['payType']){
            this.payType=options['payType'];
        }
        else{
            this.payType=undefined
        }
    
        if(options&&options['paymentCode']){
            this.paymentCode=options['paymentCode'];
        }
        else{
            this.paymentCode=undefined
        }
    
        if(options&&options['paymentState']){
            this.paymentState=options['paymentState'];
        }
        else{
            this.paymentState=undefined
        }
    
        if(options&&options['primeCost']){
            this.primeCost=options['primeCost'];
        }
        else{
            this.primeCost=undefined
        }
    
        if(options&&options['proType']){
            this.proType=options['proType'];
        }
        else{
            this.proType=undefined
        }
    
        if(options&&options['randomDiscountPrice']){
            this.randomDiscountPrice=options['randomDiscountPrice'];
        }
        else{
            this.randomDiscountPrice=undefined
        }
    
        if(options&&options['rechargeState']){
            this.rechargeState=options['rechargeState'];
        }
        else{
            this.rechargeState=undefined
        }
    
        if(options&&options['refundPrice']){
            this.refundPrice=options['refundPrice'];
        }
        else{
            this.refundPrice=undefined
        }
    
        if(options&&options['remark']){
            this.remark=options['remark'];
        }
        else{
            this.remark=undefined
        }
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
        if(options&&options['totalCredit']){
            this.totalCredit=options['totalCredit'];
        }
        else{
            this.totalCredit=undefined
        }
    
        if(options&&options['updateAt']){
            this.updateAt=options['updateAt'];
        }
        else{
            this.updateAt=undefined
        }
    
        if(options&&options['wayCode']){
            this.wayCode=options['wayCode'];
        }
        else{
            this.wayCode=undefined
        }
    
    }
}
