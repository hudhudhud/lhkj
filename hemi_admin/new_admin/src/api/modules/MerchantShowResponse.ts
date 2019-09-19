import Pager from "../base/Pager";
import AuthPayConnectionResponse from "./AuthPayConnectionResponse";
import MerchantCustomResponse from "./MerchantCustomResponse";
import MerchantResponse from "./MerchantResponse";

/**
 * 作者没有写注释!!!
 */
export default class MerchantShowResponse {

    /**
     * 作者没写注释!!
     */
    public authPayConnectionResponses!: AuthPayConnectionResponse[];

    /**
     * 作者没写注释!!
     */
    public customMerchant!: MerchantCustomResponse;

    /**
     * 作者没写注释!!
     */
    public merchantResponse!: MerchantResponse;


    constructor(options?:any){
        
        if(options&&options['authPayConnectionResponses']){
            this.authPayConnectionResponses=options['authPayConnectionResponses'];
        }
        else{
            this.authPayConnectionResponses=undefined
        }
    
        if(options&&options['customMerchant']){
            this.customMerchant=options['customMerchant'];
        }
        else{
            this.customMerchant=undefined
        }
    
        if(options&&options['merchantResponse']){
            this.merchantResponse=options['merchantResponse'];
        }
        else{
            this.merchantResponse=undefined
        }
    
    }
}
