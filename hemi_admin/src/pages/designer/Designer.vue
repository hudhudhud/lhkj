<template>
  <LayoutForm>
    <div class="designer">
      <div class="components" @click.stop="componentSelect(null)" v-loading="loadingPage">
        <ComponentTree v-model="componentList" :highlight-comp="highlightComp" @component-select="componentSelect"></ComponentTree>
      </div>
      <div class="preview" @click.stop="componentSelect(null)">
        <div class="preview-btns" @click.stop>
          <el-popover placement="top-start" trigger="hover">
            <div class="preview-qrcode" id="_preview_qrcode_"></div>
            <el-button slot="reference" :loading="previewLoading" @click="preview">预览</el-button>
          </el-popover>
          <el-button @click="refresh" icon="el-icon-refresh">刷新</el-button>
          <el-button type="danger" @click="reset" icon="el-icon-delete">重置</el-button>
          <el-button type="primary" @click="save" :loading="loading">保存</el-button>
        </div>
        <div class="preview-bg">
          <div class="preview-version">
            <span>当前版本:{{form.version}}</span>
            <el-button @click="showVersionList=true">切换</el-button>
            <el-button @click="checkoutNewBranch">切换为新版本</el-button>
          </div>
          <div class="preview-phone">
            <Previewer v-if="show" :componentList="componentList" :highlight-comp="highlightComp" @component-select="componentSelect"></Previewer>
          </div>
        </div>
      </div>
      <div class="props">
        <PropertiesEditor v-model="highlightComp" :page="form"></PropertiesEditor>
      </div>
    </div>
    <el-dialog title="版本列表" :visible.sync="showVersionList">
      <div v-if="loadingVersion">正在加载...</div>
      <el-table :data="versionList" v-if="!loadingVersion">
        <el-table-column property="version" label="版本" width="150"></el-table-column>
        <el-table-column property="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column property="createUser" label="创建人"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="switchVersion(scope.row)" type="text" size="small">切换</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </LayoutForm>
</template>

<script>
import QRCode from "qrcodejs2";
import ComponentTree from "./tree/ComponentTree";
import PropertiesEditor from "./prop/PropertiesEditor";
import Previewer from "./preview/Previewer";
import { Loading } from "element-ui";

export default {
  components: {
    ComponentTree,
    PropertiesEditor,
    Previewer
  },
  data() {
    return {
      form: null,
      show: true,
      componentList: [],
      highlightComp: null,
      loading: false,
      previewLoading: false,
      loadingPage: false,
      versionList: [],
      showVersionList: false,
      loadingVersion: false
    };
  },
  watch: {
    showVersionList: function(val) {
      if (val) {
        this.queryForVersions();
      }
    },
    "$route.params.pageId": function(val) {
      if (val) {
        this.load();
      } else {
        if (this._qrcode) {
          this._qrcode._el.innerHTML = "";
          this._qrcode = null;
        }
        this.componentList = [];
        this.highlightComp = null;
        this.reset();
        if (this._previewInd) {
          clearTimeout(this._previewInd);
        }
      }
    },
    componentList: {
      deep: true,
      handler(val, oldVal) {
        if (this._previewInd) {
          clearTimeout(this._previewInd);
        }
        if (this.$route.params.pageId && val && val.length > 0) {
          this._previewInd = setTimeout(
            this.preview,
            oldVal.length == 0 ? 0 : 3000
          );
        }
      }
    }
  },
  methods: {
    componentSelect(comp) {
      this.highlightComp = comp;
    },
    saveLocal() {
      localStorage.setItem(
        "designerTempStore",
        JSON.stringify(this.componentList)
      );
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async save() {
      this.loading = true;
      this.form.pageConfig = JSON.stringify(this.componentList);
      let rs = await this.$post("lego/save", this.form);
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
    async preview() {
      this.previewLoading = true;
      this.form.pageConfig = JSON.stringify(this.componentList);
      let rs = await this.$post("lego/savePreview", this.form);
      if (rs.status == 200) {
        this.$nextTick(() => {
          if (!this._qrcode) {
            let basePath =
              process.env.NODE_ENV === "production"
                ? `https://hemi.lianhaikeji.com/${
                  this.form.appId
                }/merchant/legopreview/${this.form.pageKey}`
                : `http://hemitest.lianhaikeji.com/${
                  this.form.appId
                }/merchant/legopreview/${this.form.pageKey}`;
            this._qrcode = new QRCode("_preview_qrcode_", {
              width: 300, // 设置宽度
              height: 300, // 设置高度
              text: basePath
            });
          }
        });
      } else {
        this.$message.error(rs.error);
      }
      this.previewLoading = false;
    },
    refresh() {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 10);
    },
    reset() {
      this.highlightComp = null;
      this.componentList = [
        {
          tag: "lego-page",
          parentTag: "",
          slotTag: "",
          isContainer: true,
          setting: {},
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "overflow-x": "hidden",
            "overflow-y": "auto"
          }
        }
      ];
    },
    loadTemplate() {
      let stored = localStorage.getItem("designerTempStore");
      if (stored) {
        this.componentList = JSON.parse(stored);
      } else {
        this.reset();
      }
    },
    async load() {
      this.loadingPage = true;
      let rs = await this.$get("lego/getById/" + this.$route.params.pageId);
      if (rs.status == 200) {
        this.form = rs.payload;
        if (this.form.pageConfig) {
          this.componentList = JSON.parse(this.form.pageConfig);
        } else {
          this.reset();
        }
      }
      this.loadingPage = false;
    },
    async queryForVersions() {
      this.loadingVersion = true;
      let rs = await this.$get(
        "lego/queryForVersions/" + this.$route.params.pageId
      );
      if (rs.status == 200) {
        this.versionList = rs.payload;
      }
      this.loadingVersion = false;
    },
    checkoutNewBranch() {
      this.$prompt("请输入版本号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\s*/,
        inputErrorMessage: "版本号格式不正确"
      })
        .then(({ value }) => {
          if (value) {
            this.form.version = value;
            this.save();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async switchVersion(versionBean) {
      let loadingInstance = Loading.service({ fullscreen: true });
      let rs = await this.$post("lego/rollbackToVersion", {
        pageId: this.$route.params.pageId,
        version: versionBean.version
      });
      if (rs.status == 200) {
        this.load();
        this.showVersionList = false;
      } else {
        this.$message.error(rs.error);
      }
      loadingInstance.close();
    }
  },
  created() {
    this.load();
  }
};
</script>

<style scoped>
@import url(./css/animate.css);

.designer {
  position: absolute;
  top: 31px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  user-select: none;
}
.components {
  position: relative;
  flex: 1 0 300px;
}
.preview {
  position: relative;
  flex: 1 1 450px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5) inset;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
}
.preview-bg {
  position: relative;
  background: url(./imgs/phone_bg.png);
  background-size: 100% auto;
  height: 870px;
  width: 428px;
}
.preview-version {
  position: absolute;
  top: 70px;
  left: 23px;
}
.preview-phone {
  margin: 106px auto;
  position: relative;
  height: 653px;
  width: 375px;
}
.preview-btns {
  text-align: center;
  margin: 10px 0;
}
.props {
  position: relative;
  flex: 1 0 350px;
}
.preview-qrcode {
  height: 300px;
  width: 300px;
  background: black;
}
</style>
