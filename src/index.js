import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const searcCountries = event => {
  const searchTerm = searchBox.value.trim();

  fetchCountries(searchTerm)
    .then(data => {
      countriesData(data);
    })
    .catch(err => {
      if (searchTerm !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
  event.preventDefault();
};

function countriesData(data) {
  if (data.length > 10) {
    clearData(countryList);
    clearData(countryInfo);
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearData(countryList);
    clearData(countryInfo);
    return (countryList.innerHTML = data
      .map(
        item =>
          `<div class="country">
                <img width=50px src =${item.flags.svg} />
                <p>${item.name}</p>
                
        </div>`
      )
      .join(''));
    // } else if (searchBox.value === '') {
    //   clearData(countryList);
    //   clearData(countryInfo);
  } else {
    clearData(countryList);
    clearData(countryInfo);
    return (countryInfo.innerHTML = data.map(
      item =>
        `<div class="country">
        <h3>${item.name}</h3>
                <img width=100px src =${item.flags.svg} />
                <p>Capital :${item.capital}</p>
                <p>Population :${item.population}</p>
                <p>Languages :${item.languages[0].name}</p>
                </div>`
    )).join('');
  }
}
function clearData(input) {
  input.innerHTML = '';
}
searchBox.addEventListener('input', debounce(searcCountries, DEBOUNCE_DELAY));

document.querySelector('#search-box').placeholder = 'Search for any country...';
