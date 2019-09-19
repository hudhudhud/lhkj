import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class MechanismCreditRecordResponse {

    /**
     * 作者没写注释!!
     */
    public createTime!: string;

    /**
     * 作者没写注释!!
     */
    public creditAmount!: number;

    /**
     * 作者没写注释!!
     */
    public creditTypeId!: number;

    /**
     * 作者没写注释!!
     */
    public creditTypeName!: string;

    /**
     * 作者没写注释!!
     */
    public customNo!: string;

    /**
     * 作者没写注释!!
     */
    public mechanismId!: number;

    /**
     * 作者没写注释!!
     */
    public mechanismUserId!: number;

    /**
     * 作者没写注释!!
     */
    public orderCode!: string;

    /**
     * 作者没写注释!!
     */
    public phone!: string;

    /**
     * 作者没写注释!!
     */
    public recordCode!: string;

    /**
     * 作者没写注释!!
     */
    public subsidiaryId!: number;

    /**
     * 作者没写注释!!
     */
    public subsidiaryName!: string;

    /**
     * 作者没写注释!!
     */
    public type!: number;


    constructor(options?:any){
        
        if(options&&options['createTime']){
            this.createTime=options['createTime'];
        }
        else{
            this.createTime=undefined
        }
    
        if(options&&options['creditAmount']){
            this.creditAmount=options['creditAmount'];
        }
        else{
            this.creditAmount=undefined
        }
    
        if(options&&options['creditTypeId']){
            this.creditTypeId=options['creditTypeId'];
        }
        else{
            this.creditTypeId=undefined
        }
    
        if(options&&options['creditTypeName']){
            this.creditTypeName=options['creditTypeName'];
        }
        else{
            this.creditTypeName=undefined
        }
    
        if(options&&options['customNo']){
            this.customNo=options['customNo'];
        }
        else{
            this.customNo=undefined
        }
    
        if(options&&options['mechanismId']){
            this.mechanismId=options['mechanismId'];
        }
        else{
            this.mechanismId=undefined
        }
    
        if(options&&options['mechanismUserId']){
            this.mechanismUserId=options['mechanismUserId'];
        }
        else{
            this.mechanismUserId=undefined
        }
    
        if(options&&options['orderCode']){
            this.orderCode=options['orderCode'];
        }
        else{
            this.orderCode=undefined
        }
    
        if(options&&options['phone']){
            this.phone=options['phone'];
        }
        else{
            this.phone=undefined
        }
    
        if(options&&options['recordCode']){
            this.recordCode=options['recordCode'];
        }
        else{
            this.recordCode=undefined
        }
    
        if(options&&options['subsidiaryId']){
            this.subsidiaryId=options['subsidiaryId'];
        }
        else{
            this.subsidiaryId=undefined
        }
    
        if(options&&options['subsidiaryName']){
            this.subsidiaryName=options['subsidiaryName'];
        }
        else{
            this.subsidiaryName=undefined
        }
    
        if(options&&options['type']){
            this.type=options['type'];
        }
        else{
            this.type=undefined
        }
    
    }
}
