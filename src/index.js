import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const searhCountries = event => {
  

  const searchTerm = searchBox.value.trim();
  if (searchTerm !== '') {
   fetchCountries(searchTerm)

      .then(data => {
        countriesData(data);
      })
      .catch(error => {
      
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearData(countryList);
        clearData(countryInfo); });
  }
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
          `<li class="country">
                <img width=50px src =${item.flags.svg} />
                <p>${item.name}</p>
                
        </li>`
      )
      .join(''));
  } else {
    clearData(countryList);
    clearData(countryInfo);
    return (countryInfo.innerHTML = data.map(
      item =>
        `<li class="country">
        <h3>${item.name}</h3>
                <img width=100px src =${item.flags.svg} />
                <p>Capital :${item.capital}</p>
                <p>Population :${item.population}</p>
                <p>Languages :${item.languages[0].name}</p>
                </li>`
    )).join('');
  }
}
function clearData(input) {
  input.innerHTML = '';
}
searchBox.addEventListener('input', debounce(searhCountries, DEBOUNCE_DELAY));

document.querySelector('#search-box').placeholder = 'Search for any country...';
