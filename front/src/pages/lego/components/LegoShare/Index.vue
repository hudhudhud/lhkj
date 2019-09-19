<template>
  <div class="LegoShare">

  </div>
</template>

<script>
import jssdk from '@/lib/jssdk';
import { getActDetailNew } from '@/lib/api';
export default {
  props: {
    setting: {}
  },
  data () {
    return {

    };
  },
  methods: {
    initWXShare (cb) {
      // let link = window.location.href.replace(window.location.search, '');
      let link = window.location.href.replace(window.location.search, '');
      this.shareConfig = {
        title: this.setting.title, // 分享标题
        desc: this.setting.desc, // 分享描述
        link: this.setting.link ? this.setting.link : link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.setting.imgUrl,
        success: function () {
          cb && cb();
        }
      };
      console.log(this.shareConfig);
      jssdk.jssdk.init('', this.merchantId, '1', val => {
        this.$jssdk.call('share', this.shareConfig);
      });
    }
  },
  created () {
    this.initWXShare(() => {
      if (this.$route.query.actId) {
        getActDetailNew(this.$route.query.actId, res => {
          if (res.status == 200) {
            this.$post('api/activity/newCreateOrder', {
              actId: this.$route.query.actId,
              standardId: res.payload.productList[0].standardList[0].id,
              commodityNum: 1
            }).then(rs => {
              if (rs.status == 200) {
                this.$toast('分享成功')
              } else {
                // this.$toast(rs.error)
              }
            });
          } else {
            this.$toast(res.error)
          }
        })
      }
    })
  }
};
</script>
