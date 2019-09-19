<template>
  <div class="invited">
    <info :statistics=statistics></info>
    <div class="list">
      <item v-for="(item, index) in list" :key="index" :item="item"></item>
    </div>
  </div>
</template>
<script>
import info from './partnerStatistics';
import item from './partnerItem';
export default {
  name: 'invited',
  props: ['list'],
  watch: {
    list: {
      handler (newVal) {
        this.statis(newVal);
      }
    }
  },
  data () {
    return {
      statistics: [],
      prices: 0
    };
  },
  components: {
    info,
    item
  },
  methods: {
    statis (list) {
      this.price(list);
      this.statistics = [];
      let obj1 = {
        name: '邀请人数(人)',
        num: list.length
      };
      let obj2 = {
        name: '累积获得金币(枚)',
        num: this.prices
      };
      this.statistics.push(obj1);
      this.statistics.push(obj2);
    },
    price (list) {
      if (!list.length > 0) {
        return false;
      }
      let i = 0;
      let time = list[0].bindTime.substring(0, 10);

      list.forEach(item => {
        item.DayTime = item.bindTime.substring(0, 10);
        item.isAdd = true;
        this.prices += 5;
        if (item.DayTime == time) {
          i++;
          if (i > 10) {
            this.prices -= 5;
            item.isAdd = false;
          }
        } else {
          i = 1;
          time = item.DayTime;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  margin-top: 0.34rem;
}
</style>
