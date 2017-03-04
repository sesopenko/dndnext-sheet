<template>
  <form class="participant-creator form-inline" v-on:submit.prevent="addParticipant">
    <div
      class="form-group"
      :class="{'has-error': errors.has('name')}">
      <label for="add-name">
        Name:
      </label>
      <input
        id="add-name"
        class="form-control"
        name="name"
        ref="name"
        type="text"
        v-model:value="name"
        v-validate="'required'"
      >
    </div>
    <div
      class="form-group"
      :class="{'has-error': errors.has('initiative')}">
      <label for="add-initiative">
        Initiative:
      </label>
      <input
        id="add-initiative"
        class="form-control"

        name="initiative"
        ref="initiative"
        type="text"
        v-model:value="initiative"
        v-validate="'numeric|required'"
      >
    </div>
    <div
      class="form-group"
      :class="{'has-error': errors.has('hp')}">
      <label for="add-hp">
        HP:
      </label>
      <input
        id="add-hp"
        class="form-control"

        name="hp"
        ref="hp"
        type="text"
        v-model:value="hp"
        v-validate="'numeric|required'"
      >
      <input
        type="submit"
        class="btn btn-default"
        aria-label="Add Participant"
        value="Add Participant">
      </input>

    </div>

  </form>
</template>

<script>
  export default {
    name: 'participant-creator',
    data () {
      return {
        name: '',
        initiative: '',
        hp: ''
      }
    },
    methods: {
      addParticipant: function () {
        if (!this.errors.any()) {
          let participant = {
            name: this.name,
            initiative: this.initiative,
            hp: this.hp
          }
          this.name = ''
          this.initiative = ''
          this.hp = ''
          this.$emit('add', participant)
          this.$refs.name.focus()
        }
      }
    }
  }
</script>

<style>

</style>
