import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class EnumEntityObject {

    /**
     * 状态码
     */
    public code!: any;

    /**
     * 描述信息
     */
    public desc!: string;


    constructor(options?:any){
        
        if(options&&options['code']){
            this.code=options['code'];
        }
        else{
            this.code=undefined
        }
    
        if(options&&options['desc']){
            this.desc=options['desc'];
        }
        else{
            this.desc=undefined
        }
    
    }
}
