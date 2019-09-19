<template>
  <div class="theme-ccb">
    <div class="lotter-body">
      <div class="head">
        <img src="/Public/jgg/images/ccb_head1.png" style="width: 80%;">
      </div>
      <div class="lotcontainer">
        <div class="light light1"></div>
        <div class="light light2"></div>
        <div id="lottery">
          <table border="0" cellpadding="0" cellspacing="0" style="width: 217.066px;">
            <tbody>
              <tr>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-0">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/d1a958f547da30555297b5dd3895117df0aa8ed644d8fa508fb4bb9349c171b8402c8466.png">
                    <span>1000元油卡</span>
                  </div>
                  <div class="mask"></div>

                </td>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-1">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/c4cce113580c872466187a3678d93d45cf427c54f38325bd96723362b941efb588d59626.png">
                    <span>50元话费</span>
                  </div>
                  <div class="mask"></div>

                </td>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-2">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/d1a958f547da30555297b5dd3895117df0aa8ed644d8fa508fb4bb9349c171b8402c8466.png">
                    <span>200元油卡</span>
                  </div>
                  <div class="mask"></div>

                </td>
              </tr>
              <tr>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-7">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/c4cce113580c872466187a3678d93d45cf427c54f38325bd96723362b941efb588d59626.png">
                    <span>2元话费</span>
                  </div>
                  <div class="mask"></div>

                </td>
                <td style="height: 72.3554px;" class="tdbtn">
                  <a href="javascript:;" class="lotbtn"></a>

                </td>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-3">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/c4cce113580c872466187a3678d93d45cf427c54f38325bd96723362b941efb588d59626.png">
                    <span>20元话费</span>
                  </div>
                  <div class="mask"></div>

                </td>
              </tr>
              <tr>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-6">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/c4cce113580c872466187a3678d93d45cf427c54f38325bd96723362b941efb588d59626.png">
                    <span>100元话费</span>
                  </div>
                  <div class="mask"></div>

                </td>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-5">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/c4cce113580c872466187a3678d93d45cf427c54f38325bd96723362b941efb588d59626.png">
                    <span>10元话费</span>
                  </div>
                  <div class="mask"></div>

                </td>
                <td style="height: 72.3554px;" class="lottery-unit lottery-unit-4">
                  <div class="prize-box">
                    <img src="https://bkts.lianhaikeji.com/Upload/d1a958f547da30555297b5dd3895117df0aa8ed644d8fa508fb4bb9349c171b8402c8466.png">
                    <span>500元油卡</span>
                  </div>
                  <div class="mask"></div>

                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <div class="btn-two clearfix">
        <a class="btn b-left">中奖纪录</a>
        <a class="btn b-right" onclick="showTk('rule', true)">活动规则</a>
      </div>
      <div class="kefutel">
        <a href="tel: 0571-58106068" style="color: #fff;">客服热线: 0571-58106068</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/*建行九宫格主题*/
.theme-ccb .lotter-body .head {
  margin-top: 5rem;
}
.theme-ccb .lotter-body .head img {
  width: 100%;
}
.keBody.theme-ccb {
  background: url(./img/bg_ccb.png) no-repeat 0 40px;
  background-size: 100% 100%;
}
.theme-ccb .lotcontainer {
  background: #b2ede7;
  border: 2px solid #7fc2d3;
}
.theme-ccb #lottery {
  background: #fff;
  padding: 0.15rem;
  border: 0.5rem solid #58bfde;
}
.theme-ccb #lottery table td {
  background: #b2ede7;
  border-radius: 15px;
}

.theme-ccb .btn-two,
.theme-quzhou .btn-two {
  position: absolute;
  right: 0;
  top: 5rem;
  margin-top: 0;
  overflow: hidden;
}
.theme-quzhou .btn-two {
  top: 1rem;
}
.theme-ccb .btn-two .btn,
.theme-quzhou .btn-two .btn {
  display: block;
  padding-left: 2rem;
  line-height: 2rem;
  color: #fff;
  float: none;
  width: 100%;
  margin-left: 0;
}
.theme-ccb .btn-two .b-left,
.theme-quzhou .btn-two .b-left {
  background: url("./img/ccb_log.png") no-repeat;
  background-size: 100%;
}
.theme-ccb .btn-two .b-right,
.theme-quzhou .btn-two .b-right {
  background: url("./img/ccb_rule.png") no-repeat;
  background-size: 100%;
  margin-top: 0.5rem;
}
.theme-ccb #lottery table td a.lotbtn {
  background: url("./img/lotbtn_ccb.png") no-repeat center center;
  background-size: 100% 100%;
}
.theme-ccb #lottery table td.tdbtn {
  background: none;
}
.theme-ccb .light1,
.theme-quzhou .light1 {
  background: url(./img/light_ry1.png) no-repeat center center;
  background-size: 98% 98%;
}
.theme-ccb .light2,
.theme-quzhou .light2 {
  background: url(./img/light_ry2.png) no-repeat center center;
  background-size: 98% 98%;
}
</style>
