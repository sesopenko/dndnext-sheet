<template>
  <div class="combat-tracker">
    <div class="page-header">
      <h1><a href="#/">D&D Next Sheet</a></h1>

    </div>
    <h2>Combat Tracker</h2>
    <div class="participants panel panel-default">
      <div class="panel-heading">
        Participants
      </div>
      <div class="panel-body">
        <div>
          Current Round: {{ round }}
        </div>
        <div>
          Time Passed: {{ timePassed }}
        </div>
        <div class="actions">
          <div class="input">
            <span>Turn:</span>
            <div class="btn-group">
              <button class="btn btn-default"
                      aria-label="Reverse turn backward"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Reverse turn backward"
                      @click="previousTurn"><span class="glyphicon glyphicon-backward"></span></button>
              <button class="btn btn-default"
                      aria-label="Advance turn forward"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Advance turn forward"
                      @click="nextTurn"><span class="glyphicon glyphicon-forward"></span></button>
            </div>
            <div class="btn-group">
              <button class="btn btn-default"
                      aria-label="Add participant to combat"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add participant to combat"
                      @click="addParticipant"><span class="glyphicon glyphicon-plus"></span></button>
              <button class="btn btn-default"
                      aria-label="Sort participants by initiative"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Sort participants by initiative"
                      @click="sortParticipants">
                <span class="glyphicon glyphicon-sort"></span>
              </button>
            </div>
            <div class="btn-group">

              <button class="btn btn-default"
                      @click="saveParticipants"
                      aria-label="Save Combat"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Save Combat">
                <span class="glyphicon glyphicon-floppy-save"></span>
              </button>
              <button class="btn btn-default"
                      @click="loadParticipants"
                      aria-label="Load Combat"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Load Combat">
                <span class="glyphicon glyphicon-floppy-open"></span>
              </button>
              <button class="btn btn-danger"
                      aria-label="Delete all participants"
                      @click="clearParticipants"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete all participants">
                <span class="glyphicon glyphicon-trash"></span>
              </button>
            </div>

          </div>

        </div>
      </div>
      <table class="participants-list table">
        <thead>
        <tr>
          <th class="col-md-1">
            Initiative
          </th>
          <th class="col-md-3">
            Participant
          </th>
          <th class="col-md-6">
            HP
          </th>
          <th class="col-md-2">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <participant v-for="(participant, index) in participants"
                     :initiative="participant.initiative"
                     :name="participant.name"
                     :hp="participant.hp"
                     :has-turn="participant.hasTurn"
                     @initiative="participant.initiative = $event"
                     @name="participant.name = $event"
                     @hp="participant.hp = $event"
                     @delete="deleteParticipant(index)"></participant>
        <tr v-if="participants.length === 0">
          <td colspan="4">
            <em>Press the <span class="glyphicon glyphicon-plus"></span> symbol above to add your first combat participant.</em>
          </td>
        </tr>
        </tbody>

      </table>

    </div>
    <div>
      <a href="#/license">Licensed under GNU GPL V3.0</a>
    </div>
  </div>
</template>

<script>
  import Participant from './CombatTracker/Participant'

  export default {
    name: 'combat-tracker',
    localStorage: {
      participants: {
        type: Object,
        default: []
      },
      currentTurn: {
        type: Number,
        default: 0
      },
      round: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        participants: [],
        currentTurn: 0,
        round: 1
      }
    },
    computed: {
      timePassed: function () {
        var seconds = this.round * 6
        var minutes = (Math.floor(seconds / 60)).toString()
        var secondsRemaining = '00' + (seconds % 60).toString()
        secondsRemaining = secondsRemaining.substr(secondsRemaining.length - 2)
        return minutes + ':' + secondsRemaining
      }
    },
    methods: {
      addParticipant: function () {
        this.participants.push({
          initiative: '',
          name: 'new participant',
          hp: '',
          hasTurn: false
        })
        this.refreshCurrentParticipantTurn()
      },
      sortParticipants: function () {
        this.participants.sort(function (a, b) {
          if (!isNaN(parseInt(a.initiative)) && isNaN(parseInt(b.initiative))) {
            return -1
          } else if (isNaN(parseInt(a.initiative)) && !isNaN(parseInt(b.initiative))) {
            return 1
          } else if (a.initiative > b.initiative) {
            return -1
          } else if (a.initiative < b.initiative) {
            return 1
          } else {
            return 0
          }
        })
        this.refreshCurrentParticipantTurn()
      },
      nextTurn: function () {
        this.currentTurn = (this.currentTurn + 1) % this.participants.length
        if (this.currentTurn === 0) {
          this.round++
        }
        this.refreshCurrentParticipantTurn()
      },
      previousTurn: function () {
        if (this.currentTurn === 0) {
          this.currentTurn = this.participants.length - 1
        } else {
          this.currentTurn = (this.currentTurn - 1) % this.participants.length
        }
        if (this.currentTurn + 1 === this.participants.length) {
          this.round--
        }
        this.refreshCurrentParticipantTurn()
      },
      refreshCurrentParticipantTurn: function () {
        console.log('currentTurn', this.currentTurn)
        for (let i = 0; i < this.participants.length; i++) {
          if (i === this.currentTurn) {
            this.participants[i].hasTurn = true
          } else {
            this.participants[i].hasTurn = false
          }
        }
      },
      deleteParticipant: function (participantIndex) {
        console.log('index:', participantIndex)
        this.participants.splice(participantIndex, 1)
      },
      clearParticipants: function () {
        let numParticipants = this.participants.length
        this.participants.splice(0, numParticipants)
      },
      saveParticipants: function () {
        this.$localStorage.set('participants', this.participants)
        this.$localStorage.set('currentTurn', this.currentTurn)
        this.$localStorage.set('round', this.round)
      },
      loadParticipants: function () {
        this.participants = this.$localStorage.get('participants')
        this.currentTurn = this.$localStorage.get('currentTurn')
        this.round = this.$localStorage.get('round')
      }
    },
    components: {
      Participant
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
  .participants-list {
  }
</style>
