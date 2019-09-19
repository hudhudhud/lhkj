import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class AuthPayConnectionResponse {

    /**
     * 认证类型
     */
    public authType!: number;

    /**
     * id
     */
    public id!: number;

    /**
     * 支付类型
     */
    public payType!: number;

    /**
     * 支付类型名称
     */
    public payTypeName!: string;


    constructor(options?:any){
        
        if(options&&options['authType']){
            this.authType=options['authType'];
        }
        else{
            this.authType=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['payType']){
            this.payType=options['payType'];
        }
        else{
            this.payType=undefined
        }
    
        if(options&&options['payTypeName']){
            this.payTypeName=options['payTypeName'];
        }
        else{
            this.payTypeName=undefined
        }
    
    }
}
