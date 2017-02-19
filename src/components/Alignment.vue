<template>
  <div class="alignment">
    <label>Alignment</label>
    <select v-model="selected">
      <option v-for="alignment in options">{{ alignment.text }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'alignment',
    data () {
      return {
        selected: '',
        options: [
          {
            text: 'Lawful Good'
          },
          {
            text: 'Neutral Good'
          },
          {
            text: 'Chaotic Good'
          },
          {
            text: 'Lawful Neutral'
          },
          {
            text: 'Neutral'
          },
          {
            text: 'Chaotic Neutral'
          },
          {
            text: 'Lawful Evil'
          },
          {
            text: 'Neutral Evil'
          },
          {
            text: 'Chaotic Evil'
          }
        ]
      }
    },
    computed: {

    }
  }
</script>

<style>
</style>
