
<template>

  <div>
    <div :style="item.cssStyle">
      <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
      <div class="input-box" :style="item.inputStyle">
        <input
          type="tel"
          :value="value"
          :placeholder="'请输入'+item.label"
          @input="$emit('input', $event.target.value)"
          :class="item.placeholderClass"
          maxlength="11"
        />
      </div>
    </div>
    <div :style="item.cssStyle">
      <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">验证码</div>
      <div class="input-box" :style="item.inputStyle">
        <input
          type="text"
          v-model="code"
          placeholder="请输入验证码"
          :class="item.placeholderClass"
          maxlength="6"
        />
        <div :style="item.iconStyle">
          <span v-if="getcodesuccess">发送验证码({{codetime}})</span> 
          <span
            v-else
            @click="getcode()"
          >获取验证码</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
  data() {
    return {
      codetime: 60,
      getcodesuccess: false,
      code: null
    }
  },
  computed: {
  },
  watch: {
    code(){
      this.$store.state.code = this.code;
    }
  },
  methods: {
    // 获取验证码
    async getcode () {
      console.log(this.$store.state.code);
      
      let phoneReg = /^1[3456789]\d{9}$/;
      if (!phoneReg.test(this.value)) {
        this.$toast('手机号输入有误');
        return;
      }
      let rs = await this.$get('sms/send/verifyCode?tel='+this.value+'&itemId='+this.item.id);
      if (rs.status == 200) {
        this.getcodesuccess = true;
        this.timer();
      } else {
        this.$toast(rs.error)
      }
    },
    // 定时器
    timer () {
      let timer = setTimeout(() => {
        if (this.codetime == 0) {
          this.getcodesuccess = false;
          this.codetime = 60;
          clearTimeout(timer);
          return;
        }
        this.codetime--;
        this.timer();
      }, 1000);
    }
  }
};
</script> 
