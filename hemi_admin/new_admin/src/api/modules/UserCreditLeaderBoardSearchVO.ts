import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class UserCreditLeaderBoardSearchVO {

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 用户id
     */
    public customId!: number;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 页面大小
     */
    public pageSize!: number;

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
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
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
    
    }
}
