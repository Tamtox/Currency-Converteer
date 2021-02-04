import codes from './Currency-Codes.js';

// Variables
const header = document.querySelector('#header');
const main = document.querySelector('main');
const convert = document.querySelector('#convert');
const currency1 = document.querySelector('#currency1');
const currency2 = document.querySelector('#currency2');
const currency1Amount = document.querySelector('#currency1-amount');
const swap = document.querySelector('#swap');

// Events
swap.addEventListener('click',function() {
    [currency1.selectedIndex,currency2.selectedIndex] = [currency2.selectedIndex,currency1.selectedIndex]
})
convert.addEventListener('submit',function(e) {
    e.preventDefault()
})

// Functions
const functions = {
    generateCodes(parent) {
        const currencyCodes = Object.keys(codes);
        for(let i=0;i<currencyCodes.length;i++) {
            let currency = document.createElement('option');
            currency.setAttribute('value',currencyCodes[i])
            currency.innerText = currencyCodes[i];
            parent.appendChild(currency);
        }       
    }
}
// Generate Codes
functions.generateCodes(currency1);
functions.generateCodes(currency2);
