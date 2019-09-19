<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive :include="cachedViews">

        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AppModule } from '@/store/modules/app';

@Component
export default class AppMain extends Vue {
  get cachedViews() {
    return AppModule.cachedViews
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  width:100%;
}
</style>
