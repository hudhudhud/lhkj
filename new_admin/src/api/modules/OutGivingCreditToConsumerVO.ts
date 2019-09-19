import Pager from "../base/Pager";
import OutGivingCreditToConsumerInfoVO from "./OutGivingCreditToConsumerInfoVO";
import MechanismUserVO from "./MechanismUserVO";

/**
 * 作者没有写注释!!!
 */
export default class OutGivingCreditToConsumerVO {

    /**
     * 活动id
     */
    public actId!: number;

    /**
     * 用户信息列表
     */
    public consumerInfoList!: OutGivingCreditToConsumerInfoVO[];

    /**
     * 用户编号
     */
    public customNo!: string;

    /**
     * 机构员工信息
     */
    public mechanismUser!: MechanismUserVO;

    /**
     * 手机号
     */
    public phone!: string;

    /**
     * 商品id
     */
    public proStandardId!: number;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['consumerInfoList']){
            this.consumerInfoList=options['consumerInfoList'];
        }
        else{
            this.consumerInfoList=undefined
        }
    
        if(options&&options['customNo']){
            this.customNo=options['customNo'];
        }
        else{
            this.customNo=undefined
        }
    
        if(options&&options['mechanismUser']){
            this.mechanismUser=options['mechanismUser'];
        }
        else{
            this.mechanismUser=undefined
        }
    
        if(options&&options['phone']){
            this.phone=options['phone'];
        }
        else{
            this.phone=undefined
        }
    
        if(options&&options['proStandardId']){
            this.proStandardId=options['proStandardId'];
        }
        else{
            this.proStandardId=undefined
        }
    
    }
}
