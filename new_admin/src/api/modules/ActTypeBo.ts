import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ActTypeBo {

    /**
     * 作者没写注释!!
     */
    public actId!: number;

    /**
     * 作者没写注释!!
     */
    public actType!: string;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['actType']){
            this.actType=options['actType'];
        }
        else{
            this.actType=undefined
        }
    
    }
}
