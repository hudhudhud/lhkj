<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="手机号">
          <el-input
            v-model="form.phone"
            placeholder="输入手机号查询"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item label="维度选择">
          <el-select
            v-model="form.status"
            clearable
            placeholder="请输入维度"
            style="width: 190px"
            class="filter-item"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.status==3" label="请选择活动">
          <el-select
            v-model="form.actId"
            clearable
            filterable
            placeholder="请选择活动"
            style="width: 290px"
            class="filter-item"
          >
            <el-option
              v-for="(item,index) in actOptions"
              :key="index+'_act'"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter()"
        >查询</el-button>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      ref="myTable"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column v-for="(item,index) in tableList" align="center" :label="item.label" :prop="item.prop">
        
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { waves } from "@/directive/waves"; // waves directive

import { AuthApi, UserApi } from "@/api";
import SysRoleVO from "@/api/modules/SysRoleVO";

@Component({
  directives: {
    waves
  },
  filters: {
    statusFilter(status: number) {
      const statusMap: {
        [id: string]: string;
      } = {
        1: "有效",
        0: "无效"
      };
      return statusMap[status];
    }
  }
})
export default class Table extends Vue {
  private listLoading = false;

  private list: any[] = [];
  private statusMap = {
    0: {
      num: 1,
      styl: "danger"
    },
    1: {
      num: 0,
      styl: "success"
    }
  };
  private form = {
    phone: "",
    status: "",
    actId: ""
  };
  private stateOptions = [
    { value: 0, label: "白名单列表" },
    { value: 1, label: "用户参与信息" },
    { value: 2, label: "用户注册信息" },
    { value: 3, label: "参与活动机会" }
  ];
  private actOptions:any = [];
  private tableList:any = [];
  private tableList0 = [
    { label: "所属白名单",prop: "defName" },
    { label: "活动名称",prop: "actName" },
    { label: "活动id",prop: "id" }
  ];
  private tableList2 = [
    { label: "商户id",prop: "merchantId" },
    { label: "商户名称",prop: "merchantName" }
  ];
  private tableList3 = [
    { label: "活动机会",prop: "payload" }
  ];

  /* search */
  private async handleFilter() {
    if(!this.form.phone){
      this.$message.error('请输入手机号');
    } else if(this.form.status == '0'){
      const rs = await UserApi.findUserActInfoUsingGET({tel: this.form.phone})
      if(rs.status == 200){
        this.tableList = this.tableList0;
        this.list = [];
        for(let i=0;i<rs.payload.length;i++){
          for(let j=0;j<rs.payload[i].actList.length;j++){
            let temp:any = rs.payload[i].actList[j];
            temp.defName = rs.payload[i].defName;
            this.list.push(temp);
          }
        }
      }
    } else if(this.form.status == '1'){
      const rs = await UserApi.findPartakeInfoListUsingGET({tel: this.form.phone})
    } else if(this.form.status == '2'){
      const rs = await UserApi.findRegisterInfoListUsingGET({tel: this.form.phone})
      if(rs.status == 200){
        this.tableList = this.tableList2;
        this.list = [];
        this.list = this.list.concat(rs.payload);
      }
    } else if(this.form.status == '3'){
      const rs = await UserApi.findUserActChanceInfoUsingGET({actId:parseInt(this.form.actId),tel: this.form.phone})
      if(rs.status == 200){
        this.tableList = this.tableList3;
        this.list = [];
        this.list = this.list.concat(rs);
      }else{
        this.$message.error(rs.error);
      }
    }
  }
  private async getActlist() {
    const rs = await UserApi.findActListUsingPOST();
    if(rs.status == 200){
      for(let i=0;i<rs.payload.length;i++){
        let temp = {
          value: rs.payload[i].id,
          label: rs.payload[i].actName
        }
        this.actOptions.push(temp)
      }
    }
  }
  created() {
    this.getActlist();
  }
}
</script>
