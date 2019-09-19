import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class WhitePhoneListVO {

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 白名单定义id
     */
    public defId!: number;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 手机号
     */
    public tel!: string;

    /**
     * 总条数
     */
    public totalCount!: number;


    constructor(options?:any){
        
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['defId']){
            this.defId=options['defId'];
        }
        else{
            this.defId=undefined
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
    
        if(options&&options['tel']){
            this.tel=options['tel'];
        }
        else{
            this.tel=undefined
        }
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
    }
}
