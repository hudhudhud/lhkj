import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MechanismUserVO {

    /**
     * 员工id
     */
    public id!: number;

    /**
     * 工号
     */
    public jobNo!: string;

    /**
     * 对应机构id
     */
    public mechanismId!: number;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 对应系统用户id
     */
    public name!: string;

    /**
     * 手机号
     */
    public phone!: string;

    /**
     * 对应系统用户id
     */
    public sysUserId!: number;


    constructor(options?:any){
        
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['jobNo']){
            this.jobNo=options['jobNo'];
        }
        else{
            this.jobNo=undefined
        }
    
        if(options&&options['mechanismId']){
            this.mechanismId=options['mechanismId'];
        }
        else{
            this.mechanismId=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
        if(options&&options['phone']){
            this.phone=options['phone'];
        }
        else{
            this.phone=undefined
        }
    
        if(options&&options['sysUserId']){
            this.sysUserId=options['sysUserId'];
        }
        else{
            this.sysUserId=undefined
        }
    
    }
}
