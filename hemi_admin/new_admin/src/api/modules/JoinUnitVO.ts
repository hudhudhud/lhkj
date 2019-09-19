import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class JoinUnitVO {

    /**
     * 作者没写注释!!
     */
    public checkFlag!: number;

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
    public deleteFlag!: number;

    /**
     * 作者没写注释!!
     */
    public id!: number;

    /**
     * 作者没写注释!!
     */
    public idList!: number[];

    /**
     * 作者没写注释!!
     */
    public orderNumber!: number;

    /**
     * 作者没写注释!!
     */
    public pageSize!: number;

    /**
     * 作者没写注释!!
     */
    public showFlag!: number;

    /**
     * 作者没写注释!!
     */
    public unitName!: string;

    /**
     * 作者没写注释!!
     */
    public unitType!: number;

    /**
     * 作者没写注释!!
     */
    public userGrade!: number;

    /**
     * 作者没写注释!!
     */
    public userId!: number;


    constructor(options?:any){
        
        if(options&&options['checkFlag']){
            this.checkFlag=options['checkFlag'];
        }
        else{
            this.checkFlag=undefined
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
    
        if(options&&options['deleteFlag']){
            this.deleteFlag=options['deleteFlag'];
        }
        else{
            this.deleteFlag=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['idList']){
            this.idList=options['idList'];
        }
        else{
            this.idList=undefined
        }
    
        if(options&&options['orderNumber']){
            this.orderNumber=options['orderNumber'];
        }
        else{
            this.orderNumber=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['showFlag']){
            this.showFlag=options['showFlag'];
        }
        else{
            this.showFlag=undefined
        }
    
        if(options&&options['unitName']){
            this.unitName=options['unitName'];
        }
        else{
            this.unitName=undefined
        }
    
        if(options&&options['unitType']){
            this.unitType=options['unitType'];
        }
        else{
            this.unitType=undefined
        }
    
        if(options&&options['userGrade']){
            this.userGrade=options['userGrade'];
        }
        else{
            this.userGrade=undefined
        }
    
        if(options&&options['userId']){
            this.userId=options['userId'];
        }
        else{
            this.userId=undefined
        }
    
    }
}
