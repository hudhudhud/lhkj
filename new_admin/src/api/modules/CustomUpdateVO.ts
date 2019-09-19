import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class CustomUpdateVO {

    /**
     * 用户id
     */
    public id!: string;

    /**
     * 忽略风控状态标识
     */
    public isIgnoreRisk!: number;

    /**
     * 状态标识
     */
    public statusCode!: number;


    constructor(options?:any){
        
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['isIgnoreRisk']){
            this.isIgnoreRisk=options['isIgnoreRisk'];
        }
        else{
            this.isIgnoreRisk=undefined
        }
    
        if(options&&options['statusCode']){
            this.statusCode=options['statusCode'];
        }
        else{
            this.statusCode=undefined
        }
    
    }
}
