<template>
  <div class="monsters">
    <div class="page-header">
      <h1><a href="#/">D&D Next Sheet</a></h1>

    </div>
    <h2>Monsters</h2>
    <div class="search">
      <label class="label label-default" for="monster-search">Filter Monsters:</label>
      <input id="monster-search"
             v-model="search"
             name="search" class="form-control">
    </div>
    <div role="list" aria-label="Search Results">
      <div>
        Number found: {{ searchResults.length}}
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="monsterName in searchResults.slice(0, 3)">
          <a class="monster-picker"
             tabindex="0"
             v-on:click="pickMonster(monsterName)"
          >
            {{ monsterName }}
          </a>
        </li>
      </ul>
    </div>
    <monster
      v-if="viewMonster != null"
      :name="viewMonster.name"
      :size="viewMonster.size"
      :type="viewMonster.type"
      :alignment="viewMonster.alignment"
      :armorClass="viewMonster.armor_class"
      :hitPoints="viewMonster.hit_points"
      :hitDice="viewMonster.hit_dice"
      :speed="viewMonster.speed"
      :saves="viewMonster.saves"
      :skills="viewMonster.skills"
      :senses="viewMonster.senses"
      :languages="viewMonster.languages"
      :challengeRating="viewMonster.challenge_rating"
    >

    </monster>

    <footer>
      <p>
        <a href="http://www.opengamingfoundation.org/ogl.html" arget="_blank">Open Game License v1.0a Copyright 2000, Wizards of the Coast, Inc</a>
      </p>
      <p>
        Other content <a href="#/license">Licensed under GNU GPL V3.0</a>
      </p>
    </footer>
  </div>
</template>

<script>
  import Monster from 'src/components/Monsters/Monster'
  export default {
    name: 'monsters',
    data () {
      return {
        search: '',
        viewMonster: null,
        monsters: [],
        monsterNames: []
      }
    },
    components: {
      Monster
    },
    created: function () {
      this.$http.get('/static/data/5e-SRD-Monsters.json').then(response => {
        if (response.status === 200) {
          this.monsters = response.body.filter(function (monster) {
            if (monster.hasOwnProperty('license')) {
              return false
            } else {
              return true
            }
          })
          let skillChoices = [
            'athletics',
            'acrobatics',
            'stealth',
            'arcana',
            'history',
            'investigation',
            'nature',
            'religion',
            'insight',
            'medicine',
            'perception',
            'survival',
            'deception',
            'intimidation',
            'performance',
            'persuasion'
          ]
          let saveChoices = {
            'strength_save': 'Str',
            'dexterity_save': 'Dex',
            'constitution_save': 'Con',
            'intelligence_save': 'Int',
            'wisdom_save': 'Wis',
            'charisma_save': 'Cha'
          }
          this.monsters.map(function (monster) {
            let newMonster = monster
            monster.skills = {}
            for (let i = 0; i < skillChoices.length; i++) {
              if (monster.hasOwnProperty(skillChoices[i])) {
                let skill = monster[skillChoices[i]]
                newMonster.skills[skillChoices[i]] = skill >= 0 ? '+' + skill.toString() : skill.toString()
              }
            }
            monster.saves = {}
            for (let saveProperty in saveChoices) {
              if (saveChoices.hasOwnProperty(saveProperty)) {
                let saveName = saveChoices[saveProperty]
                if (monster.hasOwnProperty(saveProperty)) {
                  let save = monster[saveProperty]
                  newMonster.saves[saveName] = save >= 0 ? '+' + save.toString() : save.toString()
                }
              }
            }
            return newMonster
          })
          this.monsterNames = this.monsters.map(function (monster) {
            return monster.name.trim()
          })
        }
      }, response => {
        // error callback
      })
    },
    methods: {
      pickMonster: function (chosenMonsterName) {
        let needle = chosenMonsterName.toLowerCase().trim()
        let filtered = this.monsters.filter(function (monster) {
          let monsterName = monster.name.toLowerCase().trim()
          return (monsterName === needle)
        })
        let viewMonster = filtered.shift()
        this.viewMonster = viewMonster
      }
    },
    computed: {
      searchResults: function () {
        let searchString = this.search.toLowerCase().trim()
        if (searchString.trim() === '') {
          return []
        }
        return this.monsterNames.filter(function (monsterName) {
          return monsterName.toLowerCase().includes(searchString)
        })
      }
    }
  }
</script>

<style scoped>

</style>
