let merchantId = null
let merchantAppid = null
let signActId = null
const payUrl =
  process.env.NODE_ENV === 'development'
    ? `//hemitest.lianhaikeji.com/cashier/pay/`
    : `//${window.location.host}/cashier/pay/`

if (process.env.PUBLISH_ENV == 'prod') {
  // 生产配置
  merchantId = 215
  merchantAppid = 'aa63947313ae4d6abd1fec5ef2d4194a'
  signActId = '561549579'
} else {
  // 开发环境和测试环境配置
  merchantId = 9
  merchantAppid = 'abc84853c448asdjaidji2e48d56551ed6'
  signActId = '565747208'
}
let arr = [
  {
    name: '200元话费',
    startTime: '2019.8.22',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '100元话费',
    startTime: '2019.8.22',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '20元话费',
    startTime: '2019.8.23',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '20元话费',
    startTime: '2019.8.23',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '50元话费',
    startTime: '2019.8.23',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '2元话费',
    startTime: '2019.8.24',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '2元话费',
    startTime: '2019.8.24',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '5元话费',
    startTime: '2019.8.25',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '5元话费',
    startTime: '2019.8.25',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '10元话费',
    startTime: '2019.8.25',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '10元话费',
    startTime: '2019.8.25',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '5元话费',
    startTime: '2019.8.26',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '2元话费',
    startTime: '2019.8.26',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '1元话费',
    startTime: '2019.8.26',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '1元话费',
    startTime: '2019.8.26',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '5元话费',
    startTime: '2019.8.26',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '2元话费',
    startTime: '2019.8.27',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '1元话费',
    startTime: '2019.8.27',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '7元话费',
    startTime: '2019.8.27',
    endTime: '2019.12.1',
    state: '已发放'
  },
  {
    name: '20元话费',
    startTime: '2019.8.28',
    endTime: '2019.12.1',
    state: '已发放'
  }
];

export default {
  merchantId,
  merchantAppid,
  signActId,
  payUrl,
  arr
}
