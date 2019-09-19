
<template>
  <div>
    <div id="zzjs_1" class="jsc" ref="box">
      <ul>
        <li v-for="(item, index) in list" :key="index"><a href="http://js.alixixi.com" target="_blank">{{item.txt}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {txt: '阿里西西特效网一号滚动新闻'},
        {txt: '阿里西西特效网二号滚动新闻'},
        {txt: '阿里西西特效网3号滚动新闻'},
        {txt: '阿里西西特效网4号滚动新闻'},
        {txt: '阿里西西特效网5号滚动新闻'},
        {txt: '阿里西西特效网6号滚动新闻'},
        {txt: '阿里西西特效网7号滚动新闻'}
      ],
      element: this.$refs.box,
      height: 26
    }
  },
  methods: {
    scroll () {
      if (this.element.scrollTop < this.maxHeight) {
        this.element.scrollTop++
        this.counter++
      }
    }
  },
  mounted () {
    console.log(this.$refs.box.scrollHeight)
  }

}
</script>

<style scoped>
.jsc {
  border: 1px solid #eee;
  width: 668px;
  font-size: 12px;
  height: 24px;
  overflow: hidden;
}
.jsc ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 32px;
}
.jsc ul li {
  height: 26px;
  line-height: 26px;
  width: 320px;
  float: left;
}
</style>
