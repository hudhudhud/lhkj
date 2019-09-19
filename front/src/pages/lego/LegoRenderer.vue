<template>
  <component
    :slot-data="slotData"
    :setting="comp.setting"
    :style="comp.style"
    :is="comp.tag"
    @click.native="onClick(comp)"
  >
    <template
      v-if="comp.isContainer"
      slot-scope="slotProps"
    >
      <LegoRenderer
        :slot-data="slotProps.slotData||slotData"
        v-for="(com,ind) in comp.children"
        :comp="com"
        :setting="com.setting||{}"
        :key="('comp_'+com.tag)+((slotProps&&slotProps.slotKey)?slotProps.slotKey:ind)"
      >
      </LegoRenderer>
    </template>
  </component>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { getActDetailNew, newCreatOrder } from '@/lib/api';
import components from './components';
let componentsMap = {};
components.forEach(item => {
  componentsMap[item.tag] = item.component;
});

export default {
  name: 'LegoRenderer',
  props: {
    comp: {
      type: Object,
      require: true
    },
    slotData: {}
  },
  components: componentsMap,
  data () {
    return {
      components
    };
  },
  methods: {
    async validUser (actId) {
      Indicator.open();
      let rs = await this.$post('api/act/limit', {
        actId: actId
      });
      if (rs != undefined) {
        return rs;
      }
    },
    async onClick (comp) {
      if (comp && comp.setting && comp.setting.onClick) {
        let onClick = comp.setting.onClick;
        if (!onClick || !onClick.type) {
          return;
        }
        if (onClick.type == 'msg') {
          Toast(onClick.action);
          event.stopPropagation();
        } else if (onClick.type == 'url') {
          let url = onClick.action;
          // 如果是建行app,带上缓存的userId
          let userId = sessionStorage.getItem('userId');
          if (userId && url) {
            if (url.indexOf('?') > 0) {
              url = url + '&user_id=' + userId;
            } else {
              url = url + '?user_id=' + userId;
            }
          }
          if (onClick.isReplace) {
            window.location.replace(url);
          } else {
            window.location.href = url;
          }
          event.stopPropagation();
        } else if (onClick.type == 'act') {
          let response = await this.validUser(onClick.action);
          if (response != undefined) {
            Indicator.close();
          }
          if (response.status == 6001) {
            MessageBox({
              message: response.error,
              title: '温馨提示',
              showCancelButton: false,
              confirmButtonText: '确定'
            });
            return;
          }
          if (onClick.isReplace) {
            this.$router.replace(
              `/${this.$store.state.merchantAppid}/merchant/index/act/${onClick.action}`
            );
          } else {
            this.$router.push(
              `/${this.$store.state.merchantAppid}/merchant/index/act/${onClick.action}`
            );
          }
          event.stopPropagation();
        } else if (onClick.type == 'page') {
          if (onClick.isReplace) {
            this.$router.replace(
              `/${this.$store.state.merchantAppid}/merchant/lego/${onClick.action}`
            );
          } else {
            this.$router.push(
              `/${this.$store.state.merchantAppid}/merchant/lego/${onClick.action}`
            );
          }
          event.stopPropagation();
        } else if (onClick.type == 'module') {
          if (onClick.isReplace) {
            this.$router.replace(
              `/${this.$store.state.merchantAppid}/merchant/${onClick.action}`
            );
          } else {
            window.location.href = `/${this.$store.state.merchantAppid}/merchant/${onClick.action}`;
            // this.$router.push(`/${this.$store.state.merchantAppid}/merchant/${onClick.action}`)
          }
          event.stopPropagation();
        } else if (onClick.type == 'back') {
          window.history.go(
            onClick.action && parseInt(onClick.action)
              ? parseInt(onClick.action)
              : -1
          );
          event.stopPropagation();
        } else if (onClick.type == 'postApi') {
          getActDetailNew(onClick.action, rs => {
            if (rs.status == 200) {
              newCreatOrder();
            }
          });
          event.stopPropagation();
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
