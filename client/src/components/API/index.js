const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://api.development'

export const getDataFromApi = () => {
  return fetch(`${API_URL}/data`)
    .then(res => res.json())
    .then((mobileChinaData) => {
      console.log('api fired');
      return mobileChinaData
    });
}