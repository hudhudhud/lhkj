
<template>

  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
};
</script> 
