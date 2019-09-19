<template>
  <div class="qiandaoShaizi" :class="{'trueDia':prizeStatus || dialogStatus}">
    <back></back>
      <div class="content">
          <div class="topBtn">
              <div class="btn" @click="RuleStatus=true"></div>
              <!-- <div class="btn" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"></div> -->
              <div class="btn" @click="loadOrder"></div>
          </div>
          <div class="Checkerboard">
              <div class="box" v-for="(item,index) in boxdata" :key="index+'_box'" :style="{left:item.point[0]*1.24+'rem',top:item.point[1]*1.26+'rem'}">
                  <div class="prize" :class="{'level2':item.level==2,'level3':item.level==3}" :style="{background:'url('+prizeImg[item.level]+') no-repeat 60% top / auto 90%'}"></div>
                  <img class="person" v-if="boxdata[personStep].point == item.point" src="./imgs/lead.png" alt="">
              </div>
              <div class="dice" :class="{'dicing':!playStatua,'dice1':diceNum==1,'dice2':diceNum==2,'dice3':diceNum==3,'dice4':diceNum==4,'dice5':diceNum==5,'dice6':diceNum==6}"></div>
              <!-- <div class="hand"></div> -->
              <p>今日可玩<span>{{chances}}</span>次</p>
          </div>
          <div class="playBtn" @click="lotteryDraw"></div>
      </div>
      <div class="Dialog" v-if="dialogStatus">
          <div class="dialog">
              <div class="prizeTitle">{{prizeInfo.prizeName}}</div>
              <p>{{prizeInfo.standardInstruction}}</p>
              <div class="dialogBtn" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"></div>
              <div class="close" @click="dialogStatus=false"></div>
          </div>
      </div>
      <div class="Rule" v-if="RuleStatus">
          <div class="rule">
              <!-- <h2>新用户参与游戏细则</h2> -->
              <div class="ruleTitle"><img src="./imgs/ruleTitle.png" alt=""></div>
              <dl>
                  <dt>1.游戏奖品设置</dt>
                  <dd><span>新办卡用户</span>可以参与--玩大富翁领大奖活动，活动设置话费奖，美食优惠卡奖，实物优惠购奖；</dd>
              </dl>
              <dl>
                  <dt>2.参与用户</dt>
                  <dd>苏州建行信用卡用户</dd>
              </dl>
              <dl>
                  <dt>3.获取更多玩游戏机会</dt>
                  <dd style="color:#333;text-align:center;">
                    <table border="1" cellpadding=“0” cellspacing="0" style="border-collapse: collapse;width: 100%;">
                      <tr>
                        <th style="width:40%;">任务</th>
                        <th style="width:30%;">游戏机会(次)</th>
                        <th style="width:30%;">奖品价值(元)</th>
                      </tr>
                      <!-- <tr>
                        <td style="font-weight:bold;">拥有建行信用卡</td>
                        <td>苏州建行信用卡用户</td>
                        <td>名下卡片状态正常</td>
                        <td style="color:red;">1</td>
                      </tr> -->
                      <tr>
                        <td style="font-weight:bold;">激活开卡</td>
                        <!-- <td>苏州建行信用卡纯新用户</td>
                        <td>查询日前三个月内完成开卡和激活动作</td> -->
                        <td style="color:red;">2</td>
                        <td style="color:red;">10</td>
                      </tr>
                      <!-- <tr>
                        <td style="font-weight:bold;">首次刷卡消费</td>
                        <td>苏州建行信用卡用户</td>
                        <td>在登陆此页面1个月有消费动作，再往前6个月消费记录(即两笔消费时间间隔6个月以上)</td>
                        <td style="color:red;">3</td>
                      </tr> -->
                      <tr>
                        <td style="font-weight:bold;">首次约定还款</td>
                        <!-- <td>苏州建行信用卡纯新用户</td>
                        <td>查询日前三个月内完成开卡动作和激活动作并完成约定还款动作</td> -->
                        <td style="color:red;">1</td>
                        <td style="color:red;">5</td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold;">首次发生分期业务</td>
                        <!-- <td>苏州建行信用卡用户</td>
                        <td>名下信用卡为查询日前六个月内首次发生分期业务的</td> -->
                        <td style="color:red;">2</td>
                        <td style="color:red;">10</td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold;">首次取现</td>
                        <!-- <td>苏州建行信用卡用户</td>
                        <td>名下信用卡为查询日前六个月内首次取现的</td> -->
                        <td style="color:red;">2</td>
                        <td style="color:red;">10</td>
                      </tr>
                    </table>
                  </dd>
              </dl>
              <div class="ruleBtn" @click="RuleStatus=false"></div>
          </div>
      </div>
      <div class="Dialog" v-if="prizeStatus">
          <div class="dialogPrize">
            <ul
              v-infinite-scroll="loadOrder"
              infinite-scroll-immediate-check="false"
              infinite-scroll-disabled="noMore"
              infinite-scroll-distance="10">
              <li v-for="(item,index) in prizelist" :key="index+'_prize'">{{item.proStandardName}}<span>{{item.orderTime}}</span></li>
            </ul>
            <div class="close" @click="prizeStatus=false"></div>
          </div>
      </div>
  </div>
</template>

<script>
import boxdata from './qidaorenwu.json'
import { Toast, Indicator } from 'mint-ui';
export default {
  name: 'qiandaoShaizi',
  props: {
    act: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      boxdata: boxdata, // 表格数据
      prizeImg: ['//static.lianhaikeji.com/images/20190619/80b06e0f7d8c423b8b1835ea8c561e8e.png', '//static.lianhaikeji.com/images/20190619/a7ed3b0c07e84105b0b8b7fe78ff183f.png', '//static.lianhaikeji.com/images/20190619/a05c1b1a4c304be69b4bf5a1a3b07659.png', '//static.lianhaikeji.com/images/20190619/e78e7f7d0bc44496aa6f88373f4a63e4.png'],
      dialogStatus: false, // 弹窗显隐
      RuleStatus: false, // 规则弹窗显隐
      playStatua: true, // 色子是否可以点击
      diceNum: null, // 色子点数
      personStep: 0, // 角色步数
      level1List: [],
      level2List: [],
      level3List: [],
      chances: 0, // 抽奖次数
      prizeInfo: null, // 中奖信息
      prizelist: [], // 奖品列表
      prizeStatus: false, // 奖品列表弹窗
      noMore: false, // 是否已经没有更多
      currentPage: 1// 奖品列表页码
    };
  },
  watch: {

  },
  created () {
    this.loadAct();
  },
  methods: {
    play () {
      setTimeout(() => {
        let list = [];
        if (this.prizeInfo.standardActUrl == 1) {
          list = this.level1List
        } else if (this.prizeInfo.standardActUrl == 2) {
          list = this.level2List
        } else if (this.prizeInfo.standardActUrl == 3) {
          list = this.level3List
        }
        console.log('list:');
        console.log(list);
        let randomList = [];
        list.forEach(val => {
          if (val > this.personStep && val - this.personStep <= 6) {
            randomList.push(val);
          }
        })
        if (randomList.length == 0) {
          randomList.push(list[0]);
          this.diceNum = randomList[Math.floor((Math.random() * randomList.length))] - this.personStep + 20;
        } else {
          this.diceNum = randomList[Math.floor((Math.random() * randomList.length))] - this.personStep;
        }
        console.log('personStep:' + this.personStep);
        console.log('randomList:');
        console.log(randomList);
        let temp = this.diceNum
        let time = setInterval(() => {
          if (temp > 0) {
            temp--;
            this.personStep++;
            if (this.personStep >= 20) {
              this.personStep = this.personStep - 20;
            }
          } else {
            clearInterval(time);
            this.dialogStatus = true;
          }
        }, 300)
      }, 1500)
      setTimeout(() => {
        this.playStatua = true;
      }, 1600)
    },
    async lotteryDraw () {
      if (this.playStatua && this.chances > 0) {
        this.playStatua = false;
        Indicator.open();
        let rs = await this.$post('api/lottery_draw', {
          actId: this.act.actId
        });
        if (rs.status == 200) {
          this.chances--;
          this.prizeInfo = rs.payload;
          this.play();
        } else {
          this.playStatua = true;
          Toast({
            message: rs.error,
            position: 'middle',
            duration: 1500
          });
        }
        Indicator.close();
      }
    },
    async loadAct () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async loadOrder () {
      this.prizeStatus = true;
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.act.actId,
        actType: '2,4,5',
        pageSize: 10,
        currentPage: this.currentPage
      });

      if (rs.status === 200) {
        if (rs.payload.list.length > 0) {
          this.currentPage++;
          this.prizelist = this.prizelist.concat(rs.payload.list);
          for (let i = 0; i < this.prizelist.length; i++) {
            this.prizelist[i].orderTime = this.prizelist[i].orderTime.split(' ')[0]
          }
        } else {
          this.noMore = true;
        }
      }
    }
  },
  mounted () {
    for (let i = 0; i < this.boxdata.length; i++) {
      if (this.boxdata[i].level == 1) {
        this.level1List.push(i);
      } else if (this.boxdata[i].level == 2) {
        this.level2List.push(i);
      } else if (this.boxdata[i].level == 3) {
        this.level3List.push(i);
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.qiandaoShaizi{
    width: 100%;
    height: 100vh;
    position: relative;
    &.trueDia{
      overflow: hidden;
    }
    .content{
        width: 100%;
        height: 15.18rem;
        background: url('./imgs/renwuBg.jpg') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .topBtn{
            margin-top: 4.1rem;
            overflow: hidden;
            .btn{
                width: 2.32rem;
                height: 0.8rem;
                float: left;
            }
            .btn:nth-child(1){
                margin: 0 0.42rem 0 1rem;
                background: url('./imgs/renwuRule.png') no-repeat;
                background-size: 100% 100%;
            }
            .btn:nth-child(2){
                margin: 0 1rem 0 0.42rem;
                background: url('./imgs/renwuPrize.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .Checkerboard{
            width: 7.46rem;
            height: 7.7rem;
            margin: 0.35rem 0.02rem 0;
            position: relative;
            .box{
                width: 1.24rem;
                height: 1.26rem;
                position: absolute;
                .prize{
                    width: 100%;
                    height: 100%;
                    &.level2{
                        background-size: auto 80% !important;
                        background-position: 70% top !important;
                    }
                    &.level3{
                        background-size: auto 70% !important;
                        background-position: center !important;
                    }
                }
                .person{
                    position: absolute;
                    width: 0.96rem;
                    height: 1.31rem;
                    top: -0.3rem;
                    left: 50%;
                    margin-left: -0.48rem;
                }
            }
            .dice{
                width: 2.37rem;
                height: 2.37rem;
                background: url('./imgs/dice6.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: 2.3rem;
                left: 50%;
                margin-left: -1.18rem;
                &.dicing{
                    animation: zhuan 0.1s linear infinite;
                }
                &.dice1{
                    background: url('./imgs/dice1.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.dice2{
                    background: url('./imgs/dice2.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.dice3{
                    background: url('./imgs/dice3.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.dice4{
                    background: url('./imgs/dice4.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.dice5{
                    background: url('./imgs/dice5.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.dice6{
                    background: url('./imgs/dice6.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            @keyframes zhuan {
                from{
                    transform: rotate(0);
                }to{
                    transform: rotate(360deg);
                }
            }
            .hand{
                width: 1.88rem;
                height: 1.34rem;
                position: absolute;
                background: url('./imgs/hand.gif') no-repeat;
                background-size: 100% 100%;
                top: 40%;
                left: 55%;
            }
            p{
                text-align: center;
                width: 100%;
                font-size: 0.3rem;
                color: rgb(99,55,2);
                position: absolute;
                top: 70%;
                span{
                    font-size: 0.4rem;
                    color: rgb(242,21,0);
                }
            }
        }
        .playBtn{
            width: 3.18rem;
            height: 1.33rem;
            background: url('./imgs/playBtn.png') no-repeat;
            background-size: 100% 100%;
            margin: 0.6rem auto;
        }
    }
    .Dialog{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.4);
        top: 0;
        left: 0;
        .dialog{
            width: 4.9rem;
            height: 3.67rem;
            background: url('./imgs/prizeDialog.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 20%;
            left: 50%;
            margin: 0 0 0 -2.45rem;
            text-align: center;
            .prizeTitle{
                font-size: 0.34rem;
                color: rgb(251,77,0);
                line-height: 0.34rem;
                margin-top: 1.8rem;
            }
            p{
                font-size: 0.24rem;
                line-height: 0.4rem;
                color: rgb(167,156,151);
                padding: 0 0.5rem;
                margin-top: 0.22rem;
            }
            .dialogBtn{
                width: 2.25rem;
                height: 0.84rem;
                position: absolute;
                top: 3.25rem;
                left: 50%;
                margin-left: -1.12rem;
                background: url('./imgs/playBtn.png') no-repeat;
                background-size: 100% 100%;
            }
            .close{
                width: 0.52rem;
                height: 0.52rem;
                position: absolute;
                left: 50%;
                bottom: -1.5rem;
                margin-left: -0.26rem;
                background: url('./imgs/close.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .dialogPrize{
          width: 4.9rem;
          height: 7.53rem;
          background: url('./imgs/prizeList.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -3.8rem 0 0 -2.45rem;
          ul{
            width: 4.7rem;
            height: 5.9rem;
            overflow: auto;
            margin-left: 0.1rem;
            margin-top: 1.5rem;
            padding: 0;
            box-sizing: content-box;
            li{
              padding: 0 0 0 0.36rem;
              color: rgb(252,65,0);
              font-size: 0.28rem;
              line-height: 0.66rem;
              width: 4.34rem;
              height: 0.66rem;
              border-bottom: 1px solid #fe9e05;
              span{
                font-size: 0.26rem;
                color: rgb(136,132,132);
                float: right;
                display: block;
                width: 1.8rem;
                height: 0.66rem;
              }
            }
            li:nth-last-child(1){
              border: 0;
            }
          }
          .close{
            width: 0.64rem;
            height: 0.64rem;
            position: absolute;
            left: 50%;
            bottom: -1rem;
            margin-left: -0.26rem;
            background: url('./imgs/close.png') no-repeat;
            background-size: 100% 100%;
            }
        }
    }
    .Rule{
        background: url('./imgs/ruleBg.png') no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        .rule{
            width: 92%;
            height: 100%;
            background: #f9fbfc;
            margin-left: 4%;
            overflow: auto;
            padding: 0.2rem;
            .ruleTitle{
              text-align: center;
              margin: 0.4rem 0;
              img{
                width: 3.43rem;
              }
            }
            h2{
                font-size: 0.3rem;
                text-align: center;
                margin-top: 0.5rem;
                margin-bottom: 0.3rem;
                float: left;
                width: 100%
            }
            dl{
                margin-bottom: 0.5rem;
                font-size: 0.24rem;
                line-height: 0.36rem;
                dt{
                    color: #000;
                    margin-bottom: 0.1rem;
                    font-weight: bold;
                }
                dd{
                    color:#222;
                    span{
                        color: red;
                    }
                }
            }
            .ruleBtn{
                width: 2.33rem;
                height: 0.81rem;
                background: url('./imgs/ruleBtn.png') no-repeat;
                background-size: 100% 100%;
                margin: 1rem auto;
            }
        }
    }
}
</style>
