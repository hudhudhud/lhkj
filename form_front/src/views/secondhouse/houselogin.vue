<template>
  <div class="banners_box">
    <Header title="预约登记"></Header>
    <img
      src="./images/banners.png"
      alt=""
    >
    <div class="box">
      <h4>恭喜您，预约成功！</h4>
      <p class="p_one">您的预约编号为{{formId}}</p>
      <p class="p_two">(请在预约时间到达，过号请重新排队)</p>
      <div class="cons">
        <div class="consbox">
          <p
            v-for="(item,index) in result"
            :key="index"
          >
            <span class="span_one">{{item.label}}</span><span class="spantwo">{{list[index]}}</span>
          </p>
        </div>
      </div>
      <p class="p_one">网点导航</p>
      <div class="bag">
        <img
          src="./images/bag.jpg"
          alt=""
        >

      </div>
    </div>
  </div>
</template>
<script>
import { getFormDetail, loadFormInfo } from "@/utils";

import Header from "@/views/header";
export default {
  data() {
    return {
      list: [],
      formDetail: null,
      result: [],
      items: null
    };
  },
  components: {
    Header
  },
  computed: {
    formId() {
      return this.$route.query.formId;
    }
  },
  methods: {
    async getFormDetail() {
      let rs = await this.$get(`/formData/${this.$route.query.formId}`);
      if (rs.status == 200) {
        this.formDetail = rs.payload;
        for (var i in this.formDetail) {
          if (i.indexOf("data") > -1) {
            console.log(i);

            this.list.push(this.formDetail[i]);
          }
        }
      }
    }
  },
  mounted() {
    let formId = 17;
    loadFormInfo(formId, rs => {
      this.items = rs.payload.items;
      getFormDetail(this.$route.query.formId, rs => {
        this.formDetail = rs.payload;
        this.result = this.items.filter(element => {
          return this.formDetail[element.dataKey] != null;
        });
        for (var i in this.formDetail) {
          if (i.indexOf("data") > -1 && this.formDetail[i]) {
            this.list.push(this.formDetail[i]);
          }
        }
        console.log(this.list);
      });
    });
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.banners_box {
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: absolute;
  top: 0.6rem;
  left: 0;
  background: #2462ee;
  img {
    width: 7.5rem;
  }
  .box {
    width: 100%;
    position: absolute;
    top: 1.3rem;
    left: 0;
    h4 {
      text-align: center;
      color: #fff;
      font-size: 22px;
      margin-bottom: 0.2rem;
    }
    .p_one {
      text-align: center;
      color: #fff;
      font-size: 16px;
      margin-bottom: 0.2rem;
    }
    .p_two {
      text-align: center;
      color: #fff;
      font-size: 16px;
      margin-bottom: 0.8rem;
    }
    .cons {
      width: 100%;
      margin-bottom: 0.9rem;
      .consbox {
        width: 51%;
        margin: 0 auto;
        height: 2.4rem;
        border: 1px solid #ffffff;
        padding: 0.55rem;
        overflow-y: auto;

        p {
          font-size: 14px;
          margin-top: 0.25rem;
          color: #fffffb;
          display: flex;
          .span_one {
            flex: 1;
          }
          .spantwo {
            flex: 1;
            padding-left: 0.3rem;
          }
        }
      }
    }
    .bag {
      width: 100%;
      text-align: center;
      img {
        width: 50%;
      }
    }
  }
}
</style>


