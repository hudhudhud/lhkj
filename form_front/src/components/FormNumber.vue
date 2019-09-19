<template>
  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <div class="input-box" :style="item.inputStyle">
      <input
        type="text"
        :value="value"
        :placeholder="'请输入'+item.label"
        @input="$emit('input', $event.target.value)"
        :class="item.placeholderClass"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"]
};
</script>
