import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OptionLogResponse {

    /**
     * 将订单状态标记为完成
     */
    public content!: string;

    /**
     * 操作时间
     */
    public createTime!: string;

    /**
     * 序号
     */
    public id!: number;

    /**
     * 1231
     */
    public optId!: number;

    /**
     * 李四
     */
    public optName!: string;

    /**
     * 关联id,如订单号,活动id等
     */
    public relatedId!: string;

    /**
     * 日志类型
     */
    public type!: number;


    constructor(options?:any){
        
        if(options&&options['content']){
            this.content=options['content'];
        }
        else{
            this.content=undefined
        }
    
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
    
        if(options&&options['optId']){
            this.optId=options['optId'];
        }
        else{
            this.optId=undefined
        }
    
        if(options&&options['optName']){
            this.optName=options['optName'];
        }
        else{
            this.optName=undefined
        }
    
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
