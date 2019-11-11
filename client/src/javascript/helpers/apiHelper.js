const API_URL = 'http://localhost:3000/';

function callApi(endpoint, method, body, headers) {
  const url = API_URL + endpoint;
  const options = {
    method,
    body,
    headers
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
