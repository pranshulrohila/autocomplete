// https://restcountries.com/v3.1/all

const inputEl = document.querySelector("#country-input");
inputEl.addEventListener("input", onInputChange);
const query = inputEl.value;

getCountryData();

let countryCommonNames = [];

async function getCountryData() {
    const countryResult = await fetch("https://restcountries.com/v3.1/all");
    const data = await countryResult.json();
    countryCommonNames = data.map((country)=> {
        return country.name.common;
    });
    console.log(countryCommonNames);
}

function onInputChange() {
    removeAutocompleteDropdown();
    const value = inputEl
.value.toLowerCase();
    const filteredNames = [];
    countryCommonNames.forEach((countryName)=>{
        if (countryName.toLowerCase().includes(value)) {
        // if(countryName.substr(0, value.length).toLowerCase() === value) {
            filteredNames.push(countryName);
        }
    });
    creataAutocompleteDropdown(filteredNames);
}

function creataAutocompleteDropdown(list) {
    const listEl = document.createElement("ul");
    listEl.className="autocomplete-list";
    listEl.id="autocomplete-list";
    list.forEach((country)=>{
        const listItem=document.createElement("li");
        const countryButton = document.createElement("button");
        countryButton.innerHTML=country;
        countryButton.addEventListener("click", onCountryButtonClick);
        listItem.appendChild(countryButton);
        listEl.appendChild(listItem);
    })
    document.querySelector("#autocomplete-wrapper").appendChild(listEl);
}

function removeAutocompleteDropdown() {
    const listEl=document.querySelector("#autocomplete-list");
    if (listEl) listEl.remove();
}

function onCountryButtonClick(e) {
    e.preventDefault();
    const buttonEl = e.target;
    inputEl.value=buttonEl.innerHTML;
    removeAutocompleteDropdown();
}