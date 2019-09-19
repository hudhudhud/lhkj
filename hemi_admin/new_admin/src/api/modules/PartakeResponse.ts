import Pager from "../base/Pager";
import PartakeActResponse from "./PartakeActResponse";

/**
 * 作者没有写注释!!!
 */
export default class PartakeResponse {

    /**
     * 作者没写注释!!
     */
    public actNumList!: PartakeActResponse[];

    /**
     * 作者没写注释!!
     */
    public deliveredOrderNum!: number;

    /**
     * 作者没写注释!!
     */
    public orderTotalNum!: number;

    /**
     * 作者没写注释!!
     */
    public paidOrderNum!: number;


    constructor(options?:any){
        
        if(options&&options['actNumList']){
            this.actNumList=options['actNumList'];
        }
        else{
            this.actNumList=undefined
        }
    
        if(options&&options['deliveredOrderNum']){
            this.deliveredOrderNum=options['deliveredOrderNum'];
        }
        else{
            this.deliveredOrderNum=undefined
        }
    
        if(options&&options['orderTotalNum']){
            this.orderTotalNum=options['orderTotalNum'];
        }
        else{
            this.orderTotalNum=undefined
        }
    
        if(options&&options['paidOrderNum']){
            this.paidOrderNum=options['paidOrderNum'];
        }
        else{
            this.paidOrderNum=undefined
        }
    
    }
}
