<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    /* 调用iOS Native方法 */
    executeCalliOS (url) {
      var iframe = document.createElement('IFRAME');
      iframe.setAttribute('src', url);
      document.body.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    },
    /* iOS跳转功能方法
     *func_id为功能ID
     *para 为参数，形式如 fund_market=xxxx&fund_name=xxxx&fund_code=xxxx
     */
    jumpIOS (funcId, para) {
      this.executeCalliOS('innerAppCall://CCBCallCenter?funcid=' + funcId + '&' + para)
    },

    /* 安卓跳转功能方法
     *func_id为功能ID
     *para 为参数，形式如 fund_market=xxxx&fund_name=xxxx&fund_code=xxxx
     */
    jumpAndroid (funcId, para) {
      window.mbcjump.startCcbActivity(funcId, para)
    },
    /* 发起跳转 */
    jumptofunc (funcId, paraAndroid, paraIOS) {
      var ua = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
      var isChromeOrSansung = /chrome|samsung/.test(ua);
      var isAndroid = /android|adr/.test(ua) && !(/windows phone/.test(ua));
      if (isChromeOrSansung || isAndroid) {
        this.jumpAndroid(funcId, paraAndroid);
      } else {
        this.jumpIOS(funcId, paraIOS);
      }
    }
  },
  created () {
    // this.jumptofunc('06001005', 'business_param=01014', 'paymentInfo=01014')
    this.jumptofunc('06001005', '', '')
    setTimeout(() => {
      this.$router.go(-1)
    }, 1000)
  }
}
</script>
