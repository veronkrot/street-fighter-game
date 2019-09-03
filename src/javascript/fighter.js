class Fighter {
    constructor(details) {
        this._id = details._id;
        this.name = details.name;
        this.health = details.health;
        this.attack = details.attack;
        this.defense = details.defense;
        this.source = details.source;
        this.resetHealth();
    }

    static randomNum(max, min) {
        return Math.random() * (max - min) + min;
    }

    getHitPower() {
        const criticalHitChance = Fighter.randomNum(1, 2);
        return this.attack * criticalHitChance;
    }

    getBlockPower() {
        const dodgeChance = Fighter.randomNum(1, 2);
        return this.defense * dodgeChance;
    }

    resetHealth() {
        this.currentHealth = this.health;
    }
}

export default Fighter;
