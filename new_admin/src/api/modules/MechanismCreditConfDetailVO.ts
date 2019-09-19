import Pager from "../base/Pager";
import MechanismUserVO from "./MechanismUserVO";

/**
 * 作者没有写注释!!!
 */
export default class MechanismCreditConfDetailVO {

    /**
     * 积分变动数量
     */
    public changeAmount!: number;

    /**
     * 积分类别id
     */
    public creditTypeId!: number;

    /**
     * 积分类型名称
     */
    public creditTypeName!: string;

    /**
     * 机构员工信息
     */
    public mechanismUser!: MechanismUserVO;

    /**
     * 下属机构id
     */
    public subsidiaryMechanismId!: number;

    /**
     * 下属机构名称
     */
    public subsidiaryMechanismName!: string;


    constructor(options?:any){
        
        if(options&&options['changeAmount']){
            this.changeAmount=options['changeAmount'];
        }
        else{
            this.changeAmount=undefined
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
    
        if(options&&options['mechanismUser']){
            this.mechanismUser=options['mechanismUser'];
        }
        else{
            this.mechanismUser=undefined
        }
    
        if(options&&options['subsidiaryMechanismId']){
            this.subsidiaryMechanismId=options['subsidiaryMechanismId'];
        }
        else{
            this.subsidiaryMechanismId=undefined
        }
    
        if(options&&options['subsidiaryMechanismName']){
            this.subsidiaryMechanismName=options['subsidiaryMechanismName'];
        }
        else{
            this.subsidiaryMechanismName=undefined
        }
    
    }
}
