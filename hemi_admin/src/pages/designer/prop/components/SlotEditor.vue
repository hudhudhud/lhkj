<template>
  <div>
    <el-select v-if="componentsMap[comp.slotTag] && componentsMap[comp.slotTag].slotProps" v-model="val">
      <el-option v-for="opt in componentsMap[comp.slotTag].slotProps" :label="opt.name" :value="opt.key" :key="opt.key"></el-option>
    </el-select>
  </div>
</template>

<script>
import {componentsMap} from "../../preview/components"

export default {
  props: ["value", "propDef", "comp"],
  data () {
    return {
      val: this.value,
      componentsMap
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.val = val
    }
  }
}
</script>
