export default [
  {
    name: '大转盘',
    surface:
      '//static.lianhaikeji.com/images/20190708/40c8d5465832488fa4a6d04b3ec8a4fb.jpeg',
    type: 'lettory',
    key: 'CanvasLettory',
    scenes: [
      {
        key: 'CanvasLettory',
        surface:
          '//static.lianhaikeji.com/images/20190708/40c8d5465832488fa4a6d04b3ec8a4fb.jpeg',
        show: true,
        styles: [
          {
            key: 'banner',
            name: '头图',
            type: 'image'
          },
          {
            name: '标题',
            key: 'title',
            type: 'text',
            default: '标题'
          },
          {
            name: '背景颜色',
            key: 'pageColor',
            type: 'color',
            default: '#ccf3c0'
          },
          {
            name: '奖品按钮背景图片',
            key: 'prizeBtnImg',
            type: 'image',
            default: ''
          },
          {
            name: '规则图片',
            key: 'ruleBtnImg',
            type: 'image',
            default: ''
          },
          {
            name: '标题图片',
            key: 'titlePng',
            type: 'image',
            default: ''
          },
          {
            name: '播报背景',
            key: 'bulletBg',
            type: 'image',
            default: ''
          },
          {
            name: '转盘背景',
            key: 'circleBg',
            type: 'image',
            default: ''
          },
          {
            name: '大转盘奖品区块对应背景颜色',
            key: 'pannelColor1',
            type: 'color',
            default: 'rgb(99,153,57)'
          },
          {
            name: '大转盘奖品区块对应背景颜色',
            key: 'pannelColor2',
            type: 'color',
            default: 'rgb(210,245,199)'
          },
          {
            name: '指针图片',
            key: 'pointerImage',
            type: 'image',
            default: ''
          },
          {
            name: '机会背景图片',
            key: 'chanceBg',
            type: 'image',
            default: ''
          },

          {
            name: '底部装饰图片',
            key: 'finishingImg',
            type: 'image',
            default: ''
          }
        ]
      },
      {
        key: 'RuleDialog',
        surface:
          '//static.lianhaikeji.com/images/20190723/195ea5e36f504781b2fe085ace0125cc.png',
        show: false,
        styles: [
          {
            name: '规则弹框背景图片',
            key: 'ruleDialogBg',
            type: 'image',
            default: ''
          },
          {
            name: '规则弹框关闭按钮图片',
            key: 'ruleDialogClose',
            type: 'image',
            default: ''
          }
        ]
      },
      {
        key: 'Dialog',
        surface:
          '//static.lianhaikeji.com/images/20190723/faffc34f8495449695617033564451fd.png',
        show: false,
        styles: [
          {
            name: '中奖结果弹框背景图片',
            key: 'prizeDialogBg',
            type: 'image',
            default: ''
          },
          {
            name: '奖品图片',
            key: 'prizeImg',
            type: 'image',
            default: ''
          },
          {
            name: '弹框关闭按钮图片',
            key: 'ruleDialogClose',
            type: 'image',
            default: ''
          }
        ]
      }
    ]
  },
  {
    name: '九宫格',
    surface:
      '//static.lianhaikeji.com/images/20190724/869f1732011a4b4982026345a286b0ad.png',
    type: 'lettory',
    key: 'GridLettory',
    scenes: [
      {
        key: 'GridLettory',
        surface:
          '//static.lianhaikeji.com/images/20190724/869f1732011a4b4982026345a286b0ad.png',
        styles: [
          {
            key: 'background',
            name: '页面背景',
            type: 'image'
          },
          {
            name: '面板',
            key: 'pannel',
            type: 'image',
            default: ''
          },
          {
            name: 'banner',
            key: 'banner',
            type: 'image',
            default: ''
          },
          {
            name: '奖品格子背景',
            key: 'prizeBackground',
            type: 'image',
            default: ''
          },
          {
            name: '奖品示例',
            key: 'standardImgUrl',
            type: 'image',
            default: ''
          },
          {
            name: '抽奖按钮图片',
            key: 'button',
            type: 'image',
            default: ''
          },
          {
            key: 'prizeActive',
            name: '抽中奖品高亮背景',
            type: 'image'
          },
          {
            key: 'recordBtn',
            name: '中奖纪录按钮',
            type: 'image'
          },
          {
            key: 'ruleBtn',
            name: '活动规则按钮',
            type: 'image'
          }
        ]
      },
      {
        key: 'RuleDialog',
        surface:
          '//static.lianhaikeji.com/images/20190724/59a44fbf7d7a4ec5a6ac336e7dde79e3.png',

        show: false,
        styles: [
          {
            name: '规则弹框背景图片',
            key: 'ruleDialogBg',
            type: 'image',
            default: ''
          },

          {
            name: '弹框关闭按钮图片',
            key: 'ruleDialogClose',
            type: 'image',
            default: ''
          }
        ]
      },
      {
        key: 'ThanksDialog',
        surface:
          '//static.lianhaikeji.com/images/20190724/33d79d7a20cd4e29bdb7ff34b63e0246.png',
        show: false,
        styles: [
          {
            name: '中奖结果弹框背景图片',
            key: 'thanksDialogBg',
            type: 'image',
            default: ''
          },
          {
            name: '奖品图片',
            key: 'thanksImg',
            type: 'image',
            default: ''
          },
          {
            name: '弹框关闭按钮图片',
            key: 'thanksDialogClose',
            type: 'image',
            default: ''
          }
        ]
      },
      {
        key: 'prizeDialog',
        surface:
          '//static.lianhaikeji.com/images/20190724/3d6e0bb5e60f4a68ae9ffd4bb3389c86.png',
        show: false,
        styles: [
          {
            name: '中奖结果弹框背景图片',
            key: 'prizeDialogBg',
            type: 'image',
            default: ''
          },
          {
            name: '奖品图片',
            key: 'prizeImg',
            type: 'image',
            default: ''
          },
          {
            name: '弹框关闭按钮图片',
            key: 'prizeDialogClose',
            type: 'image',
            default: ''
          }
        ]
      }
    ]
  },
  {
    name: '特卖-满减',
    surface: '',
    key: 'saleMJ',
    type: 'sale',
    scenes: [
      {
        key: 'saleMJ',
        surface:
          '//static.lianhaikeji.com/images/20190725/75a02439485b4aaa8b26d9c30552e440.png',
        styles: [
          {
            key: 'img1',
            name: '页面背景',
            type: 'image'
          },
          {
            key: 'img2',
            name: '页面背景',
            type: 'image'
          },
          {
            key: 'img3',
            name: '页面背景',
            type: 'image'
          },
          {
            key: 'img4',
            name: '页面背景',
            type: 'image'
          },
          {
            key: 'img5',
            name: '页面背景',
            type: 'image'
          },
        ]
      }
    ]
  }

  /* {
    name: '特卖-布局-通栏',
    surface:
      '//static.lianhaikeji.com/images/20190715/b2371cb8e620499594280496f7cb5417.jpeg',
    key: 'sale001',
    type: 'sale',
    styles: [
      {
        name: '标题',
        key: 'title',
        type: 'text',
        default: '标题'
      },
      {
        name: '顶部导航背景颜色',
        key: 'headBgColor',
        type: 'color',
        default: '#09b6f2'
      },
      {
        name: '背景颜色',
        key: 'pageColor',
        type: 'color',
        default: '#ccf3c0'
      },
      {
        name: '购买按钮背景图片',
        key: 'buyBtnImg',
        type: 'image',
        default: ''
      },
      {
        name: '购买按钮背景颜色',
        key: 'buyBtnColor',
        type: 'color',
        default: '#db1d34'
      },
      {
        name: '规则图片',
        key: 'ruleBtnImg',
        type: 'image',
        default: ''
      },
      {
        name: 'banner图片',
        key: 'banner',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190319/8845f11aa8704344ab985f466566204b.png'
      },
      {
        name: '底部装饰图片',
        key: 'finishingImg',
        type: 'image',
        default: ''
      }
    ]
  },*/
  {
    name: '签到-打卡充电站',
    surface:
      '//static.lianhaikeji.com/images/20190715/e1b14a59165f49c1a068115cb1c0f31a.jpeg',
    key: 'sign001',
    type: 'sign',
       scenes: [
      {
        key: 'saleMJ',
        surface:
          '//static.lianhaikeji.com/images/20190725/75a02439485b4aaa8b26d9c30552e440.png',
        styles: [
      {
        name: '标题',
        key: 'title',
        type: 'text',
        default: '标题'
      },

      {
        name: '背景颜色',
        key: 'pageColor',
        type: 'color',
        default: '#ccf3c0'
      },
      {
        name: '页面背景图片',
        key: 'pageBgImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/726d179141b44198a7590f6c12ed182f.png'
      },

      {
        name: '规则标题图片',
        key: 'ruleTitleImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/7dd93742520944f49610917b69ad26e3.png'
      },
      {
        name: '待签到按钮图片',
        key: 'waitSignImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/a2051f80c50f408b9fce1d4c1cdab445.png'
      },
      {
        name: '签到按钮图片',
        key: 'signImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/ea24fa13edbc4319b3e92a1ca1631beb.png'
      },
      {
        name: '已完成签到按钮图片',
        key: 'signedImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/7bec910f09bf4008950a17de5163af50.png'
      },
      {
        name: '领取按钮图片',
        key: 'receiveBtnImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/d308a0f7d51d4199b8140fc3fcb853c0.png'
      },
      {
        name: '充电器背景图片',
        key: 'chargeImg',
        type: 'image',
        default:
          '//static.lianhaikeji.com/images/20190715/3fe2c3172edc41af88c173017a59158c.png'
      },

      {
        name: '底部装饰图片',
        key: 'finishingImg',
        type: 'image',
        default: ''
      }
    ]
  }]
  } 
];
