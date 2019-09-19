import { Indicator, Toast } from 'mint-ui'
import dialogConf from './dialog.json'

export default {
  start: async function (vm) {
    if (vm.loading || vm.rotating) {
      return
    }
    if (vm.chances == 0) {
      this.buyChance(vm)
      return
    }
    vm.loading = true
    // Indicator.open()
    let rs = await vm.$post('api/lottery_draw', {
      actId: vm.actId
    })
    if (rs.status === 200) {
      let standardId = rs.payload.standardId
      vm.chances--
      vm.prizeList.forEach((item, ind) => {
        console.log(item.standardId, standardId)
        if (item.standardId === standardId) {
          vm.currentPrize = item
          vm.rotating = true
          vm.$refs.myRotate.rotate(ind)
        }
      })
    } else {
      Toast(rs.error)
    }
    vm.loading = false
    // Indicator.close()
  },
  buyChance: async function (vm) {
    Indicator.open()
    let rs = await vm.$post('/api/buy_lottery', {
      actId: vm.actId,
      num: '1'
    })
    if (rs.status === 200) {
      vm.$dialog({
        state: true,
        content: {
          type: 'buy-lettery-chance',
          backgroundImage: dialogConf[vm.actId].prizeBgUrl,
          actualPrice: rs.payload.actualPrice,
          actId: vm.actId,
          prepayId: rs.payload.prepayId,
          merchantId: vm.$store.state.merchantId
        }
      })
    } else {
      Toast(rs.error)
    }
    Indicator.close()
  },
  loadAct: async function (vm) {
    Indicator.open()
    let rs = await vm.$get('api/get_lottery_info/' + vm.actId)
    if (rs.status === 200) {
      vm.chances = rs.payload.chances
      vm.setting.names = []
      vm.setting.icons = []
      vm.act.productList.forEach(item => {
        vm.setting.names.push(item.prizeName)
        vm.setting.icons.push(item.standardImgUrl)
      })
      vm.showPannel = true
    }
    Indicator.close()
  },
  initBullet: function (vm) {
    let nameArr = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
    for (let i = 0; i < 100; i++) {
      vm.bulletList.push({
        name: nameArr[i % nameArr.length] + '先生',
        prizeName: parseInt(Math.random() * 100) + '话费'
      })
    }
    vm.startBullet()
  }
}
