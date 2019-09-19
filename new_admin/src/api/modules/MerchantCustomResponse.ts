import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MerchantCustomResponse {

    /**
     * 作者没写注释!!
     */
    public appId!: string;

    /**
     * 作者没写注释!!
     */
    public completeTel!: number;

    /**
     * 作者没写注释!!
     */
    public errReturnMsg!: string;

    /**
     * 作者没写注释!!
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public limitDefIds!: string;

    /**
     * 作者没写注释!!
     */
    public loginPageConfig!: string;

    /**
     * 作者没写注释!!
     */
    public loginSlipFlag!: number;

    /**
     * 作者没写注释!!
     */
    public merchantId!: number;

    /**
     * 作者没写注释!!
     */
    public name!: string;

    /**
     * 作者没写注释!!
     */
    public oauthModel!: number;

    /**
     * 作者没写注释!!
     */
    public riskDetectType!: number;

    /**
     * 作者没写注释!!
     */
    public riskForbid!: number;

    /**
     * 作者没写注释!!
     */
    public scope!: string;

    /**
     * 作者没写注释!!
     */
    public skipLogin!: number;

    /**
     * 作者没写注释!!
     */
    public smsModel!: string;

    /**
     * 作者没写注释!!
     */
    public staffLoginClassName!: string;

    /**
     * 作者没写注释!!
     */
    public statusCode!: number;

    /**
     * 作者没写注释!!
     */
    public tokenSecret!: string;

    /**
     * 作者没写注释!!
     */
    public verifyImgFrozenTime!: number;


    constructor(options?:any){
        
        if(options&&options['appId']){
            this.appId=options['appId'];
        }
        else{
            this.appId=undefined
        }
    
        if(options&&options['completeTel']){
            this.completeTel=options['completeTel'];
        }
        else{
            this.completeTel=undefined
        }
    
        if(options&&options['errReturnMsg']){
            this.errReturnMsg=options['errReturnMsg'];
        }
        else{
            this.errReturnMsg=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['limitDefIds']){
            this.limitDefIds=options['limitDefIds'];
        }
        else{
            this.limitDefIds=undefined
        }
    
        if(options&&options['loginPageConfig']){
            this.loginPageConfig=options['loginPageConfig'];
        }
        else{
            this.loginPageConfig=undefined
        }
    
        if(options&&options['loginSlipFlag']){
            this.loginSlipFlag=options['loginSlipFlag'];
        }
        else{
            this.loginSlipFlag=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
        if(options&&options['oauthModel']){
            this.oauthModel=options['oauthModel'];
        }
        else{
            this.oauthModel=undefined
        }
    
        if(options&&options['riskDetectType']){
            this.riskDetectType=options['riskDetectType'];
        }
        else{
            this.riskDetectType=undefined
        }
    
        if(options&&options['riskForbid']){
            this.riskForbid=options['riskForbid'];
        }
        else{
            this.riskForbid=undefined
        }
    
        if(options&&options['scope']){
            this.scope=options['scope'];
        }
        else{
            this.scope=undefined
        }
    
        if(options&&options['skipLogin']){
            this.skipLogin=options['skipLogin'];
        }
        else{
            this.skipLogin=undefined
        }
    
        if(options&&options['smsModel']){
            this.smsModel=options['smsModel'];
        }
        else{
            this.smsModel=undefined
        }
    
        if(options&&options['staffLoginClassName']){
            this.staffLoginClassName=options['staffLoginClassName'];
        }
        else{
            this.staffLoginClassName=undefined
        }
    
        if(options&&options['statusCode']){
            this.statusCode=options['statusCode'];
        }
        else{
            this.statusCode=undefined
        }
    
        if(options&&options['tokenSecret']){
            this.tokenSecret=options['tokenSecret'];
        }
        else{
            this.tokenSecret=undefined
        }
    
        if(options&&options['verifyImgFrozenTime']){
            this.verifyImgFrozenTime=options['verifyImgFrozenTime'];
        }
        else{
            this.verifyImgFrozenTime=undefined
        }
    
    }
}
