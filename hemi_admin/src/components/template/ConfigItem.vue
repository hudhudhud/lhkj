<template>
  <div class="config-item">
    <div v-if="config.type=='array'">
      <div class="config-item-label">{{config.name}}({{config.key}})</div>
      <div class="config-item-list">
        <div v-if="!val || val.length==0" class="config-item-empty">尚未添加元素</div>
        <div v-for="(element,ind) in val" :key='config.key+`_`+ind'>
          <el-button icon="el-icon-minus" type="danger" @click="val.splice(ind,1)">删除</el-button>
          <ConfigItem :config="item" v-for="item in config.elementProps" :key="config.key+`_`+ind+item.key" v-model="val[ind][item.key]"></ConfigItem>
        </div>
      </div>
      <el-button icon="el-icon-plus" @click="add">增加</el-button>
    </div>
    <div v-else>
      <div class="config-item-label">{{config.name}}({{config.key}})</div>
      <div v-if="config.type=='text'">
        <el-input v-model="val"></el-input>
      </div>
      <div v-if="config.type=='longtext'">
        <el-input type="textarea" :rows="2" v-model="val"></el-input>
      </div>
      <div v-if="config.type=='images'">
        <UploadImages v-model="val" action="file/upload"></UploadImages>
      </div>
      <div v-if="config.type=='image'">
        <ConfigImage v-model="val"></ConfigImage>
      </div>
      <div v-if="config.type=='options'">
        <el-radio-group v-model="val">
          <el-radio-button v-for="(option,ind) in config.options" :key="config.key+'_'+ind" :label="option.value">{{option.label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="config.type=='act'">
        <ConfigAct v-model="val"></ConfigAct>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigItem from "./ConfigItem"
import ConfigAct from "./ConfigAct"
import UploadImages from "@/components/UploadImages"
import ConfigImage from "./ConfigImage"

export default {
  name: "ConfigItem",
  components: {
    ConfigItem,
    ConfigAct,
    ConfigImage,
    UploadImages
  },
  props: {
    value: {
      require: true
    },
    config: {
      type: Object,
      require: true
    }
  },
  data () {
    let defaultVal = null
    if (this.value) {
      defaultVal = this.value
    } else if (this.config.type == "array") {
      defaultVal = this.config.default || []
    } else if (this.config.type == "text") {
      defaultVal = this.config.default || ""
    } else if (this.config.type == "images") {
      defaultVal = this.config.default || []
    } else if (this.config.type == "options") {
      defaultVal = this.config.default || ""
    }
    this.$emit("input", defaultVal)
    return {
      val: defaultVal
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
    add () {
      let val = {}
      this.config.elementProps.forEach(item => {
        val[item.key] = null
      })
      this.val.push(val)
    }
  }
}
</script>

<style scoped>
.config-item {
  border: 1px solid #eee;
  margin: 10px 0;
  padding: 10px;
}
.config-item-list:hover {
  border: 1px solid #ccc;
}
.config-item-list {
  border: 1px solid #eee;
  margin: 10px 0;
  padding: 10px;
}
.config-item-label {
  font-size: 14px;
  line-height: 30px;
}
.config-item-empty {
  font-size: 14px;
  color: #999;
}
</style>
