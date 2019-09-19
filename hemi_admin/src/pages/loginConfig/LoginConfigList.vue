<template>
  <LayoutPage>
    <LayoutSearch>
      <el-select v-model="form.loginType" placeholder="请选择">
        <!-- <el-option value="0" label="手机登陆模版"></el-option> -->
        <el-option value="1" label="微信模版"></el-option>
        <!-- <el-option value="2" label="微信公众号登陆模版"></el-option> -->
        <el-option value="3" label="中行登陆模版"></el-option>
        <el-option value="4" label="工行APP登陆模版"></el-option>
        <!-- <el-option value="5" label="建行登陆模版"></el-option> -->
        <el-option value="6" label="工行融E联登陆模版"></el-option>
        <!--<el-option value="10" label="建行APP登陆模版"></el-option>-->
      </el-select>
      <el-form-item>
        <el-button @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-button @click="onAdd('0')" v-if="form.loginType=='0'">新增手机模版</el-button>
      <el-button @click="onAdd('1')" v-if="form.loginType=='1'">新增微信模版</el-button>
      <el-button @click="onAdd('2')" v-if="form.loginType=='2'">新增微信公众号模版</el-button>
      <el-button @click="onAdd('3')" v-if="form.loginType=='3'">新增中行模版</el-button>
      <el-button @click="onAdd('4')" v-if="form.loginType=='4'">新增工行APP模版</el-button>
      <el-button @click="onAdd('5')" v-if="form.loginType=='5'">新增建行模版</el-button>
      <el-button @click="onAdd('6')" v-if="form.loginType=='6'">新增工行融E联模版</el-button>
      <el-button @click="onAdd('10')" v-if="form.loginType=='10'">新增建行APP登陆模版</el-button>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="loginConfig/query" :param="form" @loaded="loading=false">
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="authName" label="模版名" width="200">
      </el-table-column>
      <el-table-column label="操作" min-width="500">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" v-if="form.loginType!='1'" :loading="props.row.loading" plain>编辑</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      form: {
        loginType: "1"
      },
      loading: false
    };
  },
  methods: {
    onAdd(loginType) {
      // this.$router.push({path: "payConfig/addWXPayConfig"})
      if (loginType == "0") {
        // 手机
      } else if (loginType == "1") {
        // 微信模版
        this.$router.push({ path: "loginConfig/addWXAuthForm" });
        // }
        //  else if (loginType == "2") {
        //   // 微信公众号登陆模版
        //   this.$router.push({path: "loginConfig/addWXPublicAuthForm"})
      } else if (loginType == "3") {
        // 中行登陆模版
        this.$router.push({ path: "loginConfig/addBOCLoginAuthForm" });
      } else if (loginType == "4") {
        // 工行登陆模版
        this.$router.push({ path: "loginConfig/addICBCLoginAuthForm" });
      } else if (loginType == "5") {
        // 建行登陆模版
      } else if (loginType == "6") {
        // 工行融E联登陆模版
        this.$router.push({ path: "loginConfig/addICBCELoginAuthForm" });
      } else if (loginType == "10") {
        // 建行APP
      }
    },
    edit(config) {
      if (this.form.loginType == "0") {
        // 手机
      } else if (this.form.loginType == "1") {
        // 微信模版
        this.$router.push({ path: "loginConfig/editWXAuthForm/" + config.id });
        // }
        //  else if (this.form.loginType == "2") {
        //   // 微信公众号登陆模版
        //   this.$router.push({path: "loginConfig/editWXPublicAuthForm/" + config.id})
      } else if (this.form.loginType == "3") {
        // 中行登陆模版
        this.$router.push({
          path: "loginConfig/editBOCLoginAuthForm/" + config.id
        });
      } else if (this.form.loginType == "4") {
        // 工行登陆模版
        this.$router.push({
          path: "loginConfig/editICBCLoginAuthForm/" + config.id
        });
      } else if (this.form.loginType == "5") {
        // 建行登陆模版
      } else if (this.form.loginType == "6") {
        // 工行融E联登陆模版
        this.$router.push({
          path: "loginConfig/editICBCELoginAuthForm/" + config.id
        });
      } else if (this.form.loginType == "10") {
        // 建行APP
      }
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
