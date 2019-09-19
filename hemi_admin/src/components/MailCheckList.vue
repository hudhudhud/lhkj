<template>
  <div class="cover" @click="close" v-show="needcheck">
    <div class="dialog" @click.stop>
      <transition name="slidel">
        <div class="dialog-content" v-if="mailSended==false">
          <div class="title">选择二次验证用户</div>
          <div class="msg" v-if="loading">正在加载...</div>
          <div class="msg" v-if="!loading&&list.length==0">未配置审核人员</div>
          <div class="list">
            <div class="item" :class="{'item-active':selectedUser==user}" v-for="user in list" :key="user.id"
              @click="selectedUser=user">
              {{user.nickname}} - {{user.email}}
            </div>
          </div>
          <div class="row">
            <el-input v-model="operatorMemo" placeholder="请输入操作说明"></el-input>
          </div>
          <div class="tool">
            <el-button @click="send" :loading="sending">发送验证邮件</el-button>
          </div>
        </div>
      </transition>
      <transition name="slider">
        <div class="dialog-content" v-if="mailSended==true">
          <div class="title">输入邮件验证码</div>
          <div class="row">验证邮件已发送至邮箱:{{selectedUser.email}}</div>
          <div class="row">
            <el-input v-model="code" placeholder="请输入邮件验证码"></el-input>
          </div>
          <div class="tool">
            <el-button @click="mailSended=false">重新发送</el-button>
            <el-button @click="checkCode" type="primary">确定</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkParams: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      params: this.checkParams,
      needcheck: false,
      mailSended: false,
      loading: false,
      list: [],
      selectedUser: null,
      operatorMemo: "",
      sending: false,
      key: null,
      code: null
    };
  },
  methods: {
    async checkNeedVerify() {
      this.loading = true;
      const rs = await this.$get("mail/needCheck?actId=" + this.params.actId);
      if (rs.status == 200) {
        if (rs.payload) {
          this.loadCheckUsers();
          this.needcheck = true;
        } else {
          this.$emit("passed");
        }
      } else {
        this.$message(rs.error);
      }
      this.loading = false;
    },
    async checkNeedVerifyByProId() {
      this.loading = true;
      const rs = await this.$get(
        "mail/needCheckByProId?proId=" + this.params.proId
      );
      if (rs.status == 200) {
        if (rs.payload && rs.payload.needcheck) {
          this.needcheck = true;
          this.params.actId = rs.payload.actId;
          this.loadCheckUsers();
        } else {
          this.$emit("passed");
        }
      } else {
        this.$message(rs.error);
      }
      this.loading = false;
    },
    async loadCheckUsers() {
      this.loading = true;
      const rs = await this.$get("mail/getMailList?actId=" + this.params.actId);
      if (rs.status == 200) {
        this.list = rs.payload;
      } else {
        this.$message(rs.error);
      }
      this.loading = false;
    },
    close() {
      this.$emit("close");
    },
    async send() {
      if (!this.selectedUser) {
        this.$message.error("请选择验证用户");
        return;
      }
      if (!this.operatorMemo) {
        this.$message.error("请输入操作说明");
        return;
      }
      this.sending = true;
      const rs = await this.$post(
        "mail/sendVerifyMail",
        Object.assign(
          {
            operatorMemo: this.operatorMemo,
            userId: this.selectedUser.id
          },
          this.params
        )
      );
      if (rs.status == 200) {
        this.mailSended = true;
        this.key = rs.payload;
      } else {
        this.$message.error(rs.error);
      }
      this.sending = false;
    },
    async checkCode() {
      if (!this.key) {
        return;
      }
      this.sending = true;
      const rs = await this.$post("mail/checkVerifyMail", {
        code: this.code,
        key: this.key
      });
      if (rs.status == 200) {
        this.$emit("passed");
      } else {
        this.$message.error(rs.error);
      }
      this.sending = false;
    }
  },
  mounted() {
    if (this.params.actId || this.params.proId) {
      if (this.params.sendType != "actStatus") {
        if (this.params.actId) {
          this.checkNeedVerify();
        } else {
          this.checkNeedVerifyByProId();
        }
      } else {
        this.needcheck = true;
        this.loadCheckUsers();
      }
    } else {
      // 新建活动不需要验证
      setTimeout(() => {
        this.$emit("passed");
      }, 100);
    }
  }
};
</script>

<style scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1988;
}
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background: #fff;
  overflow-x: hidden;
}
.dialog-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.title {
  line-height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  color: #999;
}
.msg {
  line-height: 50px;
  text-align: center;
  color: #999;
}
.list {
  position: relative;
}
.item {
  position: relative;
  padding: 10px;
  cursor: pointer;
}
.item:hover {
  background: #eee;
}
.item-active {
  color: green;
}
.item-active::after {
  content: " ";
  position: absolute;
  top: 7px;
  right: 20px;
  display: block;
  height: 20px;
  width: 10px;
  border-right: 1px solid green;
  border-bottom: 1px solid green;
  transform: rotate(45deg);
}
.tool {
  padding: 10px;
  text-align: right;
}
.slidel-enter-active,
.slidel-leave-active {
  transition: all 0.3s;
}
.slidel-enter,
.slidel-leave-to {
  transform: translate(-100%, 0);
  opacity: 0;
}
.slider-enter-active,
.slider-leave-active {
  transition: all 0.3s;
}
.slider-enter,
.slider-leave-to {
  transform: translate(100%, 0);
  opacity: 0;
}
.row {
  padding: 10px;
  color: #666;
}
</style>
