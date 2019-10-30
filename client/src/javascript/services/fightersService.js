import { callApi } from '../helpers/apiHelper';
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
      const endpoint = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint, 'GET');
      return new Fighter(apiResult);
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
