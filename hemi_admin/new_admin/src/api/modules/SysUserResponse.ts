import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class SysUserResponse {

    /**
     * 绑定微信时的用户id
     */
    public customId!: string;

    /**
     * 用户id
     */
    public id!: number;

    /**
     * 用户昵称
     */
    public nickName!: string;

    /**
     * 是否密码登录
     */
    public pwdLogin!: number;

    /**
     * 用户状态
     */
    public status!: number;

    /**
     * 用户名
     */
    public username!: string;


    constructor(options?:any){
        
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['nickName']){
            this.nickName=options['nickName'];
        }
        else{
            this.nickName=undefined
        }
    
        if(options&&options['pwdLogin']){
            this.pwdLogin=options['pwdLogin'];
        }
        else{
            this.pwdLogin=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
        if(options&&options['username']){
            this.username=options['username'];
        }
        else{
            this.username=undefined
        }
    
    }
}
