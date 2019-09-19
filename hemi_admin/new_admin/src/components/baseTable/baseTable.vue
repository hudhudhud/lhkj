<template>
      <el-table :max-height='maxHeight' :data="list" @selection-change="handleSelectionChange"  v-bind="$attrs" highlight-current-row  @sort-change="handleSortChange"
      border fit v-loading="loading" ref='base-table'>
        <template v-for="(column, index) in columns">
          <slot name="front-slot"> </slot>
          <!-- 复选框 -->
          <el-table-column :key="index" v-if="column.type === 'selection'" type="selection" width="55"> </el-table-column>
          <!-- 序号 -->
          <el-table-column :key="index" v-else-if="column.type === 'index'" type="index" width="50" label="序号"> </el-table-column>
          <!-- 展开 -->
          <el-table-column :key="index" v-else-if="column.type === 'expand'" type="expand" width="100%">
            <template slot-scope="scope">
              <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
            </template>
          </el-table-column>
          <!-- 具体内容 -->
          <el-table-column :key="index" v-else-if="!column.hidden&&(!columns.showFun || columns.showFun(scope.row))" align="left" :label="column.title" :width="column.width" 
          :min-width='column.minWidth' :max-width='column.maxWidth' :sortable="column.sortable"
                           :prop="column.key" :fixed="column.type === 'operate'?'right':false">
            <template slot-scope="scope">
                <!-- 操作按钮 -->
                <template v-if="column.type === 'operate'">
                  <el-button  v-for="(operate, index) in column.operates" :key="index" @click="handleClick(operate, scope.row)" 
                       :size="operate.btnSize?operate.btnSize:'small'"
                       :type="operate.btnType?operate.btnType:'primary'"
                       v-if="(operate.showKey&&operate.show===scope.row[operate.showKey])
                       || (operate.showFun&&operate.showFun(scope.row))
                       || (!operate.showKey&&!operate.showFun)"
                       plain>
                    {{operate.name}}
                  </el-button>
                  <!--<a   class="operate-button" v-for="(operate, index) in column.operates" :key="index" @click="handleClick(operate, scope.row)"
                       v-if="operate.show==='undefined'||operate.show===scope.row[operate.showKey]">
                    show值与给的列值相等时才显示该按钮-->
                    <!-- {{operate.name}} -->
                 <!-- </a>-->
                </template>
                 <!-- 使用slot的情况下 -->
                <label v-else-if="column.slot">
                  <!-- 具名slot 如果没指定列或者列是有值的，那就用slot，否则没值按空列显示 -->
                  <template >
                    <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
                  </template>
                </label>
                <span v-else>
                  {{column.format?column.format(scope.row[column.key]):scope.row[column.key]}}
                </span>
            </template>
          </el-table-column>
        </template>
        <!--默认的slot -->
        <slot/>
      </el-table>
</template>


<script>
export default {
  name: "base-table",
  props: {
    // 核心数据
    list: {
      type: Array,
      default: () => []
    },
    // columns
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    selection: {
      type: Boolean,
      default: false
    },
    loading:{
      type:Boolean,
      default:false,
    },
    disableAutoHeight:{
      type:Boolean,
      default:false
    },
    param: { //查询参数
      require: false,
      type: Object
    },
    debounce: {
      require: false,
      type: Number
    },
  },
  watch: {
    param: {
      deep: true,
      handler() {
        if (this.autoSearchInd) {
          clearTimeout(this.autoSearchInd);
        }
        this.autoSearchInd = setTimeout(()=>{
          this.$emit("search")
        }, this.debounce || 500);
      }
    }
  },
  data () {
    return {
      maxHeight:500,
      autoSearchInd:null
    }
  },
  mounted(){
    if(this.disableAutoHeight){
      return 
    }
    this.$nextTick(()=>{
      this.maxHeight = window.innerHeight-this.$refs['base-table'].$el.getBoundingClientRect().top - 80 
      //console.log(999999999,this.$refs['base-table'],this.maxHeight)
    })    
  },
  methods: {
    // 处理点击事件
    handleClick(action, data) {
      // emit事件
      this.$emit(`${action.emitKey}`, data)
    },
    handleSelectionChange(data) {
      this.$emit("selectionChange", data)
    },
    handleSortChange(data) {
      this.$emit("sortChange", data)
    },
    isValue(val) {
      if (val !== null && val !== undefined && val !== "") { return true }
      return false
    }
  },
  destroyed(){
    if(this.autoSearchInd){
       clearTimeout(this.autoSearchInd);
    }
  }
}
</script>
<style lang="scss">

</style>
