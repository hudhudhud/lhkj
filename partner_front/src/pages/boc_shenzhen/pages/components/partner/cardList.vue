<template>
  <div class="card-list">
    <info :statistics="statistics"></info>
    <div class="list">
      <item v-for="(item, index) in list" :key="index" :item="item"></item>
    </div>
  </div>
</template>
<script>
import info from './partnerStatistics';
import item from './partnerItem';
export default {
  name: 'cardList',
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
      statistics: Array
    };
  },
  components: {
    info,
    item
  },
  methods: {
    statis (list) {
      this.statistics = [];
      let obj1 = {
        name: '办卡人数(人)',
        num: list.length
      };
      let obj2 = {
        name: '累积获得金币(枚)',
        num: list.length * 200
      };
      this.statistics.push(obj1);
      this.statistics.push(obj2);
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  margin-top: 0.34rem;
}
</style>
