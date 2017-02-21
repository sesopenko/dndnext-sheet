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
               min="1"
               v-validate="'numeric|required'">
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
    <td class="col-md-6">
      <hitpoint-tracker
        :hp="hp"
        :locked="locked"
        @hp="updateHp"></hitpoint-tracker>
    </td>
    <td class="col-md-2">
      <div class="btn-group">
        <button type="button"
                class="btn btn-default"
                :aria-label="lockLabel"
                :class="{ active: locked }"
                autocomplete="off"
                @click="toggleLock"
                data-toggle="tooltip"
                data-placement="top"
                :title="lockLabel">
          <span class="glyphicon glyphicon-lock"></span>
        </button>
        <button class="btn btn-danger"
                aria-label="Delete participant.  Must press twice to perform."
                data-toggle="tooltip"
                data-placement="top"
                title="Delete participant.  Must press twice to perform."
                @click="triggerDelete">
          <span class="glyphicon glyphicon-trash">
          </span>
          <template v-if="deleting">Press Again</template>
        </button>
      </div>

    </td>
  </tr>
</template>

<script>
  import HitpointTracker from 'src/components/CombatTracker/HitpointTracker'
  export default {
    name: 'participant',
    props: {
      initiative: {
        type: [Number, String],
        required: false
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
        console.log('new initiative:', initiative)
        console.log(initiative)
        this.$refs.initiative.value = initiative
        this.$emit('initiative', initiative)
      },
      updateName: function (name) {
        this.$refs.name.value = name
        this.$emit('name', String(name))
      },
      updateHp: function (hp) {
        if (!isNaN(Number(hp))) {
          this.$emit('hp', Number(hp))
        }
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
    },
    components: {
      HitpointTracker
    },
    created: function () {
      this.$nextTick(function () {
        let $el = window.$('[data-toggle="tooltip"]', this.$el)
        $el.tooltip({
          container: 'body',
          trigger: 'hover',
          delay: {
            'show': 500,
            'hide': 100
          }
        })
      })
    }
  }
</script>

<style>
  input::-ms-clear {
    display: none;
  }
</style>
