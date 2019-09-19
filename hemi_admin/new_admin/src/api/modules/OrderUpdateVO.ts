import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OrderUpdateVO {

    /**
     * 订单冻结状态
     */
    public isFreeze!: number;

    /**
     * 订单备注信息
     */
    public mark!: string;

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     * 订单状态 10. 初始状态, 20. 订单取消 30. 订单完成, 40. 订单冻结, 50. 订单过期, 60. 无效订单
     */
    public orderState!: number;

    /**
     * 支付状态  0. 不需要支付, 10. 未支付, 20. 已支付, 30. 退款中, 40.退款完成, 50. 超时支付(待退款)
     */
    public paymentState!: number;

    /**
     * 充值状态  0. 不需要, 10. 未调用,  20. 调用中, 21. 调用失败 30. 已受理, 40. 回调成功, 50. 回调失败, 60. 重新发起
     */
    public rechargeState!: number;


    constructor(options?:any){
        
        if(options&&options['isFreeze']){
            this.isFreeze=options['isFreeze'];
        }
        else{
            this.isFreeze=undefined
        }
    
        if(options&&options['mark']){
            this.mark=options['mark'];
        }
        else{
            this.mark=undefined
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
    
        if(options&&options['paymentState']){
            this.paymentState=options['paymentState'];
        }
        else{
            this.paymentState=undefined
        }
    
        if(options&&options['rechargeState']){
            this.rechargeState=options['rechargeState'];
        }
        else{
            this.rechargeState=undefined
        }
    
    }
}
