# Homework_3-21

*HTML
//NOTE THAT WE BEGIN WITH A CONTAINER FOR THE ENTIRE GENERATOR
//WE THEN INSERT A HEADLINE FOR THE PROJECT, ALONGSIDE A PORTION FOR THE RESULT OF THE GENERATOR TO SHOW UP AT THE TOP OF THE PAGE
    <div class="container">
        <h2>Password Generator</h2>
        <div class="result-container">
            <span id="result"></span>
        </div>
//WE THEN PROVIDE INDIVIDUAL DIVS FOR THE DIFFERENT VARIABLE FOR THE PASSWORD, INCLUDING THE LENGTH, UPPERCASE/LOWERCASE LETTERS, NUMBERS, AND SYMBOLS
//EACH VARIABLE INCLUDES A LABEL AND AN INPUT TYPE SO THE USER CAN CHECK EACH BOX THEY WANT INCLUDED IN THEIR PASSWORD, EXCEPT FOR THE PASSWORD LENGTH, IN WHICH THEY INSERT A NUMBER
        <div class="settings">
            <div class="setting">
                <label for="length">Password length</label>
                <input type="number" id="length" min="8" max="20" value="20" />
            </div>
            <div class="setting">
                <label for="uppercase">Include uppercase letters</label>
                <input type="checkbox" id="uppercase" checked />
            </div>
            <div class="setting">
                <label for="lowercase">Include lowercase letters</label>
                <input type="checkbox" id="lowercase" checked />
            </div>
            <div class="setting">
                <label for="numbers">Include numbers</label>
                <input type="checkbox" id="numbers" checked />
            </div>
            <div class="setting">
                <label for="symbols">Include symbols</label>
                <input type="checkbox" id="symbols" checked />
            </div>
        </div>
//LASTLY, WE INCLUDE A BUTTON FOR THE USER TO PRESS WHEN THEY WOULD LIKE TO GENERATE THEIR PASSWORD AFTER CLICKING SAID CHECKBOXES AND ENTERING THEIR PASSWORD LENGTH
        <button class="btn btn-large" id="generate">Generate Password</button>
    </div>

*CSS
//THE FONT AND BACKGROUND COLOR WILL APPLY TO EVERYTHING IN THE BODY OF THE HTML
body {
  font-family: sans-serif;
  background-color: lightblue;
}

//WE HAVE ADDED PADDING AROUND THE CONTAINER SO THE USER'S PASSWORD OPTIONS CAN BE ENTERED CLOSER TO THE CENTER OF THE PAGE
.container {
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

//WE HAVE APPLIED PADDING, COLOR, AND CENTERED TEXT TO ALL H2 ELEMENTS, IN THIS CASE THE HEADLINE "PASSWORD GENERATOR"
h2 {
  text-align: center;
  padding: 20px;
  padding-top: 0px;
  color: hsl(206, 17%, 28%);
}

//WE HAVE APPLIED THE FONT ONCE MORE TO ALL OF THE LABELS WITHIN EACH VARIABLE/CHECKBOX OPTION
label {
    font-family: sans-serif;
}

//WE HAVE STYLED THE BUTTON THE USER MAY CLICK WHEN READY TO GENERATE THEIR PASSWORD, I PARTICULARLY LIKE ADDING A SHADOW FOR EFFECT
.btn {
  border: none;
  background-color: rgb(19, 8, 175);
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px 0px rgba(0, 0, 0, 0.2) 0px 1px 1px
    0px;
  color: hsl(0, 0%, 100%);
  display: inline-block;
  font-size: 22px;
  line-height: 22px;
  margin: 16px 16px 16px 20px;
  padding: 14px 34px;
  text-align: center;
  cursor: pointer;
}

//WE HAVE STYLED THE RESULT TO APPEAR IN BOLD
.result-container {
    font-weight: bold;
    padding: 20px;
}


.float-right {
  float: right;
}

*JAVASCRIPT
// MY FIRST STEP WAS TO GENERATE INITIAL FUNCTIONS, EACH OF WHICH UTILIZES THE NUMBERING SYSTEM OF CHAR CODE TO LAY OUT ALL THE OPTIONS FOR LOWERCASE LETTERS, UPPERCASE LETTERS, AND NUMBERS
//FOR THE SYMBOLS, I SELF-INSERTED THE SYMBOLS I WANTED TO UTILIZE AS A CONSTANT, AND RETURNED THESE SYMBOLS AT LENGTH
//MATH.FLOOR/MATH.RANDOM ENSURES WE SELECT THESE VARIABLES AT RANDOM AND WITH A WHOLE NUMBER ROUNDED TO AN INTEGER

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

//MY SECOND STEP WAS TO GENERATE A LATER FUNCTION TO CALL INITIAL FUNCTION
//THIS FUNCTION WILL CALL THE FUNCTIONS IN THIS ORDER
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//MY THIRD STEP WAS TO GENERATE WORK WITH THE DOM TO CALL ALL OF OUR CONSTANT VARIABLES
//WE OUTLINE THE RESULT, LENGTH OF THE PASSWORD, UPPERCASE, LOWERCASE, NUMBERS, SUMBOLS, AND GENERATE BUTTON
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

//MY FOURTH STEP WAS TO GENERATE EVENT LISTENERS, SO THAT WHEN THE USER CLICKS THE CHECKBOXES, THEY WILL BE ACTIVATED TO INCLUDE IN THE FINAL PASSWORD
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//MY FIFTH STEP WAS TO GENERATE A FUNCTION FOR THE ACTUAL PASSWORD AND TEST IT
function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = " ";

    const typesCounted = lower + upper + number + symbol;

    // TEST console.log('typesCounted: ', typesCounted);

    //CREATE ARRAY FOR WHAT WOULD LIE WITHIN OUR PASSWORD
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (item => Object.values(item)[0]
    );

    //TEST console.log('typesArr: ', typesArr);
    //IF THE USER DOESN'T CHECK ANY, THEY WON'T GET A PASSWORD
    if(typesCounted === 0) {
        return '';
    }

//MY SIXTH STEP WAS TO LOOP OVER THE LENGTH SO THAT THE GENERATOR WILL STOP PROCESSING VARIABLES ONCE IT HAS REACHED THE LENGTH OF THE ENTRY FOR THE PASSWORD
    for(let i = 0; i < length; i += typesCounted) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // TEST console.log('funcName: ', funcName);
            generatedPassword += randomFunc[funcName]();
        });
    }

//MY SEVENTH STEP WAS TO GENERATE THE FINAL PASSWORD GIVEN THE LENGTH, THE FINAL PASSWORD WILL SLICE OFF ONCE THE LENGTH OF THE PASSWORD ENTERED IS REACHED
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}



