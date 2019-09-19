import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OutGivingCreditToConsumerInfoVO {

    /**
     * 用户编号
     */
    public customNo!: string;

    /**
     * 手机号
     */
    public phone!: string;


    constructor(options?:any){
        
        if(options&&options['customNo']){
            this.customNo=options['customNo'];
        }
        else{
            this.customNo=undefined
        }
    
        if(options&&options['phone']){
            this.phone=options['phone'];
        }
        else{
            this.phone=undefined
        }
    
    }
}
