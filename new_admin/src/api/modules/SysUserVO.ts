import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class SysUserVO {

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 用户id
     */
    public id!: number;

    /**
     * 分页数据
     */
    public list!: any[];

    /**
     * 昵称
     */
    public nickName!: string;

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * pid
     */
    public pid!: number;

    /**
     * 是否密码登录
     */
    public pwdLogin!: number;

    /**
     * 角色roleIdList
     */
    public roleIdList!: string[];

    /**
     * 用户状态
     */
    public status!: number;

    /**
     * 总条数
     */
    public totalCount!: number;

    /**
     * 用户名
     */
    public username!: string;


    constructor(options?:any){
        
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
    
        if(options&&options['list']){
            this.list=options['list'];
        }
        else{
            this.list=undefined
        }
    
        if(options&&options['nickName']){
            this.nickName=options['nickName'];
        }
        else{
            this.nickName=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['pid']){
            this.pid=options['pid'];
        }
        else{
            this.pid=undefined
        }
    
        if(options&&options['pwdLogin']){
            this.pwdLogin=options['pwdLogin'];
        }
        else{
            this.pwdLogin=undefined
        }
    
        if(options&&options['roleIdList']){
            this.roleIdList=options['roleIdList'];
        }
        else{
            this.roleIdList=undefined
        }
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
        if(options&&options['totalCount']){
            this.totalCount=options['totalCount'];
        }
        else{
            this.totalCount=undefined
        }
    
        if(options&&options['username']){
            this.username=options['username'];
        }
        else{
            this.username=undefined
        }
    
    }
}
