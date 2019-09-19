<template>
    <section class="bullet-box">
      <ul class="bullet-list" :class="{'go-top':animate}" :style='{"margin-top":(animate?"-"+itemHeight:"0")}'>
          <li v-for="(item, i) in list" :key='i' class="bullet-item">
              {{item}}
          </li>
      </ul>
    </section>
</template>
<script>
export default{
  props: {
    list: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    interval: {
      type: Number,
      default: 2000
    },
    itemHeight: { // 向上平移的高度
      type: String,
      required: true,
      default: '30px'
    }
  },
  data () {
    return {
      animate: false,
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(this.scroll, this.interval)
  },
  methods: {
    scroll: function () {
      this.animate = true;
      setTimeout(() => {
        this.list.push(this.list[0]);
        this.list.shift();
        this.animate = false;
      }, 1000);
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang='scss' scoped>
.bullet-box{
    width:100%;
    height:100%;
    overflow: hidden;
    position:relative;
    .bullet-list{
        list-style: none;
        margin:0;
        padding:0;
        position:absolute;
        top:0;
        left:0;
        &.go-top{
            transition: all 1s linear;
        }
        .bullet-item{
            margin:0;
            padding:0;
        }
    }
}
</style>
