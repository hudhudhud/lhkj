import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class HemiUserResponse {

    /**
     * 商户Id
     */
    public merchantId!: number;

    /**
     * 商户名称
     */
    public merchantName!: string;

    /**
     * 用户注册时间
     */
    public registerTime!: string;

    /**
     * 手机号
     */
    public tel!: string;


    constructor(options?:any){
        
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['merchantName']){
            this.merchantName=options['merchantName'];
        }
        else{
            this.merchantName=undefined
        }
    
        if(options&&options['registerTime']){
            this.registerTime=options['registerTime'];
        }
        else{
            this.registerTime=undefined
        }
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
    }
}
