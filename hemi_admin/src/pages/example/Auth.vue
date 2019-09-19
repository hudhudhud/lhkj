<template>
  <LayoutForm>
    <div>
      权限控制(使用内置方法判断):
      <div>
        <div v-for="m in authList" :key="m.mid">
          {{m.mname}}{{$hasAuth(m.mid)}}
        </div>
      </div>
    </div>
  </LayoutForm>
</template>

<script>
export default {
  data () {
    return {
      authList: [
        {
          mid: "01000000000000000000",
          mname: "系统管理"
        },
        {
          mid: "02010000000000000000",
          mname: "商品管理"
        }
      ]
    }
  }
}
</script>
