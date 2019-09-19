<template>
  <transition
    name="fade"
    @after-leave="afterClose"
  >
    <div
      class="draw"
      v-if="showDrawAccount"
      @click.stop.prevent="close"
    >
      <div
        class="box"
        @click.stop
      >
        <img
          class="cover"
          :src="order.standardImgUrl"
        >
        <div class="name">充值账号</div>
        <div class="draw-account">
          <input
            class="account"
            v-model="order.rechargeAccount"
            type="text"
            readonly
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Toast, Spinner } from 'mint-ui';

export default {
  components: {
    [Spinner.name]: Spinner
  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    order: {
      type: Object,
      require: true
    }
  },
  watch: {
    value (val) {
      this.showDrawAccount = val;
      this.error = '';
    },
    order (val) {
      if (val) {
        if (val.proType == '1') {
          this.loadStd();
        } else if (val.proType == '2') {
          // 卡密类之间提取
          this.drawOrder();
        }
      }
    }
  },
  data () {
    return {
      cardpwdList: [],
      standard: null,
      showDrawAccount: this.value,
      account: '',
      loading: false,
      standardInstruction: '',
      error: ''
    };
  },
  methods: {
    coypTicketPwd (e) {
      let clipboard = new this.Clipboard(e.target);
      clipboard.on('success', function () {
        Toast('复制成功!');
      });
      clipboard.on('error', function () {
        Toast('复制失败，请手动选择复制!');
      });
    },
    async drawOrder () {
      if (this.order.proType == 1) {
        // 检查账号格式
        if (!this.account) {
          Toast('请输入' + this.standard.accountName);
          return;
        }
        if (this.standard.accountPattern) {
          if (!new RegExp(this.standard.accountPattern).test(this.account)) {
            Toast('请输入正确的' + this.standard.accountName);
            return;
          }
        }
      }
      this.error = '';
      this.loading = true;
      let rs = await this.$post('api/order/draw', {
        orderCode: this.order.orderCode,
        account: this.account
      });
      if (rs.status == 200) {
        if (this.order.proType == 1) {
          Toast('已提交充值');
          this.$emit('charge');
          this.close();
        } else if (this.order.proType == 2) {
          this.standardInstruction = rs.payload.standardInstruction;
          this.cardpwdList = JSON.parse(rs.payload.cardPwds);
        }
      } else {
        this.standardInstruction = '';
        this.cardpwdList = [];
        this.error = rs.error;
      }
      this.loading = false;
    },
    async loadStd () {
      this.loading = true;
      let rs = await this.$post('api/getStandard/' + this.order.proStandardId);
      if (rs.status == 200) {
        this.standard = rs.payload;
        this.standardInstruction = this.standard.standardInstruction;
        if (this.standard.isOpenRecharge == 0 && this.standard.tel) {
          this.account = this.standard.tel;
          this.isReadOnly = true;
        } else {
          this.account = '';
          this.isReadOnly = false;
        }
      } else {
        this.error = rs.error;
      }
      this.loading = false;
    },
    close () {
      this.showDrawAccount = false;
    },
    afterClose () {
      this.$emit('input', false);
    }
  }
};
</script>

<style scoped>
.draw {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 4rem;
  max-height: 8rem;
  min-width: 6rem;
  padding: 0.5rem 0;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 0.3rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.cover {
  display: block;
  width: 2.8rem;
  margin: 0.2rem auto;
}
.name {
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.5rem;
}
.cardpwd-group {
  border: 1px solid #ccc;
  margin: 20px;
}
.cardpwd-item {
  padding: 10px;
  background: #efefef;
  border-bottom: 1px solid #ccc;
  font-size: 0.2rem;
  color: #999;
}
.cardpwd-item .passTime {
  padding-top: 0.1rem;
}
.cardpwd-item span {
  color: #333;
  line-height: 0.5rem;
}
.cardpwd-item a {
  color: blue;
}
.cardpwd-item .copy {
  margin-left: 0.6rem;
  color: #26a2ff;
  padding: 0.1rem;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 0.1rem;
}
.linkbtn {
  margin-left: 0.6rem;
  color: #26a2ff;
  padding: 0.1rem;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 0.1rem;
}
.cardpwd-item:nth-child(2n) {
  background: #fff;
}
.cardpwd-item:last-child {
  border: none;
}
.draw-account {
  display: flex;
  margin: 0 auto;
  width: 80%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  background: #f2f2f2;
}
.draw-account input {
  border: none;
  outline: none;
  background: transparent;
}
.draw-btn {
  display: block;
  margin: 0.2rem auto;
  width: 80%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: red;
  color: #fff;
  text-align: center;
  font-size: 0.3rem;
}
.spinner,
.error {
  text-align: center;
}
.error {
  font-size: 0.25rem;
  color: red;
}
.standardInstruction {
  padding: 0 0.4rem;
  font-size: 0.24rem;
  color: #666;
  line-height: 0.3rem;
}
.order-item-state-btn {
  line-height: 0.48rem;
  text-align: center;
  font-size: 0.28rem;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  border-radius: 0.6rem;
  border: 1px solid #ccc;
  color: #666;
}
</style>
