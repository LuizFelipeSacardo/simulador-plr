let calculateButtonAnticipation = document.querySelector('#form__calculate-button');
let calculateButtonPlr = document.querySelector('#form__calculate-button-02');
let redoButtonPlr = document.querySelector('#form__redo-button');
let redoButtonAnticipation = document.querySelector('#form__redo-button-02');
let resultsOutputTotal = document.querySelector('#results__output-total-value');
let resultsOutputTaxes = document.querySelector('#results__output-taxes-value');
let resultsOutputNet = document.querySelector('#results__output-net-value');



calculateButtonAnticipation.addEventListener('click', calculateAnticipation);
calculateButtonPlr.addEventListener('click', calculatePlr);
redoButtonPlr.addEventListener('click', redoPlr);
redoButtonPlr.addEventListener('click', redoAntecipation);


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
  return taxToBePaid;
}



function calculatePlr(){
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
}



function calculateAnticipation(){
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
}

function redoPlr(){
  redoButtonPlr.classList.add('hide');
  redoButtonAnticipation.classList.add('hide');
  calculateButtonPlr.classList.remove('hide');
  calculateButtonAnticipation.classList.add('hide');
  resultsSection.classList.add('hide');
  formPlr.classList.remove('hide');
}

function redoAntecipation(){
  redoButtonPlr.classList.add('hide');
  redoButtonAnticipation.classList.add('hide');
  calculateButtonPlr.classList.add('hide');
  calculateButtonAnticipation.classList.remove('hide');
  resultsSection.classList.add('hide');
  formAntecipation.classList.remove('hide'); 
}