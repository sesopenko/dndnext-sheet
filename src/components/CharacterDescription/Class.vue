<template>
  <div class="class">
    <label>Class</label>
    <select v-model="selected">
      <option v-for="classChoice in options">{{ classChoice }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'class',
    data () {
      return {
        options: [
          'Barbarian',
          'Bard',
          'Cleric',
          'Druid',
          'Fighter',
          'Monk',
          'Paladin',
          'Ranger',
          'Rogue',
          'Sorcerer',
          'Warlock',
          'Wizard'
        ],
        selected: ''
      }
    }
  }
</script>

<style>
</style>
