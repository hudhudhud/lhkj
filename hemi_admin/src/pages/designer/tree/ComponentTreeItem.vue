<template>
  <div class="tree-item" :class="{'tree-item-root':isRoot}" @click.stop="select(comp)">
    <div class="tree-item-toggle" :class="{'tree-item-toggle-plus':!showChildren}" @click.stop="showChildren=!showChildren" v-if="comp.children&&comp.children.length>0"></div>
    <div class="tree-row" :class="{'tree-row-active':currentComp===comp}">
      <div class="tree-item-title">
        <img class="tree-item-title-icon" :src="componentsMap[comp.tag].icon" v-if="componentsMap[comp.tag].icon" /> {{componentsMap[comp.tag].name}}-{{value.name||"未命名"}}
      </div>
      <div class="tree-item-btns">
        <el-button size="mini" v-if="comp.isContainer" plain @click="addChild(comp)">添加</el-button>
        <el-dropdown @command="handleCommand">
          <el-button size="mini" plain>
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="remove" v-if="!isRoot">删除</el-dropdown-item>
            <el-dropdown-item command="copy" v-if="!isRoot">复制</el-dropdown-item>
            <el-dropdown-item command="paste" :disabled="!comp.isContainer">粘贴</el-dropdown-item>
            <el-dropdown-item command="moveUp" v-if="!isRoot" divided>上移</el-dropdown-item>
            <el-dropdown-item command="moveDown" v-if="!isRoot">下移</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="tree-children" v-if="comp.children" v-show="showChildren">
      <ComponentTreeItem v-model="comp.children[ind]" @remove="remove(comp,ind)" @move-up="moveUp(ind)" @move-down="moveDown(ind)" :current-comp="currentComp" @add-child="addChild" @component-select="select" v-for="(com,ind) in comp.children" :key="'children_'+comp.name+ind"></ComponentTreeItem>
    </div>
  </div>
</template>

<script>
import ComponentTreeItem from "./ComponentTreeItem"
import {componentsMap} from "../preview/components"

export default {
  name: "ComponentTreeItem",
  components: {ComponentTreeItem},
  props: {
    value: {
      type: Object,
      require: true
    },
    currentComp: {
      type: Object,
      require: false
    },
    isRoot: {
      type: Boolean,
      require: false
    }
  },
  data () {
    return {
      comp: this.value,
      componentsMap,
      showChildren: true
    }
  },
  watch: {
    comp (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.comp = val
    }
  },
  methods: {
    addChild (comp) {
      this.$emit("add-child", comp)
    },
    remove (comp, ind) {
      this.$confirm("此操作将永久删除该组件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.doRemove(comp, ind)
      }).catch(() => {
      })
    },
    doRemove (comp, ind) {
      comp.children.splice(ind, 1)
      this.$message({
        type: "success",
        message: "删除成功!"
      })
      if (comp.children.length > 0) {
        this.$emit("component-select", comp.children[comp.children.length - 1])
      } else {
        this.$emit("component-select", comp)
      }
    },
    select (comp) {
      this.$emit("component-select", comp || this.comp)
    },
    handleCommand (command) {
      if (command == "remove") {
        this.$emit("remove")
      } else if (command == "move") {
        this.$emit("move")
      } else if (command == "moveUp") {
        this.$emit("move-up")
      } else if (command == "moveDown") {
        this.$emit("move-down")
      } else if (command == "copy") {
        sessionStorage.setItem("copiedComponent", JSON.stringify(this.comp))
      } else if (command == "paste") {
        let json = sessionStorage.getItem("copiedComponent")
        if (json) {
          try {
            let newComp = JSON.parse(json)
            let children = this.comp.children
            if (!children) {
              children = []
              this.$set(this.comp, "children", children)
            }
            children.push(newComp)
          } catch (error) {
            this.$message.error("解析错误,复制内容不正确")
          }
        }
      }
    },
    moveUp (ind) {
      if (ind > 0) {
        let movedComp = this.comp.children[ind]
        this.comp.children.splice(ind, 1)
        this.comp.children.splice(ind - 1, 0, movedComp)
      }
    },
    moveDown (ind) {
      if (ind < this.comp.children.length - 1) {
        let movedComp = this.comp.children[ind]
        this.comp.children.splice(ind, 1)
        this.comp.children.splice(ind + 1, 0, movedComp)
      }
    }
  }
}
</script>

<style scoped>
.tree-item {
  position: relative;
  margin: 5px 0;
  transition: all 0.3s;
}
.tree-row {
  padding: 5px 0;
  height: 30px;
  line-height: 30px;
  border: 1px solid #eee;
  color: #333;
  transition: all 0.3s;
}
.tree-row-hover {
  border: 1px solid #888;
}
.tree-row-active {
  border: 1px solid green;
  color: green;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.tree-item-title {
  font-size: 14px;
  margin: 0 5px;
}
.tree-item-title-icon {
  display: inline-block;
  vertical-align: top;
  margin-top: 5px;
  margin-right: 3px;
  height: 20px;
  width: 20px;
}
.tree-item-btns {
  position: absolute;
  top: 5px;
  right: 5px;
}
.tree-item-add {
  padding: 10px 0;
  text-align: center;
}
.tree-children {
  position: relative;
  padding-left: 20px;
}
.tree-item:before {
  content: " ";
  position: absolute;
  left: -15px;
  top: 21px;
  width: 15px;
  border-top: 1px solid #999;
}
.tree-item:after {
  content: " ";
  position: absolute;
  left: -15px;
  top: -5px;
  bottom: -5px;
  border-left: 1px solid #999;
}
.tree-item:last-child:after {
  content: " ";
  position: absolute;
  left: -15px;
  top: -5px;
  height: 26px;
  border-left: 1px solid #999;
}
.tree-item-root:before {
  display: none;
}
.tree-item-toggle {
  position: absolute;
  z-index: 2;
  top: 15px;
  left: -21px;
  height: 11px;
  width: 11px;
  border: 1px solid #000;
  background: #fff;
}
.tree-item-toggle:after {
  content: " ";
  position: absolute;
  top: 5px;
  left: 2px;
  right: 2px;
  border-top: 1px solid #000;
}
.tree-item-toggle-plus:before {
  content: " ";
  position: absolute;
  top: 2px;
  left: 5px;
  bottom: 2px;
  border-left: 1px solid #000;
}
.tree-item-root > .tree-item-toggle {
  display: none;
}
</style>
