import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class ApplyRefundRecordUpdateVO {

    /**
     * 状态: 0未受理，1已受理，2拒绝受理&#39;
     */
    public applyStatus!: number;

    /**
     * 主键id
     */
    public id!: number;

    /**
     * 原因
     */
    public refuseReason!: string;


    constructor(options?:any){
        
        if(options&&options['applyStatus']){
            this.applyStatus=options['applyStatus'];
        }
        else{
            this.applyStatus=undefined
        }
    
        if(options&&options['id']){
            this.id=options['id'];
        }
        else{
            this.id=undefined
        }
    
        if(options&&options['refuseReason']){
            this.refuseReason=options['refuseReason'];
        }
        else{
            this.refuseReason=undefined
        }
    
    }
}
