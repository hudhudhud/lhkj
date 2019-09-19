<template>
  <mt-picker :slots="provinceSlots" @change="onProvinceChange" style="width: 7.5rem;" showToolbar>
    <div class="picker-toolbar-title">
      <div class="usi-btn-cancel" @click="provinceVisible = !provinceVisible">取消</div>
      <div class="usi-btn-sure" @click="provinceVisible = !provinceVisible">确定</div>
    </div>
  </mt-picker>
</template>

<script>
import { Picker, Popup } from 'mint-ui';
export default {
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.picker-toolbar-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 0.3rem;
  .usi-btn-cancel,
  .usi-btn-sure {
    color: #ff6600;
  }
}
</style>
