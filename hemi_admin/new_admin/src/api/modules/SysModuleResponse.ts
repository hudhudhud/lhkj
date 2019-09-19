import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class SysModuleResponse {

    /**
     * 权限验证状态 0: 不需要验证, 1: 需要验证
     */
    public authState!: number;

    /**
     * 权限验证状态 0: 不需要验证, 1: 需要验证
     */
    public children!: SysModuleResponse[];

    /**
     * 模块等级
     */
    public level!: number;

    /**
     * 登陆状态 0: 不需要登陆, 1: 需要登陆
     */
    public loginState!: number;

    /**
     * 接口权限id
     */
    public mid!: number;

    /**
     * 交易名称
     */
    public mname!: string;

    /**
     * api路由,支持表达式,支持多个逗号分隔
     */
    public path!: string;

    /**
     * 上级接口权限id
     */
    public pmid!: number;

    /**
     * 前端路由
     */
    public router!: string;

    /**
     * 排序序号
     */
    public serialNo!: number;

    /**
     * 状态 0: 禁用 1: 启用
     */
    public status!: number;

    /**
     * 类型1:节点,2:URL,3:按钮,4:隐藏权限
     */
    public type!: string;


    constructor(options?:any){
        
        if(options&&options['authState']){
            this.authState=options['authState'];
        }
        else{
            this.authState=undefined
        }
    
        if(options&&options['children']){
            this.children=options['children'];
        }
        else{
            this.children=undefined
        }
    
        if(options&&options['level']){
            this.level=options['level'];
        }
        else{
            this.level=undefined
        }
    
        if(options&&options['loginState']){
            this.loginState=options['loginState'];
        }
        else{
            this.loginState=undefined
        }
    
        if(options&&options['mid']){
            this.mid=options['mid'];
        }
        else{
            this.mid=undefined
        }
    
        if(options&&options['mname']){
            this.mname=options['mname'];
        }
        else{
            this.mname=undefined
        }
    
        if(options&&options['path']){
            this.path=options['path'];
        }
        else{
            this.path=undefined
        }
    
        if(options&&options['pmid']){
            this.pmid=options['pmid'];
        }
        else{
            this.pmid=undefined
        }
    
        if(options&&options['router']){
            this.router=options['router'];
        }
        else{
            this.router=undefined
        }
    
        if(options&&options['serialNo']){
            this.serialNo=options['serialNo'];
        }
        else{
            this.serialNo=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
        if(options&&options['type']){
            this.type=options['type'];
        }
        else{
            this.type=undefined
        }
    
    }
}
