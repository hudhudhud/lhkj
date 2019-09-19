import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class AdminOrderStatisticsResponse {

    /**
     * cm当前页飞鱼总成本
     */
    public cmCurrentPageTotalFishAmount!: any;

    /**
     * cm当前页总支付金额
     */
    public cmCurrentPageTotalPayAmount!: any;

    /**
     * cm当前条件飞鱼总成本
     */
    public cmTotalFishAmount!: any;

    /**
     * cm当前条件总支付金额
     */
    public cmTotalPayAmount!: any;

    /**
     * tb当前页飞鱼总成本
     */
    public tbCurrentPageTotalFishAmount!: any;

    /**
     * tb当前页总支付金额
     */
    public tbCurrentPageTotalPayAmount!: any;

    /**
     * tb当前条件飞鱼总成本
     */
    public tbTotalFishAmount!: any;

    /**
     * tb当前条件总支付金额
     */
    public tbTotalPayAmount!: any;


    constructor(options?:any){
        
        if(options&&options['cmCurrentPageTotalFishAmount']){
            this.cmCurrentPageTotalFishAmount=options['cmCurrentPageTotalFishAmount'];
        }
        else{
            this.cmCurrentPageTotalFishAmount=undefined
        }
    
        if(options&&options['cmCurrentPageTotalPayAmount']){
            this.cmCurrentPageTotalPayAmount=options['cmCurrentPageTotalPayAmount'];
        }
        else{
            this.cmCurrentPageTotalPayAmount=undefined
        }
    
        if(options&&options['cmTotalFishAmount']){
            this.cmTotalFishAmount=options['cmTotalFishAmount'];
        }
        else{
            this.cmTotalFishAmount=undefined
        }
    
        if(options&&options['cmTotalPayAmount']){
            this.cmTotalPayAmount=options['cmTotalPayAmount'];
        }
        else{
            this.cmTotalPayAmount=undefined
        }
    
        if(options&&options['tbCurrentPageTotalFishAmount']){
            this.tbCurrentPageTotalFishAmount=options['tbCurrentPageTotalFishAmount'];
        }
        else{
            this.tbCurrentPageTotalFishAmount=undefined
        }
    
        if(options&&options['tbCurrentPageTotalPayAmount']){
            this.tbCurrentPageTotalPayAmount=options['tbCurrentPageTotalPayAmount'];
        }
        else{
            this.tbCurrentPageTotalPayAmount=undefined
        }
    
        if(options&&options['tbTotalFishAmount']){
            this.tbTotalFishAmount=options['tbTotalFishAmount'];
        }
        else{
            this.tbTotalFishAmount=undefined
        }
    
        if(options&&options['tbTotalPayAmount']){
            this.tbTotalPayAmount=options['tbTotalPayAmount'];
        }
        else{
            this.tbTotalPayAmount=undefined
        }
    
    }
}
