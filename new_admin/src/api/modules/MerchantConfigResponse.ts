import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MerchantConfigResponse {

    /**
     * 活动id
     */
    public id!: number;

    /**
     * 是否删除
     */
    public isDeleted!: string;

    /**
     * 是否退出登录
     */
    public isExitLogon!: string;

    /**
     * 商户配置
     */
    public merchantConfig!: string;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 平台配置
     */
    public platformConfig!: string;

    /**
     * 商户电话
     */
    public serviceTel!: string;

    /**
     * 底部配置
     */
    public tabConfig!: string;

    /**
     * 模板名称
     */
    public templateName!: string;


    constructor(options?:any){
        
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['isDeleted']){
            this.isDeleted=options['isDeleted'];
        }
        else{
            this.isDeleted=undefined
        }
    
        if(options&&options['isExitLogon']){
            this.isExitLogon=options['isExitLogon'];
        }
        else{
            this.isExitLogon=undefined
        }
    
        if(options&&options['merchantConfig']){
            this.merchantConfig=options['merchantConfig'];
        }
        else{
            this.merchantConfig=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['platformConfig']){
            this.platformConfig=options['platformConfig'];
        }
        else{
            this.platformConfig=undefined
        }
    
        if(options&&options['serviceTel']){
            this.serviceTel=options['serviceTel'];
        }
        else{
            this.serviceTel=undefined
        }
    
        if(options&&options['tabConfig']){
            this.tabConfig=options['tabConfig'];
        }
        else{
            this.tabConfig=undefined
        }
    
        if(options&&options['templateName']){
            this.templateName=options['templateName'];
        }
        else{
            this.templateName=undefined
        }
    
    }
}
