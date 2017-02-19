<template>
  <div class="abilities">
    <ability label="Strength" v-model="strength"></ability>
    <ability label="Dexterity" v-model="dexterity"></ability>
    <ability label="Constitution" v-model="constitution"></ability>
    <ability label="Intelligence" v-model="intelligence"></ability>
    <ability label="Wisdom" v-model="wisdom"></ability>
    <ability label="Charisma" v-model="charisma"></ability>
  </div>
</template>

<script>
  import Ability from './Abilities/Ability'
  export default {
    name: 'abilities',
    data () {
      return {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
      }
    },
    components: {
      Ability
    }
  }
</script>

<style>
</style>
