import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CreditTypeUpdateVO {

    /**
     * 积分图标url
     */
    public creditIconUrl!: string;

    /**
     * 兑换比率
     */
    public exchangeRate!: number;

    /**
     * 积分类型id
     */
    public id!: number;

    /**
     * 积分类型名称
     */
    public name!: string;

    /**
     * 积分类型标题不能为空
     */
    public titleName!: string;


    constructor(options?:any){
        
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
    
    }
}
