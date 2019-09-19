<template>
  <div class="components">
    <div class="title">
      <img class="title-icon" src="../imgs/icon-tree.png" /> 组件树
    </div>
    <div class="tree">
      <div class="tree-empty" v-if="!componentList || componentList.length==0">还没有任何组件,点击添加开始吧</div>
      <ComponentTreeItem v-model="componentList[ind]" :current-comp="currentComp" @add-child="addChild" :is-root="true" @component-select="select" v-for="(comp,ind) in componentList" :key="'comp_'+ind">
      </ComponentTreeItem>
    </div>
    <el-dialog title="选择要添加的组件" :visible.sync="showSelector" width="30%" @click.native.stop>
      <div class="select-item" v-for="(config,ind) in configList" :key="'config_'+ind">
        <div class="select-item-name">{{config.name}} ({{config.tag}})
          <el-button @click="doAdd(config)">添加</el-button>
        </div>
        <div class="select-item-desc">{{config.desc}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import configList, {componentsMap} from "../preview/components"
import ComponentTreeItem from "./ComponentTreeItem"

export default {
  props: {
    value: {
      type: Array,
      require: true
    },
    highlightComp: {
      type: Object,
      require: false
    }
  },
  components: {
    ComponentTreeItem
  },
  data () {
    return {
      configList: configList,
      componentsMap,
      componentList: this.value || [],
      showSelector: false,
      parentComp: null,
      currentComp: null
    }
  },
  watch: {
    value (val) {
      this.componentList = val
    },
    componentList (val) {
      this.$emit("input", val)
    },
    highlightComp (val) {
      this.currentComp = val
    }
  },
  methods: {
    addChild (comp) {
      this.showSelector = true
      this.parentComp = comp
    },
    doAdd (config) {
      // 读取slotTag配置
      // 如果父组件就是slot容器,则设置为父组件的tag,否则取父组件的slotTag
      let slotTag = this.componentsMap[this.parentComp.tag].slotProps ? this.parentComp.tag : this.parentComp.slotTag

      let children = this.parentComp.children
      if (!children) {
        children = []
        this.$set(this.parentComp, "children", children)
      }
      let newComp = {
        tag: config.tag,
        parentTag: this.parentComp.tag,
        slotTag: slotTag,
        isContainer: config.isContainer,
        setting: config.defaultSetting || {},
        style: config.defaultStyle || {
        }
      }
      children.push(JSON.parse(JSON.stringify(newComp)))
      this.showSelector = false
      this.select(children[children.length - 1])
    },
    select (comp) {
      this.currentComp = comp
      this.$emit("component-select", comp)
    }
  }
}
</script>

<style scoped>
.components {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 14px;
  background: #f2f2f2;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
}
.title-icon {
  display: inline-block;
  vertical-align: top;
  height: 20px;
  margin-top: 5px;
}
.tree {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 30px;
  overflow: auto;
  padding: 5px;
}
.tree-empty {
  line-height: 100px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.select-item {
  margin-bottom: 10px;
  border-bottom: 1px solid #efefef;
}
.select-item:last-child {
  border: none;
}
.select-item-name {
  color: #000;
}
.select-item-desc {
  line-height: 20px;
  color: #999;
  padding: 10px 0;
}
</style>
