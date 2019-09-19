import Pager from "../base/Pager";
import SysUserResponse from "./SysUserResponse";

/**
 * 作者没有写注释!!!
 */
export default class UserLoginResponse {

    /**
     * token
     */
    public token!: string;

    /**
     * 用户信息
     */
    public user!: SysUserResponse;


    constructor(options?:any){
        
        if(options&&options['token']){
            this.token=options['token'];
        }
        else{
            this.token=undefined
        }
    
        if(options&&options['user']){
            this.user=options['user'];
        }
        else{
            this.user=undefined
        }
    
    }
}
