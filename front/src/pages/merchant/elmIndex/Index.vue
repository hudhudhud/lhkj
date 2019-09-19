<template>
  <div>
    <button @click="getUrl">点我跳转</button>
  </div>
</template>

<script>
export default {
  methods: {
    async getUrl () {
      let rs = await this.$post('api/hungry/enter');
      if (rs.status == 200) {
        window.location.href = rs.payload;
      }
    }
  }
};
</script>

<style scoped>
</style>
