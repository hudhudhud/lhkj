<template>
  <component :is="act.actTemplate" v-if="inited&&act.actTemplate" :act="act"></component>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'; // MessageBox
import { gotoAuth } from '../../router/index';
export default {
  data () {
    return {
      inited: false,
      act: {
        actTemplate: ''
      }
    };
  },
  watch: {
    $route: function () {
      this.loadAct(this.$route.params.actId);
    }
  },
  methods: {
    async loadAct (actId) {
      Indicator.open();
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        if (this.act.checkLogin) {
          let token = this.$store.state.token;
          if (!token) {
            gotoAuth();
            return;
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
        this.inited = true;
      } else {
        this.error = rs.error;
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  created () {
    let actId = this.$route.params.actId;
    this.loadAct(actId);
    localStorage.setItem('lastVisitactId', actId);
  }
};
</script>
