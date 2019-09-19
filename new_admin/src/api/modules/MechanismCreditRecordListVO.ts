import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MechanismCreditRecordListVO {

    /**
     * 积分类型id列表
     */
    public creditTypeIdList!: number[];

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 用户编号
     */
    public customNo!: string;

    /**
     * 分页数据
     */
    public list!: MechanismCreditRecordListVO[];

    /**
     * 机构id
     */
    public mechanismId!: number;

    /**
     * 登陆机构人员id
     */
    public mechanismUserId!: number;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 发放手机号
     */
    public phone!: string;

    /**
     * 总条数
     */
    public totalCount!: number;


    constructor(options?:any){
        
        if(options&&options['creditTypeIdList']){
            this.creditTypeIdList=options['creditTypeIdList'];
        }
        else{
            this.creditTypeIdList=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['customNo']){
            this.customNo=options['customNo'];
        }
        else{
            this.customNo=undefined
        }
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['mechanismId']){
            this.mechanismId=options['mechanismId'];
        }
        else{
            this.mechanismId=undefined
        }
    
        if(options&&options['mechanismUserId']){
            this.mechanismUserId=options['mechanismUserId'];
        }
        else{
            this.mechanismUserId=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['phone']){
            this.phone=options['phone'];
        }
        else{
            this.phone=undefined
        }
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
    }
}
