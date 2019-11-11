import {callApi} from '../helpers/apiHelper';
import Fighter from '../fighter';

class FighterService {
    async getFighters() {
        try {
            const endpoint = 'fighters/fighters.json';
            return await callApi(endpoint, 'GET');

        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(_id) {
        try {
            const endpoint = `fighter/${_id}`;
            const apiResult = await callApi(endpoint, 'GET');
            return new Fighter(apiResult);
        } catch (error) {
            throw error;
        }
    }

    async deleteFighter(_id) {
        try {
            const endpoint = `fighter/${_id}`;
            const apiResult = await callApi(endpoint, 'DELETE');
            console.log(apiResult);
        } catch (error) {
            throw error;
        }
    }

    async addFighter(fighter) {
        try {
            const endpoint = `fighter`;
            const body = JSON.stringify(fighter);
            const apiResult = await callApi(endpoint, 'POST', body, {
                'Content-Type': 'application/json'
            });
            console.log(apiResult);
        } catch (error) {
            throw error;
        }
    }
}


export const fighterService = new FighterService();
