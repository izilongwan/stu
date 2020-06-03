<template>
  <div class="c-container">
    <MyFirstSlot>
      <template #second="{obj}">
        <p>我是second</p>
        {{obj}}{{arr}}
      </template>

      <template #first>
        <p>我是first</p>
      </template>

      <template #third>
        <p>我是third</p>
      </template>
    </MyFirstSlot>
  </div>
</template>

<script>
import MyFirstSlot from 'cpt/Sub/MyFirstSlot'

export default {
  name: 'News',
  components: {
    MyFirstSlot
  },

  data () {
    return {
      arr: [1, 2, 3]
    }
  }
}
</script>
