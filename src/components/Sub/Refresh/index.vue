<template>
  <div class="refresh-wrap">
    <el-button size="small" @click="$emit('refreshData')">
      <i class="el-icon-refresh icon"></i>
      刷新数据
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'RefreshCell'
}
</script>

<style lang="stylus" scoped>
.refresh-wrap {
  margin-bottom: 20px;
  line-height: 30px;
  text-align: right;

  .icon {
    font-size: 24px;
    vertical-align: -4px;
  }
}
</style>
