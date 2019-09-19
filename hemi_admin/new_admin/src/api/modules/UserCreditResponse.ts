import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class UserCreditResponse {

    /**
     * 累计积分
     */
    public accumulatedCredit!: number;

    /**
     * 客户id
     */
    public customId!: string;

    /**
     * 过期积分
     */
    public expiredAmount!: number;

    /**
     * 冻结积分
     */
    public freezeCredit!: number;

    /**
     * 主键id
     */
    public id!: number;

    /**
     * 可用积分
     */
    public useableCredit!: number;


    constructor(options?:any){
        
        if(options&&options['accumulatedCredit']){
            this.accumulatedCredit=options['accumulatedCredit'];
        }
        else{
            this.accumulatedCredit=undefined
        }
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['expiredAmount']){
            this.expiredAmount=options['expiredAmount'];
        }
        else{
            this.expiredAmount=undefined
        }
    
        if(options&&options['freezeCredit']){
            this.freezeCredit=options['freezeCredit'];
        }
        else{
            this.freezeCredit=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['useableCredit']){
            this.useableCredit=options['useableCredit'];
        }
        else{
            this.useableCredit=undefined
        }
    
    }
}
