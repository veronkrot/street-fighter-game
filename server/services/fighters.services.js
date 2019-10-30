const fs = require('fs');

const getFighters = () => {
    return require('../resources/api/fighters');
};

const getFighterById = (id) => {
    return require(`../resources/api/details/fighter/${id}.json`);
};

module.exports = {
    getFighters,
    getFighterById
};
