<template>
  <div class="combat-tracker">
    <h2>Combat Tracker</h2>
    <div class="data">
      <table>
        <tr>
          <th>Current Round</th>
        </tr>
        <tr>
          <td>{{ round }}</td>
        </tr>
      </table>
    </div>
    <div class="participants">
      <table>
        <tr>
          <th>
            Initiative
          </th>
          <th>
            Participant
          </th>
          <th>
            HP
          </th>
          <th>
            Actions
          </th>
        </tr>
        <participant v-for="participant in participants"
                     :initiative="participant.initiative"
                     :name="participant.name"
                     :hp="participant.hp"
                     :has-turn="participant.hasTurn"
                     @initiative="participant.initiative = $event"
                     @name="participant.name = $event"
                     @hp="participant.hp = $event"></participant>
      </table>
    </div>
    <div class="actions">
      <button @click="nextTurn">+ Turn</button>
      <button @click="previousTurn">- Turn</button>
      <button @click="addParticipant">Add Participant</button>
      <button @click="sortParticipants">Sort Participants</button>
    </div>
  </div>
</template>

<script>
  import Participant from './CombatTracker/Participant'

  export default {
    name: 'combat-tracker',
    data () {
      return {
        participants: [],
        currentTurn: 0,
        round: 1
      }
    },
    methods: {
      addParticipant: function () {
        this.participants.push({
          initiative: 10,
          name: 'new participant',
          hp: 5,
          hasTurn: false
        })
        this.refreshCurrentParticipantTurn()
      },
      sortParticipants: function () {
        this.participants.sort(function (a, b) {
          if (a.initiative < b.initiative) {
            return -1
          } else if (a.initiative > b.initiative) {
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
      }
    },
    components: {
      Participant
    }
  }
</script>

<style>
</style>
