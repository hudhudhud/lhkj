export default [
  {
    path: "/activity",
    meta: {
      title: "活动管理"
    },
    component: () => import("@/pages/activity/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "活动列表",
          keepAlive: true
        },
        component: () => import("@/pages/activity/ActivityList")
      },
      {
        path: "timeConfig/:actId",
        meta: {
          title: "时间配置"
        },
        component: () => import("@/pages/activity/ActivityTimeConfig")
      },
      {
        path: "addActivity",
        meta: {
          title: "新增活动"
        },
        component: () => import("@/pages/activity/ActivityForm")
      },
      {
        path: "white/:actId/:actName",
        meta: {
          title: "白名单"
        },
        component: () => import("@/pages/activity/WhiteListChoose")
      },
      {
        path: "whiteImport/:actId",
        meta: {
          title: "白名单导入"
        },
        component: () => import("@/pages/activity/WhiteImport")
      },
      {
        path: "editActivity/:actId",
        meta: {
          title: "编辑活动"
        },
        component: () => import("@/pages/activity/ActivityForm")
      },

      {
        path: "actTemplate/:actId",
        meta: {
          title: "模板设置"
        },
        component: () => import("@/pages/activity/config/Index")
      },
      {
        path: "limit/:actId",
        meta: {
          title: "活动限制"
        },
        component: () => import("@/pages/activity/Index"),
        children: [
          {
            path: "",
            meta: {
              title: "活动限制"
            },
            component: () => import("@/pages/activity/LimitList")
          },

          {
            path: "addLimit/:id",
            meta: {
              title: "新增限制"
            },
            component: () => import("@/pages/activity/LimitForm")
          }
        ]
      },
      {
        path: "product/:actId",
        meta: {
          title: "商品管理"
        },
        component: () => import("@/pages/activity/Index"),
        children: [
          {
            path: "",
            meta: {
              title: "商品管理"
            },
            component: () => import("@/pages/activity/ProductList")
          },
          {
            path: "standard/:proId",
            meta: {
              title: "规格列表"
            },
            component: () => import("@/pages/activity/StandardList")
          },
          {
            path: "addStandard/:proId",
            meta: {
              title: "新增规格"
            },
            component: () => import("@/pages/activity/StandardForm")
          },
          {
            path: "editStandard/:standardId",
            meta: {
              title: "编辑规格"
            },
            component: () => import("@/pages/activity/StandardForm")
          },
          {
            path: "buyRecord/:standardId",
            meta: {
              title: "购买记录"
            },
            component: () => import("@/pages/activity/ActivityOrder")
          },
          {
            path: "timeConfig/:standardId",
            meta: {
              title: "时间配置"
            },
            component: () => import("@/pages/activity/SeckillTimeConfig")
          },
          {
            path: "proLimit/:proId",
            meta: {
              title: "商品限制"
            },
            component: () => import("@/pages/activity/Index"),
            children: [
              {
                path: "",
                meta: {
                  title: "商品限制"
                },
                component: () => import("@/pages/activity/LimitList")
              },

              {
                path: "addLimit/",
                meta: {
                  title: "新增限制"
                },
                component: () => import("@/pages/activity/LimitForm")
              }
            ]
          }
        ]
      },
      {
        path: "lottery/:actId",
        meta: {
          title: "奖品管理"
        },
        component: () => import("@/pages/activity/Index"),
        children: [
          {
            path: "",
            meta: {
              title: "奖品管理"
            },
            component: () => import("@/pages/activity/LotteryList")
          },
          {
            path: "addLottery",
            meta: {
              title: "新增奖品"
            },
            component: () => import("@/pages/activity/LotteryForm")
          },
          {
            path: "editLottery/:id",
            meta: {
              title: "编辑奖品"
            },
            component: () => import("@/pages/activity/LotteryForm")
          },
          {
            path: "winningRecodeList/:standardId",
            meta: {
              title: "中奖纪录"
            },
            component: () => import("@/pages/activity/ActivityOrder")
          }
          /* {
                path: "winningRecodeList/:id",
                meta: {
                  title: "中奖纪录"
                },
                component: () => import("@/pages/activity/WinningRecodeList")
              } */
        ]
      },
      {
        path: "signPrize/:actId",
        meta: {
          title: "奖励规则管理"
        },
        component: () => import("@/pages/activity/Index"),
        children: [
          {
            path: "",
            meta: {
              title: "奖励规则管理"
            },
            component: () => import("@/pages/activity/SignPrizeList")
          },
          {
            path: "addSignPrize",
            meta: {
              title: "新增奖励规则"
            },
            component: () => import("@/pages/activity/SignPrizeForm")
          },
          {
            path: "editSignPrize/:id",
            meta: {
              title: "编辑奖励规则"
            },
            component: () => import("@/pages/activity/SignPrizeForm")
          }
        ]
      },
      {
        path: "ticket/:actId",
        meta: {
          title: "券管理"
        },
        component: () => import("@/pages/activity/Index"),
        children: [
          {
            path: "",
            meta: {
              title: "券管理"
            },
            component: () => import("@/pages/activity/TicketList")
          },
          {
            path: "addTicket",
            meta: {
              title: "新增券"
            },
            component: () => import("@/pages/activity/TicketForm")
          },
          {
            path: "editTicket/:id",
            meta: {
              title: "编辑券"
            },
            component: () => import("@/pages/activity/TicketForm")
          }
        ]
      },
      {
        path: "game/:actId",
        meta: {
          title: "游戏管理"
        },
        component: () => import("@/pages/activity/Index"),
        children: [
          {
            path: "",
            meta: {
              title: "游戏管理"
            },
            component: () => import("@/pages/activity/game/gamePrizeList")
          },
          {
            path: "addGamePrize",
            meta: {
              title: "新增"
            },
            component: () => import("@/pages/activity/game/gamePrizeForm")
          }
        ]
      },
      {
        path: "productForm/:proId",
        meta: {
          title: "商品信息"
        },
        component: () => import("@/pages/activity/ProductForm")
      },
      {
        path: "addProduct/:actId",
        meta: {
          title: "新增商品"
        },
        component: () => import("@/pages/activity/ProductForm")
      },
      {
        path: "editProduct/:proId",
        meta: {
          title: "编辑商品"
        },
        component: () => import("@/pages/activity/ProductForm")
      }
    ]
  }
]
