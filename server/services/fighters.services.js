const fs = require('fs');

const fightersJsonPath = 'resources/api/fighters.json';
const detailsPath = `../resources/api/details/fighter/`;

const createDetailsPath = (id) => {
    return `${detailsPath}${id}.json`;
};

const getFighters = () => {
    const fighters = fs.readFileSync(fightersJsonPath);
    let fightersArray = JSON.parse(fighters);
    return fightersArray;
};

const getFighterById = (id) => {
    return require(createDetailsPath(id));
};

const deleteFighterById = (id) => {
    try {
        const fighters = fs.readFileSync(fightersJsonPath);
        let fightersArray = JSON.parse(fighters);
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

module.exports = {
    getFighters,
    getFighterById,
    deleteFighterById
};
