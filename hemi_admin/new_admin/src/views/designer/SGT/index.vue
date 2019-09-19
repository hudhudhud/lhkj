<template>
  <div class="sgt" v-if="templateConfig">
    <div class="sgt-head">
      <div class="sgt-head-title">
        <!--  <div>
          <el-select v-model="actTemplate">
            <el-option v-for="(option,ind) in tplList" :key="ind" :label="option.name" :value="option.templateCode">
            </el-option>
          </el-select>
        </div> -->
      </div>
      <div class="sgt-head-operator">

        <el-button size="small" plain @click="$router.push(`/designer/tplView?actId=${$route.query.actId}&actType=${act.actType}`)">
          切换模板
        </el-button>
        <el-button size="small" plain @click="openPreview">预览
        </el-button>
        <el-button type="primary" size="small" @click="save" :loading="loading">保存</el-button>

        <div class="sgt-head-qrcod" v-show="showPreview">
          <img :src="qrcode" alt="" width="140" height="140">
        </div>
      </div>
    </div>
    <div class="sgt-body" v-if="currentTpl">
      <div class="sgt-left">
        <div class="sgt-left-head">模板场景</div>
        <div class="sgt-list">
          <div class="sgt-item" v-for="(item,idx) in templateConfig.scenes" :class="{'sgt-active':idx==scenesIdx }"
            @click="scenesIdx=idx">
            <div class="sgt-sort">{{idx+1}}</div>
            <div class="sgt-item-name">
              {{item.name}}
            </div>
            <img :src="item.surface" alt="">
          </div>
        </div>
      </div>

      <div class="sgt-center">
        <div class="sgt-center-preview">
          <Preview v-model="currentTpl" :tpl="currentTpl" :tplsSurface="tplsSurface"></Preview>
        </div>
      </div>

      <div class="sgt-right" v-if="tplItem" id="sgtProps">
        <div v-for="(style, index) in tplItem.styles" :key="index">
          <div class="sgt-style" :id="style.key">
            <PropertyEditor v-model="currentTpl[style.key]" :prop-def="style" :key="style.key">
            </PropertyEditor>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import PropertyEditor from "./prop/PropertyEditor";
import Preview from "./previews/Preview";
import { ActivityApi, ActApi } from "@/api";

import { setTimeout } from "timers";
export default {
  data() {
    return {
      templateConfig: null, // templateConfig
      templateCode: "",
      tplList: [],
      actTemplate: "",
      tplIdx: 1,
      scenesIdx: 0,
      actTemplateConfig: {}, // act  templateConfig
      act: null,
      tplItem: null,
      loading: false,
      showPreview: false,
      qrcode: "",
      currentTpl: {}
    };
  },
  computed: {
    tplsSurface() {
      return this.templateConfig.surface;
    }
  },
  components: {
    PropertyEditor,
    Preview
  },
  watch: {
    scenesIdx() {
      let currentScenes = this.templateConfig.scenes[this.scenesIdx];
      this.tplItem = currentScenes;
      this.$set(this.currentTpl, "key", currentScenes.key);
    }
  },
  methods: {
    async loadTemplates(templateCode) {
      let rs = await ActApi.findActTemplateListUsingPOST({
        templateCode: templateCode
      });
      if (rs.status == 200) {
        this.tplList = rs.payload;
        if (this.tplList.length) {
          this.templateConfig = JSON.parse(this.tplList[0].templateConfig); // 模板配置
          this.templateCode = this.tplList[0].templateCode; // 模板组件名
          this.tplItem = this.templateConfig.scenes[this.scenesIdx];
          if (!Object.keys(this.currentTpl).length) {
            this.templateConfig.scenes.forEach(element => {
              if (element.styles.length) {
                element.styles.forEach(styl => {
                  this.$set(this.currentTpl, styl.key, styl.default);
                });
              }
            });
          }
          this.$set(this.currentTpl, "key", templateCode);

          console.log(this.currentTpl);
        }
      } else if (rs.status == 1000) {
        this.tplList = [];
      } else {
        this.$message.error(rs.error);
      }
    },
    openPreview() {
      this.showPreview = true;
      let url = `http://hemitest.lianhaikeji.com/ef1884fd64224f229c796637c3e6f1b7/merchant/act/${this.$route.query.actId}`;
      this.qrcode = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(
        url
      )}&correction=H`;
      setTimeout(() => {
        this.showPreview = false;
      }, 3000);
    },
    async save() {
      this.loading = true;
      this.act.actTemplate = this.templateCode;
      this.act.templateConfig = JSON.stringify(
        Object.assign(this.actTemplateConfig, this.currentTpl)
      );
      let rs = await ActivityApi.saveActivityUsingPOST(this.act);
      if (rs.status == 200) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      } else {
        this.$message.error(rs.error);
      }
      this.loading = false;
    },

    async loadCurrentAct() {
      let rs = await ActivityApi.getActivityUsingGET({
        actId: this.$route.query.actId
      });
      if (rs.status == 200) {
        this.act = rs.payload;
        if (rs.payload.actTemplate) {
          // 有活动模板
          this.actTemplateConfig = JSON.parse(rs.payload.templateConfig);

          if (rs.payload.actTemplate == this.$route.query.templateCode) {
            this.currentTpl = this.actTemplateConfig;
            this.$set(this.currentTpl, "key", rs.payload.actTemplate);
            this.loadTemplates(rs.payload.actTemplate);
          } else {
            this.loadTemplates(this.$route.query.templateCode);
          }
        } else {
          // 默认没选模板
          this.loadTemplates(this.$route.query.templateCode);
        }
      } else {
      }
    }
  },

  async created() {
    await this.loadCurrentAct();
    // await this.loadTemplates();
  }
};
</script>
<style lang="scss" scoped>
.sgt {
  position: absolute;
  width: 100%;
  height: 770px;
  color: #fff;
  background: #242424;
  overflow: hidden;
  &-head {
    display: flex;
    height: 52px;
    line-height: 52px;
    background: #2c2c2c;
    &-title {
      width: 260px;
    }
    &-operator {
      flex: 1;
      flex-direction: row;
      justify-content: flex-end;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20px;
      &-btn {
        width: 60px;
        line-height: 26px;
        border-radius: 5px;
        color: #fff;
        background: #525252;
        text-align: center;
      }
    }
    &-qrcod {
      position: absolute;
      top: 49px;
      right: 100px;
      z-index: 100;
    }
  }
  &-body {
    display: flex;
    flex-direction: row;
  }
  &-left {
    width: 260px;
    height: 680px;
    padding-left: 10px;
    background: #353535;
    overflow-y: scroll;
    &-head {
      line-height: 40px;
    }
  }
  &-center {
    flex: 1;
    height: 680px;

    &-preview {
      position: relative;
      width: 375px;
      height: 698px;
      margin: 0 auto;
      overflow: hidden;
    }
  }
  &-right {
    width: 320px;
    height: 680px;
    background: #353535;
    overflow-y: scroll;
    transition: all 1s ease-out;
  }
  /*   &-list {
  } */
  &-item {
    background: #474747;
    position: relative;
    &-name {
      position: absolute;
      text-align: center;
      width: 70%;
      left: 50%;
      background: rgb(0, 0, 0, 0.5);
      transform: translateX(-50%);
      line-height: 20px;
      font-size: 14px;
    }
    img {
      display: block;
      margin: 0 auto 10px;
      width: 70%;
    }
  }
  &-sort {
    position: absolute;
    top: 2px;
    color: #fff;
  }
  &-item:before {
    position: absolute;
    display: block;
    top: -15px;
    left: -4px;
    content: "";
    border-bottom: 24px solid transparent;
    border-top: 24px solid transparent;
    border-right: 24px solid #333;
    transform: rotate(45deg);
  }
  &-active:before {
    border-right: 24px solid red;
  }
}
</style>

