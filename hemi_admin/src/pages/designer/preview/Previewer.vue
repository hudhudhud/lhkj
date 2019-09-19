<template>
  <div class="preview-box">
    <LegoRenderer :vw="vw" :vh="vh" v-for="(comp,ind) in componentList" :comp="comp" :highlight-comp="highlightComp" :key="'comp_'+ind" @component-select="onClick">
    </LegoRenderer>
  </div>
</template>

<script>
import LegoRenderer from "./LegoRenderer"

export default {
  props: {
    componentList: {
      type: Array,
      require: true
    },
    highlightComp: {
      type: Object,
      require: false
    }
  },
  components: {LegoRenderer},
  data () {
    return {
      vw: 0,
      vh: 0
    }
  },
  methods: {
    onClick (comp) {
      this.$emit("component-select", comp)
    }
  },
  mounted () {
    this.vw = this.$el.offsetWidth
    this.vh = this.$el.offsetHeight
  }
}
</script>

<style scoped>
.preview-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #fff;
}
</style>
