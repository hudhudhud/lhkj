<template>
  <div class="page">
    <div class="header">
      <div class="item" @click="bindTab(1)" :class="active =='tab1'?'ac':''">
        已邀请
      </div>
      <div class="item" @click="bindTab(2)" :class="active =='tab2'?'ac':''">
        已办卡
      </div>
    </div>
    <div class="cont">
      <mt-tab-container v-model="active" :swipeable="true">
        <mt-tab-container-item id="tab1">
          <invited :list="invitedList"></invited>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <card :list="cardList"></card>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import invited from './components/partner/invited';
import card from './components/partner/cardList';
export default {
  name: 'partner',
  data () {
    return {
      active: 'tab1',
      currentTab: null,
      applyCard: null,
      invitedList: Array,
      cardList: Array
    };
  },
  components: {
    invited,
    card
  },
  methods: {
    bindTab (e) {
      this.active = 'tab' + e;
    },
    async loadData (e) {
      let rs = await this.$post('/new_partner/listBoundUser', {
        apply_card: e
      });
      if (rs.status == 200) {
        if (e == 'Y') {
          this.cardList = rs.payload;
        } else {
          this.invitedList = rs.payload;
        }
      } else {
        this.$toast(rs.error);
      }
    },
    // 已办卡
    async getAppliedCard () {
      this.currentTab = 'appliedCard';
      this.applyCard = 'Y';
      await this.loadData(this.applyCard);
    },
    // 全部
    async getAll () {
      this.currentTab = 'all';
      this.applyCard = '';
      await this.loadData(this.applyCard);
    }
  },
  async created () {
    this.$indicator.open();
    await this.getAll();
    await this.getAppliedCard();
    this.$indicator.close();
  }
};
</script>
<style lang="scss" scoped>
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 12.06rem;
  background: url(./imgs/partner-bg.jpg) no-repeat center bottom;
  background-position: bottom;
  background-size: 100%;
  min-height: 100vh;
  .header {
    background-color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.23rem;
    display: flex;
    justify-content: space-around;
    .item {
      height: 0.78rem;
      line-height: 0.78rem;
      color: #333;
      font-size: 0.3rem;
      padding: 0 0.3rem;
      padding-top: 0.12rem;
      position: relative;
      box-sizing: content-box;
      &.ac:after {
        content: "";
        display: block;
        position: absolute;
        width: 0.8rem;
        height: 0.06rem;
        background-color: #f72539;
        border-radius: 0.03rem;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
