import Pager from "../base/Pager";
import MerchantVO from "./MerchantVO";

/**
 * 作者没有写注释!!!
 */
export default class UserMerchantVO {

    /**
     * 商户List
     */
    public merchantList!: MerchantVO[];

    /**
     * 系统角色id
     */
    public roleId!: string;

    /**
     * 用户id
     */
    public userId!: number;


    constructor(options?:any){
        
        if(options&&options['merchantList']){
            this.merchantList=options['merchantList'];
        }
        else{
            this.merchantList=undefined
        }
    
        if(options&&options['roleId']){
            this.roleId=options['roleId'];
        }
        else{
            this.roleId=undefined
        }
    
        if(options&&options['userId']){
            this.userId=options['userId'];
        }
        else{
            this.userId=undefined
        }
    
    }
}
