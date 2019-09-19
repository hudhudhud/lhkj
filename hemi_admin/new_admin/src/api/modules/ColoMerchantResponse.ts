import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ColoMerchantResponse {

    /**
     * 作者没写注释!!
     */
    public address!: string;

    /**
     * 作者没写注释!!
     */
    public areaId!: string;

    /**
     * 作者没写注释!!
     */
    public city!: string;

    /**
     * 作者没写注释!!
     */
    public cityCode!: string;

    /**
     * 作者没写注释!!
     */
    public contact!: string;

    /**
     * 作者没写注释!!
     */
    public currentPage!: number;

    /**
     * 作者没写注释!!
     */
    public district!: string;

    /**
     * 作者没写注释!!
     */
    public districtCode!: string;

    /**
     * 作者没写注释!!
     */
    public latitude!: string;

    /**
     * 作者没写注释!!
     */
    public longitude!: string;

    /**
     * 作者没写注释!!
     */
    public merchantId!: number;

    /**
     * 作者没写注释!!
     */
    public merchantName!: string;

    /**
     * 作者没写注释!!
     */
    public pageCount!: number;

    /**
     * 作者没写注释!!
     */
    public pageSize!: number;

    /**
     * 作者没写注释!!
     */
    public pageSizes!: number[];

    /**
     * 作者没写注释!!
     */
    public province!: string;

    /**
     * 作者没写注释!!
     */
    public provinceCode!: string;

    /**
     * 作者没写注释!!
     */
    public registerMobile!: string;

    /**
     * 作者没写注释!!
     */
    public start!: number;

    /**
     * 作者没写注释!!
     */
    public status!: string;

    /**
     * 作者没写注释!!
     */
    public totalCount!: number;


    constructor(options?:any){
        
        if(options&&options['address']){
            this.address=options['address'];
        }
        else{
            this.address=undefined
        }
    
        if(options&&options['areaId']){
            this.areaId=options['areaId'];
        }
        else{
            this.areaId=undefined
        }
    
        if(options&&options['city']){
            this.city=options['city'];
        }
        else{
            this.city=undefined
        }
    
        if(options&&options['cityCode']){
            this.cityCode=options['cityCode'];
        }
        else{
            this.cityCode=undefined
        }
    
        if(options&&options['contact']){
            this.contact=options['contact'];
        }
        else{
            this.contact=undefined
        }
    
        if(options&&options['currentPage']){
            this.currentPage=options['currentPage'];
        }
        else{
            this.currentPage=undefined
        }
    
        if(options&&options['district']){
            this.district=options['district'];
        }
        else{
            this.district=undefined
        }
    
        if(options&&options['districtCode']){
            this.districtCode=options['districtCode'];
        }
        else{
            this.districtCode=undefined
        }
    
        if(options&&options['latitude']){
            this.latitude=options['latitude'];
        }
        else{
            this.latitude=undefined
        }
    
        if(options&&options['longitude']){
            this.longitude=options['longitude'];
        }
        else{
            this.longitude=undefined
        }
    
        if(options&&options['merchantId']){
            this.merchantId=options['merchantId'];
        }
        else{
            this.merchantId=undefined
        }
    
        if(options&&options['merchantName']){
            this.merchantName=options['merchantName'];
        }
        else{
            this.merchantName=undefined
        }
    
        if(options&&options['pageCount']){
            this.pageCount=options['pageCount'];
        }
        else{
            this.pageCount=undefined
        }
    
        if(options&&options['pageSize']){
            this.pageSize=options['pageSize'];
        }
        else{
            this.pageSize=undefined
        }
    
        if(options&&options['pageSizes']){
            this.pageSizes=options['pageSizes'];
        }
        else{
            this.pageSizes=undefined
        }
    
        if(options&&options['province']){
            this.province=options['province'];
        }
        else{
            this.province=undefined
        }
    
        if(options&&options['provinceCode']){
            this.provinceCode=options['provinceCode'];
        }
        else{
            this.provinceCode=undefined
        }
    
        if(options&&options['registerMobile']){
            this.registerMobile=options['registerMobile'];
        }
        else{
            this.registerMobile=undefined
        }
    
        if(options&&options['start']){
            this.start=options['start'];
        }
        else{
            this.start=undefined
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
    
    }
}
