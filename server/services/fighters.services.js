const fs = require('fs');
const {generateId} = require("./idGenerator");

const fightersJsonPath = 'resources/api/fighters.json';
const detailsPath = `../resources/api/details/fighter/`;

const createDetailsPath = (id) => {
    return `${detailsPath}${id}.json`;
};

const getFighters = () => {
    const fighters = fs.readFileSync(fightersJsonPath);
    const fightersArray = JSON.parse(fighters);
    return fightersArray;
};

const getFighterById = (id) => {
    return require(createDetailsPath(id));
};

const deleteFighterById = (id) => {
    try {
        const fightersArray = getFighters();
        for (let i = 0; i < fightersArray.length; i++) {
            if (fightersArray[i]._id === id) {
                fightersArray.splice(i, 1);
                break;
            }
        }
        const jsonFighters = JSON.stringify(fightersArray);
        fs.writeFileSync(fightersJsonPath, jsonFighters);
        fs.unlinkSync(`resources/api/details/fighter/${id}.json`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

const addFighter = (fighter) => {
    const id = generateId();
    fighter._id = id;
    try {
        const fighters = fs.readFileSync(fightersJsonPath);
        let fightersArray = JSON.parse(fighters);
        const newFighter = {
            _id: fighter._id,
            name: fighter.name,
            source: fighter.source
        };
        fightersArray.push(newFighter);
        const jsonFighters = JSON.stringify(fightersArray);
        fs.writeFileSync(fightersJsonPath, jsonFighters, (e) => {
            if (e) throw e;
            console.log("Fighter was successfully added!");
        });
        const detailsFilePath = `resources/api/details/fighter/${id}.json`;
        const jsonFighter = JSON.stringify(fighter);
        fs.writeFileSync(detailsFilePath, jsonFighter, (e) => {
            if (e) throw e;
            console.log("Fighter details file was successfully saved!");
        });
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
};

module.exports = {
    getFighters,
    getFighterById,
    deleteFighterById,
    addFighter
};
