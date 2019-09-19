import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class SysRoleVO {

    /**
     * 模块idList
     */
    public midList!: number[];

    /**
     * 角色名称
     */
    public name!: string;

    /**
     * 角色id
     */
    public rid!: string;

    /**
     * 状态
     */
    public state!: number;


    constructor(options?:any){
        
        if(options&&options['midList']){
            this.midList=options['midList'];
        }
        else{
            this.midList=undefined
        }
    
        if(options&&options['name']){
            this.name=options['name'];
        }
        else{
            this.name=undefined
        }
    
        if(options&&options['rid']){
            this.rid=options['rid'];
        }
        else{
            this.rid=undefined
        }
    
        if(options&&options['state']){
            this.state=options['state'];
        }
        else{
            this.state=undefined
        }
    
    }
}
