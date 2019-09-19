import Pager from "../base/Pager";
import PartakeActResponse from "./PartakeActResponse";

/**
 * 作者没有写注释!!!
 */
export default class ActWhiteResponse {

    /**
     * 作者没写注释!!
     */
    public actList!: PartakeActResponse[];

    /**
     * 白名单名称
     */
    public defName!: string;

    /**
     * 白名单id
     */
    public id!: string;


    constructor(options?:any){
        
        if(options&&options['actList']){
            this.actList=options['actList'];
        }
        else{
            this.actList=undefined
        }
    
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
    
    }
}
