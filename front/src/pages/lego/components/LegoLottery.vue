<template >
  <div
    class="lottery"
    v-if="act&&config"
  >
    <div class="hemi-rotate">
      <div class="award">
        <div class="award-bg">
          <img :src="config.pannelImage" />
        </div>
        <div class="canvas-container"></div>
        <img
          @click="start"
          class="award-pointer"
          :style="{width:pointerWidth}"
          :src="config.pointerImage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import { gotoAuth } from '@/router/index';

export default {
  props: {
    setting: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      container: null,
      ratio: 1,
      width: 0,
      pointerPosition: '50%', // 指针定位
      pointerWidth: '100px', // 指针缩放
      rotateBaseDeg: 0,
      act: null,
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 0,
      prizeList: [],
      currentPrize: null,
      config: null,
      bulletList: [],
      flyList: []
    };
  },
  methods: {
    rotate (prize) {
      console.log(prize);
      this.rotateBaseDeg = this.rotateBaseDeg + 7200;
      var angles =
        prize * (360 / this.config.names.length) -
        360 / (this.config.names.length * 2);
      if (angles < 270) {
        angles = 270 - angles;
      } else {
        angles = 360 - angles + 270;
      }
      angles = angles + this.rotateBaseDeg - 360 / this.config.names.length;
      this.container.style.transform = `rotate(${angles}deg)`;
      this.container.style.webkitTransform = `rotate(${angles}deg)`;
    },
    async drawPannel () {
      let ratio = this.ratio;
      let width = this.canvas.width;
      let r = width / 2 - 10;
      let ctx = this.ctx;
      // 清空画布
      ctx.clearRect(0, 0, width, width);

      // 根据奖品个数计算圆周角度
      var arc = Math.PI / (this.config.names.length / 2);

      // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
      this.ctx.strokeStyle = '#FFBE04';
      // font 属性设置或返回画布上文本内容的当前字体属性
      this.ctx.font = Math.round(r / 8) + 'px Microsoft YaHei';
      let lineHeight = Math.round(r / 6);
      let textR = r - lineHeight * 2 - 20 * ratio;

      // 绘制奖品
      for (let i = 0; i < this.config.names.length; i++) {
        var angle = this.config.startAngle + i * arc;
        this.ctx.fillStyle = this.config.colors[i % this.config.colors.length];
        this.ctx.beginPath();
        // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
        this.ctx.arc(width / 2, width / 2, r, angle, angle + arc, false);
        this.ctx.arc(width / 2, width / 2, 10, angle + arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();
        // 锁画布(为了保存之前的画布状态)
        this.ctx.save();

        // ----绘制奖品开始----
        this.ctx.fillStyle = '#c30b29';
        var text = this.config.names[i];

        // translate方法重新映射画布上的 (0,0) 位置
        this.ctx.translate(
          r + Math.cos(angle + arc / 2) * textR + 10,
          r + Math.sin(angle + arc / 2) * textR + 10
        );

        // rotate方法旋转当前的绘图
        this.ctx.rotate(angle + arc / 2 + Math.PI / 2);

        // 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变)
        if (text.length === 4 && text.indexOf('元') === -1) {
          text = text.substring(0, 2) + '||' + text.substring(2);
          var texts = text.split('||');
          for (var j = 0; j < texts.length; j++) {
            this.ctx.fillText(
              texts[j],
              -this.ctx.measureText(texts[j]).width / 2,
              j * lineHeight
            );
          }
        } else if (text.indexOf('元') && text.length > 6) {
          // 奖品名称长度超过一定范围
          text = text.substring(0, 3) + '||' + text.substring(3);
          let texts = text.split('||');
          for (let j = 0; j < texts.length; j++) {
            this.ctx.fillText(
              texts[j],
              -this.ctx.measureText(texts[j]).width / 2,
              j * lineHeight
            );
          }
        } else {
          // 在画布上绘制填色的文本。文本的默认颜色是黑色
          // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
        }

        let icon = this.config.icons[i];
        let img = document.createElement('img');
        img.setAttribute('src', icon);
        img.style.display = 'none';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          this.$el.appendChild(img);
        });
        ctx.drawImage(img, -20 * ratio, -r * 0.45, 40 * ratio, 40 * ratio);

        // 把当前画布返回（调整）到上一个save()状态之前
        this.ctx.restore();
      }
    },
    redraw () {
      console.log(this.config);

      if (this.config) {
        console.log(this.config);
        let container = (this.container = this.$el.querySelector(
          '.canvas-container'
        ));
        let contentWidth = this.$el.querySelector('.award-bg').clientWidth;
        let borderWidth = contentWidth * 0.07;
        let canvasWidth = contentWidth - 2 * borderWidth;
        if (!this.canvas) {
          this.canvas = document.createElement('canvas');
          this.canvas.setAttribute('class', 'award-canvas');
          container.appendChild(this.canvas);
          container.addEventListener('transitionend', this.onRotateEnd);
          container.addEventListener('webkitTransitionEnd', this.onRotateEnd);
        }

        // 计算dpi缩放率
        let backingStore =
          this.canvas.backingStorePixelRatio ||
          this.canvas.webkitBackingStorePixelRatio ||
          this.canvas.mozBackingStorePixelRatio ||
          this.canvas.msBackingStorePixelRatio ||
          this.canvas.oBackingStorePixelRatio ||
          this.canvas.backingStorePixelRatio ||
          1;

        let ratio = (this.ratio =
          (window.devicePixelRatio || 1) / backingStore);

        this.pointerWidth = canvasWidth / 4 + 'px';

        container.style.width = canvasWidth + 'px';
        container.style.height = canvasWidth + 'px';
        container.style.left = borderWidth * 1.03 + 'px';
        container.style.top = borderWidth * 0.95 + 'px';

        this.canvas.width = canvasWidth * ratio;
        this.canvas.height = canvasWidth * ratio;
        this.canvas.style.transform = `scale(${1 / ratio},${1 / ratio})`;
        this.ctx = this.canvas.getContext('2d');
        this.drawPannel();
      }
    },
    async loadAct () {
      Indicator.open();
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + this.setting.actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        this.prizeList = this.act.productList;
        this.config = {
          pannelImage: JSON.parse(this.act.templateConfig).pannel,
          pointerImage: JSON.parse(this.act.templateConfig).pointer,
          // pannelImage: '//static.lianhaikeji.com/images/20180919/1fd7bf74a47f40d8af92496a958e06ae.png',
          // pointerImage: pointerImage,
          names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
          icons: this.act.productList.map(item => item.standardImgUrl),
          colors: [
            '#FFF4D6',
            '#FFFFFF',
            '#FFF4D6',
            '#FFFFFF',
            '#FFF4D6',
            '#FFFFFF'
          ], // 大转盘奖品区块对应背景颜色
          startAngle: 0, // 开始角度
          bRotate: false // false:停止;ture:旋转
        };
        if (this.act.checkLogin) {
          let token = this.$store.state.token;
          if (!token) {
            gotoAuth();
          }
        }
        if (this.act.actName) {
          this.setMetaTitle(this.act.actName);
          // document.title = this.act.actName
        }
        if (this.act.fullScreen) {
          this.$store.commit('setTabbarShow', true);
        } else {
          this.$store.commit('setTabbarShow', false);
        }
        this.loadActInfo();
        this.$nextTick(() => {
          this.redraw();
        });
      } else {
        this.error = rs.error;
      }
      Indicator.close();
    },
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.actId,
        num: '1'
      });
      if (rs.status === 200) {
        this.$dialog({
          state: true,
          content: {
            type: 'buy-lettery-chance',
            actualPrice: rs.payload.actualPrice,
            actId: this.actId,
            prepayId: rs.payload.prepayId,
            merchantId: this.$store.state.merchantId
          }
        });
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    showRules (txt) {
      this.$dialog({
        state: true,
        content: {
          type: 'lottery-rules-dialog',
          article: txt
        }
      });
    },
    initBullet () {
      let nameArr = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'];
      for (let i = 0; i < 100; i++) {
        this.bulletList.push({
          name: nameArr[i % nameArr.length] + '先生',
          prizeName: parseInt(Math.random() * 100) + '话费'
        });
      }
      this.startBullet();
    },
    rotateEnd (prize) {
      this.rotating = false;
      // Toast('恭喜中奖:' + this.currentPrize.prizeName)
      this.$dialog({
        state: true,
        content: {
          type: 'current-prize-dialog',
          prizeName: this.currentPrize.prizeName,
          prizePic: this.currentPrize.standardImgUrl,
          titlePic: 1
        }
      });
    },
    async loadActInfo () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.setting.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
        this.config.names = [];
        this.config.icons = [];
        this.act.productList.forEach(item => {
          this.config.names.push(item.prizeName);
          this.config.icons.push(item.standardImgUrl);
        });
        this.showPannel = true;
      }
      Indicator.close();
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      if (this.chances == 0) {
        this.buyChance();
        return;
      }
      this.loading = true;
      // Indicator.open()
      let rs = await this.$post('api/lottery_draw', {
        actId: this.setting.actId
      });
      if (rs.status === 200) {
        let standardId = rs.payload.standardId;
        this.chances--;
        this.prizeList.forEach((item, ind) => {
          console.log(item.standardId, standardId);
          if (item.standardId === standardId) {
            this.currentPrize = item;
            this.rotating = true;
            this.rotate(ind);
          }
        });
      } else {
        Toast(rs.error);
      }
      this.loading = false;
      // Indicator.close()
    }
  },
  created () {
    this.loadAct();
    // this.initBullet()
  },
  mounted () {
    window.addEventListener('resize', this.redraw);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.redraw);
  }
};
</script>
<style scoped>
.lottery {
  position: absolute;
  top: 4.48rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: 7.3rem;
  z-index: 80;
  overflow: visible;
}
.hemi-rotate {
  padding: 0 0.4rem;
  overflow: visible;
}
.award {
  position: relative;
  color: #fff;
  overflow: hidden;
}
.award-bg img {
  width: 100%;
}
.award-pointer {
  position: absolute;
  z-index: 88;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
}
.canvas-container {
  position: absolute;
  transition-property: all;
  transition-duration: 5000ms;
  transition-timing-function: ease-in-out;
  overflow: hidden;
  transform-origin: center center;
  border-radius: 50%;
}
.award-canvas {
  transform-origin: left top;
}
</style>
