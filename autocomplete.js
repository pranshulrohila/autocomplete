
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
// Define the options for each dropdown
var regionOptions = {
    AMRS: ['FCMCMS'],
    APAC: ['MLEA', 'MLAF', 'MLFE', 'MLSSEC', 'MLSFO'],
    EMEA: ['Normal', 'Alternative', 'ECMS Normal', 'ECMS Exception']
};

var entityOptions = {
    AMRS: {
        FCMCMS: ['Secured', 'Segregated', 'Segregated Cross', 'Cleaed Swaps']
    },
    APAC: {
        MLEA: [],
        MLAF: [],
        MLFE: ['HKCC', 'SEOCH'],
        MLSSEC: ['Asset', 'CDP', 'NCDP'],
        MLSFO: ['Asset', 'Cash']
    },
    EMEA: {
        Normal: [],
        Alternative: [],
        'ECMS Normal': [],
        'ECMS Exception': []
    }
};

// Function to populate entity based on the selected option of region
function populateEntity() {
    var region = document.getElementById("region");
    var entity = document.getElementById("entity");
    var comp = document.getElementById("comp");
    entity.innerHTML = ""; // Clear entity options
    comp.innerHTML = ""; // Clear comp options
    comp.disabled = true;
    var selectedRegion = region.value;
    if (selectedRegion !== "") {
        var options = regionOptions[selectedRegion];
        for (var i = 0; i < options.length; i++) {
            var option = document.createElement("option");
            option.text = options[i];
            option.innerHTML = options[i];
            entity.add(option);
        }
        if (options.length === 0) {
            // Disable entity if there are no suboptions
            entity.disabled = true;
        } else {
            // Enable comp if there are suboptions
            entity.disabled = false;
        }
    } else {
        entity.disabled = true;
        comp.disabled = true;
    }
}

// Function to populate comp based on the selected options of region and entity
function populateComp() {
    var region = document.getElementById("region");
    var entity = document.getElementById("entity");
    var comp = document.getElementById("comp");
    comp.innerHTML = ""; // Clear comp options
    var region = region.value;
    var entity = entity.value;
    if (region !== "" && entity !== "") {
        var compOptions = entityOptions[region][entity];
        if (compOptions.length === 0) {
            comp.disabled = true;
        } else {
            comp.disabled = false;
            for (var i = 0; i < compOptions.length; i++) {
                var option = document.createElement("option");
                option.text = compOptions[i];
                option.innerHTML = compOptions[i];
                comp.add(option);
            }
        }
    } else {
        comp.disabled = true;
    }
}