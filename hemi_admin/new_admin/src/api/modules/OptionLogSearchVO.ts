import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OptionLogSearchVO {

    /**
     * 关联id, 如订单号,活动id,等
     */
    public relatedId!: string;

    /**
     * 日志分类
     */
    public type!: number;


    constructor(options?:any){
        
        if(options&&options['relatedId']){
            this.relatedId=options['relatedId'];
        }
        else{
            this.relatedId=undefined
        }
    
        if(options&&options['type']){
            this.type=options['type'];
        }
        else{
            this.type=undefined
        }
    
    }
}
