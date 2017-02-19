<template>
  <div class="ability">
    <label v-if="label">{{ label }}</label>
    <select ref="input"
            :value="value"
            @input="updateValue($event.target.value)">
      <option v-for="score in options">{{ score }}</option>

    </select>
    <span class="modifier">
      {{ modifier }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'ability',
    props: {
      value: {
        type: Number,
        default: 10
      },
      label: {
        type: String,
        default: ''
      }
    },
    computed: {
      modifier: function () {
        let modifier = Math.floor(this.value / 2) - 5
        let sign = ''
        if (modifier >= 0) {
          sign = '+'
        }
        return sign + modifier.toString()
      },
      options: function () {
        let options = []
        for (let i = 3; i <= 30; i++) {
          options.push(i)
        }
        return options
      }
    },
    methods: {
      updateValue: function (value) {
        this.$refs.input.value = parseInt(value)
        this.$emit('input', parseInt(value))
      }

    }
  }
</script>

<style>
</style>
