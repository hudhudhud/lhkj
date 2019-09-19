<template>
  <div class="container">
    <div
      id="zzjs_1"
      class="jsc"
      ref="box"
    >
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      element: this.$refs.box,
      height: 15,
      maxHeight: 0,
      counter: 0,
      timer: null
    };
  },
  computed: {
    list () {
      let val = this.setting.titleList.split(',');
      console.log(val);
      return val.concat(val);
    }
  },
  methods: {
    scroll (element) {
      let _this = this;
      element.scrollTop++;
      if (element.scrollTop < element.scrollHeight / 2) {
        element.scrollTop++;
        this.counter++;
      } else {
        element.scrollTop = 0;
        this.counter = 0;
      }
      if (this.counter < this.height) {
        this.timer = setTimeout(function () {
          _this.scroll(element);
        }, 22);
      } else {
        this.counter = 0;
        this.timer = setTimeout(function () {
          _this.scroll(element);
        }, 1126);
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll(this.$refs.box);
    });
  }
};
</script>

<style scoped>
.container {
  height: 30px;
  overflow-x: hidden;
  line-height: 30px;
}
.jsc {
  height: 30px;
  overflow: hidden;
}
.container .label {
  position: absolute;
  left: 0.5rem;
  z-index: 99;
  font-size: 0.28rem;
}
.jsc ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.jsc ul li {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
