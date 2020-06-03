<template>
  <div class="c-container">
    <main class="main clearfix">
      <template v-if="PAY_INFO && PAY_INFO.i_id">
        <!-- 基本信息 -->
        <BaseInfo
          :isQrShow.sync="isQrShow"
          :data="PAY_INFO"
        />

        <!-- 在线支付 -->
        <QrcodeInfo
          :isQrShow.sync="isQrShow"
          v-if="!PAY_INFO.status"
        />
      </template>

      <!-- 信息未完善提示 -->
      <NoNext to="person_info" text="信息未填写完整，前去补充~" v-else />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseInfo from 'cpt/Student/Fee/BaseInfo'
import QrcodeInfo from 'cpt/Student/Fee/QrcodeInfo'
import NoNext from 'cpt/Sub/NoNext'

export default {
  name: 'Fee',
  components: {
    BaseInfo,
    QrcodeInfo,
    NoNext
  },

  data () {
    return {
      isQrShow: false
    }
  },

  deactivated () {
    this.isQrShow = false;
  },

  computed: {
    ...mapGetters(['PAY_INFO'])
  }
}
</script>


<style lang="stylus" scoped>
.c-container {
  .main {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    >>> .card {
      padding: 10px 30px;
      transition: all 1.5s;

      .title {
        font-size: 20px;
      }
    }
  }
}
</style>
