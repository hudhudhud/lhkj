<template>
  <div class="propeditor">
    <div class="propeditor-title">基础属性</div>
    <div class="propeditor-list propeditor-list-base">
      <template v-if="comp">
        <PropertyEditor v-model="comp.name" :comp="comp" :page="page" :prop-def="{key:'name',name:'名称',type:'text'}">
        </PropertyEditor>
      </template>
      <template v-else>
        <div class="propeditor-nop">不支持任何属性</div>
      </template>
    </div>
    <div class="propeditor-title">组件属性</div>
    <div class="propeditor-list propeditor-list-prop">
      <template v-if="comp">
        <PropertyEditor v-model="comp.setting[prop.key]" :page="page" v-if="!prop.showFunc || prop.showFunc(comp)" :comp="comp" :prop-def="prop" v-for="prop in componentsMap[comp.tag].props" :key="prop.key">
        </PropertyEditor>
      </template>
      <template v-else>
        <div class="propeditor-nop">不支持任何属性</div>
      </template>
    </div>
    <div class="propeditor-title">样式属性</div>
    <div class="propeditor-list propeditor-list-style">
      <template v-if="comp&&comp.style&&styleProps">
        <div v-for="(group,index) in styleProps" :key="'stylegroup_'+index">
          <div class="propeditor-group-name">{{group.groupName}}</div>
          <div class="propeditor-group-styles">
            <PropertyEditor v-model="comp.style[style.key]" :page="page" v-if="!style.showFunc || style.showFunc(comp)" :comp="comp" :prop-def="style" v-for="style in group.styles" :key="style.key">
            </PropertyEditor>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="propeditor-nop">不支持任何属性</div>
      </template>
    </div>
  </div>
</template>

<script>
import styleProps from "./styleProps"
import PropertyEditor from "./PropertyEditor"
import {componentsMap} from "../preview/components"

export default {
  props: {
    value: {
      type: Object,
      require: true
    },
    page: {
      type: Object,
      require: false
    }
  },
  components: {
    PropertyEditor
  },
  watch: {
    value (val) {
      this.comp = val
    },
    comp (val) {
      this.$emit("input", val)
    }
  },
  data () {
    return {
      comp: this.value,
      styleProps,
      componentsMap
    }
  }
}
</script>

<style scoped>
.propeditor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.propeditor-title {
  position: relative;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  background: #f2f2f2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
.propeditor-list {
  background: #fff;
}
.propeditor-nop {
  line-height: 50px;
  font-size: 14px;
  padding: 0 10px;
  color: #666;
}
.propeditor-group-name {
  padding: 0 10px;
  font-size: 14px;
  line-height: 30px;
  background: #eee;
}
.propeditor-group-styles {
  position: relative;
}
</style>
