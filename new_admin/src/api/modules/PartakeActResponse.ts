import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class PartakeActResponse {

    /**
     * 活动名称
     */
    public actName!: string;

    /**
     * 作者没写注释!!
     */
    public actNum!: number;

    /**
     * 活动id
     */
    public id!: number;

    /**
     * 商户Id
     */
    public merchantId!: number;


    constructor(options?:any){
        
        if(options&&options['actName']){
            this.actName=options['actName'];
        }
        else{
            this.actName=undefined
        }
    
        if(options&&options['actNum']){
            this.actNum=options['actNum'];
        }
        else{
            this.actNum=undefined
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
    
    }
}
