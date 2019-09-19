import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ColoMerchantVO {

    /**
     * 地址描述
     */
    public address!: string;

    /**
     * 区域id
     */
    public areaId!: string;

    /**
     * 市
     */
    public city!: string;

    /**
     * 市code
     */
    public cityCode!: string;

    /**
     * 联系人
     */
    public contact!: string;

    /**
     * 区
     */
    public district!: string;

    /**
     * 区code
     */
    public districtCode!: string;

    /**
     * 纬度
     */
    public latitude!: string;

    /**
     * 经度
     */
    public longitude!: string;

    /**
     * 商户id
     */
    public merchantId!: number;

    /**
     * 商户名称
     */
    public merchantName!: string;

    /**
     * 省
     */
    public province!: string;

    /**
     * 省code
     */
    public provinceCode!: string;

    /**
     * 注册手机号
     */
    public registerMobile!: string;

    /**
     * 状态 1-有效 0-无效
     */
    public status!: string;


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
    
        if(options&&options['status']){
            this.status=options['status'];
        }
        else{
            this.status=undefined
        }
    
    }
}
