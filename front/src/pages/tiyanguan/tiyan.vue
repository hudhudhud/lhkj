<template>
  <div :class="{active:showPop}">
    <div class="tiyan">
      <div
        class="btnback"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/lego/92ef1a6f3a6a4f739940f8a3f0981016`)"
      ><img
          src="./imgs/btnback.jpg"
          alt=""
        ></div>
      <back></back>
      <div class="bg">
        <div class="front">
          <div class="title"><img
              src="./imgs/title1.png"
              alt=""
            ></div>
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
          <div class="more">
            <div class="btnget"><img
                src="./imgs/btnhui.jpg"
                alt=""
              ></div>
          </div>
        </div>
        <div class="tiyanchoose">
          <div class="title"><img
              src="./imgs/title2.png"
              alt=""
            ></div>
          <div class="main">
            <p class="tiptop">选择你体验过的产品:</p>
            <div class="checkbox"><label><input
                  name="product"
                  type="radio"
                  value=""
                />手机银行转账 </label>
              <label><input
                  name="product"
                  type="radio"
                  value=""
                />龙支付发红包 </label>
              <label><input
                  name="product"
                  type="radio"
                  value=""
                />速盈/基金 </label>
              <label><input
                  name="product"
                  type="radio"
                  value=""
                />信用卡在线申请 </label> <label><input
                  name="product"
                  type="radio"
                  value=""
                />惠聚广东活动专区 </label><label><input
                  name="product"
                  type="radio"
                  value=""
                />校园e码通 </label><label><input
                  name="product"
                  type="radio"
                  value=""
                />建融家园 </label></div>
            <p class="tiptop">输入您的体验反馈：</p>
            <textarea
              name="feedback"
              cols="30"
              rows="10"
              placeholder="请输入您的体验反馈"
              v-model="fankui"
            ></textarea>
            <div
              class="btnfankui"
              @click="showMsg()"
            ><img
                src="./imgs/btnfankui.png"
                alt=""
              ></div>
          </div>
        </div>
      </div>
      <mt-popup
        v-model="showPop"
        class="mypop"
        popup-transition="popup-fade"
      >
        <template v-if="mask!=-1">
          <div class="popmain">
            <div class="header">{{tiyanList[mask].title}}</div>
            <template v-if="mask==0">
              <!-- 手机银行转账 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  转账是手机银行最基础最常用的功能之一，但这个“熟面孔”背后其实还隐藏着不少“彩蛋”功能，手机号转账、延时转账、预约转账、他行转建行。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“转账”</div>
                <div class="imgtip"><img
                    src="./imgs/zhuanzhang.png"
                    alt=""
                  ></div>
                <div class="tip">请各位体验官使用转账功能后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template>
            <template v-if="mask==1">
              <!-- 龙支付发红包 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  龙支付是建行推出的支付品牌，除钱包、全卡付、收款、好友付款、随心取款等常见功能和海量商户优惠外，更有独居一格的空中红包、颜值红包新玩法。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“龙支付”</div>
                <div class="imgtip"><img
                    src="./imgs/imglongpay.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“红包”</div>
                <div class="imghongbao"><img
                    src="./imgs/imghongbao.png"
                    alt=""
                  ></div>
                <div class="tip">请各位体验官使用龙支付功能后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template>
            <template v-if="mask==2">
              <!-- 速盈/基金 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  速盈，银行系的“宝宝”理财；基金，用定投穿越牛熊。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“速盈”</div>
                <div class="imgtip"><img
                    src="./imgs/suying.png"
                    alt=""
                  ></div>
                <p class="maptip">或点击“投资理财”</p>
                <div class="imgtip"><img
                    src="./imgs/licai.png"
                    alt=""
                  ></div>
                <p class="maptip">再点击“基金投资”</p>
                <div class="imgtip"><img
                    src="./imgs/jijin.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官购买速盈或基金产品后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”；投资有风险，入市需谨慎。</div>
              </div>
            </template>
            <template v-if="mask==3">
              <!-- 贷吧/信用卡在线申请 -->
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  龙卡贷吧是我行专为年轻客户和龙支付客户推出的一款虚拟信用卡，除享有龙卡信用卡基本功能和权益外，还具备“极速申请，即申即用”、“线上线下交易全覆盖”、“全方位安全防护”、“专属点券”等特色。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“信用卡”</div>
                <div class="imgtip"><img
                    src="./imgs/xycard.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“点击信用卡管理板块的“信用卡申
                  请”或“龙卡贷吧”</div>
                <div class="imgtip"><img
                    src="./imgs/lkdai.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官在线申办龙卡贷吧或信用卡后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template>
            <!-- 惠聚广东活动专区 -->
            <template v-if="mask==4">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  广东地区客户专享的活动专区，集合各类线上趣味活动，更可以进行包括“CC币”在内的各类权益兑换。</div>
                <div class="acttitle"><span>第一步：</span>打开手机银行APP</div>
                <div class="imgIcon"><img
                    src="./imgs/rankicon.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“悦享生活”</div>
                <div class="imgtip"><img
                    src="./imgs/yuexiang.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“惠聚广东”</div>
                <div class="imgtip"><img
                    src="./imgs/hjgd.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官参加任一惠聚广东活动（需产生交易）后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template>
            <!-- 校园e码通 -->
            <template v-if="mask==5">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  校内食堂、门禁出入、校园订餐、水电网控、图书借阅、教务考勤等校园生活，一码搞定。</div>
                <div class="acttitle"><span>第一步：</span>关注“建行广州分行”微信公众号"</div>
                <div class="imgtip2"><img
                    src="./imgs/gdfenhang.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第二步：</span>点击“王牌精选”</div>
                <div class="imgtip2"><img
                    src="./imgs/wangpai.png"
                    alt=""
                  ></div>
                <div class="acttitle"><span>第三步：</span>点击“校园e码通”</div>
                <div class="imgtip2"><img
                    src="./imgs/ematong.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官注册开通校园e码通后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template>
            <!-- 建融家园 -->
            <template v-if="mask==6">
              <div class="content">
                <div> <span>项目介绍：</span> <br>
                  建行为广大租客、房东打造的租赁共享平台，为租客提供房源搜索展示、预约看房、合同签订、费用支付等服务，还有其他一系列全新功能，慢慢发现吧！</div>
                <div class="acttitle"><span>下载二维码</span></div>
                <div class="imgcode"><img
                    src="./imgs/imgcode.png"
                    alt=""
                  ></div>

                <div class="tip">请各位体验官注册“CCB建融家园”后，返回活动页面填写体验反馈，经核实后即可向各位体验官发放“体验津贴”。</div>
              </div>
            </template>
            <div
              class="close"
              @click="showPop=false"
            ><img
                src="./imgs/close.png"
                alt=""
              ></div>
          </div>
        </template>

      </mt-popup>
    </div>
  </div>
</template>
<script>
import pic1 from './imgs/pic1.png';
import pic2 from './imgs/pic2.png';
import pic3 from './imgs/pic3.png';
import pic4 from './imgs/pic4.png';
import pic5 from './imgs/pic5.png';
import pic6 from './imgs/pic6.png';
import pic7 from './imgs/pic7.png';
import { Toast, Popup } from 'mint-ui';
export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      tiyanList: [
        { pic: pic1, title: '手机银行转账' },
        { pic: pic2, title: '龙支付红包' },
        { pic: pic3, title: '速盈/基金' },
        { pic: pic4, title: '贷吧/信用卡在线申请' },
        { pic: pic5, title: '惠聚广东活动专区' },
        { pic: pic6, title: '校园e码通' },
        { pic: pic7, title: 'CCB建融家园' }
      ],
      fankui: '',
      showPop: false,
      mask: -1
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
    }
  }
};
</script>
<style lang="scss" scoped>
.tiyan {
  width: 100%;
  min-height: 18.79rem;
  background: #2872dc url("./imgs/tiyanbg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  position: relative;
  .btnback {
    position: absolute;
    top: 1rem;
    right: 0;
    z-index: 100;
    width: 0.64rem;
    height: 1.67rem;
    img {
      width: 100%;
    }
  }
  .bg {
    width: 6.66rem;
    height: 18.1rem;
    background-color: rgba(255, 255, 255, 0.3);
    padding-top: 0.2rem;
    margin: 0.5rem auto 0;
    position: relative;
  }
  .front {
    width: 6.33rem;
    height: 9.7rem;
    background-color: #ffffff;
    padding-top: 0.001rem;
    margin: 0rem auto 0.3rem;
    .front-act {
      width: 92%;
      height: 7.5rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .front-act-item {
        width: 2.8rem;
        height: 1.7rem;
        border-radius: 0.08rem;
        img {
          width: 100%;
          border-radius: 0.08rem;
        }
      }
    }
    .more {
      width: 5.92rem;
      height: 0.88rem;
      background: url("./imgs/prizeScore.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.2rem auto;
      text-align: right;
      line-height: 0.88rem;
      padding-right: 0.2rem;
      img {
        width: 1.39rem;
        height: 0.5rem;
        margin-top: 0.19rem;
      }
    }
  }
  .tiyanchoose {
    width: 6.33rem;
    height: 7.64rem;
    background-color: #ffffff;
    padding-top: 0.001rem;
    margin: 0.3rem auto 0;
    .main {
      width: 5.5rem;
      margin: 0.1rem auto 0;
      .tiptop {
        font-size: 0.28rem;
        color: #333333;
        width: 100%;
        margin: 0.2rem auto;
      }
      .checkbox {
        width: 5.5rem;
        height: 2.68rem;
        border: solid 1px #cecfe0;
        margin: 0.1rem auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0.2rem 0 0.2rem 0.1rem;
        label {
          width: 50%;
        }
      }
      textarea {
        width: 5.5rem;
        height: 1.5rem;
        background-color: #f5f5f5;
        border-radius: 0.1rem;
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
        line-height: 0.34rem;
        color: #b3b3b3;
        outline: none;
        border: none;
        padding: 0.2rem;
      }
      .btnfankui {
        width: 2.4rem;
        height: 0.6rem;
        margin: 0.2rem auto;
        img {
          width: 100%;
        }
      }
    }
  }
}
.title {
  width: 100%;
  text-align: center;
  margin: 0.2rem auto;
  img {
    display: inline-block;
    height: 0.35rem;
  }
}
.mypop {
  background: transparent;
}
.popmain {
  width: 5.97rem;
  height: 10rem;
  background: url("./imgs/popbg.png") no-repeat;
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
