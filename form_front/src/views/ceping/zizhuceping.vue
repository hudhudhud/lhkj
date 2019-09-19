<template>
  <div>
    <Header :title="title" :headerStyle="formDef.headerStyle" :iconStyle="formDef.iconStyle"></Header>

    <div
      v-if="formDef"
      :style="formDef.cssStyle"
    >
      <div>
        <component
          :is="item.formItemType"
          v-for="item in formDef.items"
          :key="item.id"
          v-model="formData[item.dataKey]"
          :item="item"
          :style="item.cssStyle"
        ></component>
      </div>
      <div
        v-if="canResubmit"
        @click="onSubmit"
        :style="formDef.submitBtnStyle"
      >
        提交
      </div>
    </div>
  </div>
</template>

<script>
import components from "../../components/";
import dataRes from "./data.json";    //自助测评 id=19

//import { getFormDetail, loadFormInfo, searchFormData } from "@/utils";
import Header from "@/views/header";

export default {
  components: {
    ...components,
    Header
  },
  name: "index",
  data() {
    return {
      age:'',
      formDef: {},
      formId: this.$route.params.formId,
      formDetail: null,
      canResubmit: true,
      formData: {},
      formDataMatch: [],
      title: null
    };
  },
  methods: {
    async loadFormInfo() {
      //加载表单配置,表单项配置
      //根据表单项生成formData
      this.formDef = dataRes.payload;
      this.title = this.formDef.title;
      this.formDef.items.forEach(element => {
        this.$set(this.formData, element.dataKey, "");
        this.formDataMatch.push({
          verifyRegex: element.verifyRegex,
          necessary: element.necessary,
          label: element.label
        });
      });
      console.log(this.formData);
      console.log(this.formDataMatch);
      /* loadFormInfo('19', rs => {
        this.formDef = rs.payload;
        
        this.title = this.formDef.title;
        rs.payload.items.forEach(element => {
          if (this.formDetail) {
            this.$set(
              this.formData,
              element.dataKey,
              this.formDetail[element.dataKey]
            );
          } else {
            this.$set(this.formData, element.dataKey, "");
          }
          this.formDataMatch.push({
            verifyRegex: element.verifyRegex,
            necessary: element.necessary,
            label: element.label
          });
        });
      }); */
    },

    async onSubmit() {
      //根据表单项配置做校验
      let formData = this.formData;
      let formDataMatch = this.formDataMatch;
      let isValid = true;
      let idx = -1;
      for (var i in formData) {
        idx++;
        /* debugger; */
        if (formData[i]) {
          console.log(formData[i]);
        } else {
          if (formDataMatch[idx].necessary) {
            console.log(idx);
            this.$toast("请输入" + formDataMatch[idx].label);
            isValid = false;
            break;
          }
        }
        //isValid = true;
      }
      if (!isValid) {
        return;
      }
      let customId = this.$store.state.customId;
      let isAllFalse = true;
      for (let i in formData) {
        if(formData[i] == '是' || formData[i] == '有' || formData[i] == '大专' || formData[i] == '本科' || formData[i] == '研究生硕士及以上'){
          isAllFalse = false;
        }
      }
      if(!isAllFalse){
        window.location.href = "http://m.ccb.com/cn/creditcard/mobilev3/cards/product_list.html?Rcmd_insID=S99999911"
      }else{
        this.$router.push(
          `/${customId}/20`
        );
      }
    }
  },
  watch: {
    formData(val) {
      console.log(val);
    }
  },
  async created() {
    this.loadFormInfo();
  },
  mounted () {
   /*  console.log(124);
    setTimeout(function(){
      var geolocation = new window.BMap.Geolocation();
      var geoc = new window.BMap.Geocoder();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
          alert('您的位置：' + r.point.lng + ',' + r.point.lat);
          geoc.getLocation(r.point, function (rs) {
            console.log(rs);
            var addComp = rs.addressComponents;
            alert(addComp.province + '1, ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber);
          });
        } else {
          alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true})
    },2000) */
  }
};
</script>

<style lang="scss" scoped>
.rules {
  display: flex;
  input {
    width: 0.28rem;
    height: 0.28rem;
    margin-top: 0.06rem;
    margin-right: 0.1rem;
  }
}
</style>
