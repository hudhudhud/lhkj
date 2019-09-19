let AuthPlugin = {}
AuthPlugin.install = function (Vue, options) {
  // 实例方法
  Vue.prototype.$hasAuth = function (mid) {
    let modules = this.$store.state.modules
    let check = false

    if (!modules) {
      return false
    }
    modules.forEach(module => {
      module.children.forEach(item => {
        if (item.mid === mid) {
          check = true
        }
        if (item.children) {
          item.children.forEach(itemc => {
            if (itemc.mid === mid) {
              check = true
            }
            if (itemc.children) {
              itemc.children.forEach(itemcc => {
                if (itemcc.mid === mid) {
                  check = true
                }
              })
            }
          })
        }
      })
    })

    return check
  }

  Vue.prototype.$checkPassWord = async function (password) {
    return new Promise((resolve, reject) => {
      this.$prompt("请输入密码以继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.+/,
        inputType: "password",
        inputErrorMessage: "请输入密码"
      })
        .then(async ({ value }) => {
          let rs = await this.$post("auth/checkPassWord", { password: value })
          if (rs.status == "200") {
            resolve(true)
          } else {
            this.$alert(rs.msg, "警告", {
              confirmButtonText: "确定"
            })
            resolve(false)
          }
        })
        .catch(() => {
          resolve(false)
        })
    })
  }
}
export default AuthPlugin
