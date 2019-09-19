import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class QueryCreditTypeListVO {

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 积分类型名称
     */
    public name!: string;


    constructor(options?:any){
        
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
    }
}
