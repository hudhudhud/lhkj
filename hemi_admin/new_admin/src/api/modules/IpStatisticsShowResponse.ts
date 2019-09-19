import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class IpStatisticsShowResponse {

    /**
     * 当前P活跃数量
     */
    public currentIpCount!: number;

    /**
     * 当前P活跃占比
     */
    public currentIpProportion!: string;

    /**
     * 日期
     */
    public date!: string;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 当前统计ip
     */
    public realIp!: string;

    /**
     * 总活跃用户数
     */
    public totalCustCount!: number;


    constructor(options?:any){
        
        if(options&&options['currentIpCount']){
            this.currentIpCount=options['currentIpCount'];
        }
        else{
            this.currentIpCount=undefined
        }
    
        if(options&&options['currentIpProportion']){
            this.currentIpProportion=options['currentIpProportion'];
        }
        else{
            this.currentIpProportion=undefined
        }
    
        if(options&&options['date']){
            this.date=options['date'];
        }
        else{
            this.date=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['realIp']){
            this.realIp=options['realIp'];
        }
        else{
            this.realIp=undefined
        }
    
        if(options&&options['totalCustCount']){
            this.totalCustCount=options['totalCustCount'];
        }
        else{
            this.totalCustCount=undefined
        }
    
    }
}
