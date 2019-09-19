import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class BWMobileListResponse {

    /**
     * 定义id
     */
    public defId!: string;

    /**
     * 主键id
     */
    public id!: number;

    /**
     * 手机号
     */
    public mobile!: string;


    constructor(options?:any){
        
        if(options&&options['defId']){
            this.defId=options['defId'];
        }
        else{
            this.defId=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['mobile']){
            this.mobile=options['mobile'];
        }
        else{
            this.mobile=undefined
        }
    
    }
}
