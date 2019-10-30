const API_URL = 'http://localhost:3000/';

function callApi(endpoint, method) {
  const url = API_URL + endpoint;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}

export { callApi }
