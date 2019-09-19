<template>
  <div
    class="selector"
    @touchend="showCurrentLetter = false"
  >
    <div class="selector-title">
      <div
        class="selector-back"
        @click="close"
      ></div>
      选择网点
    </div>
    <!--   <div
      class="side-bar"
      @touchmove.prevent.stop="onLetterTouch"
      @touchstart="onTouchStart"
    >
      <div v-for="group in countryGroups" :key="group.letter">
        {{ group.region }}
      </div>
    <transition name="zoom">
        <div
          v-show="showCurrentLetter"
          class="side-bar-pointer"
          :style="{ top: offsetY + 'px' }"
        >
          {{ currentLetter }}
        </div>
      </transition> 
    </div> -->
    <div class="country-list">
      <div v-if="currentArea.banks.length > 0">
        <p class="country-area">您当前所在{{currentArea.region}}</p>
        <div
          class="country-title"
        >
          {{ currentArea.region }}
        </div>
        <div
          class="country-item"
          v-for="(bank, idx) in currentArea.banks"
          :key="'bank'+idx"
          @click="onSelect(bank)"
        >
          <div class="country-icon"></div>
          <div class="country-name">{{ bank.bankName }}</div>
        </div>
      </div>
      <div
        v-for="group in countryGroups"
        :key="group.region"
        v-show="group.region != currentArea.region"
      >
        <div
          class="country-title"
          :id="'letterTitle_' + group.letter"
        >
          {{ group.region }}
        </div>
        <div
          class="country-item"
          v-for="(bank, idx) in group.banks"
          :key="'bank'+idx"
          @click="onSelect(bank)"
        >
          <div class="country-icon"></div>
          <div class="country-name">{{ bank.bankName }}</div>
        </div>
      </div>
    </div>

  </div>

  <!-- <div>
    <div class="input-label">{{item.label}}</div>
    <div
      v-for="(item, idx) in list"
      :key="'item'+idx"
    >

      <div class="department">
        <div class="area"><b>{{item.region}}</b></div>
        <div
          class="li"
          v-for="(bank, idx1) in item.banks"
          :key="'bank'+idx1"
        >
          {{bank}}
        </div>
      </div>
    </div>

  </div> -->
</template>

<script>
import { Toast } from "mint-ui";
import { getCurrentLocation } from "@/utils/index";
export default {
  props: ["item", "value"],
  data() {
    return {
      hiddenKey: "",
      currentBank: null,
      countryGroups: [],
      showCurrentLetter: false,
      currentLetter: "A",
      offsetY: 0,
      startY: 0,
      letterHeight: 0,
      currentArea: {
        region: '',
        banks: []
      }//当前所在地区
    };
  },
  methods: {
    onSelect(bank) {
      this.$emit("select", bank);
      this.close();
    },
    async loadCountrys() {
      let rs = await this.$get(this.item.extraResourceUrl);
      if (rs.status == 200) {
        this.countryGroups = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    onTouchStart() {
      let sideBar = this.$el.querySelector(".side-bar");
      let firstLetter = sideBar.childNodes[0];
      this.startY =
        sideBar.offsetTop - sideBar.offsetHeight / 2 + firstLetter.offsetHeight;
      this.letterHeight = firstLetter.offsetHeight;
    },
    onLetterTouch(e) {
      //计算当前所在字母
      let offsetY = e.touches[0].clientY - this.startY;
      let letterInd = Math.round(offsetY / this.letterHeight);
      if (letterInd < 0) {
        letterInd = 0;
        this.currentLetter = "*";
      } else if (letterInd >= 25) {
        letterInd = 25;
        this.currentLetter = String.fromCharCode(65 + letterInd);
      } else {
        this.offsetY = offsetY;
        this.currentLetter = String.fromCharCode(65 + letterInd);
      }

      this.showCurrentLetter = true;

      //计算列表滚动距离
      let titleEle = document.getElementById(
        "letterTitle_" + this.currentLetter
      );
      //滚动到对应位置
      this.$nextTick(() => {
        document.querySelector(".country-list").scrollTop = titleEle.offsetTop;
      });
    },
    close() {
      this.$emit("close");
    },
    cityname(name) {
      console.log('城市');
      console.log(name);
    },
    position(res){
      console.log('坐标');
      console.log(res);
      if(res.address.district != ''){
        for(let i=0;i<this.countryGroups.length;i++){
          if(res.address.district == this.countryGroups[i].region){
            this.currentArea = this.countryGroups[i];
            break;
          }
        }
      }
      //alert(res.address.district)
    }
  },
  created() {
    this.loadCountrys();
  },
  mounted() {
    getCurrentLocation(this.cityname,this.position)
    
  },
};
</script>

<style scoped>
.selector {
  position: fixed;
  z-index: 10001;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #fff;
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
.side-bar {
  position: absolute;
  padding: 0.2rem 0;
  top: 50%;
  right: 0.1rem;
  transform: translate(0, -50%);
  z-index: 3;
  background: #fff;
  width: 0.5rem;
  font-size: 0.3rem;
  text-align: center;
  border-radius: 0.25rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  user-select: none;
}
.side-bar-pointer {
  position: absolute;
  top: 0;
  left: -1.3rem;
  height: 1rem;
  line-height: 1rem;
  width: 1rem;
  text-align: center;
  font-size: 0.4rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.zoom-leave-active {
  transition: all 0.1s;
}
.zoom-enter,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0, 0);
}
.country-list {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 0.3rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.country-area {
  font-size: 0.3rem;
  padding-left: 0.3rem;
  line-height: 0.3rem;
  margin: 0.2rem 0;
}
.country-title {
  position: relative;
  background: #c2d1e4;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.35rem;
  font-weight: bold;
  padding-left: 0.8rem;
}
.country-title:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0.1rem;
  height: 0.6rem;
  width: 0.2rem;
  background: #005ee3;
}
.country-item {
  position: relative;
  height: 1rem;
  line-height: 1rem;
}
.country-item:last-child {
  border: none;
}
.country-item:after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #e2e2e2;
}
.country-icon {
  position: absolute;
  top: 0.2rem;
  left: 0.6rem;
  width: 1rem;
  height: 0.6rem;
  background: #ccc;
}
.country-name {
  margin-left: 2rem;
}
</style>