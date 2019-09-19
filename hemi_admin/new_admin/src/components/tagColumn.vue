<template>
     <el-tag 
        v-if='item'
        :key="item[nameKey]" 
        :type='item.type'
       >
        {{item[nameKey]}}
    </el-tag>
</template>
<script>
export default {
    name:'tagColumn',
    props:{
        item:Object,
        nameKey:{
            type:String,
            default:'name'
        },
        valueKey:{
            type:String,
            default:'value'
        }
    },
    data(){
        return {
            itemType:['','success','info','warning','danger']
        }
    },
    created(){
        if(this.item&&this.item.type===undefined){
            let status=this.item[this.valueKey]
            while(status>10){
                status=parseInt(status/10)
            }
            let index = status%this.itemType.length
            this.item.type=this.itemType[index]
        }
    }
}
</script>

