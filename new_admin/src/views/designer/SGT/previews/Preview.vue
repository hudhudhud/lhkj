<template>
  <div class="page" id="previewPage"
    :style="{'backgroundColor':tpl.pageColor,'backgroundImage': 'url('+ tpl.pageBg+')'} " v-highLight="'pageColor'">
    <components v-if="tpl.key" :is="tpl.key" :tpl="tpl" :tplsSurface="tplsSurface" @update-settings="updateSetting">
    </components>
  </div>
</template>

<script>
import previewComponents from "./components";
import { highLight } from "@/directive/highLight"; // waves directive

export default {
  components: previewComponents,
  directives: { highLight },
  props: {
    tplsSurface: {
      type: String,
      require: true
    },
    tpl: {
      type: Object,
      require: true
    }
  },
  model: {
    prop: "tpl",
    event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
  },
  methods: {
    updateSetting(settings) {
      this.$emit("parent-event", settings);
    }
  }
};
</script>

<style scoped>
.page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
