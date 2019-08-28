class Fighter {
    constructor(details) {
        this._id = details._id;
        this.name = details.name;
        this.health = details.health;
        this.attack = details.attack;
        this.defense = details.defense;
        this.source = details.source;
    }
}

export default Fighter;
