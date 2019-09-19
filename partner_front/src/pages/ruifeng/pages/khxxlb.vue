<template>
  <div style="padding-top: 0.4rem; background: #ffffff; height: 100%">
    <div class="mian">
      <div class="title"><img src="./imgs/khxxlb.png"/></div>
      <div class="table">
        <table width="100%">
          <tr>
            <th>序号</th>
            <th>证件号码</th>
            <th>客户姓名</th>
            <th>联系方式</th>
            <th>是否签约</th>
            <th>是否用信</th>
            <!--<th>团名</th>-->
          </tr>
          <tr v-for="(item, index) in list " :key="item.id" :class="index%2==0?'blue':'white'">
            <td>{{index + 1}}</td>
            <td>{{item.cardNum}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.isqy==1?'是':'否'}}</td>
            <td>{{item.isyx==1?'是':'否'}}</td>
            <!--<td>{{item.groupName}}</td>-->
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    async loadList () {
      let rs = await this.$post('/borf/get/bindInfoList');
      if (rs.status == 200) {
        this.list = rs.payload
      } else {
        var error = rs.error;
        var message = rs.message;
        var msg = '';
        if (error && !message) {
          msg += error;
        }
        if (message) {
          msg += message;
        }
        Toast(msg);
      }
    }
  },
  async created () {
    await this.loadList();
  }
}
</script>

<style scoped>
  .mian {
    margin: 0 0.2rem auto 0.2rem;
    box-shadow: 0 0 0.2rem #dddddd;
    border-radius: 0.1rem;
    overflow: hidden;
  }
  .title {
    background: #ffffff;
  }
  .title img{
    width: 100%;
  }
  .table table {
    border-collapse: collapse;
  }
  .table table tr {
    height: 0.9rem;
    background: #ffffff;
  }
  .table table th {
    color: #3B3796;
    font-size: 0.24rem;
  }
  .table table td {
    text-align: center;
    color: #53509C;
    font-size: 0.22rem;
  }
  .blue td {
    background: #D9ECFF;
  }
  .white td {
    background: #ffffff;
  }
</style>
