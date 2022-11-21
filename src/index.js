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
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    return (countryList.innerHTML = data.map(
      item =>
        `<ul class="country">
                <li><img width=50px src ='${item.flags.svg}' /></li>
                <li><p>'${item.name}'</p></li>
                
                </ul>`
    )).join('');
  } else {
    return (countryInfo.innerHTML = data.map(
      item =>
        `<ul class="country">
        <li><h3>'${item.name}'</h3></li>
                <li><img width=100px src ='${item.flags.svg}' /></li>
                <li><p>Capital :'${item.capital}'</p></li>
                <li><p>Population :'${item.population.toLocaleString()}'</p></li>
             <li>Languages :'${item.languages[0].name}'</li>
                </ul>`
    )).join('');
  }
}
searchBox.addEventListener('input', debounce(searcCountries, DEBOUNCE_DELAY));

document.querySelector('#search-box').placeholder = 'Search for any country...';
