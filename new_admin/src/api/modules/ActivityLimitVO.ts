import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ActivityLimitVO {

    /**
     * 作者没写注释!!
     */
    public className!: string;

    /**
     * 作者没写注释!!
     */
    public configure!: string;

    /**
     * 作者没写注释!!
     */
    public limitConfigure!: string;

    /**
     * 作者没写注释!!
     */
    public limitId!: number;

    /**
     * 作者没写注释!!
     */
    public limitName!: string;

    /**
     * 作者没写注释!!
     */
    public limitStrategyId!: number;

    /**
     * 作者没写注释!!
     */
    public limitStrategyIdList!: number[];

    /**
     * 作者没写注释!!
     */
    public limitStrategyName!: string;

    /**
     * 作者没写注释!!
     */
    public relationId!: number;

    /**
     * 作者没写注释!!
     */
    public relationType!: string;

    /**
     * 作者没写注释!!
     */
    public sort!: string;

    /**
     * 作者没写注释!!
     */
    public strategyDetails!: string;

    /**
     * 作者没写注释!!
     */
    public useRange!: string;


    constructor(options?:any){
        
        if(options&&options['className']){
            this.className=options['className'];
        }
        else{
            this.className=undefined
        }
    
        if(options&&options['configure']){
            this.configure=options['configure'];
        }
        else{
            this.configure=undefined
        }
    
        if(options&&options['limitConfigure']){
            this.limitConfigure=options['limitConfigure'];
        }
        else{
            this.limitConfigure=undefined
        }
    
        if(options&&options['limitId']){
            this.limitId=options['limitId'];
        }
        else{
            this.limitId=undefined
        }
    
        if(options&&options['limitName']){
            this.limitName=options['limitName'];
        }
        else{
            this.limitName=undefined
        }
    
        if(options&&options['limitStrategyId']){
            this.limitStrategyId=options['limitStrategyId'];
        }
        else{
            this.limitStrategyId=undefined
        }
    
        if(options&&options['limitStrategyIdList']){
            this.limitStrategyIdList=options['limitStrategyIdList'];
        }
        else{
            this.limitStrategyIdList=undefined
        }
    
        if(options&&options['limitStrategyName']){
            this.limitStrategyName=options['limitStrategyName'];
        }
        else{
            this.limitStrategyName=undefined
        }
    
        if(options&&options['relationId']){
            this.relationId=options['relationId'];
        }
        else{
            this.relationId=undefined
        }
    
        if(options&&options['relationType']){
            this.relationType=options['relationType'];
        }
        else{
            this.relationType=undefined
        }
    
        if(options&&options['sort']){
            this.sort=options['sort'];
        }
        else{
            this.sort=undefined
        }
    
        if(options&&options['strategyDetails']){
            this.strategyDetails=options['strategyDetails'];
        }
        else{
            this.strategyDetails=undefined
        }
    
        if(options&&options['useRange']){
            this.useRange=options['useRange'];
        }
        else{
            this.useRange=undefined
        }
    
    }
}
