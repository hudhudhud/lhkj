<template>
  <div class="sign">
    <div class="sign-band">
      <img class="sign-banner" :src="setting.banner" />
      <img class="sign-btn" v-show="!signSuccess" @click="signSuccess=!signSuccess" :src="setting.btnOn" />
      <img class="sign-btn" v-show="signSuccess" @click="signSuccess=!signSuccess" :src="setting.btnSuccess" />
    </div>
    </div>
</template>

<script>
export default {
  props: ["setting", "slotData"],
  data () {
    return {
      signSuccess: false
    }
  }
}
</script>

<style scoped>
.sign {
  position: relative;
}
.sign-banner {
  display: block;
  width: 100%;
}
.sign-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
}
</style>
