<template>
  <character-description></character-description>
</template>

<script>
  import CharacterDescription from './CharacterDescription'

  export default {
    name: 'sheet',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      CharacterDescription
    }
  }
</script>

<style scoped>

</style>
