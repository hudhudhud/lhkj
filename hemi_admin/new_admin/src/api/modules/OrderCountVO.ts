import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class OrderCountVO {

    /**
     * 作者没写注释!!
     */
    public actId!: number;

    /**
     * 作者没写注释!!
     */
    public actIdList!: number[];

    /**
     * 作者没写注释!!
     */
    public actIds!: string;

    /**
     * 作者没写注释!!
     */
    public beginDate!: string;

    /**
     * 作者没写注释!!
     */
    public customId!: string;

    /**
     * 作者没写注释!!
     */
    public endDate!: string;

    /**
     * 作者没写注释!!
     */
    public paymentState!: number;

    /**
     * 作者没写注释!!
     */
    public proStandardId!: number;

    /**
     * 作者没写注释!!
     */
    public proStandardIdList!: number[];

    /**
     * 作者没写注释!!
     */
    public proStandardIds!: string;

    /**
     * 作者没写注释!!
     */
    public proType!: number;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['actIdList']){
            this.actIdList=options['actIdList'];
        }
        else{
            this.actIdList=undefined
        }
    
        if(options&&options['actIds']){
            this.actIds=options['actIds'];
        }
        else{
            this.actIds=undefined
        }
    
        if(options&&options['beginDate']){
            this.beginDate=options['beginDate'];
        }
        else{
            this.beginDate=undefined
        }
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['endDate']){
            this.endDate=options['endDate'];
        }
        else{
            this.endDate=undefined
        }
    
        if(options&&options['paymentState']){
            this.paymentState=options['paymentState'];
        }
        else{
            this.paymentState=undefined
        }
    
        if(options&&options['proStandardId']){
            this.proStandardId=options['proStandardId'];
        }
        else{
            this.proStandardId=undefined
        }
    
        if(options&&options['proStandardIdList']){
            this.proStandardIdList=options['proStandardIdList'];
        }
        else{
            this.proStandardIdList=undefined
        }
    
        if(options&&options['proStandardIds']){
            this.proStandardIds=options['proStandardIds'];
        }
        else{
            this.proStandardIds=undefined
        }
    
        if(options&&options['proType']){
            this.proType=options['proType'];
        }
        else{
            this.proType=undefined
        }
    
    }
}
