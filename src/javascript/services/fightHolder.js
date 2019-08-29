export const fightHolder = {
    fighter1: undefined,
    fighter2: undefined,

    hasFighter1: () => {
        return this.fighter1 !== undefined;
    },

    hasFighter2: () => {
        return this.fighter2 !== undefined;
    },

    hasAllFighters: () => {
        return this.hasFighter1() && this.hasFighter2();
    }
};
