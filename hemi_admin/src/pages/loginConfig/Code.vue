<template>
  <div width="100%" center>
    <div id="qrcode"></div>
    <div class="qrcode-name">{{name}}</div>
    <div class="qrcode-btn-bar">
      <el-button class="yz-btn" type="primary" @click="verification">验证</el-button>
    </div>
  </div>

</template>

<script>
import QRCode from "qrcodejs2"
export default {
  props: {
    text: {
      require: true,
      type: String
    },
    name: {
      require: true,
      type: String
    }
  },
  data () {
    return {

    }
  },
  methods: {
    async verification () {
      let rs = await this.$post("loginConfig/verification", {authName: this.name})
      if (rs.status == "200") {
        if (rs.payload != null) {
          this.$message({
            message: "验证成功",
            type: "success"
          })
          this.$emit("close")
          this.$emit("success")
        } else {
          this.$message({
            message: "未授权",
            type: "danger"
          })
        }
      } else {
        this.$message({
          message: rs.error,
          type: "danger"
        })
      }
    },
    qrcode () {
      let qrcode = new QRCode("qrcode", {
        width: 250,
        height: 250,
        text: this.text,
        background: "#ffffff", // 背景颜色
        foreground: "red", // 前景颜
        render: "canvas" // 设置渲染方式 table canvas
      })
      console.log(qrcode)
    }

  },
  created () {
    this.$nextTick(function () {
      this.qrcode()
    })
  }
}
</script>

<style>
#qrcode {
  margin-bottom: 40px;
}
#qrcode img {
  display: block;
  margin: 0 auto;
}
.qrcode-btn-bar {
  display: flex;
  justify-content: center;
}
.qrcode-name {
  font-weight: bold;
  text-align: center;
}
</style>
