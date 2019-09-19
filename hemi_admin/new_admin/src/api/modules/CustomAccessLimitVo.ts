import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CustomAccessLimitVo {

    /**
     * 作者没写注释!!
     */
    public account!: string;

    /**
     * 作者没写注释!!
     */
    public attachId!: string;

    /**
     * 作者没写注释!!
     */
    public errMsg!: string;

    /**
     * 白名单限制id
     */
    public ids!: string;

    /**
     * 作者没写注释!!
     */
    public ip!: string;

    /**
     * 作者没写注释!!
     */
    public merchantId!: string;

    /**
     * 手机号
     */
    public mobile!: string;


    constructor(options?:any){
        
        if(options&&options['account']){
            this.account=options['account'];
        }
        else{
            this.account=undefined
        }
    
        if(options&&options['attachId']){
            this.attachId=options['attachId'];
        }
        else{
            this.attachId=undefined
        }
    
        if(options&&options['errMsg']){
            this.errMsg=options['errMsg'];
        }
        else{
            this.errMsg=undefined
        }
    
        if(options&&options['ids']){
            this.ids=options['ids'];
        }
        else{
            this.ids=undefined
        }
    
        if(options&&options['ip']){
            this.ip=options['ip'];
        }
        else{
            this.ip=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['mobile']){
            this.mobile=options['mobile'];
        }
        else{
            this.mobile=undefined
        }
    
    }
}
