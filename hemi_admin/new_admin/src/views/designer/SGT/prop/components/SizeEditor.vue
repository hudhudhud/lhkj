<template>
  <div class="size-editor">
    <el-input-number v-model="val" :step="step" :max="1000" :disabled="!unit||unit=='auto'"></el-input-number>
    <el-select v-model="unit">
      <el-option value="auto" label="auto(自动)"></el-option>
      <el-option value="px" label="px(像素)"></el-option>
      <el-option value="%" label="%(百分比)"></el-option>
      <el-option value="vw" label="vw(视口宽度)"></el-option>
      <el-option value="vh" label="vh(视口高度))"></el-option>
      <el-option value="rem" label="rem(根元素字体)"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      val: "",
      unit: "",
      step: 0.1
    }
  },
  watch: {
    val (val) {
      this.generalValue()
    },
    unit (val) {
      this.generalValue()
    },
    value (val) {
      this.parseValue()
    }
  },
  methods: {
    parseValue () {
      if (!this.value) {
        this.val = null
        this.unit = null
        return
      }
      let v = this.value.replace(/\s/g, "")
      if (v) {
        if (v == "auto") {
          this.val = null
          this.unit = "auto"
        }
        if (v.indexOf("%") >= 0) {
          this.val = v.replace("%", "")
          this.unit = "%"
          this.step = 1
        } else if (v.indexOf("px") >= 0) {
          this.val = v.replace("px", "")
          this.unit = "px"
          this.step = 1
        } else if (v.indexOf("vw") >= 0) {
          this.val = v.replace("vw", "")
          this.unit = "vw"
          this.step = 1
        } else if (v.indexOf("vh") >= 0) {
          this.val = v.replace("vh", "")
          this.unit = "vh"
          this.step = 0.1
        } else if (v.indexOf("rem") >= 0) {
          this.val = v.replace("rem", "")
          this.unit = "rem"
          this.step = 0.1
        } else if (v.indexOf("em") >= 0) {
          this.val = v.replace("em", "")
          this.unit = "em"
          this.step = 1
        }
      } else {
        this.val = null
        this.unit = "auto"
        this.step = 0.1
      }
    },
    generalValue () {
      if (!this.unit) {
        this.$emit("input", "")
      } else if (this.unit == "auto") {
        this.$emit("input", "auto")
      } else {
        this.$emit("input", this.val + this.unit)
      }
    }
  },
  created () {
    this.parseValue()
  }
}
</script>

<style scoped>
.size-editor {
  display: flex;
}
</style>
