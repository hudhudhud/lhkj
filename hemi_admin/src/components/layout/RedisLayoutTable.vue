<template>
    <div class="paginate-table">
        <el-table :row-class-name="rowClassName" :data="data" border v-loading="loading" :max-height="maxTableHeight" @expand-change="expandChange" stripe>
            <slot></slot>
        </el-table>
        <div class="paginate-pager" v-if="showPager">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.currentPage" :page-sizes="pager.pageSizes" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: "RedisLayoutTable",
  props: {
    param: {
      require: false,
      type: Object
    },
    debounce: {
      require: false,
      type: Number
    },
    url: {
      require: false,
      type: String
    },
    redisUrl: {
      require: false,
      type: String
    },
    showPager: {
      require: false,
      type: Boolean
    },
    filter: {
      require: false,
      type: Function
    },
    disableAutoHeight: {
      require: false,
      type: Boolean
    },
    rowClassName: {

    }
  },
  data () {
    return {
      maxTableHeight: 500,
      loading: false,
      list: [],
      pager: null,
      autoSearchInd: null
    }
  },
  computed: {
    data () {
      if (this.filter) {
        return this.filter(this.list)
      }
      return this.list
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.autoHeight()
      }
    },
    url: {
      deep: false,
      handler () {
        this.research()
      }
    },
    param: {
      deep: true,
      handler () {
        if (this.autoSearchInd) {
          clearTimeout(this.autoSearchInd)
        }
        this.autoSearchInd = setTimeout(this.research, this.debounce || 500)
      }
    }
  },
  methods: {
    autoHeight () {
      if (this.disableAutoHeight) {
        return
      }
      this.$nextTick(() => {
        let pageHeight = this.$el.parentElement.offsetHeight
        let bros = this.$el.parentElement.childNodes
        let brosHeight = 0
        for (let i = 0; i < bros.length; i++) {
          if (bros[i] !== this.$el) {
            if (bros[i].offsetHeight) {
              brosHeight = brosHeight + bros[i].offsetHeight
            }
          }
        }
        this.$el.style.height = pageHeight - brosHeight - 20 + "px"
        if (this.showPager && this.pager) {
          this.maxTableHeight =
            this.$el.offsetHeight -
            this.$el.querySelector(".paginate-pager").offsetHeight
        } else {
          this.maxTableHeight = this.$el.offsetHeight
        }
      })
    },
    handleSizeChange (s) {
      this.pager.pageSize = s
      this.search()
    },
    handleCurrentChange (page) {
      this.pager.currentPage = page
      this.search()
    },
    deleteRow (row) {
      let ind = this.list.indexOf(row)
      if (ind > -1) {
        this.list.splice(ind, 1)
      }
    },
    addRow (row) {
      this.list.push(row)
    },
    async research () {
      if (this.pager) {
        this.pager.currentPage = 1
      }
      this.search()
    },
    async search () {
      if (!this.url) {
        return
      }
      this.loading = true
      let form = Object.assign(this.param || {}, this.pager)

      let rs = await this.$post(this.url, form)
      if (rs.status == "200") {
        // 添加loading属性
        rs.payload.list.forEach(item => {
          let originData = Object.assign({}, item)
          item.originData = originData
          item.loading = false
        })
        this.list = rs.payload.list
        this.pager = rs.payload.pager || rs.payload

        this.autoHeight()
        this.loading = false
        this.$emit("loaded", this.list, rs)
      } else if (rs.status == "300") {
        this.findRedisKey(rs.payload)
      } else {
        this.autoHeight()
        this.loading = false
        this.$emit("loaded", this.list, rs)
      }
    },
    async findRedisKey (key) {
      let res = await this.$post(this.redisUrl, {
        key: key
      })
      if (res.payload) {
        // 添加loading属性
        res.payload.list.forEach(item => {
          let originData = Object.assign({}, item)
          item.originData = originData
          item.loading = false
        })
        this.list = res.payload.list
        this.pager = res.payload.pager || res.payload

        this.autoHeight()
        this.loading = false
        this.$emit("loaded", this.list, res)
      } else {
        let this_ = this
        setTimeout(function () {
          this_.findRedisKey(key)
        }, 3000)
      }
    },
    expandChange (row, expandedRows) {
      this.$emit("expand-change", row, expandedRows)
    }
  },
  created () {
    if (this.showPager) {
      this.pager = {
        currentPage: 1,
        pageSize: 30,
        pageSizes: [30, 50, 100, 200]
      }
    }
    window.addEventListener("resize", this.autoHeight)
    this.search()
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.autoHeight)
  }
}
</script>

<style scoped>
.paginate-table {
  height: calc(100% - 50px);
  margin: 10px;
  overflow: auto;
}
.paginate-pager {
  padding: 10px 0;
}
</style>
