<template>
  <!-- 步骤条 -->
  <div class="block">
    <div style="height: 100%;">
      <el-steps
        direction="vertical"
        finish-status="success"
        :active="6"
      >
        <el-step
          v-for="(item, index) in GUDIE_STEPS"
          :title="item.title"
          :description="item.desc"
          :key="index"
          :icon="item.icon"
        ></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import { GUDIE_STEPS } from '@/config'

export default {
  name: 'GuideStemps',
  data () {
    return {
      GUDIE_STEPS
    };
  }
};
</script>

<style lang="stylus" scoped>
.block {
  width: 30%;
  margin: 0 auto;
  height: 100%;
}
</style>
