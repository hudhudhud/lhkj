<template>
  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <div class="input-box" :style="item.inputStyle">
      <input
        type="text"
        :value="value"
        id="test"
        :placeholder="'请输入'+item.label"
        :class="item.placeholderClass"
      />
    </div>

  </div>
</template>
<script>
export default {
  props: ["item", "value"],
  data() {
    return {
      date: null,
      laydate: window.laydate
    };
  },
  model: {
    prop: "value",
    event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
  },

  mounted() {
    let vm = this;
    this.laydate.render({
      elem: "#test",
      type: 'datetime',
      range: true,
      position: "fixed",
      // format: vm.item.verifyRegex,
      format: "yyyy-MM-dd HH:mm:ss",
      min: 0, //7天前
      max: 30, //7天后
      //showBottom: false,
      done: function(value, date, endDate) {
        console.log(value);
        // vue.showDate = value;
        var month = date.month;
        var day = date.date;

        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        vm.date = date.year + "-" + month + "-" + day;
        vm.$emit("parent-event", value);
      }
    });
  }
};
</script>
<style scoped>
.selector-form {
  border: 1px solid rgb(200, 201, 202);
  border-radius: 0.6rem;
  line-height: 0.86rem;
  line-height: 0.86rem;
  font-size: 0.28rem;
  color: #333;
  margin: 0.3rem 0;
  padding-left: 0.2rem;
  position: relative;
}
.selector-form {
  color: #fff;
  width: 4.2rem;
  border-radius: 0.2rem;
  text-align: left;
  border-color: #fff;
  padding-left: 0;
}
.point {
  display: inline-block;
  border-top: 2px solid #3170d5;
  border-right: 2px solid #3170d5;
  height: 10px;
  width: 10px;
  transform: rotate(45deg);
  position: absolute;
  top: 13px;
  right: 20px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}
</style>
<style>
.layui-laydate-range{
  max-width: 100%;
}
</style>
