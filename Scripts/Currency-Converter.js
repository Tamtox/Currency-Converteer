import codes from './Currency-Codes.js';

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
// Generate Codes
functions.generateCodes(currency1)
functions.generateCodes(currency2)
