import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class UserLoginVO {

    /**
     * 验证码
     */
    public code!: string;

    /**
     * 登陆密码
     */
    public password!: string;

    /**
     * 登陆用户名
     */
    public username!: string;

    /**
     * 验证码对应的id
     */
    public verifyId!: string;


    constructor(options?:any){
        
        if(options&&options['code']){
            this.code=options['code'];
        }
        else{
            this.code=undefined
        }
    
        if(options&&options['password']){
            this.password=options['password'];
        }
        else{
            this.password=undefined
        }
    
        if(options&&options['username']){
            this.username=options['username'];
        }
        else{
            this.username=undefined
        }
    
        if(options&&options['verifyId']){
            this.verifyId=options['verifyId'];
        }
        else{
            this.verifyId=undefined
        }
    
    }
}
