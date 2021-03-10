
// Variables
const convert = document.querySelector('#convert');
const currency1 = document.querySelector('#currency1');
const currency2 = document.querySelector('#currency2');
const swap = document.querySelector('#swap');
const conversion = document.querySelector('#conversion');
const selectedCurrency = document.querySelector('#selectedCurrency');
const entries = document.querySelector('#entries')
// Events
swap.addEventListener('click',function() {
    [currency1.selectedIndex,currency2.selectedIndex] = [currency2.selectedIndex,currency1.selectedIndex]
})
convert.addEventListener('submit',function(e) {
    let currencyAmount = convert.elements.currencyamount;
    functions.clear()
    e.preventDefault();
    conversion.innerText = currencyAmount.value
    functions.getInfo(currency1.value)
    .then(res=>{
        console.log(res.data)
        functions.setConversion(res,currencyAmount.value,currency2.value);
        functions.setChart(res,currency1.value);
        currency1.value = "";
        currency2.value = "";
        currencyAmount.value = ""
    })
})

// Functions
const functions = {
    // Generate Country names to select menus
    generateCodes(parent) {
        const currencyCodes = Object.keys(codes);
        for(let i=0;i<currencyCodes.length;i++) {
            let currency = document.createElement('option');
            currency.setAttribute('value',currencyCodes[i])
            currency.innerText = codes[currencyCodes[i]];
            parent.appendChild(currency);
        }       
    },
    // Exchange rate api call
    async getInfo(curr) {
        return  await axios.get(`https://v6.exchangerate-api.com/v6/e2d8ba7107da5a7846c16cb3/latest/${curr}`)
    },
    // Set Conversion calculation
    setConversion(res,currencyAm,secondCurr) {
        if(currencyAm === "") {
            currencyAm = 1
        }
        console.log(currencyAm)
        if(secondCurr === "") {
            conversion.innerText = `${currencyAm} ${codes[res.data.base_code]}`;
        }
        else{
            conversion.innerText = `${currencyAm} ${codes[res.data.base_code]} = ${(parseFloat(currencyAm)*res.data.conversion_rates[secondCurr]).toFixed(3)} ${codes[secondCurr]}`
        }
    },
    // Set Exchange rates to chosen currency
    setChart(res,firstCurr) {
        selectedCurrency.innerText = `${firstCurr} Exchange Rates`
        const currencyCodes = Object.keys(codes);
        for(let i of currencyCodes) {
            let chartItem = document.createElement('div');
            chartItem.classList.add('chartItem');
            chartItem.innerText = `${res.data.conversion_rates[i]} ${i}`;
            chartItem.addEventListener('click',function() {
                let curr = this.innerText.split(" ")[1];
                functions.getInfo(curr)
                .then(res=>{
                    functions.clear();
                    functions.setConversion(res,"","");
                    functions.setChart(res,curr);
                })
            })
            entries.appendChild(chartItem);
        }
    },
    // Clear all inputs
    clear() {
        conversion.innerHTML = "";
        selectedCurrency.innerHTML = "";
        entries.innerHTML = "";
    }
}

// Country Codes 
const codes = {
    "USD": "United States Dollar",
    "EUR": "Euro",
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghanistan Afghani",
    "ALL": "Albania Lek",
    "AMD": "Armenia Dram",
    "ANG": "Netherlands Antilles Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentina Peso",
    "AUD": "Australia Dollar",
    "AWG": "Aruba Guilder",
    "AZN": "Azerbaijanian Manat",
    "BAM": "Bosnia and Herzegovina Convertible Marka",
    "BBD": "Barbados Dollar",
    "BDT": "Bangladesh Taka",
    "BGN": "Bulgaria Lev",
    "BHD": "Bahrain Dinar",
    "BIF": "Burundi Franc",
    "BMD": "Bermuda Dollar",
    "BND": "Brunei Darussalam Dollar",
    "BOB": "Bolivia Boliviano",
    "BRL": "Brazil Real",
    "BSD": "Bahamas Dollar",
    "BTN": "Bhutan Ngultrum",
    "BWP": "Botswana Pula",
    "BYN": "Belarus Ruble",
    "BZD": "Belize Dollar",
    "CAD": "Canada Dollar",
    "CDF": "Congo Franc",
    "CHF": "Switzerland Franc",
    "CLP": "Chile Peso",
    "CNY": "China Yuan Renminbi",
    "COP": "Colombia Peso",
    "CRC": "Costa Rica Colon",
    "CUC": "Cuba Convertible Peso",
    "CUP": "Cuba Peso",
    "CVE": "Cape Verde Escudo",
    "CZK": "Czech Republic Koruna",
    "DJF": "Djibouti Franc",
    "DKK": "Denmark Krone",
    "DOP": "Dominican Republic Peso",
    "DZD": "Algeria Dinar",
    "EGP": "Egypt Pound",
    "ERN": "Eritrea Nakfa",
    "ETB": "Ethiopia birr",
    "FJD": "Fiji Dollar",
    "FKP": "Falkland Islands (Malvinas) Pound",
    "FOK": "Faroe króna",
    "GBP": "United Kingdom Pound",
    "GEL": "Georgia Lari",
    "GGP": "Guernsey Pound",
    "GHS": "Ghanaia Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambia Dalasi",
    "GNF": "Guinea Franc",
    "GTQ": "Guatemala Quetzal",
    "GYD": "Guyana Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduras Lempira",
    "HRK": "Croatia Kuna",
    "HTG": "Haiti gourde",
    "HUF": "Hungary Forint",
    "IDR": "Indonesia Rupiah",
    "ILS": "Israel Shekel",
    "IMP": "Isle of Man Pound",
    "INR": "India Rupee",
    "IQD": "Iraq Dinar",
    "IRR": "Iran Rial",
    "ISK": "Iceland Krona",
    "JMD": "Jamaica Dollar",
    "JOD": "Jordan Dinar",
    "JPY": "Japan Yen",
    "KES": "Kenya Shilling",
    "KGS": "Kyrgyzstan Som",
    "KHR": "Cambodia Riel",
    "KID": "Kiribati Dollar",
    "KMF": "Comorian franc",
    "KRW": "Korea (South) Won",
    "KWD": "Kuwait Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstan Tenge",
    "LAK": "Laos Kip",
    "LBP": "Lebanon Pound",
    "LKR": "Sri Lanka Rupee",
    "LRD": "Liberia Dollar",
    "LSL": "Lesotho Loti",
    "LYD": "Libya Dinar",
    "MAD": "Morocco Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonia Denar",
    "MMK": "Burmese Kyat",
    "MNT": "Mongolia Tughrik",
    "MOP": "Macau Pataca",
    "MRU": "Mauritania ouguiya",
    "MUR": "Mauritius Rupee",
    "MVR": "Maldives rufiyaa",
    "MWK": "Malawi kwacha",
    "MXN": "Mexico Peso",
    "MYR": "Malaysia Ringgit",
    "MZN": "Mozambique Metical",
    "NAD": "Namibia Dollar",
    "NGN": "Nigeria Naira",
    "NIO": "Nicaragua Cordoba",
    "NOK": "Norway Krone",
    "NPR": "Nepal Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Oman Rial",
    "PAB": "Panama Balboa",
    "PEN": "Peru Nuevo Sol",
    "PGK": "Papua New Guinea Kina",
    "PHP": "Philippines Peso",
    "PKR": "Pakistan Rupee",
    "PLN": "Poland Zloty",
    "PYG": "Paraguay Guarani",
    "QAR": "Qatar Riyal",
    "RON": "Romania New Leu",
    "RSD": "Serbia Dinar",
    "RUB": "Russia Ruble",
    "RWF": "Rwanda Franc",
    "SAR": "Saudi Arabia Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychelles Rupee",
    "SDG": "Sudan Pound",
    "SEK": "Sweden Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SLL": "Sierra Leone Leone",
    "SOS": "Somalia Shilling",
    "SRD": "Suriname Dollar",
    "SSP": "South Sudan Pound",
    "STN": "São Tomé and Príncipe Dobra",
    "SYP": "Syria Pound",
    "SZL": "Swaziland Lilangeni",
    "THB": "Thailand Baht",
    "TJS": "Tajikistan Somoni",
    "TMT": "Turkmenistan Manat",
    "TND": "Tunisia Dinar",
    "TOP": "Tonga Pa'anga",
    "TRY": "Turkey Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TVD": "Tuvalu Dollar",
    "TWD": "Taiwan New Dollar",
    "TZS": "Tanzania Shilling",
    "UAH": "Ukraine Hryvna",
    "UGX": "Ugandan Shilling",
    "UYU": "Uruguay Peso",
    "UZS": "Uzbekistan Som",
    "VES": "Venezuelan Bolívar",
    "VND": "Viet Nam Dong",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tālā",
    "XAF": "Central Africa CFA Franc",
    "XCD": "East Caribbean Dollar",
    "XDR": "Special Drawing Rights",
    "XOF": "West Africa CFA Franc",
    "XPF": "CFP Franc",
    "YER": "Yemen Rial",
    "ZAR": "South Africa Rand",
    "ZMW": "Zambian Kwacha"
}

// Generate Codes
functions.generateCodes(currency1)
functions.generateCodes(currency2)