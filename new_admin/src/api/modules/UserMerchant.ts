import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class UserMerchant {

    /**
     * 作者没写注释!!
     */
    public createTime!: string;

    /**
     * 作者没写注释!!
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public merchantId!: number;

    /**
     * 作者没写注释!!
     */
    public merchantName!: string;

    /**
     * 作者没写注释!!
     */
    public roleId!: string;

    /**
     * 作者没写注释!!
     */
    public updateTime!: string;

    /**
     * 作者没写注释!!
     */
    public userId!: number;


    constructor(options?:any){
        
        if(options&&options['createTime']){
            this.createTime=options['createTime'];
        }
        else{
            this.createTime=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
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
    
        if(options&&options['roleId']){
            this.roleId=options['roleId'];
        }
        else{
            this.roleId=undefined
        }
    
        if(options&&options['updateTime']){
            this.updateTime=options['updateTime'];
        }
        else{
            this.updateTime=undefined
        }
    
        if(options&&options['userId']){
            this.userId=options['userId'];
        }
        else{
            this.userId=undefined
        }
    
    }
}
