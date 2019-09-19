<template>
  <div class="LegoShare">

  </div>
</template>

<script>
export default {
  props: {
    setting: {}
  },
  data () {
    return {

    };
  },
  methods: {
  },
  created () {
    window.location.replace(this.setting.link);
  }
};
</script>
