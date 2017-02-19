<template>
  <div class="sheet">
    <character-description></character-description>
    <abilities></abilities>
  </div>

</template>

<script>
  import CharacterDescription from './CharacterDescription'
  import Abilities from './Abilities'

  export default {
    name: 'sheet',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      CharacterDescription,
      Abilities
    }
  }
</script>

<style scoped>

</style>
