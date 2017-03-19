<template>
  <ul class="list-group-item">
    <strong>{{ property }}</strong> {{ value }}
  </ul>
</template>

<script>
  export default {
    name: 'property',
    data () {
      return {}
    },
    props: {
      property: {
        type: String,
        default: ''
      },
      value: {
        default: ''
      }
    }
  }
</script>

<style>
</style>
