<template>
  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>

    <div
      class="input-label selector-form"
      @click="showSelector = true"
      :style="item.inputStyle"
    >{{value || item.label}}
      <!-- <div class="point"></div> -->
      <span :style="item.iconStyle"></span>
    </div>
    <!-- <transition name="slide">
      <BankSelector
        v-if="showSelector"
        @close="showSelector = false"
        :item="item"
        @select="onSelect"
      ></BankSelector>
    </transition> -->
    <mt-popup
      v-model="showSelector"
      position="right">
      <div class="page">
        <div class="selector-title">
          <div
            class="selector-back"
            @click="showSelector=false"
          ></div>
          {{item.label}}
        </div>
        <div class="title">请选择{{item.label}}</div>
        <ul>
          <li @click="onSelect(info)" v-for="(info,index) in infoList" :key="index">{{info}}</li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
  data() {
    return {
      showSelector: false,
      currentBank: null,
      infoList: []
    };
  },
  model: {
    prop: "value",
    event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
  },
  created() {
    this.loadInfo();
  },
  methods: {
    onSelect(info) {
      this.$emit("parent-event", info);
      this.showSelector = false;
    },
    async loadInfo() {
      let rs = await this.$get(this.item.extraResourceUrl);
      this.infoList = rs;
    }
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
  /* color: #333; */
  margin: 0.3rem 0;
  padding-left: 0.2rem;
  position: relative;
}
.selector-form {
  /* color: #fff; */
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
.page{
  width: 100vw;
  height: 100vh;
  position: relative;
}
.page .title{
  width: 100%;
  height: 1rem;
  padding: 0.2rem 5% 0;
  font-size: 0.32rem;
  line-height: 0.8rem;
  border-bottom: 0.05rem solid rgb(26, 161, 230);
  color: rgb(26, 161, 230)
}
.page ul{
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 2rem;
  bottom: 0;
  overflow: auto;
}
.page ul li{
  width: 90%;
  margin: 0 5%;
  height: 1rem;
  font-size: 0.28rem;
  color: #333;
  line-height: 1rem;
  border-bottom: 1px solid #ececec;
  box-sizing: border-box;
  padding-left: 0.1rem;

}
.selector-title {
  position: relative;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.selector-back {
  position: absolute;
  top: 50%;
  left: 0.3rem;
  margin-top: -0.1rem;
  height: 0.2rem;
  width: 0.2rem;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: rotate(-45deg);
}
</style>
