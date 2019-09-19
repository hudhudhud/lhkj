import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MechanismCreditConfSearchVO {

    /**
     * 机构id
     */
    public mechanismId!: number;

    /**
     * 登陆机构人员id
     */
    public mechanismUserId!: number;

    /**
     * 下属机构名称
     */
    public subsidiaryName!: string;


    constructor(options?:any){
        
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
    
        if(options&&options['subsidiaryName']){
            this.subsidiaryName=options['subsidiaryName'];
        }
        else{
            this.subsidiaryName=undefined
        }
    
    }
}
