import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ListDefResonse {

    /**
     * 积分定义名称
     */
    public defName!: string;

    /**
     * 定义id
     */
    public id!: number;

    /**
     * 商户id--无用
     */
    public merchantId!: number;

    /**
     * 积分定义类型
     */
    public type!: number;


    constructor(options?:any){
        
        if(options&&options['defName']){
            this.defName=options['defName'];
        }
        else{
            this.defName=undefined
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
    
        if(options&&options['type']){
            this.type=options['type'];
        }
        else{
            this.type=undefined
        }
    
    }
}
