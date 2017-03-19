<template>
  <div class="monster" >
    <h3>{{ name }}</h3>
    <div class="monster-type">
      <em>{{ size }} {{ type}}, {{ alignment }}</em>
    </div>
    <ul class="base-stats list-group">
      <property :property="'Armor Class'" :value="armorClass"/>
      <li class="list-group-item">
        <strong>Hit Points</strong> {{ hitPoints }} ({{ hitDice }})
      </li>
      <property :property="'Speed'" :value="speed"/>
    </ul>

    <ul class="list-group">
      <li class="list-group-item">
        <strong>Saving Throws</strong>
        <span class="saving-throw" v-for="(savingThrowValue, savingThrowName) in saves">{{ savingThrowName }} {{ savingThrowValue }}</span>
      </li>
      <li class="list-group-item">
        <strong>Skills</strong>
        <span class="skill" v-for="(skillValue, skillName) in skills">{{ skillName }} {{ skillValue }}</span>
      </li>
      <property :property="'Senses'" :value="senses"/>
      <property :property="'Languages'" :value="languages"/>
      <property :property="'Challenge'" :value="challengeRating"/>
    </ul>
  </div>
</template>

<script>
  import Stat from 'src/components/Monsters/Stat'
  import Property from 'src/components/Monsters/Property'
  export default {
    name: 'monster',
    data () {
      return {}
    },
    components: {
      Property,
      Stat
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'Medium'
      },
      type: {
        type: String,
        default: ''
      },
      subtype: {
        type: String,
        default: ''
      },
      alignment: {
        type: String,
        default: ''
      },
      stats: {
        type: Object,
        default: function () {
          return {
            'Str': 10,
            'Dex': 10,
            'Con': 10,
            'Int': 10,
            'Wis': 10,
            'Cha': 10
          }
        }
      },
      armorClass: {
        type: Number,
        default: 10
      },
      hitPoints: {
        type: Number,
        default: 8
      },
      hitDice: {
        type: String,
        default: '1d8'
      },
      speed: {
        type: String,
        default: ''
      },
      skills: {
        type: Object,
        default: function () {
          return {}
        }
      },
      saves: {
        type: Object,
        default: function () {
          return {}
        }
      },
      senses: {
        type: String,
        default: ''
      },
      language: {
        type: String,
        default: ''
      },
      challengeRating: {
        type: String,
        default: '1'
      },
      languages: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  a.monster-picker:hover {
    cursor: pointer;
  }
  .skill:not(:last-child):after {
    content: ", ";
  }
  .saving-throw:not(:last-child):after {
    content: ", ";
  }
</style>
