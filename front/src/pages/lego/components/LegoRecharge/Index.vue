<template>
  <div>
    <div class="tab-title-wrapper">

      <div class="table-title-item" :class="{'active':currentTab=='one'}" @click="currentTab='one'">
        <span class="tt-item-text">话费97折充值</span>
      </div>
      <div class="table-title-item" :class="{'active':currentTab=='two'}" @click="currentTab='two'">
        <span class="tt-item-text">话费优惠券充值</span>
      </div>
    </div>
    <template>
      <div class="input">
        <input type="text" v-model="phone" placeholder="请输入手机号" />
        <div class="btn">
          <div>充值</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 'one'

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tab-title-wrapper {
  margin-bottom: 0.2rem;
  display: flex;
  width: 100%;
  background: #fff;
}

.table-title-item {
  flex: 1;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
  color: #999999;
}

.table-title-item.active {
  color: #1fafef;
}

.table-title-item.active {
  display: inline-block;
  border-bottom: 4px solid #477ef0;
}

.tab-content-wrapper {
  position: absolute;
  top: 1.2rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.input {
  display: flex;
  justify-content: space-between;
  input {
    border: 1px solid #999;
    border-radius: 0.2rem;
    padding: 0.2rem;
    min-width: 5.6rem;
  }
  .btn {
    display: flex;
    height: 1.05rem;
    width: 1.05rem;
    border-radius: 50%;
    border: 1px solid #1fafef;
    text-align: center;
    justify-content: center;
    align-items: center;
    div {
      width: 0.92rem;
      height: 0.92rem;
      line-height: 0.92rem;
      border-radius: 50%;
      font-size: 0.34rem;
      color: #fff;
      background: #1fafef;
    }
  }
}
</style>
