<template>
  <component :is="actTemplate" v-if="actTemplate" :pageKey="pageKey"></component>
</template>

<script>
// import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      actTemplate: null,
      pageKey: null
    };
  },
  created () {
    if (
      this.$store.state.merchantTplName == 'ccbYueHui' &&
      this.$store.state.merchantConfig.pageKey
    ) {
      this.actTemplate = 'legoPageTemplate';
      this.pageKey = this.$store.state.merchantConfig.pageKey.split('?')[0];
    } else {
      this.actTemplate = this.$store.state.merchantTplName;
    }
  }
};
</script>
