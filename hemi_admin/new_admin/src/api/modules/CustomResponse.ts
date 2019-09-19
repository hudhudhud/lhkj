import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CustomResponse {

    /**
     * 用户生日
     */
    public birthday!: string;

    /**
     * 用户头像地址
     */
    public headImgUrl!: string;

    /**
     * 用户id
     */
    public id!: string;

    /**
     * 是否经过风险控制 0:未 1:是
     */
    public isRisk!: number;

    /**
     * 用户所属商户
     */
    public merchantId!: number;

    /**
     * 用户昵称
     */
    public nickname!: string;

    /**
     * 注册时间
     */
    public registerTime!: string;

    /**
     * 用户状态
     */
    public statusCode!: number;

    /**
     * 手机号码
     */
    public tel!: string;


    constructor(options?:any){
        
        if(options&&options['birthday']){
            this.birthday=options['birthday'];
        }
        else{
            this.birthday=undefined
        }
    
        if(options&&options['headImgUrl']){
            this.headImgUrl=options['headImgUrl'];
        }
        else{
            this.headImgUrl=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['isRisk']){
            this.isRisk=options['isRisk'];
        }
        else{
            this.isRisk=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['nickname']){
            this.nickname=options['nickname'];
        }
        else{
            this.nickname=undefined
        }
    
        if(options&&options['registerTime']){
            this.registerTime=options['registerTime'];
        }
        else{
            this.registerTime=undefined
        }
    
        if(options&&options['statusCode']){
            this.statusCode=options['statusCode'];
        }
        else{
            this.statusCode=undefined
        }
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
    }
}
