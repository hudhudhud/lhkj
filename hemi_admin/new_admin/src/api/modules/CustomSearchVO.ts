import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CustomSearchVO {

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 注册时间-截止时间
     */
    public endTime!: string;

    /**
     * 用户id
     */
    public id!: string;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 用户所属商户
     */
    public merchantId!: number;

    /**
     * 商户列表
     */
    public merchantIdList!: number[];

    /**
     * 用户昵称
     */
    public nickname!: string;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 注册时间-起始时间
     */
    public startTime!: string;

    /**
     * 手机号码
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
    
        if(options&&options['endTime']){
            this.endTime=options['endTime'];
        }
        else{
            this.endTime=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
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
    
        if(options&&options['merchantIdList']){
            this.merchantIdList=options['merchantIdList'];
        }
        else{
            this.merchantIdList=undefined
        }
    
        if(options&&options['nickname']){
            this.nickname=options['nickname'];
        }
        else{
            this.nickname=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['startTime']){
            this.startTime=options['startTime'];
        }
        else{
            this.startTime=undefined
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
