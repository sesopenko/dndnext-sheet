<template>
  <div class="character-description">
    <div class="character-name">
      <label>Character Name</label>
      <input v-model="characterName">
    </div>
    <div class="details">
      <div class="class-and-level">
        <class></class>
        <level></level>
      </div>
      <background></background>
      <div class="player-name">
        <label>Player Name</label>
        <input v-model="playerName">
      </div>
      <race></race>
      <alignment></alignment>
      <div class="experience-points">
        <label>Experience Points</label>
        <input v-model="experiencePoints">
      </div>

    </div>
  </div>
</template>

<script>
  import Race from './CharacterDescription/Race'
  import Alignment from './CharacterDescription/Alignment'
  import Class from './CharacterDescription/Class'
  import Level from './CharacterDescription/Level'
  import Background from './CharacterDescription/Background'

  export default {
    name: 'character-description',
    data () {
      return {
        characterName: '',
        characterClass: '',
        level: 1,
        background: '',
        playerName: '',
        race: '',
        experiencePoints: 0
      }
    },
    components: {
      Race,
      Alignment,
      Class,
      Level,
      Background
    }
  }
</script>

<style>
</style>
