<template>
  <div class="propline">
    <div class="propline-label">{{propDef.name}}:</div>
    <div class="propline-val">
      <components :is="propDef.type+'Editor'" :prop-def="propDef" v-model="propValue"></components>
    </div>
    <div class="propline-default">
      <el-button size="small" @click="reset">默认</el-button>
    </div>
  </div>
</template>

<script>
import editorComponents from "./components"

export default {
  components: editorComponents,
  props: {
    propDef: {
      type: Object,
      require: true
    },
    value: {
      require: true
    },
  },
  watch: {
    value(val) {
      this.propValue = val
    },
    propValue(val) {
      this.$emit("input", val)
    }
  },
  data() {
    return {
      propValue: this.value
    }
  },
  methods: {
    reset() {
      this.propValue = this.propDef.default || null
    }
  }
}
</script>

<style scoped>
.propline {
  padding: 20px;
  font-size: 14px;
  font-weight: bold;
}
.propline-label {
  flex: 0 0 100px;
  padding: 10px 5px;
}
.propline-val {
  flex: 1 1 auto;
  padding: 0 5px;
}
.propline-default {
  text-align: right;
  margin-top: 20px;
}
</style>
