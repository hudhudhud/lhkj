<template>
  <a :href="setting.href" class="lego-link">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object
    }
  }
}
</script>

<style scoped>
.lego-link,
.lego-link:active,
.lego-link:visited {
  text-decoration: none;
  color: #000;
}
</style>
