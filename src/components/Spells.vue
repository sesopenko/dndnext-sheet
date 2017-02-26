<template>
  <div class="spells">
    <div class="page-header">
      <h1><a href="#/">D&D Next Sheet</a></h1>

    </div>
    <h2>Spells</h2>
    <div class="search">
      <label class="label label-default" for="spell-search">Filter spells:</label>
      <input id="spell-search"
             v-model="search"
             name="search" class="form-control">
    </div>
    <div role="list" aria-label="Spell Results">
      <spell v-for="spell in filteredSpells"
             :name="spell.name"
             :level="spell.level"
             :school="spell.school"
             :castingTime="spell.casting_time"
             :range="spell.range"
             :components="spell.components"
             :description="spell.description"
             :duration="spell.duration"
             :ritual="spell.ritual"
      ></spell>
    </div>
    <footer>
      <p>
        <a href="http://www.opengamingfoundation.org/ogl.html" arget="_blank">Open Game License v1.0a Copyright 2000, Wizards of the Coast, Inc</a>
      </p>
      <p>
        <a href="https://github.com/vorpalhex/srd_spells" target="_blank">The spell list, in JSON format</a>, was compiled from the SRD by Vorpalhex. The spells are content from the SRD and is restricted and covered by the OGL.  When using said content, please make sure to conform appropriately with the proper licenses.
      </p>
      <p>
        Other content <a href="#/license">Licensed under GNU GPL V3.0</a>
      </p>
    </footer>
  </div>
</template>

<script>
  import Spell from 'src/components/Spells/Spell'
  export default {
    name: 'spells',
    data () {
      return {
        search: '',
        available: []
      }
    },
    created: function () {
      // populate available
      this.$http.get('/static/data/spells.json').then(response => {
        console.log('status:', response.status)
        console.log(typeof response.status)
        if (response.status === 200) {
          console.log('got spells:', response.body)

          this.available = response.body
        }
      }, response => {
        // error callback
      })
    },
    components: {
      Spell
    },
    computed: {
      filteredSpells: function () {
        let searchString = this.search.toLowerCase()
        let filtered = this.available.filter(function (spell) {
          return spell.name.toLowerCase().includes(searchString)
        })
        console.log('filtered:', filtered)
        return filtered
      }
    }
  }
</script>

<style>
  .spells .search {
    margin-bottom: 18px;
  }
</style>
