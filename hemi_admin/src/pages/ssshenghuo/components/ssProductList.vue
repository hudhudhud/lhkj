<template>
  <LayoutTable :disableAutoHeight="true" ref="productTable" :url="urls[type].url" :param="urls[type].param"
    @loaded="loading" show-pager>
    <el-table-column :show-overflow-tooltip="index != titles[type].length-1" v-for="(title, index) in titles[type]" :key="title.label" :prop="title.key" :label="title.label"
      :min-width="title.width" align="center">
      <template slot-scope="scope">
        <img :src="scope.row[title.key]" style="height:60px;" v-if="index == 2">

        <template v-else-if="index == titles[type].length-1">
          <el-switch v-model="scope.row.status" @change="updateStatus($event,scope.row.id)" active-color="#13ce66"
            inactive-color="#D3D3D3" :active-value="true" :inactive-value="false">
          </el-switch>
          <el-button size="mini" v-if="type == 'ZXSJ'" @click="$emit('view', scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="$emit('edit', scope.row)" :plain="true">编辑</el-button>
        </template>
        <span v-else>{{scope.row[title.key]}}</span>
      </template>
    </el-table-column>

  </LayoutTable>
</template>

<script>
export default {
  name: "ssProductList",
  data() {
    return {
      loading: false,
      titles: {
        // table 表头遍历数据
        CAR: [
          {
            label: "序号",
            key: "id",
            width: "100"
          },
          {
            label: "车辆名称",
            key: "name",
            width: "200"
          },
          {
            label: "图片",
            key: "showPicture",
            width: "200"
          },
          {
            label: "参考价(万元)",
            key: "unitPrice",
            width: "200"
          },
          {
            label: "操作",
            key: null,
            width: "200"
          }
        ],
        JJJD: [
          {
            label: "序号",
            key: "id",
            width: "100"
          },
          {
            label: "商品名称",
            key: "name",
            width: "200"
          },
          {
            label: "图片",
            key: "showPicture",
            width: "200"
          },
          {
            label: "参考价(元)",
            key: "unitPrice",
            width: "200"
          },
          {
            label: "操作",
            key: null,
            width: "200"
          }
        ],
        ZXSJ: [
          {
            label: "序号",
            key: "id",
            width: "100"
          },
          {
            label: "案例名",
            key: "name",
            width: "200"
          },
          {
            label: "banner图",
            key: "showPicture",
            width: "200"
          },
          {
            label: "房型",
            key: "description",
            width: "200"
          },
          {
            label: "面积",
            key: "address",
            width: "100"
          },
          {
            label: "风格",
            key: "merchantType",
            width: "100"
          },
          {
            label: "操作",
            key: null,
            width: "200"
          }
        ],
        JC: [
          {
            label: "序号",
            key: "id",
            width: "100"
          },
          {
            label: "商品名称",
            key: "name",
            width: "200"
          },
          {
            label: "图片",
            key: "showPicture",
            width: "200"
          },
          {
            label: "规格",
            key: "unitPrice",
            width: "200"
          },
          {
            label: "简介",
            key: "cooperateName",
            width: "200"
          },
          {
            label: "操作",
            key: null,
            width: "200"
          }
        ]
      },
      urls: {
        // 不同类型商户，URL地址不同, 参数字段可能不同
        CAR: {
          url: "homeCar/sz/hl/BymerchantId",
          param: { merchantId: this.id }
        },
        JJJD: {
          url: "homeCar/sz/hl/BymerchantId",
          param: { merchantId: this.id }
        },
        ZXSJ: { url: "homeCar/lookByMerchant", param: { merchantId: this.id } },
        JC: {
          url: "homeCar/sz/hl/BymerchantId",
          param: { merchantId: this.id }
        }
      }
    };
  },
  props: {
    type: {
      // 父组件类型, JJJD: "家居家电商户", ZXSJ: "装修设计商户", CAR: "4S门店", JC: 建材商品
      require: true,
      type: String
    },
    id: {
      // 商户ID或storeId
      require: true,
      type: String
    }
  },
  methods: {
    refresh() {
      this.$refs.productTable.search();
    },
    updateStatus(status, id) {
      let url = "/homeCar/addMerchandise";
      if (this.type === "ZXSJ") {
        url = "/homeCar/store/backCreateOrUpdate";
      }
      this.$post(url, { status, id }).then(rs => {
        if (rs.status == 200) {
          this.$message.success(rs.message);
        } else {
          this.$message.error(rs.error);
        }
        this.refresh();
      });
    }
  }
};
</script>

<style scoped>
</style>
