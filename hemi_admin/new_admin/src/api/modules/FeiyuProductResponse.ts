import Pager from "../base/Pager";

/**
 * 作者没有写注释!!!
 */
export default class FeiyuProductResponse {

    /**
     * 飞鱼商品id
     */
    public feiyuProductId!: number;

    /**
     * 飞鱼商品名称
     */
    public feiyuProductName!: string;

    /**
     * 飞鱼商品类型  0:直冲  1:卡密  3:水电煤
     */
    public feiyuProductType!: string;


    constructor(options?:any){
        
        if(options&&options['feiyuProductId']){
            this.feiyuProductId=options['feiyuProductId'];
        }
        else{
            this.feiyuProductId=undefined
        }
    
        if(options&&options['feiyuProductName']){
            this.feiyuProductName=options['feiyuProductName'];
        }
        else{
            this.feiyuProductName=undefined
        }
    
        if(options&&options['feiyuProductType']){
            this.feiyuProductType=options['feiyuProductType'];
        }
        else{
            this.feiyuProductType=undefined
        }
    
    }
}
