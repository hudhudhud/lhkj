import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class WhiteListDefVO {

    /**
     * 模板名
     */
    public defName!: string;

    /**
     * 主键id
     */
    public id!: number;

    /**
     * 类型,0 手机号头部匹配，1 地区白名单，2 号码白名单，3 号码黑名单，4 API限制
     */
    public type!: number;


    constructor(options?:any){
        
        if(options&&options['defName']){
            this.defName=options['defName'];
        }
        else{
            this.defName=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['type']){
            this.type=options['type'];
        }
        else{
            this.type=undefined
        }
    
    }
}
