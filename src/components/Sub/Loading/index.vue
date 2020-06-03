<template>
  <div class="loading-wrap">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="stylus" scoped>
.loading-wrap {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);

  .el-icon-loading {
    font-size: 25px;
    color: #409eff;
  }
}
</style>
