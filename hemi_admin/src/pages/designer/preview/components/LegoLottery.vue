<template>
  <div class="hemi-rotate">
    <div class="award">
      <div class="award-bg">
        <img :src="setting.pannelImage" />
      </div>
      <div class="canvas-container"></div>
      <img @click="start" class="award-pointer" :style="{width:pointerWidth}" :src="setting.pointerImage" />
    </div>
  </div>
</template>

<script>
export default {
  // name: "HemiRotate",
  props: {
    actId: {
      require: true,
      type: String
    },
    setting: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      container: null,
      ratio: 1,
      width: 0,
      pointerPosition: "50%", // 指针定位
      pointerWidth: "100px", // 指针缩放
      rotateBaseDeg: 0
    }
  },
  methods: {
    start (ind) {
      this.$emit("start")
    },
    onRotateEnd () {
      this.$emit("end")
    },
    rotate (prize) {
      this.rotateBaseDeg = this.rotateBaseDeg + 7200
      var angles = prize * (360 / this.setting.names.length) - (360 / (this.setting.names.length * 2))
      if (angles < 270) {
        angles = 270 - angles
      } else {
        angles = 360 - angles + 270
      }
      angles = angles + this.rotateBaseDeg - 360 / this.setting.names.length
      this.container.style.transform = `rotate(${angles}deg)`
      this.container.style.webkitTransform = `rotate(${angles}deg)`
    },
    async drawPannel () {
      let ratio = this.ratio
      let width = this.canvas.width
      let r = width / 2 - 10
      let ctx = this.ctx
      // 清空画布
      ctx.clearRect(0, 0, width, width)

      // 根据奖品个数计算圆周角度
      var arc = Math.PI / (this.setting.names.length / 2)

      // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
      this.ctx.strokeStyle = "#FFBE04"
      // font 属性设置或返回画布上文本内容的当前字体属性
      this.ctx.font = Math.round(r / 8) + "px Microsoft YaHei"
      let lineHeight = Math.round(r / 6)
      let textR = r - lineHeight * 2 - 20 * ratio

      // 绘制奖品
      for (let i = 0; i < this.setting.names.length; i++) {
        var angle = this.setting.startAngle + i * arc
        this.ctx.fillStyle = this.setting.colors[i % this.setting.colors.length]
        this.ctx.beginPath()
        // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
        this.ctx.arc(width / 2, width / 2, r, angle, angle + arc, false)
        this.ctx.arc(width / 2, width / 2, 10, angle + arc, angle, true)
        this.ctx.stroke()
        this.ctx.fill()
        // 锁画布(为了保存之前的画布状态)
        this.ctx.save()

        // ----绘制奖品开始----
        this.ctx.fillStyle = "#c30b29"
        var text = this.setting.names[i]

        // translate方法重新映射画布上的 (0,0) 位置
        this.ctx.translate(r + Math.cos(angle + arc / 2) * textR + 10, r + Math.sin(angle + arc / 2) * textR + 10)

        // rotate方法旋转当前的绘图
        this.ctx.rotate(angle + arc / 2 + Math.PI / 2)

        // 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变)
        if (text.length === 4 && text.indexOf("元") === -1) {
          text = text.substring(0, 2) + "||" + text.substring(2)
          var texts = text.split("||")
          for (var j = 0; j < texts.length; j++) {
            this.ctx.fillText(texts[j], -this.ctx.measureText(texts[j]).width / 2, j * lineHeight)
          }
        } else if (text.indexOf("元") && text.length > 6) { // 奖品名称长度超过一定范围
          text = text.substring(0, 3) + "||" + text.substring(3)
          let texts = text.split("||")
          for (let j = 0; j < texts.length; j++) {
            this.ctx.fillText(texts[j], -this.ctx.measureText(texts[j]).width / 2, j * lineHeight)
          }
        } else {
          // 在画布上绘制填色的文本。文本的默认颜色是黑色
          // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0)
        }

        let icon = this.setting.icons[i]
        let img = document.createElement("img")
        img.setAttribute("src", icon)
        img.style.display = "none"

        await new Promise((resolve, reject) => {
          img.onload = resolve
          this.$el.appendChild(img)
        })
        ctx.drawImage(img, -20 * ratio, -r * 0.45, 40 * ratio, 40 * ratio)

        // 把当前画布返回（调整）到上一个save()状态之前
        this.ctx.restore()
      }
    },
    redraw () {
      let container = this.container = this.$el.querySelector(".canvas-container")
      let contentWidth = this.$el.querySelector(".award-bg").clientWidth
      let borderWidth = contentWidth * 0.07
      let canvasWidth = contentWidth - 2 * borderWidth

      if (!this.canvas) {
        this.canvas = document.createElement("canvas")
        this.canvas.setAttribute("class", "award-canvas")
        container.appendChild(this.canvas)
        container.addEventListener("transitionend", this.onRotateEnd)
        container.addEventListener("webkitTransitionEnd", this.onRotateEnd)
      }

      // 计算dpi缩放率
      let backingStore = this.canvas.backingStorePixelRatio ||
                this.canvas.webkitBackingStorePixelRatio ||
                this.canvas.mozBackingStorePixelRatio ||
                this.canvas.msBackingStorePixelRatio ||
                this.canvas.oBackingStorePixelRatio ||
                this.canvas.backingStorePixelRatio || 1

      let ratio = this.ratio = (window.devicePixelRatio || 1) / backingStore

      this.pointerWidth = canvasWidth / 4 + "px"

      container.style.width = canvasWidth + "px"
      container.style.height = canvasWidth + "px"
      container.style.left = borderWidth * 1.03 + "px"
      container.style.top = borderWidth * 0.95 + "px"

      this.canvas.width = canvasWidth * ratio
      this.canvas.height = canvasWidth * ratio
      this.canvas.style.transform = `scale(${1 / ratio},${1 / ratio})`
      this.ctx = this.canvas.getContext("2d")
      this.drawPannel()
    }
  },
  updated () {
    this.redraw()
  },
  mounted () {
    this.redraw()
    window.addEventListener("resize", this.redraw)
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.redraw)
  }
}
</script>

<style scoped>
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
  z-index: 1;
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
