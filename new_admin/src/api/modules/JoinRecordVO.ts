import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class JoinRecordVO {

    /**
     * 作者没写注释!!
     */
    public activityId!: number;

    /**
     * 作者没写注释!!
     */
    public className!: string;

    /**
     * 作者没写注释!!
     */
    public createTime!: string;

    /**
     * 作者没写注释!!
     */
    public currentPage!: number;

    /**
     * 作者没写注释!!
     */
    public customId!: string;

    /**
     * 作者没写注释!!
     */
    public customName!: string;

    /**
     * 作者没写注释!!
     */
    public deleteFlag!: number;

    /**
     * 作者没写注释!!
     */
    public departmentId!: number;

    /**
     * 作者没写注释!!
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public objectId!: number;

    /**
     * 作者没写注释!!
     */
    public pageSize!: number;

    /**
     * 作者没写注释!!
     */
    public paymentAmount!: any;

    /**
     * 作者没写注释!!
     */
    public phone!: string;

    /**
     * 作者没写注释!!
     */
    public unitId!: number;


    constructor(options?:any){
        
        if(options&&options['activityId']){
            this.activityId=options['activityId'];
        }
        else{
            this.activityId=undefined
        }
    
        if(options&&options['className']){
            this.className=options['className'];
        }
        else{
            this.className=undefined
        }
    
        if(options&&options['createTime']){
            this.createTime=options['createTime'];
        }
        else{
            this.createTime=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['customId']){
            this.customId=options['customId'];
        }
        else{
            this.customId=undefined
        }
    
        if(options&&options['customName']){
            this.customName=options['customName'];
        }
        else{
            this.customName=undefined
        }
    
        if(options&&options['deleteFlag']){
            this.deleteFlag=options['deleteFlag'];
        }
        else{
            this.deleteFlag=undefined
        }
    
        if(options&&options['departmentId']){
            this.departmentId=options['departmentId'];
        }
        else{
            this.departmentId=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['objectId']){
            this.objectId=options['objectId'];
        }
        else{
            this.objectId=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['paymentAmount']){
            this.paymentAmount=options['paymentAmount'];
        }
        else{
            this.paymentAmount=undefined
        }
    
        if(options&&options['phone']){
            this.phone=options['phone'];
        }
        else{
            this.phone=undefined
        }
    
        if(options&&options['unitId']){
            this.unitId=options['unitId'];
        }
        else{
            this.unitId=undefined
        }
    
    }
}
