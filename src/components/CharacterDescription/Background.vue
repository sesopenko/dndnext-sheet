<template>
  <div class="background">
    <label>Background</label>
    <template v-if="other">
      <input v-model="selected">
      <button @click="chooseStandard">Standard</button>
    </template>
    <template v-if="!other">
      <select v-model="selected">
        <option v-for="background in options">{{ background }}</option>
      </select>
      <button @click="chooseOther">Other</button>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'background',
    data () {
      return {
        selected: '',
        other: false
      }
    },
    computed: {
      options: function () {
        return [
          'Acolyte',
          'Criminal',
          'Folk Hero',
          'Noble',
          'Sage',
          'Soldier'
        ]
      }
    },
    methods: {
      chooseOther: function () {
        this.other = true
      },
      chooseStandard: function () {
        if (this.options.indexOf(this.selected) === -1) {
          this.selected = ''
        }
        this.other = false
      }
    }
  }
</script>

<style>
</style>
