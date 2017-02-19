<template>
  <tr class="participant" :class="{ active: hasTurn }">
    <td>
      <template v-if="locked">
        {{ initiative }}
      </template>
      <template v-else>
        <input ref="initiative"
               :value="initiative"
               @input="updateInitiative($event.target.value)">
      </template>

    </td>
    <td>
      <template v-if="locked">
        {{ name }}
      </template>
      <template v-else>
        <input ref="name"
               :value="name"
               @input="updateName($event.target.value)">
      </template>
    </td>
    <td>
      <template v-if="locked">
        {{ hp }}
        <input ref="modifyHp" placeholder="Modify HP">
        <button @click="addHp">+</button>
        <button @click="subtractHp">-</button>
      </template>
      <template v-else>
        <input ref="hp" :value="hp" @input="updateHp($event.target.value)">
      </template>

    </td>
    <td>
      <template v-if="locked">
        <button @click="unlock">Unlock</button>
      </template>
      <template v-else>
        <button @click="lock">Lock</button>
      </template>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'participant',
    props: {
      initiative: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      hp: {
        type: Number,
        required: true
      },
      hasTurn: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        locked: false
      }
    },
    methods: {
      updateInitiative: function (initiative) {
        console.log('initiative:', initiative)
        this.$refs.initiative.value = initiative
        this.$emit('initiative', Number(initiative))
      },
      updateName: function (name) {
        this.$refs.name.value = name
        this.$emit('name', String(name))
      },
      updateHp: function (hp) {
        console.log('this.$refs.hp:', this.$refs.hp)
        // this.$refs.hp.value = hp
        this.$emit('hp', Number(hp))
      },
      addHp: function () {
        let addition = Number(this.$refs.modifyHp.value)
        if (isNaN(addition)) {
          return
        }
        let newHp = Number(this.hp) + addition
        this.$refs.modifyHp.value = ''
        this.$emit('hp', newHp)
      },
      subtractHp: function () {
        let subtraction = Number(this.$refs.modifyHp.value)
        if (isNaN(subtraction)) {
          return
        }
        let newHp = Number(this.hp) - subtraction
        this.$refs.modifyHp.value = ''
        this.$emit('hp', newHp)
      },
      lock: function () {
        this.locked = true
      },
      unlock: function () {
        this.locked = false
      }
    }
  }
</script>

<style>
  tr.participant.active td{
    border: 1px solid black;
  }
</style>
