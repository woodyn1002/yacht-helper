import {Player} from "@/player";

const state = () => ({
    players: [],
    dices: []
});

const getters = {
    getPlayer(state) {
        return (index) => state.players[index]
    },
    getWinner(state) {
        return state.players.slice().sort((a, b) => b.getTotalScore() - a.getTotalScore())[0];
    },
    hasFullDices(state) {
        return state.dices.length === 5;
    },
    scoreInAces(state) {
        let filtered = state.dices.filter(dice => dice === 1);
        if (filtered.length > 0) {
            return filtered.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInDeuces(state) {
        let filtered = state.dices.filter(dice => dice === 2);
        if (filtered.length > 0) {
            return filtered.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInThrees(state) {
        let filtered = state.dices.filter(dice => dice === 3);
        if (filtered.length > 0) {
            return filtered.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInFours(state) {
        let filtered = state.dices.filter(dice => dice === 4);
        if (filtered.length > 0) {
            return filtered.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInFives(state) {
        let filtered = state.dices.filter(dice => dice === 5);
        if (filtered.length > 0) {
            return filtered.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInSixes(state) {
        let filtered = state.dices.filter(dice => dice === 6);
        if (filtered.length > 0) {
            return filtered.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInChoice(state) {
        return state.dices.reduce((a, b) => a + b);
    },
    scoreInFourOfAKind(state) {
        let bestDice = countDices(state.dices)[0];
        if (bestDice.count >= 4) {
            return state.dices.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInFullHouse(state) {
        const diceCounts = countDices(state.dices);
        if (diceCounts[0].count === 3 && diceCounts[1].count === 2) {
            return state.dices.reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },
    scoreInSmallStraight(state, getters) {
        if (getters.maxStraightLength >= 4) {
            return 15;
        } else {
            return 0;
        }
    },
    scoreInLargeStraight(state, getters) {
        if (getters.maxStraightLength >= 5) {
            return 30;
        } else {
            return 0;
        }
    },
    scoreInYacht(state) {
        const diceCounts = countDices(state.dices);
        if (diceCounts[0].count === 5) {
            return 50;
        } else {
            return 0;
        }
    },
    maxStraightLength(state) {
        let maxLength = 0;

        const sorted = [...new Set(state.dices)].sort((a, b) => a - b);
        for (let i = 0; i < 5; i++) {
            let length = 0;
            while (sorted[i + length + 1] - sorted[i + length] === 1) {
                length++;
            }
            length++;

            if (length > maxLength) {
                maxLength = length;
            }
        }
        return maxLength;
    }
};

const actions = {};

const mutations = {
    pushNewPlayer(state, {name}) {
        state.players.push(new Player(name));
    },
    popPlayer(state) {
        state.players.pop();
    },
    savePlayer(state, {index, player}) {
        state.players[index] = player;
    },
    cleanUp(state) {
        for (const index in state.players) {
            state.players[index].resetScores();
        }
    },
    addDice(state, {dice}) {
        if (state.dices.length < 5) {
            state.dices.push(dice);
        }
    },
    resetDices(state) {
        while (state.dices.length > 0) {
            state.dices.pop();
        }
    }
};

function countDices(dices) {
    const counts = [0, 0, 0, 0, 0, 0];
    for (const dice of dices) {
        counts[dice - 1]++;
    }

    return counts.map((count, index) => {
        return {dice: index + 1, count: count};
    })
        .sort((a, b) => b.count - a.count);
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}