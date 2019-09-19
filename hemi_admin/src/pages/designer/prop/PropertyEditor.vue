<template>
  <div class="propline">
    <div class="propline-label">{{propDef.name}}:</div>
    <div class="propline-val">
      <components :is="propDef.type+'Editor'" :page="page" :comp="comp" :prop-def="propDef" v-model="propValue"></components>
    </div>
    <div class="propline-default">
      <el-button @click="reset">默认</el-button>
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
    comp: {type: Object},
    value: {
      require: true
    },
    page: {type: Object}
  },
  watch: {
    value (val) {
      this.propValue = val
    },
    propValue (val) {
      this.$emit("input", val)
    }
  },
  data () {
    return {
      propValue: this.value
    }
  },
  methods: {
    reset () {
      this.propValue = this.propDef.default || null
    }
  }
}
</script>

<style scoped>
.propline {
  display: flex;
  padding: 5px;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.propline-label {
  flex: 0 0 100px;
  padding: 0 5px;
}
.propline-val {
  flex: 1 1 auto;
  padding: 0 5px;
}
.propline-default {
  align-self: flex-start;
  flex: 0 0 50px;
}
</style>
