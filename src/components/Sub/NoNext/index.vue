<template>
  <div class="no-next">
    <div class="img-wrap">
      <img src="~images/tip.webp" alt="图片" />
    </div>

    <router-link :to="to" class="lk">{{ text }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'NoNext',
  props: {
    to: String,
    text: String
  }
}
</script>

<style lang="stylus" scoped>
.no-next {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .img-wrap {
    width: 300px;
    margin: 0 auto;
  }

  .lk {
    margin-top: 10px;
    font-size: 18px;
    color: #999;
    text-decoration: underline;

    &:hover {
      color: #666;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23333' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%;
      background-size: 20px auto;
      animation: waveMove 0.5s infinite linear forwards;
      text-decoration: none;
    }
  }
}

@keyframes waveMove {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: -20px;
  }
}
</style>
