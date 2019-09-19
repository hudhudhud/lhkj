import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class UserPasswordChangeVO {

    /**
     * 新密码
     */
    public newPassword!: string;

    /**
     * 确认密码
     */
    public newPasswordConfirm!: string;

    /**
     * 旧用户密码
     */
    public oldPassword!: string;


    constructor(options?:any){
        
        if(options&&options['newPassword']){
            this.newPassword=options['newPassword'];
        }
        else{
            this.newPassword=undefined
        }
    
        if(options&&options['newPasswordConfirm']){
            this.newPasswordConfirm=options['newPasswordConfirm'];
        }
        else{
            this.newPasswordConfirm=undefined
        }
    
        if(options&&options['oldPassword']){
            this.oldPassword=options['oldPassword'];
        }
        else{
            this.oldPassword=undefined
        }
    
    }
}
