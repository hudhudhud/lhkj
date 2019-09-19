import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class WhiteDefConfigVO {

    /**
     * 对应的class名称
     */
    public className!: string;

    /**
     * 自定义config
     */
    public config!: string;

    /**
     * 白名单定义id
     */
    public defId!: number;


    constructor(options?:any){
        
        if(options&&options['className']){
            this.className=options['className'];
        }
        else{
            this.className=undefined
        }
    
        if(options&&options['config']){
            this.config=options['config'];
        }
        else{
            this.config=undefined
        }
    
        if(options&&options['defId']){
            this.defId=options['defId'];
        }
        else{
            this.defId=undefined
        }
    
    }
}
