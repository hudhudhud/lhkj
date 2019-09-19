<template>
  <LayoutPage>
    <el-tabs v-model="activeTab" type="card" @tab-click="tabChange">
      <el-tab-pane label="买房需求" name="buy_h">
      </el-tab-pane>
      <el-tab-pane label="租房需求" name="rent_h">
      </el-tab-pane>
    </el-tabs>
    <ssBuyHouse v-if="activeTab==='buy_h'"></ssBuyHouse>
    <ssRentHouse v-else-if="activeTab==='rent_h'"></ssRentHouse>
  </LayoutPage>
</template>
<script>
import ssBuyHouse from "./components/ssBuyHouse";
import ssRentHouse from "./components/ssRentHouse";
export default {
  components: { ssBuyHouse, ssRentHouse },
  data() {
    return {
      activeTab: "buy_h"
    };
  },
  methods: {
    tabChange() {}
  }
};
</script>
