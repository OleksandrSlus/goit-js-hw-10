export function fetchCountries(searchValue) {
    const params = new URLSearchParams();
    params.set('fields', 'name,capital,languages,population,flags');
    const url = `https://restcountries.com/v3.1/name/${searchValue}?${params.toString()}`;
  
       return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
  }