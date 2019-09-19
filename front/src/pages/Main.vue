<template>
  <div class="page">
    <div
      class="content"
      :class="{bottom55: $store.state.tabbarShow}"
    >
      <router-view></router-view>
    </div>
    <div
      class="tabbar"
      :class="TabConfig && TabConfig[0].theme?TabConfig[0].theme:$store.state.merchantConfig.theme"
      v-if="$store.state.tabbarShow"
    >
      <div
        class="tabbar-item"
        :class="{'tabbar-item-active':$route.path == `/${$store.state.merchantAppid}/${tab.path}`}"
        v-for="(tab,ind) in TabConfig?TabConfig:tabs"
        :key="'tab_'+ind"
        @click="showNavbar(tab,ind)"
      >
        <!-- -->
        <img
          class="tabbar-icon"
          :src="tab.icon"
          v-show="$route.path != `/${$store.state.merchantAppid}/${tab.path}` && $route.path != `/${$store.state.merchantAppid}/${tab.path}`+'/act/'+actId"
        >
        <img
          class="tabbar-icon"
          :src="tab.icon_on"
          v-show="$route.path == `/${$store.state.merchantAppid}/${tab.path}` || $route.path == `/${$store.state.merchantAppid}/${tab.path}`+'/act/'+actId"
        >
        <div class="tabbar-text"><span
            v-if="tab.text =='我的'"
            :class="{'redcode':redcodeshow}"
          ></span>{{tab.text}}</div>
        <div
          class="navbar"
          v-if="ind==mask && navbarShow && tab.innerTabs"
          :class="{active:navbarShow}"
        >
          <div
            class="navbar-item"
            v-for="(nav,ind2) in tab.innerTabs"
            :key="'nav_'+ind2"
            @click="showinnerNavbar(nav,ind2)"
          >
            {{nav.text}}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getNoPayOrderList } from '@/lib/api';
import home from '@/assets/main/home.png';
import homeOn from '@/assets/main/home_on.png';
import mine from '@/assets/main/mine.png';
import mineOn from '@/assets/main/mine_on.png';
import service from '@/assets/main/service.png';
import serviceOn from '@/assets/main/service_on.png';
import MainConfig from './Main.json';
// import TabConfig from './tabs1.json';
import { Toast } from 'mint-ui';
export default {
  name: 'Main',
  data () {
    return {
      // backIcon: backIcon,
      actId: this.$store.state.merchantConfig.actId,
      // TabConfig: TabConfig,
      TabConfig: '',
      tabs: [
        {
          text: '首页',
          icon: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].home
            : home,
          icon_on: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].homeOn
            : homeOn,
          active: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].active
            : '#cd1d3c',
          path: `merchant/index`
        },
        {
          text: '我的',
          icon: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].mine
            : mine,
          icon_on: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].mineOn
            : mineOn,
          path: `merchant/index/mine`
        },
        {
          text: '客服',
          icon: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].service
            : service,
          icon_on: this.$store.state.merchantConfig.theme
            ? MainConfig[`${this.$store.state.merchantConfig.theme}`].serviceOn
            : serviceOn,
          path: `merchant/index/service`
        }
      ],
      redcodeshow: false,
      navbarShow: false,
      mask: -1,
      jsontabs: ''
    };
  },
  methods: {
    showNavbar (tab, i) {
      if (tab.path) {
        this.$router.replace(`/${this.$store.state.merchantAppid}/${tab.path}`);
        this.mask = i;
      } else {
        if (this.mask == i) {
          this.navbarShow = !this.navbarShow;
        } else {
          this.navbarShow = true;
          this.mask = i;
        }
      }
    },
    showinnerNavbar (nav, i) {
      if (nav.path) {
        if (nav.path.indexOf('http') == -1) {
          this.$router.replace(
            `/${this.$store.state.merchantAppid}/${nav.path}`
          );
        } else {
          window.location.href = nav.path;
        }
      } else {
        Toast('敬请期待！');
      }
    }
  },
  created () {
    if (this.$store.state.payload.tabConfig) {
      this.TabConfig = JSON.parse(this.$store.state.payload.tabConfig);
      // this.TabConfig.forEach(item1 => {
      // if (item1.innerTabs) {
      //   item1.innerTabs.forEach(item2 => {
      //     if (item2.text.length > 7) {
      //       item2.text = item2.text.substr(0, 4) + '...';
      //     }
      //   });
      // }
      // });
    }
    console.log(99999, this.TabConfig);
  },
  mounted () {
    if (this.$store.state.merchantId == 201) {
      getNoPayOrderList(rs => {
        if (rs.payload.list.length && this.$route.path.indexOf('order') < 0) {
          this.redcodeshow = true;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page {
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  .content {
    min-height: 100%;
    -webkit-overflow-scrolling: touch;
    background: #efefef;
    &.bottom55 {
      padding-bottom: 55px;
    }
  }
}

.tabbar {
  position: fixed;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 55px;
  display: flex;
  background: #fff;
  user-select: none;
  justify-content: space-around;
  &:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #d9d9d9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
}

.tabbar-item {
  flex: 0 0 33.33%;
  position: relative;
  &.tabbar-item-active {
    color: #cd1d3c;
  }
  &.tabbar-item-active-cbb {
    color: rgb(9, 182, 242);
  }
  &.tabbar-item-active-cbbZJ {
    color: rgb(9, 182, 242);
  }
  &.tabbar-item-active-ccbSZ {
    color: rgb(9, 182, 242);
  }
  &.tabbar-item-active-ccbJilin {
    color: rgb(9, 182, 242);
  }
  .tabbar-icon {
    display: block;
    height: 0.6rem;
    width: auto;
    margin: 0.1rem auto 0;
  }
  .tabbar-text {
    line-height: 20px;
    font-size: 0.18rem;
    text-align: center;
    position: relative;

    .redcode {
      background: red;
      border-radius: 0.1rem;
      cursor: pointer;
      position: absolute;
      top: -0.1rem;
      left: 32%;
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .navbar {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 55px;
    height: auto;
    transition-property: all;
    transition-duration: 2000ms;
    transition-timing-function: ease-in-out;
    background: rgb(239, 239, 239);
  }
  .active {
    transition-property: all;
    transition-duration: 2000ms;
    transition-timing-function: ease-in-out;
  }
  .navbar-item {
    width: 100%;
    height: 1rem;
    border: solid 0.01rem #c6c6c6;
    line-height: 1rem;
    font-size: 0.3rem;
    padding-left: 0.3rem;
    position: relative;
    &:after {
      position: absolute;
      top: inherit;
      right: 0;
      transform: translateX(-50%);
      display: inline-block;
      content: "》";
      font-size: 0.35rem;
    }
  }
}
.ccbJilin,
.ccbSZ,
.cbb,
.cbbZJ,
.ccbGD {
  .tabbar-item {
    &.tabbar-item-active {
      color: rgb(9, 182, 242);
    }
  }
}
.ccbGX {
  .tabbar-item {
    &.tabbar-item-active {
      color: rgb(92, 208, 139);
    }
  }
}
.HNtp {
  .tabbar-item {
    &.tabbar-item-active {
      color: rgb(216, 48, 118);
    }
  }
}
.ZJyd {
  .tabbar-item {
    &.tabbar-item-active {
      color: #83b727;
    }
  }
}
.bocFJ {
  .tabbar-item {
    &.tabbar-item-active {
      color: #e21b1b;
    }
  }
}
.ccbHN {
  .tabbar-item {
    &.tabbar-item-active {
      color: #9a2d2f;
    }
  }
}
.ycHN {
  .tabbar-item {
    &.tabbar-item-active {
      color: #40bd49;
    }
  }
}
.BJyyb {
  .tabbar-item {
    &.tabbar-item-active {
      color: rgb(88, 83, 199);
    }
  }
}
.MT {
  .tabbar-item {
    &.tabbar-item-active {
      color: #ff5c7a;
    }
  }
}
.ccbCreditGD {
  .tabbar-item {
    &.tabbar-item-active {
      color: #2679f1;
    }
  }
}
</style>
