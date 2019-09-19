<template>
  <div>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <div class="data_list today_head">
            <span class="data_num head">当日数据：</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{userCount}}</span> 新增用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{orderCount}}</span> 新增订单</div>
        </el-col>
        <!-- <el-col :span="4">
                    <div class="data_list">
                        <span class="data_num">{{adminCount}}</span> 新增管理员</div>
                </el-col> -->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{allUserCount}}</span> 注册用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{allOrderCount}}</span> 订单</div>
        </el-col>
        <!-- <el-col :span="4">
                    <div class="data_list">
                        <span class="data_num">{{allAdminCount}}</span> 管理员</div>
                </el-col> -->
      </el-row>
    </section>
    <!-- <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency> -->
  </div>
</template>

<script>
// import tendency from "../../components/tendency"
// import dtime from "time-formater"
export default {
  components: {
    // tendency
  },
  data () {
    return {
      userCount: null,
      orderCount: null,
      allUserCount: null,
      allOrderCount: null,
      sevenDay: [],
      sevenDays: [],
      sevenDate: [[], [], []]
    }
  },
  mounted () {
    this.initData()
    this.getData()
    this.getSevenData()
  },
  methods: {
    // getData () {
    //   for (let i = 20; i > -1; i--) {
    //     this.sevenDay.push(dtime(new Date().getTime() - 86400000 / 8 * i).format("YYYY-MM-DD HH") + "时")
    //     this.sevenDays.push({
    //       goday: dtime(new Date().getTime() - 86400000 / 8 * (i + 1)).format("YYYY-MM-DD HH"),
    //       today: dtime(new Date().getTime() - 86400000 / 8 * i).format("YYYY-MM-DD HH")
    //     })
    //   }
    // },
    // async initData () {
    //   var rs = await this.$post("graph/countByData", {
    //     goday: dtime(new Date().getTime()).format("YYYY-MM-DD"),
    //     today: dtime(new Date().getTime() + 86400000).format("YYYY-MM-DD")
    //   })
    //   this.userCount = rs.payload.userCount
    //   this.allUserCount = rs.payload.allUserCount
    //   this.orderCount = rs.payload.orderCount
    //   this.allOrderCount = rs.payload.allOrderCount
    // },
    async getSevenData () {
      const apiArr = [[], [], []]
      let rs = await this.$post("graph/countCustomByDatas", {
        sevenDays: this.sevenDays
      })
      let customCountList = rs.payload
      customCountList.forEach(count => {
        apiArr[0].push(count)
      })

      let rs2 = await this.$post("graph/countOrderByDatas", {
        sevenDays: this.sevenDays
      })
      let orderCountList = rs2.payload
      orderCountList.forEach(count => {
        apiArr[1].push(count)
      })

      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[], [], []]
        res.forEach((item, index) => {
          resArr[Math.floor(index / 21)].push(item)
        })
        this.sevenDate = resArr
      }).catch(err => {
        console.log("err:::", err)
      })
    }
  }
}
</script>

<style lang="less">
@import "../../styles/mixin";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>
