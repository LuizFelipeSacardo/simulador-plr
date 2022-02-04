let calculateButtonAnticipation = document.querySelector('#form__calculate-button');
let calculateButtonPlr = document.querySelector('#form__calculate-button-02');
let redoButtonPlr = document.querySelector('#form__redo-button-02');
let redoButtonAnticipation = document.querySelector('#form__redo-button');
let resultsOutputTotal = document.querySelector('#results__output-total-value');
let resultsOutputTaxes = document.querySelector('#results__output-taxes-value');
let resultsOutputNet = document.querySelector('#results__output-net-value');
let button01 = document.querySelector('#header__select-button-01');
let button02 = document.querySelector('#header__select-button-02');
let formAntecipation = document.querySelector('#form__antecipation');
let formPlr = document.querySelector('#form__plr');
let calculateButton01 = document.querySelector('#form__calculate-button');
let calculateButton02 = document.querySelector('#form__calculate-button-02');
let resultsSection = document.querySelector('#results');

let salaryInput = document.querySelector('#form__incomes-salary-02').value;
let variablesSecondSemestrerInput = document.querySelector('#form__incomes-variables-02').value;
let lastPlrTotalValueInput = document.querySelector('#form__last-plr-total-02').value;
let lastPlrTaxesInput = document.querySelector('#form__last-plr-taxes-02').value;

button01.addEventListener('click', showAntecipationForm);
button02.addEventListener('click', showPlrForm);
calculateButtonAnticipation.addEventListener('click', calculateAnticipation);
calculateButtonPlr.addEventListener('click', calculatePlr);
redoButtonPlr.addEventListener('click', redoPlr);
redoButtonAnticipation.addEventListener('click', redoAntecipation);


function calculateTaxes(totalIncomesToTax, lastPlrTaxes){
  let taxAliquot = 0;
  let deduction = 0;

  if(totalIncomesToTax < 6677.56){
    taxAliquot = 0;
  }
  if(totalIncomesToTax <= 9922.28 && totalIncomesToTax >= 6677.56){
    taxAliquot = 0.075;
    deduction = 500.82;
  }
  if(totalIncomesToTax <= 13167 && totalIncomesToTax > 9922.28){
    taxAliquot = 0.15;
    deduction = 1244.99;
  }
  if(totalIncomesToTax <= 16380.38 && totalIncomesToTax > 13167.00){
    taxAliquot = 0.225;
    deduction = 2232.51;
  }
  if(totalIncomesToTax > 16380.38){
    taxAliquot = 0.275;
    deduction = 3051.53;
  }

  let taxToBePaid = (totalIncomesToTax * taxAliquot - deduction) - lastPlrTaxes;

  if(taxToBePaid < 0){
    return 0;
  } else{
    return taxToBePaid;
  }
}

function calculatePlr(){
  let salaryInput = document.querySelector('#form__incomes-salary-02').value;

  if(salaryInput != 0){
    let salaryInput = document.querySelector('#form__incomes-salary-02').value;
    let variablesSecondSemestrerInput = document.querySelector('#form__incomes-variables-02').value;
    let lastPlrTotalValueInput = document.querySelector('#form__last-plr-total-02').value;
    let lastPlrTaxesInput = document.querySelector('#form__last-plr-taxes-02').value;
  
    let salary = Number(salaryInput.replace(",", "."));
    let variablesSecondSemestrer = Number(variablesSecondSemestrerInput.replace(',', '.'));
    let lastPlrTotalValue = Number(lastPlrTotalValueInput.replace(',', '.'));
    let lastPlrTaxes = Number(lastPlrTaxesInput.replace(',', '.'));
  
    let majorityRuleValue = 2.2 * salary;
    let profitShare = 2807.03;
    let fixedShare = 1122.81
    let anticipationDeduction = (0.54 * salary) + 1684.21;
    let sindicateTax = 210.00;
    let totalIncomes = majorityRuleValue + profitShare + fixedShare + variablesSecondSemestrer - anticipationDeduction; 
  
    let totalIncomesToTax = totalIncomes + lastPlrTotalValue;
    let taxesToPay = calculateTaxes(totalIncomesToTax, lastPlrTaxes)
    let netValue = totalIncomes - taxesToPay - sindicateTax;
  
    let form = document.querySelector('#form__plr');
    calculateButtonPlr.classList.add('hide');
    redoButtonPlr.classList.remove('hide');
  
    form.classList.add('hide');
    
    let resultsSection = document.querySelector('#results');
    resultsSection.classList.remove('hide');
    resultsOutputTotal.innerHTML = `${totalIncomes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    resultsOutputTaxes.innerHTML = `${taxesToPay.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    resultsOutputNet.innerHTML = `${netValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`  
  } else{
    alert('Preencha o campo "Salário"');
  }  
}



function calculateAnticipation(){
  let salaryInput = document.querySelector('#form__incomes-salary').value;

  if(salaryInput != 0){
  let salaryInput = document.querySelector('#form__incomes-salary').value;
  let variablesFirstSemestrerInput = document.querySelector('#form__incomes-variables').value;
  let lastPlrTotalValueInput = document.querySelector('#form__last-plr-total').value;
  let lastPlrTaxesInput = document.querySelector('#form__last-plr-taxes').value;

  let salary = Number(salaryInput.replace(",", "."));
  let variablesFirstSemestrer = Number(variablesFirstSemestrerInput.replace(',', '.'));
  let lastPlrTotalValue = Number(lastPlrTotalValueInput.replace(',', '.'));
  let lastPlrTaxes = Number(lastPlrTaxesInput.replace(',', '.'));

  let anticipationSalary = salary * 0.54;
  let profitShareAnticipation = 2807.03;
  let fixedShareAnticipation = 1684.21;
  let sindicateTax = 124.04

  let totalIncomes = anticipationSalary + profitShareAnticipation + fixedShareAnticipation + variablesFirstSemestrer - sindicateTax;
  let totalIncomesToTax = totalIncomes + lastPlrTotalValue;
  let taxesToPay = calculateTaxes(totalIncomesToTax, lastPlrTaxes);
  let netValue = totalIncomes - taxesToPay;

  let form = document.querySelector('#form__antecipation');
  calculateButtonAnticipation.classList.add('hide');
  redoButtonAnticipation.classList.remove('hide');

  form.classList.add('hide');

  let resultsSection = document.querySelector('#results');
  resultsSection.classList.remove('hide');
  resultsOutputTotal.innerHTML = `${totalIncomes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
  resultsOutputTaxes.innerHTML = `${taxesToPay.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
  resultsOutputNet.innerHTML = `${netValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
  } else{
    alert('Preencha o campo "Salário"');
  }  
}


//visual effects
function redoPlr(){   
  redoButtonPlr.classList.add('hide');
  redoButtonAnticipation.classList.add('hide');
  calculateButtonPlr.classList.remove('hide');
  calculateButtonAnticipation.classList.add('hide');
  resultsSection.classList.add('hide');
  formPlr.classList.remove('hide');
  formAntecipation.classList.add('hide');
}

function redoAntecipation(){
  redoButtonPlr.classList.add('hide');
  redoButtonAnticipation.classList.add('hide');
  calculateButtonPlr.classList.add('hide');
  calculateButtonAnticipation.classList.remove('hide');
  resultsSection.classList.add('hide');
  formAntecipation.classList.remove('hide'); 
}


function showAntecipationForm(){
  redoButtonPlr.classList.add('hide');
  redoButtonAnticipation.classList.add('hide');
  resultsSection.classList.add('hide');
  formAntecipation.classList.remove('hide');
  formPlr.classList.add('hide');
  button01.classList.add('header__select-button--active');
  button02.classList.remove('header__select-button--active');
  calculateButton01.classList.remove('hide');
  calculateButton02.classList.add("hide");
}

function showPlrForm(){
  redoButtonPlr.classList.add('hide');
  redoButtonAnticipation.classList.add('hide');
  resultsSection.classList.add('hide');
  formAntecipation.classList.add('hide');
  formPlr.classList.remove('hide');
  button01.classList.remove('header__select-button--active');
  button02.classList.add('header__select-button--active');
  calculateButton01.classList.add('hide');
  calculateButton02.classList.remove('hide');
}