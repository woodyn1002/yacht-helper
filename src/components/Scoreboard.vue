<template>
  <div>
    <h2>점수표</h2>
    <b-container>
      <b-row>
        <b-col cols="4">
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <h5 class="text-primary">
            {{ player.name }}
          </h5>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice1></b-icon-dice1>
            에이스
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.aces !== null">
              <span class="score-text">{{ player.aces }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.aces === null"
                        @click="assignScore(index, {aces: scoreInAces})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInAces }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice2></b-icon-dice2>
            듀얼
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.deuces !== null">
              <span class="score-text">{{ player.deuces }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.deuces === null"
                        @click="assignScore(index, {deuces: scoreInDeuces})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInDeuces }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice3></b-icon-dice3>
            트리플
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.threes !== null">
              <span class="score-text">{{ player.threes }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.threes === null"
                        @click="assignScore(index, {threes: scoreInThrees})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInThrees }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice4></b-icon-dice4>
            쿼드
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.fours !== null">
              <span class="score-text">{{ player.fours }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.fours === null"
                        @click="assignScore(index, {fours: scoreInFours})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInFours }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice5></b-icon-dice5>
            펜타
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.fives !== null">
              <span class="score-text">{{ player.fives }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.fives === null"
                        @click="assignScore(index, {fives: scoreInFives})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInFives }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice6></b-icon-dice6>
            헥사
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.sixes !== null">
              <span class="score-text">{{ player.sixes }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.sixes === null"
                        @click="assignScore(index, {sixes: scoreInSixes})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInSixes }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="4">
          <h5 class="mb-0 text-info">
            상단 보너스
            <b-badge variant="info">+35</b-badge>
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p class="score-text mb-0">
            <span v-if="player.getSubtotalScore() >= 63">+35</span>
            <span v-else>+0</span>
            <span class="small text-secondary">
              ({{ player.getSubtotalScore() }}/63)
            </span>
          </p>
        </b-col>
      </b-row>
      <hr class="mt-1 mb-3"/>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-question-circle></b-icon-question-circle>
            초이스
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.choice !== null">
              <span class="score-text">{{ player.choice }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.choice === null"
                        @click="assignScore(index, {choice: scoreInChoice})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInChoice }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice1></b-icon-dice1>
            포커
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.fourOfAKind !== null">
              <span class="score-text">{{ player.fourOfAKind }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.fourOfAKind === null"
                        @click="assignScore(index, {fourOfAKind: scoreInFourOfAKind})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInFourOfAKind }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice6></b-icon-dice6>
            <b-icon-dice6></b-icon-dice6>
            <b-icon-dice6></b-icon-dice6>
            풀 하우스
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.fullHouse !== null">
              <span class="score-text">{{ player.fullHouse }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.fullHouse === null"
                        @click="assignScore(index, {fullHouse: scoreInFullHouse})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInFullHouse }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice2></b-icon-dice2>
            <b-icon-dice3></b-icon-dice3>
            <b-icon-dice4></b-icon-dice4>
            스몰 스트레이트
            <b-badge variant="light">+15</b-badge>
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.smallStraight !== null">
              <span class="score-text">{{ player.smallStraight }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.smallStraight === null"
                        @click="assignScore(index, {smallStraight: scoreInSmallStraight})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInSmallStraight }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice1></b-icon-dice1>
            <b-icon-dice2></b-icon-dice2>
            <b-icon-dice3></b-icon-dice3>
            <b-icon-dice4></b-icon-dice4>
            <b-icon-dice5></b-icon-dice5>
            라지 스트레이트
            <b-badge variant="light">+30</b-badge>
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.largeStraight !== null">
              <span class="score-text">{{ player.largeStraight }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.largeStraight === null"
                        @click="assignScore(index, {largeStraight: scoreInLargeStraight})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInLargeStraight }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <h5>
            <b-icon-dice6></b-icon-dice6>
            <b-icon-dice6></b-icon-dice6>
            <b-icon-dice6></b-icon-dice6>
            <b-icon-dice6></b-icon-dice6>
            <b-icon-dice6></b-icon-dice6>
            요트
            <b-badge variant="light">+50</b-badge>
          </h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p>
            <span v-if="player.yacht !== null">
              <span class="score-text">{{ player.yacht }}</span>
            </span>
            <span v-else>
              <b-button v-if="hasFullDices && player.yacht === null"
                        @click="assignScore(index, {yacht: scoreInYacht})"
                        size="sm" variant="outline-secondary">
                <b-icon-pencil-fill size="sm"></b-icon-pencil-fill> {{ scoreInYacht }}
              </b-button>
              <span v-else class="score-text">-</span>
            </span>
          </p>
        </b-col>
      </b-row>

      <hr/>

      <b-row>
        <b-col cols="4">
          <h5>총점</h5>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index" class="text-center">
          <p class="score-text text-info font-weight-bold">
            <span v-if="player === getWinner">
              <b-icon-award></b-icon-award>
            </span>
            {{ player.getTotalScore() }}
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: "Scoreboard",
  data() {
    return {
      fields: [
        'aces', 'dueces', 'threes', 'fours', 'fives', 'sixes',
        'choice', 'fourOfAKind', 'fullHouse',
        'smallStraight', 'largeStraight', 'yacht'
      ]
    }
  },
  computed: {
    ...mapState('yachtHelper', [
      'players'
    ]),
    ...mapGetters('yachtHelper', [
      'getPlayer',
      'getWinner',
      'hasFullDices',
      'scoreInAces',
      'scoreInDeuces',
      'scoreInThrees',
      'scoreInFours',
      'scoreInFives',
      'scoreInSixes',
      'scoreInChoice',
      'scoreInFourOfAKind',
      'scoreInFullHouse',
      'scoreInSmallStraight',
      'scoreInLargeStraight',
      'scoreInYacht'
    ])
  },
  methods: {
    assignScore(playerIndex, change) {
      const player = this.getPlayer(playerIndex);

      if (change.aces !== undefined) {
        player.aces = change.aces;
      }
      if (change.deuces !== undefined) {
        player.deuces = change.deuces;
      }
      if (change.threes !== undefined) {
        player.threes = change.threes;
      }
      if (change.fours !== undefined) {
        player.fours = change.fours;
      }
      if (change.fives !== undefined) {
        player.fives = change.fives;
      }
      if (change.sixes !== undefined) {
        player.sixes = change.sixes;
      }
      if (change.choice !== undefined) {
        player.choice = change.choice;
      }
      if (change.fourOfAKind !== undefined) {
        player.fourOfAKind = change.fourOfAKind;
      }
      if (change.fullHouse !== undefined) {
        player.fullHouse = change.fullHouse;
      }
      if (change.smallStraight !== undefined) {
        player.smallStraight = change.smallStraight;
      }
      if (change.largeStraight !== undefined) {
        player.largeStraight = change.largeStraight;
      }
      if (change.yacht !== undefined) {
        player.yacht = change.yacht;
      }

      this.savePlayer({index: playerIndex, player: player});
      this.resetDices();
    },
    ...mapMutations('yachtHelper', [
      'savePlayer',
      'resetDices'
    ])
  }
}
</script>

<style scoped>
.score-text {
  font-size: 1.2em;
}
</style>