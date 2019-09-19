<template>
    <el-select v-model="val">
        <el-option v-for="act in actList" :key="act.id" :label="act.actName" :value="act.id"></el-option>
    </el-select>
</template>

<script>
export default {
  props: ["value"],
  data () {
    return {
      val: this.value,
      actList: []
    }
  },
  watch: {
    value (val) {
      this.val = val
    },
    val (val) {
      this.$emit("input", val)
    }
  },
  methods: {
    async loadAllActList () {
      let rs = await this.$get("merchant/getActList/" + this.$route.params.merchantId)
      if (rs.status == 200) {
        this.actList = rs.payload
      }
    }
  },
  created () {
    this.loadAllActList()
  }
}
</script>
