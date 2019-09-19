import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class FeiyuStandardResponse {

    /**
     * 飞鱼商品id
     */
    public feiyuProductId!: number;

    /**
     * 飞鱼规格code
     */
    public feiyuStandardCode!: string;

    /**
     * 飞鱼规格id
     */
    public feiyuStandardId!: number;

    /**
     * 飞鱼规格名称
     */
    public feiyuStandardName!: string;

    /**
     * 飞鱼规格价值
     */
    public feiyuStandardValue!: number;

    /**
     * 飞鱼规格折扣
     */
    public priceDiscount!: number;


    constructor(options?:any){
        
        if(options&&options['feiyuProductId']){
            this.feiyuProductId=options['feiyuProductId'];
        }
        else{
            this.feiyuProductId=undefined
        }
    
        if(options&&options['feiyuStandardCode']){
            this.feiyuStandardCode=options['feiyuStandardCode'];
        }
        else{
            this.feiyuStandardCode=undefined
        }
    
        if(options&&options['feiyuStandardId']){
            this.feiyuStandardId=options['feiyuStandardId'];
        }
        else{
            this.feiyuStandardId=undefined
        }
    
        if(options&&options['feiyuStandardName']){
            this.feiyuStandardName=options['feiyuStandardName'];
        }
        else{
            this.feiyuStandardName=undefined
        }
    
        if(options&&options['feiyuStandardValue']){
            this.feiyuStandardValue=options['feiyuStandardValue'];
        }
        else{
            this.feiyuStandardValue=undefined
        }
    
        if(options&&options['priceDiscount']){
            this.priceDiscount=options['priceDiscount'];
        }
        else{
            this.priceDiscount=undefined
        }
    
    }
}
