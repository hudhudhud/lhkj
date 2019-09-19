import Pager from "../base/Pager";
import OrderCommonInfoResponse from "./OrderCommonInfoResponse";
import OrderTicketDetailResponse from "./OrderTicketDetailResponse";

/**
 * 作者没有写注释!!!
 */
export default class OrderCommonTotalInfoResponse {

    /**
     * common订单信息
     */
    public commonInfo!: OrderCommonInfoResponse;

    /**
     * 订单号
     */
    public orderCode!: string;

    /**
     * 票信息列表
     */
    public ticketDetails!: OrderTicketDetailResponse[];


    constructor(options?:any){
        
        if(options&&options['commonInfo']){
            this.commonInfo=options['commonInfo'];
        }
        else{
            this.commonInfo=undefined
        }
    
        if(options&&options['orderCode']){
            this.orderCode=options['orderCode'];
        }
        else{
            this.orderCode=undefined
        }
    
        if(options&&options['ticketDetails']){
            this.ticketDetails=options['ticketDetails'];
        }
        else{
            this.ticketDetails=undefined
        }
    
    }
}
