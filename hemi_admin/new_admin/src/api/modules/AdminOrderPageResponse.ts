import Pager from "../base/Pager";
import OrderCommonTotalInfoResponse from "./OrderCommonTotalInfoResponse";
import AdminOrderStatisticsResponse from "./AdminOrderStatisticsResponse";
import TbOrderDetailResponse from "./TbOrderDetailResponse";

/**
 * 作者没有写注释!!!
 */
export default class AdminOrderPageResponse {

    /**
     * cm订单列表信息
     */
    public cmOrderPager!: Pager<OrderCommonTotalInfoResponse>;

    /**
     * 后台订单列表统计信息
     */
    public statistics!: AdminOrderStatisticsResponse;

    /**
     * tb订单列表信息
     */
    public tbOrderPager!: Pager<TbOrderDetailResponse>;


    constructor(options?:any){
        
        if(options&&options['cmOrderPager']){
            this.cmOrderPager=options['cmOrderPager'];
        }
        else{
            this.cmOrderPager=undefined
        }
    
        if(options&&options['statistics']){
            this.statistics=options['statistics'];
        }
        else{
            this.statistics=undefined
        }
    
        if(options&&options['tbOrderPager']){
            this.tbOrderPager=options['tbOrderPager'];
        }
        else{
            this.tbOrderPager=undefined
        }
    
    }
}
