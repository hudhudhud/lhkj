<template>
  <div class="form">
    <div>
      <span>卡券总量为:{{obj.count}}</span>

    </div>
    <div>
      <span>已使用量为:{{obj.countx}}</span>

    </div>
  </div>

</template>

<script>
export default {
  props: {
    coupon: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      obj: {},
      form: {
        couponId: "",
        wayId: ""
      },
      loading: false,
      submiting: false
    };
  },
  methods: {
    async loadUseCondiyion() {
      console.log(this.coupon);
      this.submiting = true;
      let rs = await this.$post("coupon/showCouponUseCondition", this.coupon);
      if (rs.status == "200") {
        this.obj = rs.payload;
        this.submiting = false;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    }
  },
  created() {
    this.loadUseCondiyion();
  }
};
</script>

<style scoped>
</style>
