import Pager from "../base/Pager";
import LotteryWhiteProbabilityVO from "./LotteryWhiteProbabilityVO";

/**
 * 作者没有写注释!!!
 */
export default class LotteryProbabilitySaveAndUpdateVO {

    /**
     * 活动id
     */
    public actId!: number;

    /**
     * 奖品概率详情
     */
    public lotteryWhiteProbabilityVOS!: LotteryWhiteProbabilityVO[];

    /**
     * 白名单id
     */
    public whiteId!: number;


    constructor(options?:any){
        
        if(options&&options['actId']){
            this.actId=options['actId'];
        }
        else{
            this.actId=undefined
        }
    
        if(options&&options['lotteryWhiteProbabilityVOS']){
            this.lotteryWhiteProbabilityVOS=options['lotteryWhiteProbabilityVOS'];
        }
        else{
            this.lotteryWhiteProbabilityVOS=undefined
        }
    
        if(options&&options['whiteId']){
            this.whiteId=options['whiteId'];
        }
        else{
            this.whiteId=undefined
        }
    
    }
}
