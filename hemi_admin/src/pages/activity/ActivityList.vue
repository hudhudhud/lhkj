<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="活动类型" prop="actType">
        <el-select v-model="form.actType" placeholder="请选择">
          <el-option v-for="actType in actTypeList" :key="actType.id" :label="actType.type" :value="actType.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动名称">
        <el-input v-model="form.actName" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="商户名称" prop="merchantId">
        <el-select v-model="form.merchantId" filterable clearable placeholder="请选择">
          <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上下线">
        <el-select v-model="form.actStatus" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否白名单">
        <el-radio-group v-model="form.isWhite" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">是</el-radio-button>
          <el-radio-button label="0">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading" plain>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd" type="success" plain>新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="activity/show_act_list" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="actId" label="活动ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="actName" label="活动名称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="merchantId" label="商户名称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="remarks" label="活动备注" width="250" align="center">
      </el-table-column>
      <el-table-column prop="actType" label="活动类型" width="150" align="center">
        <template slot-scope="props">
          <el-tag v-if="props.row.actType=='1'">特卖活动</el-tag>
          <el-tag v-if="props.row.actType=='2'">抽奖活动</el-tag>
          <el-tag v-if="props.row.actType=='3'">秒杀活动</el-tag>
          <el-tag v-if="props.row.actType=='4'">领券活动</el-tag>
          <el-tag v-if="props.row.actType=='5'">签到活动</el-tag>
          <el-tag v-if="props.row.actType=='6'">多多券卡券活动</el-tag>
          <el-tag v-if="props.row.actType=='7'">游戏活动</el-tag>
          <el-tag v-if="props.row.actType=='8'">积分活动</el-tag>
          <el-tag v-if="props.row.actType=='12'">票类活动</el-tag>
          <el-tag v-if="props.row.actType=='13'">签证活动</el-tag>
          <el-tag v-if="props.row.actType=='14'">传绣球活动</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="活动图标" width="100" align="center">
        <template slot-scope="props">
          <img :src="props.row.actIcon" v-if="props.row.actIcon" style="max-height:50px;" />
        </template>
      </el-table-column>
      <el-table-column label="上下线" width="100" align="center">
        <template slot-scope="props">
          <el-tag :type='props.row.actStatus=="1"?"success":"info"'>{{ props.row.actStatus=="1"?"上线":"下线" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="活动开始时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="endTime" label="活动结束时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="overTime" label="订单过期时间/秒" width="150" align="center">
      </el-table-column>
      <el-table-column prop="" label="是否白名单" width="200" align="center">
        <template slot-scope="props">
          <el-switch v-model="props.row.isWhite" @change="updateIsWhite(props.row)" active-color="#13ce66"
            inactive-color="#D3D3D3" active-value="1" inactive-value="0">
          </el-switch>
          <el-button v-if="props.row.isWhite=='1'" @click="addWhite(props.row.actId,props.row.actName)" type="primary"
            :loading="props.row.loading" plain>查看白名单</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="650">
        <template slot-scope="props">
          <el-button
            v-if="props.row.actType=='1'|| props.row.actType=='3'|| props.row.actType=='6'||props.row.actType=='8'||props.row.actType=='14'"
            @click="product(props.row) " type="primary " :loading="props.row.loading " plain>商品</el-button>
          <el-button v-if="props.row.actType=='2' " @click="lottery(props.row) " type="primary "
            :loading="props.row.loading " plain>奖品</el-button>
          <el-button v-if="props.row.actType=='4' " @click="ticket(props.row) " type="primary "
            :loading="props.row.loading " plain>券</el-button>
          <el-button v-if="props.row.actType=='5' " @click="signPrize(props.row) " type="primary "
            :loading="props.row.loading " plain>奖励规则</el-button>
          <el-button v-if="props.row.actType=='7' " @click="game(props.row) " type="primary "
            :loading="props.row.loading " plain>游戏商品</el-button>
          <el-button v-if="props.row.actStatus=='0' " @click="online(props.row) " type="success "
            :loading="props.row.loading " plain>上线</el-button>
          <el-button v-if="props.row.actStatus=='1' " @click="downline(props.row) " type="primary "
            :loading="props.row.loading " plain>下线</el-button>
          <el-button @click="limit(props.row) " type="primary " :loading="props.row.loading " plain>限制</el-button>
          <el-button @click="edit(props.row.actId) " type="success " :loading="props.row.loading " plain>编辑</el-button>
          <el-button v-if="props.row.actType!='3' && props.row.actType!='5'" @click="timeConfig(props.row.actId) "
            type="success " :loading="props.row.loading " plain>时间配置</el-button>
          <el-button @click="template(props.row) " :loading="props.row.loading " plain>模板设置</el-button>
          <el-button @click="getLink(props.row.actId) " :loading="props.row.loading " plain>查看链接</el-button>
          <el-button @click="del(props.row) " type="danger " :loading="props.row.loading " plain>删除</el-button>
        </template>
      </el-table-column>
    </LayoutTable>

    <el-dialog title="活动链接" :visible.sync="dialogVisible" width="55%">
      <span>{{link}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </LayoutPage>

</template>

<script>
import ActivityForm from "./ActivityForm";
import config from "@/config";

export default {
  components: {
    ActivityForm
  },
  data() {
    return {
      form: {
        actName: "",
        actStatus: "1",
        merchantId: "",
        actType: "",
        isWhite: ""
      },
      actTypeList: [
        {
          id: "",
          type: "全部"
        },
        {
          id: "1",
          type: "特卖活动"
        },
        {
          id: "2",
          type: "抽奖活动"
        },
        {
          id: "3",
          type: "秒杀活动"
        },

        {
          id: "4",
          type: "领券活动"
        },
        {
          id: "5",
          type: "签到活动"
        },
        {
          id: "6",
          type: "多多券卡券活动"
        },
        {
          id: "7",
          type: "游戏活动"
        },
        {
          id: "8",
          type: "积分活动"
        },
        {
          id: "12",
          type: "票类活动"
        },
        {
          id: "13",
          type: "签证活动"
        },
        {
          id: "14",
          type: "传绣球活动"
        }
      ],
      merchantList: [],
      loading: false,
      showDialog: false,
      activity: null,
      dialogVisible: false,
      link: ""
    };
  },
  methods: {
    async updateIsWhite(activity) {
      const passed = await this.$checkMail({
        actId: activity.actId,
        merchantId: activity.merchantId,
        sendType: "whiteListStatus",
        changes: [
          {
            settingName: "是否开启",
            oldValue: activity.isWhite == "1" ? "否" : "是",
            newValue: activity.isWhite == "1" ? "是" : "否"
          }
        ]
      });
      if (passed) {
        await this.$post("activity/update_white_status", {
          isWhite: activity.isWhite,
          actId: activity.actId
        });
      }
      this.onSearch();
    },
    async getLink(actId) {
      let rs = await this.$post("activity/get_merchant_appid", {
        actId: actId
      });
      if (rs.status == "200") {
        this.link =
          config.domain + rs.payload.appId + "/merchant/index/act/" + actId;
        this.dialogVisible = true;
      } else {
        this.$message.error("查看链接失败！");
      }
    },

    async loadMerchant() {
      this.submiting = true;
      let rs = await this.$get("merchant/get_merchant_list");
      if (rs.status == "200") {
        rs.payload.forEach(merchant => {
          merchant.checked = !!false;
        });
        this.merchantList = rs.payload;
      } else {
        this.$message.error(rs.msg);
      }
      this.submiting = false;
    },
    timeConfig(actId) {
      this.$router.push({
        path: "/activity/timeConfig/" + actId
      });
    },

    addWhite(actId, actName) {
      this.$router.push({
        path: "/activity/white/" + actId + "/" + actName
      });
    },

    product(activity) {
      if (activity.actType != "2") {
        this.$router.push({
          path: "/activity/product/" + activity.actId
        });
      }
    },
    limit(activity) {
      this.$router.push({
        path: "/activity/limit/" + activity.actId
      });
    },
    lottery(activity) {
      this.$router.push({
        path: "/activity/lottery/" + activity.actId
      });
    },
    ticket(activity) {
      this.$router.push({
        path: "/activity/ticket/" + activity.actId
      });
    },
    signPrize(activity) {
      this.$router.push({
        path: "/activity/signPrize/" + activity.actId
      });
    },
    onSearch() {
      this.loading = true;
      this.$refs.myTable.search();
    },
    edit(actId) {
      this.$router.push({
        path: "/activity/editActivity/" + actId
      });
    },
    template(activity) {
      this.$router.push({
        path: "/activity/actTemplate/" + activity.actId
      });
    },
    onAdd() {
      this.$router.push({
        path: "/activity/addActivity/"
      });
    },
    async dodel(activity) {
      let rs = await this.$post("activity/del", { actId: activity.actId });
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.onSearch();
      }
    },
    game(activity) {
      this.$router.push({
        path: "/activity/game/" + activity.actId
      });
    },
    async del(activity) {
      const passed = await this.$checkMail({
        actId: activity.actId,
        merchantId: activity.merchantId,
        sendType: "deleteActivity",
        changes: []
      });
      if (passed) {
        this.dodel(activity);
      }
    },
    async editOnline(activity) {
      let rs = await this.$post("activity/update_online", {
        actId: activity.actId,
        actStatus: activity.actStatus
      });
      if (rs.status == "200") {
        this.onSearch();
      }
    },
    async online(activity) {
      const rs = await this.$checkMail({
        actId: activity.actId,
        merchantId: activity.merchantId,
        sendType: "actStatus",
        changes: [
          {
            settingName: "在线状态",
            oldValue: "否",
            newValue: "是"
          }
        ]
      });
      if (rs) {
        this.editOnline(activity);
        this.$message({
          type: "success",
          message: "上线成功"
        });
      }
    },
    async downline(activity) {
      const rs = await this.$checkMail({
        actId: activity.actId,
        merchantId: activity.merchantId,
        sendType: "actStatus",
        changes: [
          {
            settingName: "在线状态",
            oldValue: "是",
            newValue: "否"
          }
        ]
      });
      if (rs) {
        this.editOnline(activity);
        this.$message({
          type: "success",
          message: "下线成功"
        });
      }
    }
  },
  created() {
    this.loadMerchant();
  }
};
</script>

<style scoped>
</style>
