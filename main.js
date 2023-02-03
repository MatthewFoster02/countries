// Theme switch
const switchTheme = document.getElementById('switch');

const moonDark = document.getElementById('moonDark');
const moonLight = document.getElementById('moonLight');

const searchDark = document.getElementById('searchDark');
const searchLight = document.getElementById('searchLight');

const downDark = document.getElementById('downDark');
const downLight = document.getElementById('downLight');

const backDark = document.getElementById('backDark');
const backLight = document.getElementById('backLight');

switchTheme.addEventListener('click', () => 
{
    document.body.classList.toggle('themeLight');
    document.body.classList.toggle('themeDark');

    backLight.classList.toggle('none');
    backDark.classList.toggle('none');

    moonLight.classList.toggle('none');
    moonDark.classList.toggle('none');

    searchLight.classList.toggle('none');
    searchDark.classList.toggle('none');

    downLight.classList.toggle('none');
    downDark.classList.toggle('none');
});

// Dropdown menu
const dropdwnbtn = document.getElementById('dropbtn');
const dropdwncontent = document.getElementById('drop-content');

dropdwnbtn.addEventListener('click', () => 
{
    dropdwncontent.classList.toggle('none');
});

// Filtering by region
const all = document.getElementById('all');
const africa = document.getElementById('africa');
const america = document.getElementById('america');
const asia = document.getElementById('asia');
const europe = document.getElementById('europe');
const oceania = document.getElementById('oceania');

all.addEventListener('click', () =>
{
    displayData(countries);
});
africa.addEventListener('click', () =>
{
    displayFilteredCountriesByRegion('africa');
});
america.addEventListener('click', () =>
{
    displayFilteredCountriesByRegion('americas');
});
asia.addEventListener('click', () =>
{
    displayFilteredCountriesByRegion('asia');
});
europe.addEventListener('click', () =>
{
    displayFilteredCountriesByRegion('europe');
});
oceania.addEventListener('click', () =>
{
    displayFilteredCountriesByRegion('oceania');
});

// Filtering by inputted country
const countryInput = document.getElementById('country-input');

countryInput.addEventListener('change', (e) =>
{
    displayFilteredCountriesByCountry(countryInput.value.toLowerCase());
});


// Get all countries
countries = [];
function getCountries()
{
    fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(data =>
    {
        countries = data;
        displayData(countries);
    });
}
getCountries();

let displayData = function displayData(countriesData)
{
    // Get the parent div for the country cards.
    let parent = document.getElementById('parent');
    parent.innerHTML = '';

    // Loop through 4 countries at a time
    for(let i = 0; i < countriesData.length; i+=4)
    {
        // Get the subset of 4 countries
        let subsetCountries = countriesData.slice(i, i+4);
        let row = document.createElement('div');
        row.setAttribute('class', 'row');

        subsetCountries.forEach(country =>
        {
            // Create needed elements
            let card = document.createElement('a');
            let flag = document.createElement('img');
            let countryInfo = document.createElement('div');
            let countryName = document.createElement('p');
            let countryDetails = document.createElement('div');
            let population = document.createElement('p');
            let region = document.createElement('p');
            let capital = document.createElement('p');
            let populationValue = document.createElement('span');
            let regionValue = document.createElement('span');
            let capitalValue = document.createElement('span');
    
            // Set classes
            card.setAttribute('class', 'card');
            flag.setAttribute('class', 'flag');
            countryInfo.setAttribute('class', 'country-info');
            countryName.setAttribute('class', 'country-name');
            countryDetails.setAttribute('class', 'country-details');
            population.setAttribute('class', 'type');
            region.setAttribute('class', 'type');
            capital.setAttribute('class', 'type');
            populationValue.setAttribute('class', 'value');
            regionValue.setAttribute('class', 'value');
            capitalValue.setAttribute('class', 'value');
    
            // Set the correct flag
            flag.setAttribute('src', country['flags']['png']);
            countryName.innerHTML = country['name']['common'];
            population.innerHTML = 'Population: ';
            region.innerHTML = 'Region: ';
            capital.innerHTML = 'Capital: ';
            populationValue.innerHTML = numberWithCommas(country['population']);
            regionValue.innerHTML = country['region'];
            capitalValue.innerHTML = country['capital'];
    
            // Append all the children correctly
            population.appendChild(populationValue);
            region.appendChild(regionValue);
            capital.appendChild(capitalValue);
    
            countryDetails.appendChild(population);
            countryDetails.appendChild(region);
            countryDetails.appendChild(capital);
    
            countryInfo.appendChild(countryName);
            countryInfo.appendChild(countryDetails);
    
            card.appendChild(flag);
            card.appendChild(countryInfo);
    
            row.appendChild(card);
        });
        parent.appendChild(row);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayFilteredCountriesByRegion(region)
{
    let filteredCountries = [];
    countries.forEach(country =>
    {
        if(country['region'].toLowerCase() != region) return;
        filteredCountries.push(country);
    });
    displayData(filteredCountries);
}

function displayFilteredCountriesByCountry(input)
{
    let filteredCountries = [];
    countries.forEach(country => 
    {
        let matched = false; // Set to true if searched value is substring of any of the potential spellings of the country names
        if(country['name']['common'].toLowerCase().includes(input)) matched = true;
        // Check common other spellings of country name
        for(let i = 0; i < country['altSpellings'].length; i++)
        {
            if(country['altSpellings'][i].toLowerCase().includes(input)) matched = true;
        }
        if(matched) filteredCountries.push(country);
    });
    if(filteredCountries.length == 0) return alert('No matching Countries found...');
    displayData(filteredCountries);
}
