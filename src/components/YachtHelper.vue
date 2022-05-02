<template>
  <div>
    <h1>요트 계산기</h1>

    <b-form inline @submit="addPlayer" @submit.stop.prevent>
      <b-form-input
          id="player-name-input"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="새 플레이어"
          v-model="playerName"
      ></b-form-input>
      <b-button variant="primary" @click="addPlayer">
        <b-icon-person-plus></b-icon-person-plus>
      </b-button>
      <b-button variant="danger" @click="popPlayer" class="ml-1">
        <b-icon-person-dash></b-icon-person-dash>
      </b-button>
    </b-form>

    <div class="text-center">
      <h2>주사위 눈금:</h2>
      <h3 v-if="this.dices.length > 0" class="text-primary">
      <span v-for="(dice, index) in this.dices" :key="index" class="m-1">
        <b-icon-dice1-fill v-if="dice === 1"></b-icon-dice1-fill>
        <b-icon-dice2-fill v-if="dice === 2"></b-icon-dice2-fill>
        <b-icon-dice3-fill v-if="dice === 3"></b-icon-dice3-fill>
        <b-icon-dice4-fill v-if="dice === 4"></b-icon-dice4-fill>
        <b-icon-dice5-fill v-if="dice === 5"></b-icon-dice5-fill>
        <b-icon-dice6-fill v-if="dice === 6"></b-icon-dice6-fill>
      </span>
      </h3>
      <h3 v-else class="text-secondary">눈금을 입력하세요</h3>
    </div>

    <div class="mb-3">
      <Scoreboard></Scoreboard>
    </div>

    <div class="text-center mt-3">
      <b-button variant="secondary" @click="undo">실행 취소</b-button>
      <b-button variant="danger" @click="cleanUp" class="ml-1">점수 초기화</b-button>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import Scoreboard from "@/components/Scoreboard";

export default {
  name: 'YachtHelper',
  components: {
    Scoreboard
  },
  props: {
    msg: String
  },
  data() {
    return {
      playerName: ""
    }
  },
  computed: {
    ...mapState('yachtHelper', [
      'players',
      'dices'
    ])
  },
  methods: {
    handleKeyPress(event) {
      const keyDigit = parseInt(event.key);
      if (!isNaN(keyDigit) && keyDigit >= 1 && keyDigit <= 6) {
        this.addDice({dice: keyDigit});
      }

      if (event.key === 'Escape') {
        this.resetDices();
      }
    },
    addPlayer() {
      this.pushNewPlayer({name: this.playerName});
      this.playerName = "";
    },
    ...mapMutations('yachtHelper', [
      'pushNewPlayer',
      'popPlayer',
      'undo',
      'cleanUp',
      'addDice',
      'resetDices'
    ])
  },
  created() {
    window.addEventListener('keydown', this.handleKeyPress);
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeyPress);
  },
}
</script>
