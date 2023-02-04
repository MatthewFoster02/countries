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
const countryInput = document.getElementById('country-input'); // Search bar

countryInput.addEventListener('change', (e) =>
{
    displayFilteredCountriesByCountry(countryInput.value.toLowerCase());
});


// Get all countries
countries = [];
function getCountries()
{
    // Fetched from RESTCountries API endpoint
    fetch('https://restcountries.com/v2/all').then(res => res.json()).then(data =>
    {
        countries = data;
        countries = cleanCountryNames(countries);
        displayData(countries);
    });
}
getCountries();

// Cleaning unnecessary long country names from API
function cleanCountryNames(countries)
{
    countries.forEach(country =>
    {
        switch(country.name)
        {
            case 'Bolivia (Plurinational State of)':
                country.name = 'Bolivia';
                break;
            case 'Bonaire, Sint Eustatius and Saba':
                country.name = 'Bonaire';
                break;
            case 'Brunei Darussalam':
                country.name = 'Brunei';
                break;
            case 'Cocos (Keeling) Islands':
                country.name = 'Cocos Islands';
                break;
            case 'Falkland Islands (Malvinas)':
                country.name = 'Falkland Islands';
                break;
            case 'Iran (Islamic Republic of)':
                country.name = 'Iran';
                break;
            case "Lao People's Democratic Republic":
                country.name = 'Laos';
                break;
            case 'Micronesia (Federated States of)':
                country.name = 'Micronesia';
                break;
            case 'Moldova (Republic of)':
                country.name = 'Moldova';
                break;
            case "Korea (Democratic People's Republic of)":
                country.name = 'North Korea';
                break;
            case 'Palestine, State of':
                country.name = 'Palestine';
                break;
            case 'Saint Helena, Ascension and Tristan da Cunha':
                country.name = 'Saint Helena';
                break;
            case 'Saint Martin (French part)':
                country.name = 'Saint Martin';
                break;
            case 'Sint Maarten (Dutch part)':
                country.name = 'Sint Maarten';
                break;
            case 'Korea (Republic of)':
                country.name = 'South Korea';
                break;
            case 'Tanzania, United Republic of':
                country.name = 'Tanzania';
                break;
            case 'United Kingdom of Great Britain and Northern Ireland':
                country.name = 'United Kingdom';
                break;
            case 'Venezuela (Bolivarian Republic of)':
                country.name = 'Venezuela';
                break;
        }
    });
    return countries;
}

// Displaying the countries passed in, to the homepage
function displayData(countriesData)
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
            card.setAttribute('onclick', `viewThisCountry('${country['name']}')`);
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
    
            // Set the correct details for each element
            flag.setAttribute('src', country['flags']['png']);
            countryName.innerHTML = country['name'];
            population.innerHTML = 'Population: ';
            region.innerHTML = 'Region: ';
            capital.innerHTML = 'Capital: ';
            populationValue.innerHTML = numberWithCommas(country['population']);
            regionValue.innerHTML = country['region'];
            country['capital'] == undefined ? capitalValue.innerHTML = 'No Capital' : capitalValue.innerHTML = country['capital'];
    
            // Append all the children in correct order
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

// Transforms integer to string and inserts a comma every 3 digits to improve readability
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Filter the countries based on the selected region
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

// Filters countries by the string inputted in the search bar
function displayFilteredCountriesByCountry(input)
{
    let filteredCountries = [];
    countries.forEach(country => 
    {
        let matched = false; // Set to true if searched value is substring of any of the potential spellings of the country names
        if(country['name'].toLowerCase().includes(input)) matched = true;
        // Check common other spellings of country name
        if(country['altSpellings']==undefined) return; // Guard on countries with no alternative spelling
        for(let i = 0; i < country['altSpellings'].length; i++)
        {
            if(country['altSpellings'][i].toLowerCase().includes(input)) matched = true;
        }
        if(matched) filteredCountries.push(country); // Only display the country if its name or common names match the input
    });
    if(filteredCountries.length == 0) return alert('No matching Countries found...'); // Alert user if their search returned no matching countries
    displayData(filteredCountries);
}

// Functions and code for viewing individual countries and navigating between the individual view and homepage
const individualCountry = document.getElementById('individual-country');
const allCountries = document.getElementById('all-countries');

// back function removes the individual country div and replaces it with the homepage content
function back()
{
    individualCountry.classList.add('none');
    allCountries.classList.remove('none');
}

// Displays the more detailed country information
function viewCountry(country, link)
{
    // Get country from the data of all countries
    const country_info = getCountryByNameOrCode(country, link); //Link is true if click comes from link, false if from button

    // All the elements to be filled with the country's details
    const flag = document.getElementById('flag');
    const commonName = document.getElementById('name');
    const nativeName = document.getElementById('native-name');
    const population = document.getElementById('population-ind');
    const region = document.getElementById('region-ind');
    const subRegion = document.getElementById('sub-region');
    const capital = document.getElementById('capital-ind');
    const topLevelDomain = document.getElementById('top-level-dom');
    const currencies = document.getElementById('currencies');
    const languages = document.getElementById('languages');
    const bordering = document.getElementById('buttons');

    // Clear all previous values

    // Filling in the details
    flag.setAttribute('src', country_info['flags']['png']);
    commonName.innerHTML = country_info['name'];
    nativeName.innerHTML = country_info['nativeName'];
    population.innerHTML = numberWithCommas(country_info['population']);
    region.innerHTML = country_info['region'];
    country_info['subregion'] == undefined ? subRegion.innerHTML = 'No Sub Region' : subRegion.innerHTML = country_info['subregion'];
    country_info['capital'] == undefined ? capital.innerHTML = 'No Capital' : capital.innerHTML = country_info['capital'];
    country_info['topLevelDomain'] == undefined || country_info['topLevelDomain'] == '' ? topLevelDomain.innerHTML = 'No Data' : topLevelDomain.innerHTML = country_info['topLevelDomain'];
    // Currencies
    currencies.innerHTML = getValues(country_info['currencies']);
    // Languages
    languages.innerHTML = getValues(country_info['languages']);
    //Bordering countries
    bordering.innerHTML = "";
    if(country_info['borders']!=undefined)
    {
        country_info['borders'].forEach(country_code =>
        {
            const country_name = getCountryByNameOrCode(country_code, false);
            let btn = document.createElement('button');
            btn.setAttribute('class', 'link-btn');
            btn.innerHTML = country_name;
            btn.setAttribute('onclick', `viewCountry('${country_name}', true)`);
            bordering.appendChild(btn);     
        });
    }
    else
    {
        bordering.innerHTML = 'No Bordering Countries';
    }
}

// This function is called from the homepage, so need to change what html is visible before calling viewCountry
function viewThisCountry(country_name)
{
    individualCountry.classList.remove('none');
    allCountries.classList.add('none');
    viewCountry(country_name, true);
}

function fillMultipleCapitals(values)
{
    let return_ = ''; // String to be returned
    if(values == undefined) return 'No Capital';
    values.forEach(value =>
    {
        // Append each value
        return_ += (value + ', ');
    });
    return return_.slice(0, -2); // Removes unnecessary final comma
}

function getValues(values)
{
    let return_ = '';
    if(values == undefined || values.length == 0) return 'No Data';

    values.forEach(value =>
    {
        return_ += (value['name'] + ', ');        
    });
    return return_.slice(0, -2);
}

// Name boolean variable - true if country_ref is the name of the country, false if code
function getCountryByNameOrCode(country_ref, country_name)
{
    let country_return;
    countries.forEach(country =>
    {
        // If we have the country name and it matches with the current country, return the country
        if(country_name && country['name'] == country_ref) country_return = country;
        // Otherwise we either do not have a matching country or we are looking at matching the country 3 letter code
        if(country['alpha3Code'] == country_ref) country_return = country['name'];
    });
    return country_return;
}
