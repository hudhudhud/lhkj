<template>
  <div class="banners_box">
    <Header title="资金托管线上排队预约" :headerStyle="headerStyle" :iconStyle="iconStyle"></Header>
    <img
      src="./images/banners.png"
      alt=""
    >
    <div class="banners">
      <div class="banners_content">
        <div class="content_list">
          <div class="content_list_li">
            <h6>查询信息</h6>
            <div class="contentmore">
              <p
                v-for="(item,index) in result"
                :key="index"
              >
                <span class="span_one">{{item.label}}</span><span class="spantwo">{{list[index]}}</span>
              </p>
              <p v-if="result.length==0">
                暂无预约记录
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cancel"
        v-if="result.length>0"
      >
        <button @click="revokeFormData">取消预约</button>
      </div>

    </div>
  </div>
</template>
<script>
import Header from "@/views/header";
import {
  getFormDetail,
  revokeFormData,
  loadFormInfo,
  searchFormData
} from "@/utils";

export default {
  data() {
    return {
      list: [],
      formDetail: null,
      result: [],
      items: null,
      iconStyle: "background: url(//static.lianhaikeji.com/images/20190529/40ddf5180fd74c04aa53b3378b92ea8f.png) no-repeat;background-size:100% 100%;width:.4rem;height:.4rem;",
      headerStyle: "background:rgb(44, 181, 245);color:rgb(255, 255, 255);"
    };
  },
  components: {
    Header
  },
  methods: {
    revokeFormData() {
      revokeFormData(this.formDetail.id, () => {
        this.$router.push(
          `/${this.$route.params.customId}/secondhouse/housereturn`
        );
        // this.$toast(rs.payload.alert.message);
      });
    }
  },
  mounted() {
    // revokeFormData()
    let formId = this.$route.query.formId;
    searchFormData(formId, this.$route.params.customId, rs => {
      var dataId = rs.payload[0].id;
      loadFormInfo(formId, rs => {
        this.items = rs.payload.items;
        getFormDetail(dataId, rs => {
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
    });
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.banners_box {
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  background: #2462ee;
  background-size: cover;
  img {
    width: 7.5rem;
  }
  .banners {
    width: 100%;
    // height: 100%;
    // padding-top: 1rem;
    position: absolute;
    top: 1rem;
    left: 0;
    .content_list {
      width: 100%;
      margin-bottom: 1.5rem;
      .content_list_li {
        width: 78%;
        margin: 0 auto;
        padding-top: 1.4rem;
        h6 {
          background: #ffffff;
          text-align: center;
          line-height: 0.65rem;
          font-size: 16px;
          font-weight: normal;
          color: #2878f1;
          margin: 0;
        }
        .contentmore {
          height: 4.3rem;
          border: 2px solid #fffffb;
          background: #2878f1;
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
    }
    .cancel {
      width: 100%;
      text-align: center;

      button {
        width: 75%;
        height: 1rem;
        border: none;
        outline: none;
        background: #6feaff;
        font-size: 16px;
        color: #fffffb;
        border-radius: 0.15rem;
      }
    }
  }
}
</style>


