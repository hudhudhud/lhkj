<template>
  <div>
    <div class="linkPlate">
      <div class="plateTitle" v-for="(group, ind) in couponGroup" :key="'group'+ ind">
        <div class="item-title">
          <div><img :src="group.icon" alt=""></div>
          <div>{{group.title}}</div>
        </div>
        <div class="plate-item" v-for="(product, ind) in group.couponList" :key="'product'+ ind">
          <div class="item-img">
            <img :src="product.imgUrl" alt="">
          </div>
          <div class="item-detail">
            <div class="proName">{{product.proName}}</div>
            <div class="proDesc">{{product.proDesc}}</div>
            <div class="expire" v-if="product.expire">有效期: {{product.expire}}</div>
          </div>
          <div class="item-btn">
            <a :href="product.link">
              <div>领取</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--  <div class="plateDetail">
      <div>礼券版块活动说明</div>
      <p>
        1、本活动所领礼券为工行融e购商城电子券，领取后可通过融e联app-我的-钱包-融e购-我的商城中，点击登录后在“优惠券”栏目进行查看和使用，电子券有效期为领取之日起1个月，过期作废视为自动放弃 <br/> 2、礼券分为指定店铺通用（指定店铺内商品均可抵扣）和指定商品（指定活动商品可抵扣）可用两种类型，详情可在上述优惠券栏目查看电子券使用信息，商品下单时可自动抵扣 <br/> 3、相关商品的售后服务将由电子券对应商户完成，消费者可在融e购对应商户店铺首页中查询联系方式，或致电融e购官方客服4009195588
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'LinkPlate',
  props: {
    couponGroup: {
      require: true,
      tpype: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.linkPlate {
  background: #fff;
  padding: 0 0.24rem;
  .item-title {
    @include border-1px(#d9d9d9);
    height: 1.2rem;
    display: flex;
    align-items: center;
    div {
      img {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
    }
  }
  .plate-item {
    display: flex;
    height: 2.4rem;
    align-items: center;
    @include border-1px(#d9d9d9);
    &:nth-last-child(1) {
      &:after {
        border: none;
      }
    }
    .item-img {
      width: 1.9rem;
      font-size: 0;
      img {
        width: 80%;
      }
    }
    .item-detail {
      .proName {
        font-size: 0.3rem;
        font-weight: 400;
        color: #000;
        line-height: 0.8rem;
      }
      .proDesc {
        font-size: 0.28rem;
        color: #888;
      }
      .expire {
        font-size: 0.24rem;
        color: #888;
        line-height: 0.6rem;
      }
    }
    .item-btn {
      display: flex;
      width: 100;
      flex: 1;
      justify-content: flex-end;
      div {
        width: 1.2rem;
        height: 0.56rem;
        font-size: 0.28rem;
        color: #fff;
        line-height: 0.58rem;
        background: url(./img/receive-btn.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
      }
    }
  }
}
.plateDetail {
  background: #eff0f1;
  padding: 0.3rem 0.4rem 0.5rem;
  div {
    line-height: 0.6rem;
    font-size: 0.3rem;
    line-height: 0.9rem;
    text-align: center;
    color: #333;
  }
  p {
    line-height: 0.46rem;
    color: #999;
  }
}
</style>
