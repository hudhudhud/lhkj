import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MerchantVO {

    /**
     * 应用id
     */
    public appId!: string;

    /**
     * 应用秘钥
     */
    public appSecret!: string;

    /**
     * 认证类型
     */
    public authType!: number;

    /**
     * 商户余额
     */
    public balance!: any;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 商户id
     */
    public id!: number;

    /**
     * 登录页面配置
     */
    public loginPageConfig!: string;

    /**
     * 登录滑块验证
     */
    public loginSlipFlag!: string;

    /**
     * 用户所具有的商户id权限列表
     */
    public merchantIdList!: number[];

    /**
     * 商户名称
     */
    public name!: string;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 支付方式
     */
    public payType!: string;

    /**
     * 登录风控状态
     */
    public riskLoginStatus!: number;

    /**
     * 是否跳过登录
     */
    public skipLogin!: number;

    /**
     * 商户状态
     */
    public status!: string;


    constructor(options?:any){
        
        if(options&&options['appId']){
            this.appId=options['appId'];
        }
        else{
            this.appId=undefined
        }
    
        if(options&&options['appSecret']){
            this.appSecret=options['appSecret'];
        }
        else{
            this.appSecret=undefined
        }
    
        if(options&&options['authType']){
            this.authType=options['authType'];
        }
        else{
            this.authType=undefined
        }
    
        if(options&&options['balance']){
            this.balance=options['balance'];
        }
        else{
            this.balance=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
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
    
        if(options&&options['merchantIdList']){
            this.merchantIdList=options['merchantIdList'];
        }
        else{
            this.merchantIdList=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['payType']){
            this.payType=options['payType'];
        }
        else{
            this.payType=undefined
        }
    
        if(options&&options['riskLoginStatus']){
            this.riskLoginStatus=options['riskLoginStatus'];
        }
        else{
            this.riskLoginStatus=undefined
        }
    
        if(options&&options['skipLogin']){
            this.skipLogin=options['skipLogin'];
        }
        else{
            this.skipLogin=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
    }
}
