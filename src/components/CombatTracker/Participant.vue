<template>
  <tr class="participant" :class="{ active: hasTurn }">
    <td class="col-md-1" :class="{'has-error': errors.has('initiative')}">
      {{ isNaN(parseInt(initiative)) ? 'invalid' : initiative }}
    </td>
    <td class="col-md-3">
      {{ name }}
    </td>
    <td class="col-md-6">
      <hitpoint-tracker
        :hp="hp"
        @hp="updateHp"></hitpoint-tracker>
    </td>
    <td class="col-md-2">
      <div class="btn-group">
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
        type: [Number, String],
        required: false
      },
      hasTurn: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        deleting: false
      }
    },
    methods: {
      updateInitiative: function (initiative) {
        this.$refs.initiative.value = initiative
        this.$emit('initiative', initiative)
      },
      updateName: function (name) {
        this.$refs.name.value = name
        this.$emit('name', String(name))
      },
      updateHp: function (hp) {
        this.$emit('hp', hp)
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
