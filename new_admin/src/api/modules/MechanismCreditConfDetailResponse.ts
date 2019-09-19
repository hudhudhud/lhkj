import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MechanismCreditConfDetailResponse {

    /**
     * 积分数量
     */
    public amount!: number;

    /**
     * 积分图标
     */
    public creditIconUrl!: string;

    /**
     * 积分类别id
     */
    public creditTypeId!: number;

    /**
     * 积分类型名称
     */
    public creditTypeName!: string;

    /**
     * 已发放数量
     */
    public grantAmount!: number;

    /**
     * 配置详情id
     */
    public id!: number;

    /**
     * 机构id
     */
    public mechanismId!: number;


    constructor(options?:any){
        
        if(options&&options['amount']){
            this.amount=options['amount'];
        }
        else{
            this.amount=undefined
        }
    
        if(options&&options['creditIconUrl']){
            this.creditIconUrl=options['creditIconUrl'];
        }
        else{
            this.creditIconUrl=undefined
        }
    
        if(options&&options['creditTypeId']){
            this.creditTypeId=options['creditTypeId'];
        }
        else{
            this.creditTypeId=undefined
        }
    
        if(options&&options['creditTypeName']){
            this.creditTypeName=options['creditTypeName'];
        }
        else{
            this.creditTypeName=undefined
        }
    
        if(options&&options['grantAmount']){
            this.grantAmount=options['grantAmount'];
        }
        else{
            this.grantAmount=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['mechanismId']){
            this.mechanismId=options['mechanismId'];
        }
        else{
            this.mechanismId=undefined
        }
    
    }
}
