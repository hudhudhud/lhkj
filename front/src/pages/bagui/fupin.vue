<template>
  <div>
    <cbbHeader title="善融扶贫"></cbbHeader>
    <div class="fupin-main">
      <div class="fupin-tab">
        <div class="nav">
          <div
            v-for="(item, index) in shanRong"
            :key="'nav'+index"
            class="nav-item"
            :class="{'nav-item-active':currentTab==index}"
            @click="select(index)"
          >{{item[0].txt}}</div>
          <!-- >{{item[0].txt}}</div> -->
        </div>
      </div>
      <div class="fupin-list">
        <div class="fupin-item" v-for="(item, ind) in list" :key="'pro'+ind">
          <a :href="item.link">
            <img :src="item.imgSrc" alt>
          </a>
        </div>
      </div>
      <div class="noMore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import shanRong from './shanRong.json';
import cbbHeader from '@/components/cbbHeader';
export default {
  data () {
    return {
      currentTab: 'all',
      shanRong: shanRong,
      list: shanRong['all']
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    select (i) {
      this.currentTab = i;
      this.list = shanRong[i];
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.fupin-main {
  background: #efefef;
  font-size: 0;
  .nav {
    @include flex(row, nowrap, flex-start, flex-start);
    height: 0.9rem;
    line-height: 0.9rem;
    color: rgb(83, 96, 89);
    font-size: 0.3rem;
    text-align: center;
    background: #fff;
    .nav-item {
      flex: 1;
      position: relative;
    }
    .nav-item-active {
      &:after {
        @include after-border(rgb(61, 178, 154), 2px, 0.7rem);
      }
    }
  }
  .fupin-list {
    padding: 0.32rem 0.16rem 0;
    @include flex(row, wrap, flex-start, flex-start);
    .fupin-item {
      flex: 1;
      min-width: 50%;
      padding: 0 0.12rem 0.24rem;
      img {
        width: 100%;
      }
    }
  }
  .noMore {
    font-size: 0.26rem;
    color: rgb(184, 187, 191);
    text-align: center;
    line-height: 1.2rem;
  }
}
</style>
