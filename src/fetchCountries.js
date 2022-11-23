export function fetchCountries(searchTerm) {
  const BASE_URL = 'https://restcountries.com/v2/name/'; 
    return fetch(`${BASE_URL}${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(error => console.log(`${error.name}: ${error.message}`));
  }
  // https://restcountries.com/v2/name/name?capital&population&flags=svg&languages
 