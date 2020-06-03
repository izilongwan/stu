<template>
  <div class="slot">
    <slot name="first" :obj="obj"></slot>

    <slot name="second" :obj="obj"></slot>

    <slot name="third"></slot>
  </div>
</template>

<script>
export default {
  name: 'MyFirstSlot',

  data () {
    return {
      obj: {
        a: 'a',
        b: 'b',
        c: 'c'
      }
    }
  }
}
</script>


