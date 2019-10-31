import {fighterService} from "./fightersService";

class FightersCache {
    fightersDetailsMap;

    constructor() {
        this.fightersDetailsMap = new Map();
    }

    retrieveDetails(id) {
        if (this.fightersDetailsMap.has(id)) {
            console.log('Getting fighter from CACHE');
            return new Promise((resolve) => {
                resolve(this.fightersDetailsMap.get(id));
            });
        } else {
            console.log('Getting fighter from API');
            const fighterPromise = fighterService.getFighterDetails(id);
            fighterPromise.then((fighter) => {
                this.fightersDetailsMap.set(id, fighter);
            });
            return fighterPromise;
        }
    }
}

export const fightersCache = new FightersCache();
