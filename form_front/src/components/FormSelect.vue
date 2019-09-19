<template>
  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <!-- <div class="input-box">单选</div> -->
    <div class="input-box select" :style="item.inputStyle">
      <span :style="item.iconStyle"></span>
      <select @change="$emit('parent-event',
        $event.target.value)" :class="value===''?item.placeholderClass:''">
        <option
          :value="value"
          selected
          disabled
        >请选择{{item.label}}</option>
        <option
          :selected="innerVal === item[idx]?'selected' :''"
          v-for="
          (item,idx)
          in
          item.options"
          :key="'item'+idx"
          :value="item"
        >{{item}}</option>
        <!--             :selected="value == idx?'selected' :''"
 -->
        <!--    <template v-if="value != '' ">
          <option
            selected
            v-for="(item,idx) in item.options"
            v-if="value == idx "
            :key="'item'+idx"
            :value="idx"
          >{{item}}</option>
        </template>
        <template v-else>
          <option
            v-for="(item,idx) in item.options"
            :key="'item'+idx"
            :value="idx"
          >{{item}}</option>
        </template> -->

      </select>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
  data() {
    return {
      selectedKey: "",
      innerVal:this.value.trim(),
    };
  },
  model: {
    prop: "value",
    event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
  },
  watch: {
    value:{
      handler(val) {
        this.innerVal =val.trim()
      },
      immediate:true,
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

