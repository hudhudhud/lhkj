import Pager from "../base/Pager";
import RefundRecordDataResponse from "./RefundRecordDataResponse";

/**
 * 作者没有写注释!!!
 */
export default class RefundRecordResponse {

    /**
     * 当前查询结果的退款总额
     */
    public amount!: any;

    /**
     * 退款流水查询结果
     */
    public list!: RefundRecordDataResponse[];

    /**
     * 分页信息
     */
    public pager!: Pager<string>;


    constructor(options?:any){
        
        if(options&&options['amount']){
            this.amount=options['amount'];
        }
        else{
            this.amount=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['pager']){
            this.pager=options['pager'];
        }
        else{
            this.pager=undefined
        }
    
    }
}
