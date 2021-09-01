export class Player {
    constructor(name) {
        this.name = name;
        this.resetScores();
    }

    resetScores() {
        this.aces = null;
        this.deuces = null;
        this.threes = null;
        this.fours = null;
        this.fives = null;
        this.sixes = null;
        this.choice = null;
        this.fourOfAKind = null;
        this.fullHouse = null;
        this.smallStraight = null;
        this.largeStraight = null;
        this.yacht = null;
    }

    getSubtotalScore() {
        return (this.aces + this.deuces + this.threes + this.fours + this.fives + this.sixes);
    }

    getTotalScore() {
        let subtotal = this.getSubtotalScore();
        if (subtotal >= 63) {
            subtotal += 35;
        }
        return (subtotal + this.choice + this.fourOfAKind + this.fullHouse
            + this.smallStraight + this.largeStraight + this.yacht);
    }
}
