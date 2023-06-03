import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";
import { renderCountryMarkup } from "./countryMarkup";
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

export const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info')
};

const debouncedFetchCountries = debounce(() => {
  const searchValue = refs.searchBox.value.trim();
  fetchCountries(searchValue)
  .then(countries => {
    renderCountryMarkup(countries);
  }).catch((err) => {
    if(err.message === "404") {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length === 0) {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    refs.countryList.innerHtml = '';
    refs.countryInfo.innerHtml = '';
    }
    console.log(err)
  })
}, DEBOUNCE_DELAY);

refs.searchBox.addEventListener('input', debouncedFetchCountries);

