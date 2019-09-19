<template>
  <div class="games">
    <div class="games-me" @click="testQuality(0)"></div>
    <div class="games-her" @click="testQuality(1)"></div>
  </div>
</template>

<script>
export default {
  name: 'games',
  methods: {
    testQuality (type) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/analyze`
      );
    }
  }
}
</script>

<style scoped lang="scss">
  .games {
    background-image: url("./img/games_back.jpg");
    background-size: cover;
    width: 100%;
    height: 13.34rem;
    position: relative;

    &-me {
      background-image: url("./img/girl.png");
      background-size: cover;
      width: 5.66rem;
      height: 3.4rem;
      position: absolute;
      top: 6.18rem;
      left: 1.15rem;
    }

    &-her {
      background-image: url("./img/boy.png");
      background-size: cover;
      width: 5.75rem;
      height: 3.53rem;
      position: absolute;
      top: 9.58rem;
      right: 1.1rem;
    }
  }
</style>
