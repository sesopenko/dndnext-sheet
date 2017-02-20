<template>
  <tr class="participant" :class="{ active: hasTurn }">
    <td class="col-md-1" :class="{'has-error': errors.has('initiative')}">
      <template v-if="locked">
        {{ initiative }}
      </template>
      <template v-else>
        <input class="form-control"
               ref="initiative"
               name="initiative"
               :value="initiative"
               aria-label="initiative"
               @input="updateInitiative($event.target.value)"
               type="number"
               min="1"
               v-validate="'required|numeric'">
      </template>

    </td>
    <td class="col-md-3">
      <template v-if="locked">
        {{ name }}
      </template>
      <template v-else>
        <input class="form-control" ref="name"
               :value="name"
               aria-label="participant name"
               @input="updateName($event.target.value)">
      </template>
    </td>
    <td class="col-md-6"
        :class="{'has-error': errors.has('hp-value')}">
      <template v-if="locked">
        <div class="input-group">
          <span class="input-group-addon" aria-label="Participant hitpoints" aria-live="polite">{{ hp }}</span>
          <input class="form-control"
                 ref="modifyHp"
                 aria-label="Modification to participant's hitpoints.  Press enter to subtract the modification or tab to reach modification actions"
                 placeholder="Modify HP"
                 @keyup.enter="subtractHp"
                 type="number">
          <div class="input-group-btn" role="group">
            <button class="btn btn-default"
                    aria-label="subtract modifier from hit points"
                    @click="subtractHp"><span class="glyphicon glyphicon-minus"></span></button>
            <button class="btn btn-default"
                    aria-label="add modifier to hit points"
                    @click="addHp"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
        </div>
      </template>
      <template v-else>
        <input class="form-control"
               type="number"
               aria-label="participant hitpoints"
               name="hp-value"
               ref="hp"
               :value="hp"
               v-validate="'numeric'"
               @input="updateHp($event.target.value)">
      </template>

    </td>
    <td class="col-md-2">
      <div class="btn-group">
        <button type="button"
                class="btn btn-default"
                :aria-label="lockLabel"
                :class="{ active: locked }"
                autocomplete="off"
                @click="toggleLock">
          <span class="glyphicon glyphicon-lock"></span>
        </button>
        <button class="btn btn-default" aria-label="Delete participant.  Must press twice to perform." @click="triggerDelete">
          <span class="glyphicon glyphicon-trash">
          </span>
          <template v-if="deleting">Press Again</template>
        </button>
      </div>

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
        locked: false,
        deleting: false
      }
    },
    computed: {
      lockLabel: function () {
        if (this.locked) {
          return 'Unlock the participant.  Participant is currently locked.'
        } else {
          return 'Lock the participant.  Participant is currently unlocked.'
        }
      }
    },
    methods: {
      updateInitiative: function (initiative) {
        this.$refs.initiative.value = initiative
        if (!isNaN(parseInt(initiative))) {
          this.$emit('initiative', Number(initiative))
        }
      },
      updateName: function (name) {
        this.$refs.name.value = name
        this.$emit('name', String(name))
      },
      updateHp: function (hp) {
        this.$refs.hp.value = hp
        if (!isNaN(Number(hp))) {
          this.$emit('hp', Number(hp))
        }
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
      toggleLock: function () {
        this.locked = !this.locked
      },
      triggerDelete: function () {
        if (this.deleting) {
          this.deleting = false
          this.$emit('delete')
        } else {
          this.deleting = true
          let self = this
          setTimeout(function () {
            self.deleting = false
          }, 2000)
        }
      }
    }
  }
</script>

<style>
  input::-ms-clear {
    display: none;
  }
</style>
