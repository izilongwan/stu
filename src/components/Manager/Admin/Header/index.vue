<template>
  <div class="btn-wrap">
    <el-button
      type="info"
      @click="
        bus.$emit('handleShowForm', {
          form: {
            role: 'manager',
            account: '',
            password: ''
          }
        })
      "
    >
      新增用户
      <i class="el-icon-circle-plus-outline"></i>
    </el-button>

    <Refresh
      @refreshData="$emit('refreshData')"
      class="fr"
    />
  </div>
</template>

<script>
import Refresh from 'cpt/Sub/Refresh'
export default {
  name: 'AdminHeader',

  components: { Refresh }
};
</script>

<style lang="stylus" scoped>
.btn-wrap {
  margin-bottom: 20px;

  .fr {
    float: right;
  }
}
</style>
