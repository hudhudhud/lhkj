<template>
  <LayoutPage>
    <LayoutSearch>
      <el-row>
        <el-form-item label=订单状态>
          <el-select v-model="form.orderState" placeholder="请选择订单状态" size="mini">
            <el-option label="所有订单" value="0"></el-option>
            <el-option label="正在下单" value="1"></el-option>
            <el-option label="订单取消" value="2"></el-option>
            <el-option label="订单完成" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!form.proStandardId" label=支付状态>
          <el-select v-model="form.payState" placeholder="请选择支付状态" size="mini">
            <el-option label="所有订单" value="0"></el-option>
            <el-option label="未支付" value="1"></el-option>
            <el-option label="已支付" value="2"></el-option>
            <el-option label="退款中" value="4"></el-option>
            <el-option label="退款完成" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=飞鱼状态>
          <el-select v-model="form.fishState" placeholder="请选择飞鱼状态" size="mini">
            <el-option label="所有订单" value="-1"></el-option>
            <el-option label="未提货" value="0"></el-option>
            <el-option label="提货中" value="1"></el-option>
            <el-option label="飞鱼受理成功" value="2"></el-option>
            <el-option label="飞鱼受理失败" value="3"></el-option>
            <el-option label="提货成功" value="4"></el-option>
            <el-option label="飞鱼提货失败" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=冻结状态>
          <el-select v-model="form.isFreeze" placeholder="是否冻结" size="mini">
            <el-option label="所有订单" value="2"></el-option>
            <el-option label="未冻结" value="0"></el-option>
            <el-option label="冻结" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=充值类型>
          <el-select v-model="form.proType" placeholder="充值类型" size="mini">
            <el-option label="所有订单" value="-1"></el-option>
            <el-option label="直冲" value="1"></el-option>
            <el-option label="卡密" value="2"></el-option>
            <el-option label="抽奖机会" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=商户>
          <el-select v-model="form.merchantId" placeholder="请选择商户" size="mini" filterable clearable @change="findActivity">
            <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=客户注册号码>
          <el-input v-model="form.tel" placeholder="请输入客户号码" size="mini"></el-input>
        </el-form-item>
        <el-form-item label=活动>
          <el-select v-model="form.actId" placeholder="请选择活动" filterable clearable size="mini">
            <el-option v-for="activity in activityList" :key="activity.id" :label="activity.actName" :value="activity.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=订单号>
          <el-input v-model="form.orderCode" placeholder="请输入订单号" size="mini"></el-input>
        </el-form-item>

        <el-form-item label=充值号码>
          <el-input v-model="form.rechargeAccount" placeholder="请输入充值号码" size="mini"></el-input>
        </el-form-item>
        <el-form-item label=商品名称>
          <el-input v-model="form.proStandardName" placeholder="请输入商品名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label=查询时间范围>
          <el-date-picker v-model="form.begdate" type="datetime" placeholder="请选择查询起始时间" default-time="00:00:00" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label=——>
          <el-date-picker v-model="form.enddate" type="datetime" placeholder="请选择查询结束时间" default-time="00:00:00" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label=查询失败次数>
          <el-input-number v-model="form.lowFailNum" :min="0" :max="100" label="失败次数下限"></el-input-number>
        </el-form-item>
        <el-form-item label=——>
          <el-input-number v-model="form.highFailNum" :min="0" :max="100" label="失败次数上限"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
          <el-button type="primary" @click="ouputExcel" :loading="loading">导出</el-button>
          <el-button type="primary" @click="sendPageFishOrder" :loading="loading">本页全部重发飞鱼</el-button>
          <!-- <el-button type="primary" @click="sendAllFishOrder" :loading="loading">一键重发飞鱼</el-button> -->
        </el-form-item>
      </el-row>
      <!-- <el-row v-if="this.isProgress">
        <el-progress :percentage="this.progress" color="#8e71c7"></el-progress>
      </el-row> -->
      <el-row>
        <el-button type="primary" :loading="sumPriceLoading" plain @click="toSumPrice">统计价格</el-button>

        <el-form-item v-if="sumPriceFlag" :label="'总计用户支付金额:'+sumPrice+'元'+',总计飞鱼成本'+sumFishCost+'元'">
        </el-form-item>
      </el-row>
    </LayoutSearch>
    <el-dialog title="提示" :visible.sync="this.isProgress" width="70%">
      <span>
        <el-progress :percentage="progress" color="#8e71c7"></el-progress>
      </span>
    </el-dialog>
    <LayoutTable ref="myTable" url="order/search" :row-class-name="tableRowClassName" :param="form" @loaded="gerLoaded"
      @expand-change="loadFishOrder" show-pager>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.subFishOrders" label-position="left" style="width: 100%" border>
            <el-table-column prop="orderNumber" label="飞鱼订单号">
            </el-table-column>
            <el-table-column prop="fishOrderCode" label="飞鱼平台订单号">
            </el-table-column>
            <el-table-column prop="notifiedMsg" label="飞鱼请求返回信息">
            </el-table-column>
            <el-table-column prop="sendTimeString" label="飞鱼请求时间">
            </el-table-column>
            <el-table-column label="订单状态" width="100" align="center">
              <template slot-scope="props">
                <el-tag v-for="tag in fishOrderTags" :key="tag.name" :type='tag.type' v-if="props.row.status==tag.value">
                  {{tag.name}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="350" fixed="right">
              <template slot-scope="props">
                <el-button @click="comfirmFishOrder(props.row)" type="success" :loading="props.row.loading" plain>核查飞鱼订单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="orderCode" :label="'订单号'" width="150">
      </el-table-column>
      <el-table-column prop="isFreeze" label="是否冻结" width="50">
        <template slot-scope="props">
          {{ props.row.isFreeze=="1"?"冻结":"否" }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="100" align="center">
        <template slot-scope="props">
          <el-tag v-for="tag in orderTags" :key="tag.name" :type='tag.type' v-if="props.row.orderState==tag.value">
            {{tag.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="飞鱼订单状态" width="130" align="center">
        <template slot-scope="props">
          <el-tag v-for="tag in fishTags" :key="tag.name" :type='tag.type' v-if="props.row.fishState==tag.value">
            {{tag.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" width="130" align="center">
        <template slot-scope="props">
          <el-tag v-for="tag in payTags" :key="tag.name" :type='tag.type' v-if="props.row.payState==tag.value">
            {{tag.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="originalPrice" label="原价" width="50">
      </el-table-column>
      <el-table-column prop="actualPrice" label="实际支付" width="50">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="140">
      </el-table-column>
      <el-table-column prop="tel" label="用户手机号" width="120">
      </el-table-column>
      <el-table-column prop="actName" label="活动名称" width="200">
      </el-table-column>
      <el-table-column prop="proName" label="商品名称" width="200">
      </el-table-column>
      <el-table-column prop="proStandardName" label="商品规格" width="100">
      </el-table-column>
      <el-table-column prop="commodityNum" label="商品数量" width="50">
      </el-table-column>
      <el-table-column prop="rechargeAccount" label="充值账号" width="150">
      </el-table-column>
      <el-table-column prop="credit" label="使用积分" width="50">
      </el-table-column>
      <el-table-column prop="couponName" label="使用卡券" width="100">
      </el-table-column>
      <el-table-column prop="couponId" label="优惠券码" width="100">
      </el-table-column>
      <el-table-column prop="orderNumber" label="飞鱼订单号" width="130">
      </el-table-column>
      <el-table-column prop="isRisk" label="是否风控" width="50">
        <template slot-scope="props">
          {{ props.row.isRisk=="1"?"是":"否" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="300">
        <template slot-scope="props">
          <el-button @click="setRemark(props.row)" type="success" :loading="props.row.loading" plain>处理备注</el-button>
          <el-button @click="resend(props.row)" type="warning" :loading="props.row.loading" v-if="(props.row.fishState == 3 || props.row.fishState == 5) && (props.row.proType == 1 || props.row.proType == 14) && (props.row.orderState == 3 ) && (props.row.isFreeze == 0)"
            plain>重新发起</el-button>
          <el-button @click="setSuccess(props.row)" type="danger" :loading="props.row.loading" v-if="props.row.fishState == 0"
            plain>标记订单成功</el-button>
          <el-button @click="setFail(props.row)" type="warning" :loading="props.row.loading" v-if="props.row.fishState == 4 && props.row.orderState == 3 && props.row.payState == 2 && props.row.orderNumber == null"
            plain>标记订单未提货</el-button>
          <el-button @click="setFreezeBreakShow(props.row)" type="danger" :loading="props.row.loading" v-if="props.row.isFreeze == 1"
            plain>解冻</el-button>
          <el-button @click="setOrderFreeze(props.row)" type="danger" :loading="props.row.loading" v-if="props.row.isFreeze == 0"
            plain>冻结</el-button>
          <el-button type="danger" v-if="props.row.actualPrice>0 && props.row.payState=='2'" @click="applyRefund(props.row)"
            :loading="props.row.loading" plain>申请退款</el-button>
        </template>
      </el-table-column>

    </LayoutTable>
    <LayoutDialog title="飞鱼订单重新发起" v-model="showDialog">
      <ReSendFishOrder :order="order" @success="onSearch" @close="showDialog=false">
      </ReSendFishOrder>
    </LayoutDialog>
    <LayoutDialog title="订单处理备注" v-model="showRemarkDialog">
      <OrderRemark :order="order" @success="onSearch" @close="showRemarkDialog=false">
      </OrderRemark>
    </LayoutDialog>
    <iframe id="exelIframe" style="display:none;"></iframe>
  </LayoutPage>

</template>

<script>
import ReSendFishOrder from "./ReSendFishOrder";
import OrderRemark from "./OrderRemark";

export default {
  components: {
    ReSendFishOrder,
    OrderRemark
  },
  data() {
    return {
      form: {
        isFreeze: "",
        orderCode: "",
        proStandardId: this.$route.params.standardId || "",
        orderState: "0",
        actId: "",
        merchantId: "",
        proType: "",
        tel: "",
        rechargeAccount: "",
        begdate: "",
        enddate: "",
        payState: "0",
        fishState: "-1"
      },
      fishOrderTags: [
        { value: "0", name: "未提货", type: "" },
        { value: "1", name: "提货中", type: "success" },
        { value: "2", name: "已受理", type: "info" },
        { value: "4", name: "提货成功", type: "success" },
        { value: "3", name: "受理失败", type: "warning" },
        { value: "5", name: "提货失败", type: "danger" }
      ],
      orderTags: [
        { value: "1", name: "下单", type: "" },
        { value: "2", name: "订单取消", type: "warning" },
        { value: "3", name: "订单完成", type: "success" }
      ],
      fishTags: [
        { value: "0", name: "未提货", type: "" },
        { value: "1", name: "提货中", type: "success" },
        { value: "2", name: "已受理", type: "info" },
        { value: "4", name: "提货成功", type: "success" },
        { value: "3", name: "提货失败", type: "warning" },
        { value: "5", name: "提货失败", type: "warning" }
      ],
      payTags: [
        { value: "1", name: "未支付", type: "" },
        { value: "2", name: "支付成功", type: "success" },
        { value: "4", name: "正在退款", type: "info" },
        { value: "5", name: "退款成功", type: "info" }
      ],
      loading: false,
      showDialog: false,
      showConfigDialog: false,
      showRemarkDialog: false,
      order: null,
      submiting: false,
      lowFailNum: 0,
      highFailNum: 0,
      merchantList: [],
      activityList: [],
      fishOrderList: [],
      orderList: [],
      sumPrice: "",
      sumFishCost: "",
      isProgress: false,
      progress: 0,
      sumPriceLoading: false,
      sumPriceFlag: false
    };
  },
  methods: {
    async toSumPrice() {
      this.sumPriceLoading = true;
      let rs = await this.$post("order/search/sumPrice", this.form);
      if (rs.status == "200") {
        this.sumPrice = rs.payload.sumPrice;
        this.sumFishCost = rs.payload.sumFishCost;
        this.sumPriceFlag = true;
      } else {
        this.$message.error(rs.msg);
      }
      this.sumPriceLoading = false;
    },
    applyRefund(order) {
      console.log(order);
      this.$router.push({
        path: "/applyRefund/" + order.orderCode
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isFreeze == 1) {
        return "warning-row";
      }
      return "";
    },
    gerLoaded(list, rs) {
      this.loading = false;
      // this.sumPrice = rs.payload.sumPrice;
      // this.sumFishCost = rs.payload.sumFishCost;
    },
    async loadFishOrder(row) {
      let rs = await this.$post("order/show_fishorder/" + row.orderCode);
      if (rs.status == "200") {
        // this.fishOrderList.splice(0);
        // rs.payload.forEach(item => {
        //   this.fishOrderList.push(item);
        // });
        this.$set(row, "subFishOrders", rs.payload);
        // console.log("zzz", row);
      } else {
        this.$message.error(rs.msg);
      }
    },
    resend(row) {
      this.order = row;
      this.showDialog = true;
    },
    sendPageFishOrder() {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setPageSuccess();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // async setPageSuccess () {
    //   this.orderList = []
    //   this.loading = true
    //   this.$refs.myTable.list.forEach(item => {
    //     if (item.proType == 1 && (item.fishState == 3 || item.fishState == 5) && item.isFreeze == 0) { this.orderList.push(item.orderCode) }
    //   })
    //   let rs = await this.$post("order/resend_page_order", {"orderList": this.orderList})
    //   if (rs.status == "200") {
    //     this.$refs.myTable.search()
    //   } else {
    //     this.$message.error(rs.payload)
    //   }
    //   this.loading = false
    // },å
    async setPageSuccess() {
      this.orderList = [];
      this.loading = true;
      this.$refs.myTable.list.forEach(item => {
        if (
          item.proType == 1 &&
          (item.fishState == 3 || item.fishState == 5) &&
          item.isFreeze == 0 &&
          item.orderState == 3
        ) {
          this.orderList.push(item.orderCode);
        }
      });
      let rs = await this.$post("order/resend_page_order", {
        orderList: this.orderList
      });
      if (rs.status == "200") {
        this.loading = false;
        this.$message({
          type: "success",
          message: "重新发起成功"
        });
        this.$refs.myTable.search();
        if (rs.payload != "重新发送成功") {
          this.open(rs.payload);
        }
      } else if (rs.status == "300") {
        this.$message({
          type: "success",
          message: "正在发起"
        });
        this.findRedisKey(rs.payload);
      } else {
        this.loading = false;
        this.$message({
          type: "error",
          message: rs.error
        });
      }
      this.loading = false;
    },
    // sendAllFishOrder () {
    //   this.$confirm("请谨慎操作, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     this.setAllSuccess()
    //   }).catch(() => {
    //     this.$message({
    //       type: "info",
    //       message: "已取消删除"
    //     })
    //   })
    // },
    // async setAllSuccess () {
    //   this.loading = true
    //   let rs = await this.$post("order/resend_all_order", this.form)
    //   if (rs.status == "200") {
    //     this.loading = false
    //     this.$message({
    //       type: "success",
    //       message: "重新发起成功"
    //     })
    //     this.$refs.myTable.search()
    //     if (rs.payload != "重新发送成功") {
    //       this.open(rs.payload)
    //     }
    //   } else if (rs.status == "300") {
    //     this.$message({
    //       type: "success",
    //       message: "正在发起"
    //     })
    //     this.findRedisKey(rs.payload)
    //   } else {
    //     this.loading = false
    //     this.$message({
    //       type: "error",
    //       message: rs.error

    //     })
    //   }
    //   this.loading = false
    // },
    async findRedisKey(key) {
      let rs = await this.$post("order/get_fish_rediskey", {
        key: key
      });
      if (rs.status == 200) {
        this.isProgress = false;
        this.$message({
          type: "success",
          message: "重新发起成功"
        });
        this.$refs.myTable.search();
        if (rs.payload != "重新发送成功") {
          this.open(rs.payload);
        }
      } else {
        this.isProgress = true;
        this.progress = parseInt(rs.payload);
        let this_ = this;
        setTimeout(function() {
          this_.findRedisKey(key);
        }, 2000);
      }
    },
    open(msg) {
      this.$notify({
        title: "重发失败的订单号",
        message: msg,
        duration: 0
      });
    },
    async doSuccess(row) {
      let rs = await this.$post("order/set_order_success/" + row.orderCode);
      if (rs.status == "200") {
        this.$refs.myTable.search();
      } else {
        this.$message.error(rs.msg);
      }
    },
    async doFail(row) {
      let rs = await this.$post("order/set_order_fail/" + row.orderCode);
      if (rs.status == "200") {
        this.$refs.myTable.search();
      } else {
        this.$message.error(rs.msg);
      }
    },
    async ouputExcel() {
      this.submiting = true;
      let rs = await this.$post("order/export", this.form);
      if (rs.status == "200") {
        this.$el.querySelector("#exelIframe").src = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }

      this.submiting = false;
    },
    setRemark(row) {
      this.order = row;
      this.showRemarkDialog = true;
    },
    loginConfig(merchant) {
      this.$router.push({
        path: "merchant/loginConfig/" + merchant.id
      });
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },

    showFishOrder(order) {
      this.order = order;
      this.$router.push({
        path: "order/fishOrder/" + order.orderCode
      });
    },
    comfirmFishOrder(order) {
      this.order = order;
      this.$router.push({
        path: "order/comfirmFishOrder/" + order.orderNumber
      });
    },
    onAdd() {
      this.merchant = null;
      this.$router.push({
        path: "merchant/add"
      });
    },
    async loadMerchantList() {
      this.submiting = true;
      let rs = await this.$get("merchant/get_merchant_list");
      if (rs.status == "200") {
        this.merchantList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    findActivity() {
      if (this.form.merchantId != null && this.form.merchantId != "") {
        this.findActivityByMerchantId();
      } else {
        this.form.actId = "";
        this.activityList = [];
      }
    },
    setSuccess(order) {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // })

          this.doSuccess(order);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async setFreezeBreak(order) {
      let rs = await this.$post("order/set_freeze_break/" + order.orderCode);
      if (rs.status == "200") {
        this.$refs.myTable.search();
      } else {
        this.$message.error(rs.msg);
      }
    },
    async setOrderFreeze(order) {
      let rs = await this.$post("order/set_order_freeze/" + order.orderCode);
      if (rs.status == "200") {
        this.$refs.myTable.search();
      } else {
        this.$message.error(rs.msg);
      }
    },
    setFreezeBreakShow(order) {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setFreezeBreak(order);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async setAllFreezeBreak(order) {
      let rs = await this.$post("order/set_freeze_break/" + order.orderCode);
      if (rs.status == "200") {
        this.$refs.myTable.search();
      } else {
        this.$message.error(rs.msg);
      }
    },
    setAllFreezeBreakShow(order) {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setFreezeBreak(order);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setFail(order) {
      this.$confirm("请谨慎操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // })

          this.doFail(order);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async findActivityByMerchantId() {
      this.submiting = true;
      let rs = await this.$get("order/show_activity/" + this.form.merchantId);
      if (rs.status == "200") {
        this.activityList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    }
  },
  created() {
    this.loadMerchantList();
  }
};
</script>

<style>
.el-table .warning-row,
.warning-row td {
  background: rgb(233, 204, 150) !important;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
