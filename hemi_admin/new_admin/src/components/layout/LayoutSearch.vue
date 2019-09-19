<template>
    <div class="search-bar">
        <el-form :inline="true">
            <slot></slot>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "LayoutSearch"
}
</script>

<style scoped>
.search-bar {
  padding: 10px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  background: #fff;
}
</style>
