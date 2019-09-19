import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ActTemplateResponse {

    /**
     * 模板id
     */
    public id!: number;

    /**
     * 模板code
     */
    public templateCode!: string;

    /**
     * 模板配置
     */
    public templateConfig!: string;

    /**
     * 模板名称
     */
    public templateName!: string;

    /**
     * 模板状态   1-可用  0-不可用
     */
    public templateStatus!: number;

    /**
     * 模板类型 1-特卖，2-抽奖， 3-秒杀
     */
    public templateType!: number;

    /**
     * 模板缩略图
     */
    public templateUrl!: string;


    constructor(options?:any){
        
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['templateCode']){
            this.templateCode=options['templateCode'];
        }
        else{
            this.templateCode=undefined
        }
    
        if(options&&options['templateConfig']){
            this.templateConfig=options['templateConfig'];
        }
        else{
            this.templateConfig=undefined
        }
    
        if(options&&options['templateName']){
            this.templateName=options['templateName'];
        }
        else{
            this.templateName=undefined
        }
    
        if(options&&options['templateStatus']){
            this.templateStatus=options['templateStatus'];
        }
        else{
            this.templateStatus=undefined
        }
    
        if(options&&options['templateType']){
            this.templateType=options['templateType'];
        }
        else{
            this.templateType=undefined
        }
    
        if(options&&options['templateUrl']){
            this.templateUrl=options['templateUrl'];
        }
        else{
            this.templateUrl=undefined
        }
    
    }
}
