<template>
  <div class="lego-charger" v-if="slotData">
    <div class="lego-charger-input">
      <div class="lego-charger-input-box">
        <input class="lego-charger-input-inpt" :placeholder="std?std.accountName:''" />
        <input class="lego-charger-input-inpt" placeholder="请输入优惠码" />
      </div>
        <div class="lego-charger-input-button">
          <img src="//static.lianhaikeji.com/images/20180917/cff99f0fcd834572b5869c9e8e794fd5.png" />
      </div>
        </div>
        <div class="lego-charger-tips">
          {{setting.desc}}
        </div>
        <div class="lego-charge-list" v-if="slotData && slotData.standardList">
          <div class="lego-charge-std" :class="{'lego-charge-std-active':ind==0}" v-for="(std,ind) in slotData.standardList" :key="std.id">{{std.standardName}}</div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object
    }
  },
  data () {
    return {
      slotData: {},
      std: null
    }
  },
  watch: {
    "setting.proId": function (val) {
      if (val) {
        this.loadProduct(val)
      } else {
        this.slotData = null
      }
    }
  },
  methods: {
    async loadProduct (proId) {
      let rs = await this.$get("lego/getProDetails/" + proId)
      if (rs.status == 200) {
        this.slotData = rs.payload
      } else {
        this.slotData = null
      }
    }
  },
  created () {
    if (this.setting.proId) {
      this.loadProduct(this.setting.proId)
    }
  }
}
</script>

<style scoped>
.lego-charger {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
}
.lego-charger-input {
  display: flex;
}
.lego-charger-input-box {
  flex: 1 1 80%;
  display: flex;
  flex-direction: column;
}
.lego-charger-input-inpt {
  flex: 0 0 30px;
  margin-bottom: 10px;
  outline: none;
  line-height: 1rem;
  height: 1rem;
  padding: 0 10px;
  border: 1px solid #999;
  border-radius: 10px;
}
.lego-charger-input-button {
  flex: 0 0 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.lego-charger-input-button img {
  height: 50px;
  width: 50px;
}
.lego-charger-tips {
  flex: 1 1 auto;
  line-height: 20px;
  font-size: 12px;
  color: #999;
}
.lego-charge-list {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.lego-charge-std {
  flex: 0 0 5.6rem;
  margin-right: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
.lego-charge-std:nth-child(3n) {
  margin-right: 0;
}
.lego-charge-std-active {
  border: 1px solid orange;
  color: orange;
}
</style>
