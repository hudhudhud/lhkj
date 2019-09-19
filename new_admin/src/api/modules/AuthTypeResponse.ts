import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class AuthTypeResponse {

    /**
     * 配置类型:0手机登陆1:微信开放平台登陆2:微信公众号3:中行4:工商银行5:建行6:工行融e联
     */
    public authType!: string;

    /**
     * 类型名称
     */
    public name!: string;

    /**
     * 状态:0无效1有效
     */
    public status!: string;


    constructor(options?:any){
        
        if(options&&options['authType']){
            this.authType=options['authType'];
        }
        else{
            this.authType=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
    }
}
