<template>
  <div class="app-container">
    <LayoutSearch>
      <el-form-item size="small" label="活动类型">
        <el-select v-model="searchForm.templateType" filterable :clearable="true" placeholder="请选择">
          <el-option v-for="actType in actTypeList" :key="actType.code" :label="actType.desc" :value="actType.code">
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
        <el-button v-waves type="primary" icon="el-icon-search" @click="loadTemplates()">
          查询
        </el-button>
      </el-form-item>
    </LayoutSearch>
    <el-collapse v-model="activeType" :accordion="true">
      <el-collapse-item v-for="item in _tplList" :title="item.title" :name="item.type">
        <div v-if="item.list.length" class="tpl" v-loading="isLoading">
          <div class="tpl-item" v-for="tpl in item.list" :key="tpl.id" @click="toSGT(tpl.templateCode)">
            <img :src="tpl.templateUrl" alt="" width="320">
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { EnumsApi, ActApi } from "@/api";
import { waves } from "@/directive/waves";

export default {
  directives: { waves },
  data() {
    return {
      isLoading: false,
      searchForm: {
        templateType: null,
        templateName: "",
        templateStatus: null
      },
      actTypeList: [],
      tplList: [],
      activeType: "1"
    };
  },
  computed: {
    _tplList() {
      let newList = [];
      let mapOfType = {};
      this.tplList.forEach(tpl => {
        if (mapOfType[tpl.templateType]) {
          mapOfType[tpl.templateType].push(tpl);
        } else {
          mapOfType[tpl.templateType] = [tpl];
        }
      });
      Object.keys(mapOfType).forEach(key => {
        let result = this.actTypeList.find(item=>item.code==key)
        let current = {
          type: key,
          title: result ? result.desc : key,
          list: mapOfType[key]
        };
        newList.push(current);
      });
      return newList;
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler() {
        if (this.autoSearchInd) {
          clearTimeout(this.autoSearchInd);
        }
        this.autoSearchInd = setTimeout(() => {
          this.loadTemplates();
        }, 500);
      }
    }
  },
  methods: {
    async loadTemplates() {
      this.isLoading = true;
      let rs = await ActApi.findActTemplateListUsingPOST(this.searchForm);
      if (rs.status == 200) {
        this.tplList = [...rs.payload];
      } else if (rs.status == 1000){
        this.tplList = [];
      } else {
        this.$message.error(rs.error);
      }
      this.isLoading = false;
    },
    async loadActTypeList() {
      let { payload } = await EnumsApi.getEnumByTypeUsingGET({
        type: "ActType"
      });
      if (payload) {
        this.actTypeList = payload;
      }
    },
    toSGT(code) {
      if (this.$route.query.actId) {
        this.$router.push(
          `/designer/SGT?actId=${this.$route.query.actId}&templateCode=${code}`
        );
      }
    }
  },
  created() {
    this.searchForm.templateType = this.$route.query.actType;
    this.loadActTypeList();
    this.loadTemplates();
  }
};
</script>
<style lang="scss" scoped>
.tpl {
  display: flex;
  flex-flow: row wrap;
  padding-top: 30px;
  &-item {
    margin: 0 10px;
    padding: 6px;
    border: 1px solid #ccc;
    height: 526px;
    overflow-y: scroll;
  }
}
</style>

