import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CreditTypeBaseVO {

    /**
     * 积分类型id
     */
    public id!: number;


    constructor(options?:any){
        
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
    }
}
