import request from '@/lib/Request'
// import { payUrl } from '@/config/'
import { Indicator } from 'mint-ui'

// import store from '@/store'
export function getUserCredit (_this) {
  Indicator.open()
  request.post('api/user_credit/get').then(rs => {
    if (rs.status == 200) {
      let payload =
        typeof rs.payload == 'string' ? JSON.parse(rs.payload) : rs.payload
      _this.accumulatedCredit = payload.accumulatedCredit
      _this.useableCredit = payload.useableCredit
      _this.spend = _this.accumulatedCredit - _this.useableCredit
    }
    Indicator.close()
  })
}
export function loadDataList (_this, checkType) {
  Indicator.open()

  let url, params

  switch (checkType) {
    case 'loadCredit':
      url = 'api/user_credit_record/get'
      let { recordType, pageSize, currentPage } = _this
      params = {
        recordType,
        pageSize,
        currentPage
      }
      break
  }
  request.post(url, params).then(rs => {
    if (rs.status === 200) {
      let list = rs.payload.list
      if (!list || list.length === 0) {
        _this.noMore = true
      } else {
        list.forEach(item => {
          _this.orderList.push(item)
        })
      }
      _this.currentPage++
    }
    Indicator.close()
  })
}
export function getRefereeChildren (_this) {
  Indicator.open()
  let params
  let { customId } = _this
  params = {
    customId
  }
  request.post('api/referee/getRefereeChildren', params).then(rs => {
    if (rs.status === 200) {
      let list = rs.payload.list
      if (!list || list.length === 0) {
        _this.noMore = true
      } else {
        list.forEach(item => {
          _this.orderList.push(item)
        })
      }
      _this.currentPage++
    } else {
      _this.noMore = true
    }
    Indicator.close()
  })
}
