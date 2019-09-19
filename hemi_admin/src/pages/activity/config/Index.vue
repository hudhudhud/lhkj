<template>
  <LayoutForm v-if="act">
    <div>选择模板:
      <el-select v-model="act.actTemplate">
        <el-option v-for="(option,ind) in configs" :key="ind" :label="option.name" :value="option.value"></el-option>
      </el-select>
    </div>
    <ConfigItem v-for="item in config" :key="item.key" :config="item" v-model="setting[item.key]"></ConfigItem>
    <div>
      <el-button type="primary" @click="save" :loading="loading">保存</el-button>
    </div>
  </LayoutForm>
</template>

<script>
import template001 from "./templates/template001.json";
import lottery001 from "./templates/lottery001.json";
import lottery002 from "./templates/lottery002.json";
import couponSale from "./templates/couponSale.json";
import wenzhouBocYyg from "./templates/wenzhouBocYyg.json";
import couponAct from "./templates/couponAct.json";
import gridLettery001 from "./templates/gridLettery001.json";
import gridLettery006 from "./templates/gridLettery006.json";
import gridLettery003 from "./templates/gridLettery003.json";
import hzghrylLottery from "./templates/hzghrylLottery.json";
import LegoPageLettery from "./templates/legoPageLettery.json";
import seckill001 from "./templates/seckill001.json";
import seckill002 from "./templates/seckill002.json";
import seckill004 from "./templates/seckill004.json";
import ticket001 from "./templates/ticket001.json";
import receiveCoupon from "./templates/receiveCoupon.json";
import ghfly from "./templates/ghfly.json";
import jiuzheyouka from "./templates/jiuzheyouka.json";
import vipAct001 from "./templates/vipAct001.json";
import ConfigItem from "@/components/template/ConfigItem";

export default {
  components: { ConfigItem },
  data() {
    return {
      configs: [
        {
          name: "特卖-中行滴滴template001",
          value: "template001",
          config: template001
        },
        {
          name: "买火车票",
          value: "train",
          config: []
        },
        { name: "特卖-一栏一列布局", value: "couponSale", config: couponSale },
        {
          name: "温州中行-一元购高铁vip",
          value: "wenzhouBocYyg",
          config: wenzhouBocYyg
        },
        {
          name: "温州中行-一元购话费",
          value: "wenzhouBocYyg001",
          config: wenzhouBocYyg
        },
        {
          name: "新客有礼一元购话费",
          value: "wenzhouBocYyg002",
          config: wenzhouBocYyg
        },
        { name: "八桂积分换券列表", value: "couponList", config: couponSale },
        {
          name: "特卖-一栏一列布局-不显示原价",
          value: "couponSale001",
          config: couponSale
        },
        {
          name: "特卖-一栏一列布局-福建中行",
          value: "couponSale002",
          config: couponSale
        },
        {
          name: "特卖-一栏一列布局-浙江中行",
          value: "couponSale003",
          config: couponSale
        },
        { name: "特卖-多活动", value: "couponAct", config: couponAct },
        { name: "抽奖-大转盘", value: "lottery001", config: lottery001 },
        { name: "抽奖-大转盘2", value: "lottery002", config: lottery002 },
        { name: "抽奖-大转盘4", value: "lettery004", config: lottery001 },
        { name: "抽奖-大转盘5", value: "lettery005", config: lottery001 },
        {
          name: "抽奖-大转盘常州农行",
          value: "lettery006",
          config: lottery001
        },

        {
          name: "抽奖-九宫格",
          value: "gridLettery001",
          config: gridLettery001
        },
        {
          name: "抽奖-九宫格003",
          value: "gridLettery003",
          config: gridLettery003
        },
        {
          name: "抽奖-九宫格004",
          value: "gridLettery004",
          config: gridLettery003
        },
        {
          name: "抽奖-九宫格006(常州农行)",
          value: "gridLettery006",
          config: gridLettery006
        },
        {
          name: "抽奖-九宫格008(吉林建行)",
          value: "gridLettery008",
          config: gridLettery001
        },
        {
          name: "安徽中行三只松鼠二期",
          value: "gridLettery005",
          config: gridLettery003
        },
        {
          name: "广州幸运九宫格",
          value: "gridLettery007",
          config: gridLettery003
        },
        {
          name: "抽奖-福袋返场有礼",
          value: "fudai",
          config: []
        },
        {
          name: "洗车券",
          value: "xichequan",
          config: []
        },
        {
          name: "抽华为",
          value: "chouhuawei",
          config: []
        },
        {
          name: "抽奖-九宫格002",
          value: "gridLettery002",
          config: gridLettery001
        },
        { name: "秒杀-粽子", value: "seckill001", config: seckill001 },
        { name: "广建分享领券", value: "shareCoupon", config: [] },
        { name: "广建女神节", value: "goddess", config: [] },
        { name: "开学季活动", value: "vipAct001", config: vipAct001 },
        { name: "开学季活动常州农行", value: "youshengyouse", config: [] },
        { name: "领取话费", value: "receiveHuaFei", config: [] },
        { name: "单个面值话费领取", value: "chargeStandard", config: [] },
        { name: "积分商城", value: "creditMall", config: [] },
        { name: "约惠135生日礼", value: "birthdayGift", config: [] },
        { name: "中信国旅", value: "zxglSale", config: [] },
        { name: "话费充值", value: "huaFeiStandard", config: [] },
        { name: "油卡充值", value: "oilCardStandard", config: [] },
        { name: "优惠券购买", value: "couponBuy", config: [] },
        { name: "卡部兑换积分", value: "creditExchange", config: [] },
        { name: "工行话费充值", value: "icbcCharger", config: [] },
        { name: "秒杀-一栏一列布局", value: "seckill002", config: seckill002 },
        {
          name: "秒杀-一栏一列布局&活动预告",
          value: "seckill003",
          config: seckill002
        },
        {
          name: "秒杀-一栏一列布局&浙江建行",
          value: "seckill004",
          config: seckill004
        },
        {
          name: "秒杀-一栏一列布局&浙江建秒杀",
          value: "seckill005",
          config: seckill004
        },
        {
          name: "龙卡五折秒杀",
          value: "seckill006",
          config: []
        },
        {
          name: "约惠浙江母亲节秒杀",
          value: "seckill007",
          config: []
        },
        {
          name: "约惠八桂母亲节秒杀",
          value: "seckillGX",
          config: []
        },
        {
          name: "杭州工行融e联抽奖-九宫格",
          value: "hzghrylLottery",
          config: hzghrylLottery
        },
        {
          name: "一元会打车-九宫格",
          value: "yiyuanhuidache",
          config: hzghrylLottery
        },
        {
          name: "农行特惠-九宫格",
          value: "nonghangtehui",
          config: hzghrylLottery
        },
        {
          name: "代驾秒杀",
          value: "daiJiaSale",
          config: []
        },
        {
          name: "惠聚福建-九宫格",
          value: "hjfjBoc",
          config: hzghrylLottery
        },
        { name: "领券", value: "ticket001", config: ticket001 },
        { name: "温州中行油卡九折", value: "jiuzheyouka", config: jiuzheyouka },
        { name: "广州充值专区", value: "czzq", config: jiuzheyouka },
        {
          name: "话费97折",
          value: "huafeiJQ",
          config: jiuzheyouka
        },
        {
          name: "优惠券充话费和油卡",
          value: "couponCharge",
          config: jiuzheyouka
        },
        { name: "领券-浙江工行", value: "ticket002", config: [] },
        { name: "特卖-100元天猫券", value: "tianMallQuan", config: [] },
        {
          name: "领券-一栏一列布局",
          value: "receiveCoupon",
          config: receiveCoupon
        },
        {
          name: "宁波翻牌",
          value: "nbFanPai",
          config: []
        },
        {
          name: "融易联鲜丰水果券特卖",
          value: "ticket003",
          config: []
        },
        { name: "工行福利月", value: "ghfly", config: ghfly },
        { name: "工行福利月001", value: "ghfly001", config: ghfly },
        { name: "见面礼", value: "jianmianli", config: [] },
        { name: "工行绑卡返现", value: "bangkafanxian", config: [] },
        { name: "圣诞幸运之子", value: "luckyStar", config: [] },
        { name: "苏建幸运盒子", value: "luckyBox", config: [] },
        { name: "通用兑换券", value: "duihuanquan", config: [] },
        { name: "答题入口", value: "hemiAnswer", config: [] },
        { name: "合米签到", value: "hemiSign", config: [] },
        { name: "合米签到-打卡充电站", value: "hemiSign001", config: [] },
        { name: "上海中行签到-打卡充电站", value: "hemiSign002", config: [] },
        { name: "浙江中行-打卡充电站", value: "hemiSign003", config: [] },
        { name: "汇聚广东-打卡充电站", value: "hemiSign004", config: [] },
        { name: "深圳中行-打卡发薪水", value: "szzhqd", config: [] },
        {
          name: "设计器页面",
          value: "LegoPage",
          config: [
            {
              key: "pageKey",
              name: "页面Key",
              type: "text"
            }
          ]
        },
        {
          name: "设计器九宫格抽奖",
          value: "LegoPageLettery",
          config: LegoPageLettery
        },
        {
          name: "外链页面页面",
          value: "OutsideLink",
          config: [
            {
              key: "url",
              name: "页面URL",
              type: "text"
            }
          ]
        },
        {
          name: "卡密兑换包装",
          value: "WrapperedPwd",
          config: []
        },
        {
          name: "悦享充值",
          value: "enjoyRecharge",
          config: [
            {
              key: "backImage",
              name: "背景底图",
              type: "image"
            },
            {
              key: "title",
              name: "标题背景",
              type: "image"
            },
            {
              key: "backAtom",
              name: "背景元素",
              type: "image"
            },
            {
              key: "rules",
              name: "活动规则",
              type: "array",
              default: [
                {
                  rule: "1.规则一"
                }
              ],
              elementProps: [
                {
                  key: "rule",
                  name: "规则",
                  type: "text"
                }
              ]
            }
          ]
        },
        {
          name: "中国银行一分钱抢5元话费",
          value: "cheapRecharge",
          config: [
            {
              key: "backImage",
              name: "背景底图",
              type: "image"
            },
            {
              key: "title",
              name: "标题背景",
              type: "image"
            },
            {
              key: "logo",
              name: "银行logo",
              type: "image"
            },
            {
              key: "backAtom",
              name: "背景元素",
              type: "image"
            },
            {
              key: "action",
              name: "支付按钮",
              type: "image"
            }
          ]
        },
        {
          name: "温州生活有礼一元购",
          value: "whyiyuangou",
          config: []
        },
        {
          name: "苏式生活新户办卡礼包",
          value: "bankcardAct",
          config: []
        },
        {
          name: "苏式生活扔色子前进",
          value: "shaizi",
          config: []
        }
      ],
      act: null,
      config: null,
      setting: null,
      loading: false
    };
  },
  watch: {
    "act.actTemplate": function(val, oldVal) {
      if (oldVal) {
        this.act.templateConfig = null;
      }
      this.configs.forEach(item => {
        if (item.value == val) {
          this.config = item.config;
        }
      });
      if (this.config) {
        this.initSetting();
      }
    }
  },
  methods: {
    initSetting() {
      let setting = this.act.templateConfig || {};
      this.config.forEach(item => {
        setting[item.key] = setting[item.key] || null;
      });
      this.setting = setting;
    },
    async loadAct() {
      this.loading = true;
      let rs = await this.$post("activity/get_act_one", {
        actId: this.$route.params.actId
      });
      if (rs.status == 200 && rs.payload) {
        this.act = rs.payload;
        let json = rs.payload.templateConfig;
        this.act.templateConfig = json ? JSON.parse(json) : null;
      } else {
        this.act = {
          actTemplate: "template001",
          actId: parseInt(this.$route.params.actId)
        };
      }
      this.loading = false;
    },
    async save() {
      this.loading = true;
      this.act.templateConfig = JSON.stringify(this.setting);
      let rs = await this.$post("activity/save_activity", this.act);
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
    this.loadAct();
  }
};
</script>
