import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CreditTypeDetailResponse {

    /**
     * 兑换比
     */
    public cashierRate!: number;

    /**
     * 创建时间
     */
    public createTime!: string;

    /**
     * 积分图标
     */
    public creditIconUrl!: string;

    /**
     * 兑换比率
     */
    public exchangeRate!: number;

    /**
     * 主键id
     */
    public id!: number;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 积分类型名称
     */
    public name!: string;

    /**
     * 积分统称名称
     */
    public titleName!: string;

    /**
     * 更新时间
     */
    public updateTime!: string;

    /**
     * 版本号
     */
    public version!: number;


    constructor(options?:any){
        
        if(options&&options['cashierRate']){
            this.cashierRate=options['cashierRate'];
        }
        else{
            this.cashierRate=undefined
        }
    
        if(options&&options['createTime']){
            this.createTime=options['createTime'];
        }
        else{
            this.createTime=undefined
        }
    
        if(options&&options['creditIconUrl']){
            this.creditIconUrl=options['creditIconUrl'];
        }
        else{
            this.creditIconUrl=undefined
        }
    
        if(options&&options['exchangeRate']){
            this.exchangeRate=options['exchangeRate'];
        }
        else{
            this.exchangeRate=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
        if(options&&options['titleName']){
            this.titleName=options['titleName'];
        }
        else{
            this.titleName=undefined
        }
    
        if(options&&options['updateTime']){
            this.updateTime=options['updateTime'];
        }
        else{
            this.updateTime=undefined
        }
    
        if(options&&options['version']){
            this.version=options['version'];
        }
        else{
            this.version=undefined
        }
    
    }
}
