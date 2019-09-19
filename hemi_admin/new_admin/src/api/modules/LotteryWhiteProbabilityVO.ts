import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class LotteryWhiteProbabilityVO {

    /**
     * 活动id
     */
    public actId!: number;

    /**
     * 主键id
     */
    public id!: number;

    /**
     * 是否默认奖品  1-是  0-否
     */
    public isDefaultPrize!: number;

    /**
     * 是否首单  1-是  0-否
     */
    public isFistPrize!: number;

    /**
     * 奖品id
     */
    public lotteryId!: number;

    /**
     * 奖品概率
     */
    public probability!: any;

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
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['isDefaultPrize']){
            this.isDefaultPrize=options['isDefaultPrize'];
        }
        else{
            this.isDefaultPrize=undefined
        }
    
        if(options&&options['isFistPrize']){
            this.isFistPrize=options['isFistPrize'];
        }
        else{
            this.isFistPrize=undefined
        }
    
        if(options&&options['lotteryId']){
            this.lotteryId=options['lotteryId'];
        }
        else{
            this.lotteryId=undefined
        }
    
        if(options&&options['probability']){
            this.probability=options['probability'];
        }
        else{
            this.probability=undefined
        }
    
        if(options&&options['whiteId']){
            this.whiteId=options['whiteId'];
        }
        else{
            this.whiteId=undefined
        }
    
    }
}
