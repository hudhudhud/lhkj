import Pager from "../base/Pager";
import TbOrderBaseInfoResponse from "./TbOrderBaseInfoResponse";
import OrderCreditGoodsDetailResponse from "./OrderCreditGoodsDetailResponse";

/**
 * 作者没有写注释!!!
 */
export default class TbOrderDetailResponse {

    /**
     * TB订单信息
     */
    public baseInfo!: TbOrderBaseInfoResponse;

    /**
     * 订单积分商品信息
     */
    public creditGoodsDetailList!: OrderCreditGoodsDetailResponse[];

    /**
     * 订单号
     */
    public orderCode!: string;


    constructor(options?:any){
        
        if(options&&options['baseInfo']){
            this.baseInfo=options['baseInfo'];
        }
        else{
            this.baseInfo=undefined
        }
    
        if(options&&options['creditGoodsDetailList']){
            this.creditGoodsDetailList=options['creditGoodsDetailList'];
        }
        else{
            this.creditGoodsDetailList=undefined
        }
    
        if(options&&options['orderCode']){
            this.orderCode=options['orderCode'];
        }
        else{
            this.orderCode=undefined
        }
    
    }
}
