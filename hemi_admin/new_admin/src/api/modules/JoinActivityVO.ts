import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class JoinActivityVO {

    /**
     * 作者没写注释!!
     */
    public activityName!: string;

    /**
     * 作者没写注释!!
     */
    public activityType!: number;

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
    public styleCode!: number;

    /**
     * 作者没写注释!!
     */
    public unitId!: number;

    /**
     * 作者没写注释!!
     */
    public userGrade!: number;

    /**
     * 作者没写注释!!
     */
    public userId!: number;


    constructor(options?:any){
        
        if(options&&options['activityName']){
            this.activityName=options['activityName'];
        }
        else{
            this.activityName=undefined
        }
    
        if(options&&options['activityType']){
            this.activityType=options['activityType'];
        }
        else{
            this.activityType=undefined
        }
    
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
    
        if(options&&options['styleCode']){
            this.styleCode=options['styleCode'];
        }
        else{
            this.styleCode=undefined
        }
    
        if(options&&options['unitId']){
            this.unitId=options['unitId'];
        }
        else{
            this.unitId=undefined
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
