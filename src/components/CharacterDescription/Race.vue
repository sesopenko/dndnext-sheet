<template>
  <div class="race">
    <label>Race</label>
    <select v-model="selected">
      <option v-for="race in options">{{ race.text }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'race',
    data () {
      return {
        options: [
          {
            text: 'Dwarf'
          },
          {
            text: 'Elf'
          },
          {
            text: 'Halfling'
          },
          {
            text: 'Human'
          },
          {
            text: 'Dragonborn'
          },
          {
            text: 'Gnome'
          },
          {
            text: 'Half-Elf'
          },
          {
            text: 'Half-Orc'
          },
          {
            text: 'Tiefling'
          }
        ],
        selected: 'Dwarf'
      }
    }
  }
</script>

<style>
</style>
