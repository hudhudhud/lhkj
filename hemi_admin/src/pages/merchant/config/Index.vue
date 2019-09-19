<template>
  <LayoutForm v-if="merchantConfig && setting">
    <div>选择模板:
      <el-select v-model="merchantConfig.templateName">
        <el-option
          v-for="(option,ind) in configs"
          :key="ind"
          :label="option.name"
          :value="option.value"
        ></el-option>
      </el-select>
    </div>
    <ConfigItem
      v-for="item in config"
      :key="item.key"
      :config="item"
      v-model="setting[item.key]"
    ></ConfigItem>

    <div>是否退出登录</div>
    <el-form>
      <el-form-item>
        <el-switch
          v-model="merchantConfig.isExitLogon"
          active-color="#13ce66"
          inactive-color="#D3D3D3"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div>客服电话</div>
    <el-form>
      <el-form-item>
        <el-input v-model="merchantConfig.serviceTel"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
        type="primary"
        @click="save"
        :loading="loading"
      >保存</el-button>
    </div>
  </LayoutForm>
</template>

<script>
import defaultConfig from "./templates/default.json";
import sigleActConfig from "./templates/sigleAct.json";
import lastVisitActConfig from "./templates/lastVisitActConfig.json";
import designIndexConf from "./templates/designIndexConf.json";
import ConfigItem from "@/components/template/ConfigItem";

export default {
  components: { ConfigItem },
  data() {
    return {
      configs: [
        { name: "活动中心", value: "defaultTemplate", config: defaultConfig },
        { name: "单个活动", value: "sigleActTemplate", config: sigleActConfig },
        {
          name: "展示最近访问的活动",
          value: "lastVisitActTemplate",
          config: lastVisitActConfig
        },
        {
          name: "宁波建行",
          value: "cbbShare",
          config: [
            { key: "showShare", name: "展示分享", type: "text", default: "1" }
          ]
        },
        {
          name: "设计器首页通用模板",
          value: "ccbYueHui",
          config: designIndexConf
        },
        { name: "饿了么测试专用", value: "elmIndex", config: [] }
      ],
      merchantConfig: null,
      config: null,
      setting: null,
      loading: false
    };
  },
  watch: {
    "merchantConfig.templateName": function(val, oldVal) {
      if (oldVal) {
        this.merchantConfig.merchantConfig = null;
      }
      this.configs.forEach(item => {
        if (item.value == val) {
          this.config = item.config;
        }
      });
      this.initSetting();
    }
  },
  methods: {
    initSetting() {
      let setting = this.merchantConfig.merchantConfig || {};
      this.config.forEach(item => {
        setting[item.key] = setting[item.key] || null;
      });
      this.setting = setting;
    },
    async loadMerchantConfig() {
      this.loading = true;
      let rs = await this.$get(
        "merchant/getMerchantConfig/" + this.$route.params.merchantId
      );
      console.log(rs);
      if (rs.status == 200 && rs.payload) {
        this.merchantConfig = rs.payload;
        let json = rs.payload.merchantConfig;
        this.merchantConfig.merchantConfig = json ? JSON.parse(json) : null;
      } else {
        this.merchantConfig = {
          templateName: "defaultTemplate",
          merchantId: parseInt(this.$route.params.merchantId)
        };
      }
      this.loading = false;
    },
    async save() {
      this.loading = true;
      this.merchantConfig.merchantConfig = JSON.stringify(this.setting);
      let rs = await this.$post(
        "merchant/saveMerchantConfig",
        this.merchantConfig
      );
      if (rs.status == 200) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      } else {
        this.$message.error(rs.error);
      }
      this.loading = false;
    }
  },
  created() {
    this.loadMerchantConfig();
  }
};
</script>
