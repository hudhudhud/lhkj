import Pager from "../base/Pager";
import MechanismCreditConfDetailResponse from "./MechanismCreditConfDetailResponse";

/**
 * 作者没有写注释!!!
 */
export default class MechanismCreditConfResponse {

    /**
     * 机构的积分配置信息
     */
    public creditConfDetailList!: MechanismCreditConfDetailResponse[];

    /**
     * 机构id
     */
    public mechanismId!: number;

    /**
     * 机构名称
     */
    public mechanismName!: string;

    /**
     * 下属机构信息
     */
    public subsidiaryConfList!: MechanismCreditConfResponse[];


    constructor(options?:any){
        
        if(options&&options['creditConfDetailList']){
            this.creditConfDetailList=options['creditConfDetailList'];
        }
        else{
            this.creditConfDetailList=undefined
        }
    
        if(options&&options['mechanismId']){
            this.mechanismId=options['mechanismId'];
        }
        else{
            this.mechanismId=undefined
        }
    
        if(options&&options['mechanismName']){
            this.mechanismName=options['mechanismName'];
        }
        else{
            this.mechanismName=undefined
        }
    
        if(options&&options['subsidiaryConfList']){
            this.subsidiaryConfList=options['subsidiaryConfList'];
        }
        else{
            this.subsidiaryConfList=undefined
        }
    
    }
}
