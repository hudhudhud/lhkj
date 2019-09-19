<template>
    <div></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    let script = document.createElement('script')
    script.setAttribute('src', 'https://static.lianhaikeji.com/lib/js/icbc_core.js')
    script.onload = () => {
      setTimeout(() => {
        window.ICBCUtil.returnBack()
      }, 100)
    }
    document.body.appendChild(script)
  }
}
</script>
