export default [
  {
    path: "/example",
    meta: {
      title: "示例"
    },
    component: () => import("@/pages/example/Example"),
    children: [
      {
        path: "",
        name: "Example",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/example/List")
      },
      {
        path: "upload",
        meta: {
          title: "上传"
        },
        component: () => import("@/pages/example/Upload")
      },
      {
        path: "auth",
        name: "Auth",
        meta: {
          title: "权限"
        },
        component: () => import("@/pages/example/Auth")
      }
    ]
  },
  {
    path: "/lego",
    meta: {
      title: "Lego"
    },
    component: () => import("@/pages/designer/Index"),
    children: [
      {
        path: "",
        meta: { title: "项目列表" },
        component: () => import("@/pages/designer/ProjectList")
      },
      {
        path: "pages/:proId",
        meta: { title: "页面列表" },
        component: () => import("@/pages/designer/PageList")
      },
      {
        path: "form/:pageId",
        meta: { title: "页面编辑" },
        component: () => import("@/pages/designer/PageForm")
      },
      {
        path: "designer/:pageId",
        meta: { title: "设计器" },
        component: () => import("@/pages/designer/Designer")
      }
    ]
  },
  {
    path: "/merchantAuthority",
    meta: {
      title: "商户权限管理"
    },
    component: () => import("@/pages/merchantAuthority/Index")
  },
  {
    path: "/module",
    meta: {
      title: "模块管理"
    },
    component: () => import("@/pages/module/Module"),
    children: [
      {
        path: "",
        name: "SysModuleIndex",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/module/SysModule")
      },
      {
        path: "add",
        name: "AddModule",
        meta: {
          title: "添加模块"
        },
        component: () => import("@/pages/module/AddModule")
      }
    ]
  },
  {
    path: "/user",
    name: "SysUser",
    meta: {
      title: "用户管理"
    },
    component: () => import("@/pages/user/SysUser")
  },
  {
    path: "/merchantAuthority",
    name: "MerchantAuthority",
    meta: {
      title: "商户权限管理"
    },
    component: () => import("@/pages/merchantAuthority/Index")
  },
  {
    path: "/role",
    meta: {
      title: "角色管理"
    },
    component: () => import("@/pages/role/Role"),
    children: [
      {
        path: "",
        name: "Role",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/role/SysRole")
      },
      {
        path: "edit/:rid",
        meta: {
          title: "新增编辑"
        },
        component: () => import("@/pages/role/AddEditRole")
      },
      {
        path: "add",
        meta: {
          title: "增加角色"
        },
        component: () => import("@/pages/role/AddEditRole")
      }
    ]
  }
]
