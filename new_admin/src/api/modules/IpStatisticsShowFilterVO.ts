import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class IpStatisticsShowFilterVO {

    /**
     * 批量修改是人数大于30时,需要确认
     */
    public confirm!: boolean;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 用户id列表
     */
    public custIdList!: string[];

    /**
     * 日期
     */
    public date!: string;

    /**
     * 登陆ip集合
     */
    public ipList!: string[];

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
        
        if(options&&options['confirm']){
            this.confirm=options['confirm'];
        }
        else{
            this.confirm=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['custIdList']){
            this.custIdList=options['custIdList'];
        }
        else{
            this.custIdList=undefined
        }
    
        if(options&&options['date']){
            this.date=options['date'];
        }
        else{
            this.date=undefined
        }
    
        if(options&&options['ipList']){
            this.ipList=options['ipList'];
        }
        else{
            this.ipList=undefined
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
