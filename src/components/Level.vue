<template>
  <div class="level">
    <label>Level</label>
    <select v-model="selected">
      <option v-for="level in levelOptions">{{ level }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'level',
    data () {
      return {
        selected: 1
      }
    },
    computed: {
      levelOptions: function () {
        let options = []
        for (let i = 1; i <= 20; i++) {
          options.push(i)
        }
        return options
      }
    }
  }
</script>

<style>
</style>
