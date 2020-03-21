
//GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN prompted for character types to include in the password
// THEN I choose lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page //
// Write a function that takes user input and creates a password
// based on that input and returns it


//MY THIRD STEP: GENERATE WORK WITH THE DOM TO CALL ALL
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

//MY FOURTH STEP: GENERATE EVENT LISTENERS
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//MY FIFTH STEP: GENERATE FUNCTION FOR PASSWORD
function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = " ";

    const typesCounted = lower + upper + number + symbol;

    // TEST console.log('typesCounted: ', typesCounted);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (item => Object.values(item)[0]
    );

    //TEST console.log('typesArr: ', typesArr);

    if(typesCounted === 0) {
        return '';
    }

    //MY SIXTH STEP: LOOP OVER LENGTH
    for(let i = 0; i < length; i += typesCounted) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // TEST console.log('funcName: ', funcName);
            generatedPassword += randomFunc[funcName]();
        });
    }

//MY SEVENTH STEP: GENERATE FINAL PASSWORD GIVEN LENGTH
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

//MY SECOND STEP: GENERATE LATER FUNCTION TO CALL INITIAL FUNCTION

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// MY FIRST STEP: GENERATE INITIAL FUNCTIONS

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=-_<>,./';
    return symbols[Math.floor(Math.random() * symbols.length)];
}