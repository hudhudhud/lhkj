<template>
  <LayoutPage show-back>
    <div class="form-body">
      <slot></slot>
    </div>
  </LayoutPage>
</template>

<script>
export default {
  name: "LayoutForm"
}
</script>

<style scoped>
.form-body {
  flex: 1 1 auto;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
</style>
