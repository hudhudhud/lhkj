<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="卡券内容">
        <el-input v-model="form.couponDetail" placeholder="输入内容查询"></el-input>
      </el-form-item>
      <el-form-item label="查询">
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item label="单卡券使用查询">
        <el-button type="primary" @click="showDetails" :loading="loading" plain>单卡券使用查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="coupon/showCouponList" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="id" label="卡券ID" width="50" align="center">
      </el-table-column>
      <el-table-column prop="couponName" label="卡券名称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="couponType" label="卡券类型" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-if="props.row.couponType=='1'">满减</el-tag>
          <el-tag v-if="props.row.couponType=='3'">折扣</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="limitPrice" label="满钱" width="50" align="center">
      </el-table-column>
      <el-table-column prop="couponPrice" label="减钱" width="50" align="center">
      </el-table-column>
      <el-table-column prop="discount" label="折扣" width="60" align="center">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="100" align="center">
      </el-table-column>
      <el-table-column prop="endTimeString" label="截止时间" width="100" align="center">
      </el-table-column>
      <el-table-column prop="wayId" label="渠道号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="couponInstruction" label="卡券内容简介" width="300" align="center">
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="80">
        <template slot-scope="props">
          <el-button @click="showUseCondition(props.row)" type="success" :loading="props.row.loading" plain>库存使用详情</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="单卡券使用查询" v-model="showDialogOne">
      <CouponShowDetail @success="onSearch" @close="showDialogOne=false">
      </CouponShowDetail>
    </LayoutDialog>
    <LayoutDialog title="卡券使用详情" v-model="showDialogUseCondition">
      <CouponUseCondition :coupon="coupon" @success="onSearch" @close="showDialogUseCondition=false">
      </CouponUseCondition>
    </LayoutDialog>
  </LayoutPage>

</template>
<script>
import CouponShowDetail from "./CouponShowDetail";
import CouponUseCondition from "./CouponShowUseCondition";
export default {
  components: {
    CouponShowDetail,
    CouponUseCondition
  },
  data() {
    return {
      form: {
        couponDetail: ""
      },
      loading: false,
      showDialogOne: false,
      coupon: null,
      showDialogUseCondition: false,
      dialogVisible: false,
      link: ""
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    showUseCondition(row) {
      this.coupon = row;
      this.showDialogUseCondition = true;
    },
    showDetails() {
      this.showDialogOne = true;
    }
  },
  created() {}
};
</script>
