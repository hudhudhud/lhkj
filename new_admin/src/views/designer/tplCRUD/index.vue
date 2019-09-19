<template>
  <div class="app-container">
    <LayoutSearch>
      <el-form-item size="small" label="活动类型">
        <el-select v-model="searchForm.templateType" filterable :clearable="true" placeholder="请选择">
          <el-option v-for="actType in actTypeOpts" :key="actType.id" :label="actType.type" :value="actType.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="模板名称">
        <el-input v-model="searchForm.templateName" :clearable="true" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item size="small" label="模板状态">
        <el-select v-model="searchForm.templateStatus" filterable clearable placeholder="请选择">
          <el-option label="可用" :value="1"></el-option>
          <el-option label="不可用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small">
        <el-button v-waves type="primary" icon="el-icon-search" @click="handleSearch()">
          查询
        </el-button>
        <el-button v-waves type="success" icon="el-icon-plus" @click="handleAdd()">
          新增
        </el-button>
      </el-form-item>
    </LayoutSearch>
    <baseTable :columns='columns' :list='tplList' :loading='loading' @edit="handleEdit($event)"
      @config="handleConfig($event)" :param='searchForm' @search='handleSearch'>
      <template slot="imgs" slot-scope="{scope}">
        <img class="tpl-img" :src="scope.row.templateUrl">
      </template>
      <template slot="status" slot-scope="{scope}">
        <el-switch v-model="scope.row.templateStatus" :active-value="1" :inactive-value="0"
          @change="statusChange($event,scope.row)">
        </el-switch>
      </template>
    </baseTable>
    <el-dialog :title="currentModalTitle" :visible.sync="isShow" :close-on-click-modal="false" @closed="modalClose">
      <template v-if="modalType == 1">
        <el-input type="textarea" :autosize="true" placeholder="请输入模板配置(JSON格式)" v-model="configInfo.content">
        </el-input>
      </template>
      <template v-else-if="modalType == 2">
        <el-form ref="form" :model="form" label-width="100px" size="small">
          <el-form-item label="模板Code">
            <el-input v-model="form.templateCode" placeholder="请输入模板Code"></el-input>
          </el-form-item>
          <el-form-item label="模板名称">
            <el-input v-model="form.templateName" placeholder="请输入模板名称"></el-input>
          </el-form-item>
          <el-form-item label="活动类型">
            <el-select style="width:100%;" v-model="form.templateType" filterable :clearable="true"
              placeholder="请选择活动类型">
              <el-option v-for="actType in actTypeOpts" :key="actType.id" :label="actType.type" :value="actType.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="form.templateStatus" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="模板缩略图">
            <UploadImages v-model="form.imgList" action="file/upload" :max="1"></UploadImages>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footer">
        <el-button size="small" @click="isShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import LayoutSearch from "@/components/layout/LayoutSearch";
import baseTable from "@/components/baseTable/baseTable";
import { waves } from "@/directive/waves";
import UploadImages from "@/components/UploadImages";
import { ActApi } from "@/api";
export default {
  components: { LayoutSearch, baseTable, UploadImages },
  directives: { waves },
  data() {
    return {
      actTypeOpts: [
        {
          id: 1,
          type: "特卖活动"
        },
        {
          id: 2,
          type: "抽奖活动"
        },
        {
          id: 3,
          type: "秒杀活动"
        },

        {
          id: 4,
          type: "领券活动"
        },
        {
          id: 5,
          type: "签到活动"
        },
        {
          id: 6,
          type: "多多券卡券活动"
        },
        {
          id: 7,
          type: "游戏活动"
        },
        {
          id: 8,
          type: "积分活动"
        },
        {
          id: 12,
          type: "票类活动"
        },
        {
          id: 13,
          type: "签证活动"
        },
        {
          id: 14,
          type: "传绣球活动"
        }
      ],
      searchForm: {
        templateType: null,
        templateName: "",
        templateStatus: null
      },
      columns: [
        { key: "id", title: "模板ID", minWidth: 100 },
        {
          key: "templateCode",
          title: "模板Code",
          minWidth: 100
        },
        {
          key: "templateName",
          title: "模板名称",
          minWidth: 150
        },
        {
          key: "templateType",
          title: "活动类型",
          minWidth: 150,
          format: val => {
            let cur = this.actTypeOpts.find(item => {
              return item.id == val;
            });
            return cur ? cur.type : "";
          }
        },
        {
          slot: "imgs",
          title: "模板缩略图",
          minWidth: 150
        },
        {
          slot: "status",
          title: "状态",
          minWidth: 100
        },
        {
          type: "operate",
          title: "操作",
          minWidth: 200,
          operates: [
            { name: "配置", emitKey: "config" },
            { name: "编辑", emitKey: "edit" }
          ]
        }
      ],
      tplList: [],
      loading: false,
      isShow: false,
      currentModalTitle: "",
      configInfo: {
        content: "",
        id: null,
        code: ""
      },
      form: {
        id: null,
        templateCode: "",
        templateConfig: "",
        templateName: "",
        templateStatus: null,
        templateType: null,
        imgList: []
        // templateUrl: ""
      },
      modalType: null // 弹窗类型 1：配置，2：编辑新增
    };
  },
  methods: {
    async handleSearch() {
      let rs = await ActApi.findActTemplateListUsingPOST(this.searchForm);
      if (rs.status == 200) {
        this.tplList = [...rs.payload];
      } else if (rs.status == 1000) {
        this.tplList = [];
      } else {
        this.$message.error(rs.error);
      }
    },
    handleAdd() {
      this.modalType = 2;
      this.form.id = null;
      this.form.templateCode = "";
      this.form.templateConfig = "";
      this.form.templateName = "";
      this.form.templateStatus = 1;
      this.form.templateType = null;
      this.form.imgList = [];
      this.currentModalTitle = "模板新增";
      this.isShow = true;
    },
    handleConfig(data) {
      this.currentModalTitle = data.templateName + "模板配置";
      this.configInfo.id = data.id;
      this.configInfo.content = data.templateConfig;
      this.configInfo.code = data.templateCode;
      this.modalType = 1;
      this.isShow = true;
    },
    handleEdit(data) {
      this.modalType = 2;
      this.currentModalTitle = "修改" + data.templateName;
      Object.keys(data).forEach(key => {
        if (key != "templateUrl") {
          this.form[key] = data[key];
        } else {
          if (data.templateUrl) {
            this.form.imgList = [{ url: data.templateUrl }];
          } else {
            this.form.imgList = [];
          }
        }
      });
      this.isShow = true;
    },
    async statusChange(status, row) {
      let data = {
        templateStatus: status,
        id: row.id,
        templateCode: row.templateCode
      };
      let rs = await ActApi.updateActTemplateStatusUsingPOST(data);
      if ((rs.status = 200)) {
        this.$message.success(rs.message);
      } else {
        this.$message.error(rs.error);
      }
      this.handleSearch();
    },
    async onSave() {
      let rs;
      if (this.modalType == 1) {
        let data = {
          id: this.configInfo.id,
          templateConfig: this.configInfo.content,
          templateCode: this.configInfo.code
        };
        rs = await ActApi.saveActTemplateUsingPOST(data);
      } else {
        let data = {};
        Object.keys(this.form).forEach(key => {
          if (key != "imgList") {
            data[key] = this.form[key];
          } else {
            data.templateUrl = this.form.imgList[0]
              ? this.form.imgList[0].url
              : "";
          }
        });
        rs = await ActApi.saveActTemplateUsingPOST(data);
      }
      if (rs.status == 200) {
        this.$message.success(rs.message);
        this.handleSearch();
      } else {
        this.$message.error(rs.error);
      }
      this.isShow = false;
    },
    modalClose() {
      this.modalType = null;
      this.form.id = null;
      this.form.templateCode = "";
      this.form.templateConfig = "";
      this.form.templateName = "";
      this.form.templateStatus = 1;
      this.form.templateType = null;
      this.form.imgList = [];
      this.currentModalTitle = "";
    }
  },
  async created() {
    this.handleSearch();
  }
};
</script>
<style lang="scss" scoped>
.tpl-img {
  height: 60px;
}
</style>
