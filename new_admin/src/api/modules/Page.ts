import Pager from "../base/Pager";
import MerchantResponse from "./MerchantResponse";

/**
 * 作者没有写注释!!!
 */
export default class Page<T> {

    /**
     * 作者没写注释!!
     */
    public current!: number;

    /**
     * 作者没写注释!!
     */
    public pages!: number;

    /**
     * 作者没写注释!!
     */
    public records!: MerchantResponse[];

    /**
     * 作者没写注释!!
     */
    public size!: number;

    /**
     * 作者没写注释!!
     */
    public total!: number;


    constructor(options?:any){
        
        if(options&&options['current']){
            this.current=options['current'];
        }
        else{
            this.current=undefined
        }
    
        if(options&&options['pages']){
            this.pages=options['pages'];
        }
        else{
            this.pages=undefined
        }
    
        if(options&&options['records']){
            this.records=options['records'];
        }
        else{
            this.records=undefined
        }
    
        if(options&&options['size']){
            this.size=options['size'];
        }
        else{
            this.size=undefined
        }
    
        if(options&&options['total']){
            this.total=options['total'];
        }
        else{
            this.total=undefined
        }
    
    }
}
