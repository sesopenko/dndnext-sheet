<template>
  <div class="col-md-2">
    <div><strong>{{ stat }}</strong></div>
    <div>{{ value }} ({{ modifier }})</div>
  </div>
</template>

<script>
  export default {
    name: 'stat',
    data () {
      return {}
    },
    props: {
      stat: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    },
    computed: {
      modifier: function () {
        let modifier = Math.floor((this.value - 10) / 2)
        if (modifier >= 0) {
          return '+' + modifier.toString()
        } else {
          return modifier.toString()
        }
      }
    }
  }
</script>

<style>
</style>
