<template>
  <div class="standard-editor">
    <div>商品ID:{{val}}</div>
    <div v-if="info" class="standard-editor-row">
      <img class="standard-editor-icon" :src="info.iconUrl" />
      <div>{{info.proName}}</div>
      <div>描述:{{info.proDescript}}</div>
    </div>
    <div>
      <el-button @click="onSelect">选择</el-button>
    </div>
    <el-dialog title="选择活动" :visible.sync="showSelector" width="50%">
      <div class="standard-editor-box">
        <div class="standard-editor-act">
          <div class="standard-editor-item" :class="{'standard-editor-item-active':act.actId==actId}" @click="selectAct(act)" v-for="act in actList" :key="act.actId">
            {{act.actName}}
          </div>
        </div>
        <div class="standard-editor-pro">
          <div class="standard-editor-item" :class="{'standard-editor-item-active':pro.id==proId}" @click="selectPro(pro)" v-for="pro in proList" :key="pro.id">
            {{pro.proName}}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["value", "propDef", "page"],
  data () {
    return {
      val: this.value,
      info: null,
      actId: null,
      actList: [],
      proId: null,
      proList: [],
      showSelector: false
    }
  },
  watch: {
    val (val) {
      this.loadProduct(val)
      this.$emit("input", val)
    },
    value (val) {
      this.val = val
    }
  },
  methods: {
    async loadProduct (proId) {
      let rs = await this.$get("lego/getProDetails/" + proId)
      if (rs.status == 200) {
        this.info = rs.payload
      }
    },
    onSelect () {
      this.actId = null
      this.proId = null
      this.actList = []
      this.proList = []
      this.showSelector = true
      this.loadActList()
    },
    async loadActList () {
      let rs = await this.$post("lego/queryActList", {
        currentPage: 1,
        pageSize: 9999,
        actType: 1,
        merchantId: this.page.merchantId
      })
      if (rs.status == 200) {
        this.actList = rs.payload.list
      }
    },
    async loadProList () {
      let rs = await this.$get("lego/queryProductList/" + this.actId)
      if (rs.status == 200) {
        this.proList = rs.payload
      }
    },
    async loadStandardList () {
      let rs = await this.$get("lego/getProDetails/" + this.proId)
      if (rs.status == 200) {
        this.standardList = rs.payload.standardList
      }
    },
    selectAct (act) {
      this.actId = act.actId
      this.proId = null
      this.proList = []
      this.loadProList()
    },
    selectPro (pro) {
      this.val = pro.id
      this.showSelector = false
    }
  },
  created () {
    if (this.val) {
      this.loadProduct(this.val)
    }
  }
}
</script>

<style scoped>
.standard-editor {
  position: relative;
}
.standard-editor-box {
  display: flex;
  max-height: 500px;
}
.standard-editor-box > div {
  flex: 0 1 50%;
  border: 1px solid #ddd;
  margin-right: 10px;
  padding: 10px;
}
.standard-editor-item {
  line-height: 30px;
}
.standard-editor-item:hover {
  color: rgb(7, 97, 7);
  background: #eee;
}
.standard-editor-item-active {
  color: green;
  background: #eee;
}
.standard-editor-row {
  padding: 5px 0;
}
.standard-editor-icon {
  height: 50px;
  width: 50px;
  border: 1px solid #ccc;
  float: left;
  margin-right: 10px;
}
</style>
