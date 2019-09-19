<template>
  <component v-if="isDisplay" class="preview-item" :slot-data="slotData" :setting="comp.setting" :style="computedStyle" :is="comp.tag" v-highlight="highlightComp==comp" @click.native.stop="onClick(comp)">
    <template v-if="comp.isContainer" slot-scope="slotProps">
      <LegoRenderer :vw="vw" :vh="vh" :slot-data="slotProps.slotData||slotData" v-for="(com,ind) in comp.children" :comp="com" :setting="com.setting||{}" :highlight-comp="highlightComp" :key="('comp_'+com.tag)+((slotProps&&slotProps.slotKey)?slotProps.slotKey:ind)" @component-select="onClick">
      </LegoRenderer>
    </template>
  </component>
</template>

<script>
import components from "./components"
let componentsMap = {}
components.forEach(item => {
  componentsMap[item.tag] = item.component
})

export default {
  name: "LegoRenderer",
  props: {
    comp: {
      type: Object,
      require: true
    },
    highlightComp: {
      type: Object,
      require: false
    },
    vh: {
      type: Number,
      require: false
    },
    vw: {
      type: Number,
      require: false
    },
    slotData: {}
  },
  components: componentsMap,
  data () {
    return {
      components
    }
  },
  computed: {
    isDisplay () {
      if (this.comp.setting.isDisplay && this.slotData) {
        return this.slotData[this.comp.setting.isDisplay]
      }
      return true
    },
    computedStyle () {
      let rootFontSize = this.vw / 7.5
      let newStyle = {}
      for (let x in this.comp.style) {
        let v = this.comp.style[x]
        if (!v || !v.split) {
          newStyle[x] = v
          continue
        }
        let arr = v.split(" ")
        for (let i = 0; i < arr.length; i++) {
          let subv = arr[i]
          if (subv && subv.indexOf("vw") > 0) {
            subv = this.vw / 100 * subv.replace("vw", "").replace(/\s/g, "") + "px"
          }
          if (subv && subv.indexOf("vh") > 0) {
            subv = this.vh / 100 * subv.replace("vh", "").replace(/\s/g, "") + "px"
          }
          if (subv && subv.indexOf("rem") > 0) {
            subv = rootFontSize * subv.replace("rem", "").replace(/\s/g, "") + "px"
          }
          arr[i] = subv
        }
        newStyle[x] = arr.join(" ")
      }
      return newStyle
    }
  },
  methods: {
    onClick (comp) {
      this.$emit("component-select", comp || this.comp)
    }
  }
}
</script>

<style scoped>
.preview-item {
  transition: all 0.5s;
}
</style>
