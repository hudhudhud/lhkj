<template>
  <div :class="{active:showPop}">
    <back></back>
    <div class="youli">
      <div
        class="btnback"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/lego/92ef1a6f3a6a4f739940f8a3f0981016`)"
      ><img
          src="./bmimg/back.jpg"
          alt=""
        ></div>
      <back></back>
      <div class="bg">
        <div class="front">
          <div class="front-act">
            <div
              class="front-act-item"
              v-for="(item,i) in tiyanList"
              :key="i"
              @click="showActMsg(i)"
            >
              <img
                :src="item.pic"
                alt=""
              >
            </div>
          </div>
          <div class="actImg"><img
              src="./bmimg/acttitle.png"
              alt=""
            ></div>
          <div class="bm"><input
              type="text"
              placeholder="请输入手机号码"
              v-model="account"
            ></div>
          <div class="acttip">报名手机号码需和银行预留号码一致</div>
          <div
            class="btnbm"
            @click="handle()"
          ><img
              src="./bmimg/btnbaoming.png"
              alt=""
            ></div>
        </div>

      </div>
      <mt-popup
        v-model="showPop"
        class="mypop"
        popup-transition="popup-fade"
      >
        <template v-if="mask!=-1">
          <div class="popmain">
            <div
              class="header"
              :class="{header1:mask==1}"
            >{{tiyanList[mask].title}}<br> <span v-if="mask==1">{{tiyanList[mask].title2}}</span> </div>
            <template v-if="mask==0">
              <!-- 手机银行转账 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  转账是手机银行最基础最常用的功能之
                  一，但这个“熟面孔”背后其实还隐藏着不少“彩蛋”
                  功能，手机号转账、延时转账、预约转账、他行转
                  建行。
                </div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs1/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“转账”</div>
                <div class="imgtip"><img
                    src="./imgs1/zhuanzhang.png"
                    alt=""
                  ></div>
                <div class="tip">各位用户使用转账功能后，经核实即增加用户抽
                  奖次数一次</div>
              </div>
            </template>
            <template v-if="mask==1">
              <!-- 龙支付发红包 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  龙卡贷吧是我行专为年轻客户和龙支
                  付客户推出的一款虚拟信用卡，除享有龙卡信用
                  卡基本功能和权益外，还具备“极速申请，在线激
                  活”、“线上线下交易全覆盖”、“全方位安全防护”、
                  “主动还款”等特色。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs1/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“信用卡”</div>
                <div class="imgtip"><img
                    src="./imgs1/xyk1.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“点击信用卡管理板块的“信用卡申请”</div>
                <div class="imgtip"><img
                    src="./imgs1/xyk2.png"
                    alt=""
                  ></div>
                <div class="tip">各位用户使用信用卡（贷吧）主动还款/在线申请
                  /在线激活功能后，经核实即增加用户抽奖次数一
                  次</div>
              </div>
            </template>
            <template v-if="mask==2">
              <!-- 速盈/基金 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  龙支付是建行推出的支付品牌，钱包、
                  全卡付、收款、好友付款、随心取款等功能和海
                  量商户优惠任你挑选。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs1/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“龙支付”</div>
                <div class="imgtip"><img
                    src="./imgs1/imglongpay.png"
                    alt=""
                  ></div>
                <div class="tip">各位用户使用龙支付交易功能后，经核实即增加
                  用户抽奖次数一次。</div>
              </div>
            </template>
            <!-- <template v-if="mask==3">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  龙卡贷吧是我行专为年轻客户和龙支付客户推出的一款虚拟信用卡，除享有龙卡信用卡基本功能和权益外，还具备“极速申请，即申即用”、“线上线下交易全覆盖”、“全方位安全防护”、“专属点券”等特色。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs1/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“信用卡”</div>
                <div class="imgtip"><img
                    src="./imgs1/xycard.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“点击信用卡管理板块的“信用卡申
                  请”或“龙卡贷吧”</div>
                <div class="imgtip"><img
                    src="./imgs1/lkdai.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官在线申办龙卡贷吧或信用卡后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template> -->
            <template v-if="mask==3">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  速盈是建行与多家基金管理公司合作，为客户提供现金管理工具的平台，多种速盈产品等你来选</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs1/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“投资理财”</div>
                <div class="imgtip"><img
                    src="./imgs1/touzi2.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“点击基金投资”</div>
                <div class="imgtip"><img
                    src="./imgs1/touzi.png"
                    alt=""
                  ></div>

                <div class="tip">各位用户使用速盈功能后，经核实即增加用户抽奖次数一次。</div>
              </div>
            </template>
            <!-- <template v-if="mask==4">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  广东地区客户专享的活动专区，集合各类线上趣味活动，更可以进行包括“CC币”在内的各类权益兑换。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs1/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“悦享生活”</div>
                <div class="imgtip"><img
                    src="./imgs1/yuexiang.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“惠聚广东”</div>
                <div class="imgtip"><img
                    src="./imgs1/hjgd.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官参加任一惠聚广东活动（需产生交易）后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template> -->
            <template v-if="mask==4">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  建行为广大租客、房东打造的租赁共
                  享平台，为租客提供房源搜索展示、预约看房、
                  合同签订、费用支付等服务，还有其他一系列全
                  新功能，慢慢发现吧！
                </div>
                <div class="acttitle"><span>下载二维码</span></div>
                <div class="imgcode"><img
                    src="./imgs1/imgcode.png"
                    alt=""
                  ></div>

                <div class="tip">各位用户使用注册建融家园APP功能后，经核实
                  即增加用户抽奖次数一次。</div>
              </div>
            </template>
            <div
              class="close"
              @click="showPop=false"
            ><img
                src="./imgs1/close.png"
                alt=""
              ></div>
          </div>
        </template>

      </mt-popup>
    </div>
  </div>
</template>
<script>
import pic1 from './imgs1/pic1.png';
import pic2 from './imgs1/pic2.png';
import pic3 from './imgs1/pic3.png';
import pic4 from './imgs1/pic44.png';
import pic5 from './imgs1/pic55.png';
// import pic6 from './imgs1/pic6.png';
import { Toast, Popup } from 'mint-ui';
export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      tiyanList: [
        { pic: pic1, title: '手机银行办理转账' },
        {
          pic: pic2,
          title: '信用卡（贷吧）',
          title2: '主动还款/在线申请/在线激活'
        },
        { pic: pic3, title: '龙支付交易' },
        { pic: pic4, title: '速赢' },
        // { pic: pic4, title: '聚财产品签约' },
        // { pic: pic5, title: '账户险' },
        { pic: pic5, title: '注册建融家园APP' }
      ],
      fankui: '',
      showPop: false,
      mask: -1,
      account: '',
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 562662071 : 562662071
    };
  },
  methods: {
    showMsg () {
      if (!this.fankui) {
        Toast('您还未输入反馈信息!');
      }
      Toast('您的反馈已提交，感谢您提出的宝贵意见。');
    },
    showActMsg (i) {
      this.mask = i;
      this.showPop = true;
    },
    async handle () {
      let phoneReg = /^1[3456789]\d{9}$/;
      if (!phoneReg.test(this.account)) {
        Toast('手机号输入有误');
        return;
      }
      let rs = await this.$post('api/attend/activity', {
        actId: this.secondActId,
        account: this.account
      });
      if (rs.status == 200) {
        Toast('您已报名成功！');
      } else {
        Toast(rs.error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.youli {
  width: 100%;
  min-height: 16.98rem;
  background: #2872dc url("./bmimg/bg.jpg") no-repeat;
  background-size: 100% auto;
  padding-top: 5.04rem;
  position: relative;
  .btnback {
    position: absolute;
    top: 0.4rem;
    right: 0;
    z-index: 100;
    width: 1.81rem;
    height: 0.76rem;
    img {
      width: 100%;
    }
  }
  .bg {
    width: 6.66rem;
    // height: 18.1rem;
    // background-color: rgba(255, 255, 255, 0.3);
    padding-top: 0.2rem;
    margin: 0rem auto 0;
    position: relative;
  }
  .front {
    width: 6.33rem;
    height: 9.7rem;
    // background-color: #ffffff;
    padding-top: 0.001rem;
    margin: 0rem auto 0.3rem;
    .front-act {
      width: 90%;
      height: 5.5rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .front-act-item {
        border-radius: 0.08rem;
        img {
          height: 1.7rem;
          border-radius: 0.08rem;
          display: block;
        }
      }
    }
    .actImg {
      width: 2.94rem;
      height: 0.95rem;
      margin: 0.3rem auto;
      img {
        width: 100%;
      }
    }
    .bm {
      width: 5.8rem;
      height: 1rem;
      background: url("./bmimg/bminputbg.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.3rem auto;
      input {
        outline: none;
        border: 0;
        background: transparent;
        height: 0.7rem;
        margin-top: 0.15rem;
        padding-left: 0.4rem;
        font-size: 0.32rem;
        color: #fefefe;
        &::placeholder {
          color: #fefefe;
        }
      }
    }
    .acttip {
      font-size: 0.24rem;
      color: #666;
      padding-left: 0.5rem;
      margin: 0.16rem auto 0.44rem;
    }
    .btnbm {
      width: 5.8rem;
      height: 0.8rem;
      margin: 0.3rem auto;
      img {
        width: 100%;
      }
    }
  }
}
.mypop {
  background: transparent;
}
.popmain {
  width: 5.97rem;
  height: 10rem;
  background: url("./imgs1/popbg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  position: relative;
  .header {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: #efeff5;
    font-size: 0.36rem;
  }
  .header1 {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 0.4rem;
    color: #efeff5;
    font-size: 0.36rem;
    padding-top: 0.1rem;
    span {
      font-size: 0.25rem;
    }
  }
  .content {
    width: 100%;
    height: 9rem;
    overflow: scroll;
    color: #666;
    font-size: 0.24rem;
    line-height: 0.4rem;
    padding: 0.3rem;
    span {
      color: #333;
      font-size: 0.28rem;
      font-weight: 700;
    }
    .imgIcon {
      width: 100%;
      text-align: center;
      img {
        width: 1.7rem;
        height: 1.7rem;
      }
    }

    .imgtip {
      width: 100%;
      text-align: center;
      img {
        width: 4.46rem;
        display: inline-block;
      }
    }
    .imgcode {
      width: 100%;
      text-align: center;
      img {
        width: 2.2rem;
        display: inline-block;
      }
    }
    .imgtip2 {
      width: 100%;
      text-align: center;
      img {
        width: 3.4rem;
        display: inline-block;
      }
    }

    .maptip {
      width: 100%;
      text-align: center;
      margin: 0.2rem auto;
    }

    .imghongbao {
      width: 100%;
      text-align: center;
      img {
        width: 3.06rem;
        height: 3.02rem;
      }
    }

    .tip {
      color: #2872dc;
      margin: 0.2rem auto;
    }
    .acttitle {
      margin: 0.2rem auto 0.2rem 0;
    }
  }
  .close {
    position: absolute;
    top: -0.2rem;
    right: -0.2rem;
    width: 0.5rem;
    height: 0.5rem;
    img {
      width: 100%;
    }
  }
}
.active {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
