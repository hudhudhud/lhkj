import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class TbOrderBaseInfoResponse {

    /**
     * 活动id
     */
    public actId!: string;

    /**
     * 活动名称
     */
    public actName!: string;

    /**
     * 活动类型
     */
    public actType!: number;

    /**
     * 实际支付价格
     */
    public actualPrice!: any;

    /**
     * 原始商品id
     */
    public baseProId!: number;

    /**
     * 原始商品规格id
     */
    public baseProStandardCode!: string;

    /**
     * 作者没写注释!!
     */
    public cardPwds!: string;

    /**
     * 商品数量
     */
    public commodityNum!: number;

    /**
     * 卡券id
     */
    public couponId!: string;

    /**
     * 卡券名称
     */
    public couponName!: string;

    /**
     * 创建时间
     */
    public createdAt!: string;

    /**
     * 创建人
     */
    public createdBy!: string;

    /**
     * 积分
     */
    public credit!: number;

    /**
     * 客户id
     */
    public customId!: string;

    /**
     * 作者没写注释!!
     */
    public deletedAt!: string;

    /**
     * 作者没写注释!!
     */
    public deletedBy!: string;

    /**
     * 结束时间（完成或取消）
     */
    public endTime!: string;

    /**
     * 超时时间
     */
    public expireTime!: string;

    /**
     * 飞鱼成本价格
     */
    public fishCost!: any;

    /**
     * 飞鱼订单状态
     */
    public fishState!: number;

    /**
     * 支付时间
     */
    public fishTime!: string;

    /**
     * 作者没写注释!!
     */
    public isDeleted!: number;

    /**
     * 是否经过风险控制
     */
    public isFreeze!: number;

    /**
     * 是否隐藏
     */
    public isHidden!: number;

    /**
     * 是否经过风险控制
     */
    public isRisk!: number;

    /**
     * 商品原价
     */
    public isSms!: number;

    /**
     * 商户id
     */
    public merchantId!: string;

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     * 飞鱼订单号
     */
    public orderNumber!: string;

    /**
     * 订单状态
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
     * 超时时间
     */
    public overTime!: string;

    /**
     * 支付时间
     */
    public payTime!: string;

    /**
     * 支付编号
     */
    public paymentCode!: string;

    /**
     * 支付状态
     */
    public paymentState!: number;

    /**
     * 结算价格
     */
    public primeCost!: any;

    /**
     * 商品描述
     */
    public proDesc!: string;

    /**
     * 包装过后的商品id
     */
    public proId!: string;

    /**
     * 商品名称
     */
    public proName!: string;

    /**
     * 商品规格id
     */
    public proStandardId!: string;

    /**
     * 商品规格名称
     */
    public proStandardName!: string;

    /**
     * 订单商品类型
     */
    public proType!: number;

    /**
     * 充值账号
     */
    public rechargeAccount!: string;

    /**
     * 退款金额
     */
    public refundPrice!: any;

    /**
     * 备注
     */
    public remark!: string;

    /**
     * 订单号
     */
    public standardImgUrl!: string;

    /**
     * 手机号
     */
    public tel!: string;

    /**
     * 更新时间
     */
    public updateAt!: string;

    /**
     * 更新人
     */
    public updateBy!: string;

    /**
     * 渠道码
     */
    public wayId!: string;


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
    
        if(options&&options['baseProId']){
            this.baseProId=options['baseProId'];
        }
        else{
            this.baseProId=undefined
        }
    
        if(options&&options['baseProStandardCode']){
            this.baseProStandardCode=options['baseProStandardCode'];
        }
        else{
            this.baseProStandardCode=undefined
        }
    
        if(options&&options['cardPwds']){
            this.cardPwds=options['cardPwds'];
        }
        else{
            this.cardPwds=undefined
        }
    
        if(options&&options['commodityNum']){
            this.commodityNum=options['commodityNum'];
        }
        else{
            this.commodityNum=undefined
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
    
        if(options&&options['createdAt']){
            this.createdAt=options['createdAt'];
        }
        else{
            this.createdAt=undefined
        }
    
        if(options&&options['createdBy']){
            this.createdBy=options['createdBy'];
        }
        else{
            this.createdBy=undefined
        }
    
        if(options&&options['credit']){
            this.credit=options['credit'];
        }
        else{
            this.credit=undefined
        }
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['deletedAt']){
            this.deletedAt=options['deletedAt'];
        }
        else{
            this.deletedAt=undefined
        }
    
        if(options&&options['deletedBy']){
            this.deletedBy=options['deletedBy'];
        }
        else{
            this.deletedBy=undefined
        }
    
        if(options&&options['endTime']){
            this.endTime=options['endTime'];
        }
        else{
            this.endTime=undefined
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
    
        if(options&&options['fishState']){
            this.fishState=options['fishState'];
        }
        else{
            this.fishState=undefined
        }
    
        if(options&&options['fishTime']){
            this.fishTime=options['fishTime'];
        }
        else{
            this.fishTime=undefined
        }
    
        if(options&&options['isDeleted']){
            this.isDeleted=options['isDeleted'];
        }
        else{
            this.isDeleted=undefined
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
    
        if(options&&options['isSms']){
            this.isSms=options['isSms'];
        }
        else{
            this.isSms=undefined
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
    
        if(options&&options['orderNumber']){
            this.orderNumber=options['orderNumber'];
        }
        else{
            this.orderNumber=undefined
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
    
        if(options&&options['overTime']){
            this.overTime=options['overTime'];
        }
        else{
            this.overTime=undefined
        }
    
        if(options&&options['payTime']){
            this.payTime=options['payTime'];
        }
        else{
            this.payTime=undefined
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
    
        if(options&&options['proDesc']){
            this.proDesc=options['proDesc'];
        }
        else{
            this.proDesc=undefined
        }
    
        if(options&&options['proId']){
            this.proId=options['proId'];
        }
        else{
            this.proId=undefined
        }
    
        if(options&&options['proName']){
            this.proName=options['proName'];
        }
        else{
            this.proName=undefined
        }
    
        if(options&&options['proStandardId']){
            this.proStandardId=options['proStandardId'];
        }
        else{
            this.proStandardId=undefined
        }
    
        if(options&&options['proStandardName']){
            this.proStandardName=options['proStandardName'];
        }
        else{
            this.proStandardName=undefined
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
    
        if(options&&options['standardImgUrl']){
            this.standardImgUrl=options['standardImgUrl'];
        }
        else{
            this.standardImgUrl=undefined
        }
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
        if(options&&options['updateAt']){
            this.updateAt=options['updateAt'];
        }
        else{
            this.updateAt=undefined
        }
    
        if(options&&options['updateBy']){
            this.updateBy=options['updateBy'];
        }
        else{
            this.updateBy=undefined
        }
    
        if(options&&options['wayId']){
            this.wayId=options['wayId'];
        }
        else{
            this.wayId=undefined
        }
    
    }
}
