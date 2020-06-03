<template>
  <div class="c-container">
    <Refresh @refreshData="$emit('refreshData')" />

    <TableForm
      :isLoadingShow.sync="isLoadingShow"
      :tableData="dormitories"
    />

    <Loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import TableForm from 'cpt/Manager/TableForm/FormDormitory'
import Refresh from 'cpt/Sub/Refresh'
import Loading from 'cpt/Sub/Loading'
import { mapState } from 'vuex'

export default {
  name: 'FormDomitory',

  components: {
    TableForm,
    Refresh,
    Loading
  },

  data () {
    return {
      isLoadingShow: true
    }
  },

  computed: {
    ...mapState(['dormitories'])
  }
};
</script>
