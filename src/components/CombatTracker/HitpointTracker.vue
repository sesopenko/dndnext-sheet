<template>
  <div class="hp-tracker" :class="{'has-error': errors.has('hp-value')}">
    <template v-if="locked">
      <div class="input-group">
        <span class="input-group-addon" aria-label="Participant hitpoints" aria-live="polite">{{ hp }}</span>
        <input class="form-control"
               ref="modifyHp"
               aria-label="Modification to participant's hitpoints.  Press enter to subtract the modification or tab to reach modification actions"
               data-toggle="tooltip"
               data-placement="top"
               title="Modification to participant's hitpoints"
               placeholder="Modify HP"
               @keyup.enter="subtractHp"
               type="number">
        <div class="input-group-btn" role="group">
          <button class="btn btn-default"
                  name="subtract"
                  aria-label="Subtract modifier from hitpoints"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Subtract modifier from hitpoints"
                  @click="subtractHp"><span class="glyphicon glyphicon-minus"></span></button>
          <button class="btn btn-default"
                  name="add"
                  aria-label="Add modifier to hitpoints"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add modifier to hitpoints"
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
  </div>
</template>

<script>
  export default {
    name: 'hitpointtracker',
    props: {
      hp: {
        type: Number,
        default: 0
      },
      locked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
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
      createTooltips: function () {
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
    },
    watch: {
      'locked': function (val, oldVal) {
        if (val === true) {
          this.createTooltips()
        }
      }
    },
    created: function () {
      this.createTooltips()
    }
  }
</script>

<style>
</style>
