import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class WhiteDefSearchVO {

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 模板名
     */
    public defName!: string;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 总条数
     */
    public totalCount!: number;

    /**
     * 类型,0 手机号头部匹配，1 地区白名单，2 号码白名单，3 号码黑名单，4 API限制
     */
    public type!: number;


    constructor(options?:any){
        
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['defName']){
            this.defName=options['defName'];
        }
        else{
            this.defName=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
        if(options&&options['type']){
            this.type=options['type'];
        }
        else{
            this.type=undefined
        }
    
    }
}
