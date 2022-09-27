const switchElement = document.querySelector('.switch');
const billInput = document.getElementById('total-bill');
const peopleInput = document.getElementById('num-of-people');
const tipPerPerson = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total-amount');
const tips = document.querySelectorAll('.button');
const tipCustom = document.querySelector('.tip-custom')
const resetBtn = document.querySelector('.reset-btn')
const error = document.querySelector('.error')

switchElement.addEventListener('click', () => {
    document.body.classList.toggle('dark')
});

tips.forEach((val) => {
    val.addEventListener('click', handleClick)
});

billInput.addEventListener('input', billInputFun);
peopleInput.addEventListener('input', peopleInputFun);
tipCustom.addEventListener('input', tipInputFun)
resetBtn.addEventListener('click', reset)

/*billInput.value = '0.0';
peopleInput.value = '1';*/
tipPerPerson.innerHTML = '$' + (0.0).toFixed(2);
totalPerPerson.innerHTML = '$' + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 0; 
let tipValue = 0.15;

function billInputFun() {
    billValue = parseFloat(billInput.value)
    calculateTip()
}

function peopleInputFun() {
    peopleValue = parseFloat(peopleInput.value)

    if (peopleValue < 1) {
        error.style.display = "flex"
        tipPerPerson.innerHTML = '$' + (0.0).toFixed(2);
        totalPerPerson.innerHTML = '$' + (0.0).toFixed(2);
    } else {
        error.style.display = "none"
        calculateTip()
    }
    
}

function tipInputFun() {
    tipValue = parseFloat(tipCustom.value / 100)

    tips.forEach((val) => {
        val.classList.remove('active-btn')
    })
    calculateTip()
}

function handleClick(event) {
    tips.forEach((val) => {
        val.classList.remove('active-btn')
        if(event.target.innerHTML == val.innerHTML){
            val.classList.add('active-btn')
            tipValue = parseFloat(val.innerHTML) / 100;
        }
    })
    calculateTip()
}

function calculateTip() {
    if(peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + (billValue * tipValue)) / peopleValue;
        tipPerPerson.innerHTML = '$' + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = '$' + total.toFixed(2);
    }
}

function reset() {
    billInput.value = '';
    billInputFun()
    peopleInput.value = '';
    peopleInputFun()
    tipCustom.value = ''
}