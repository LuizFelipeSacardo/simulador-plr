let calculateButtoAnticipation = document.querySelector('#form__calculate-button');
let calculateButtonPlr = document.querySelector('#form__calculate-button-02');

calculateButtoAnticipation.addEventListener('click', calculateAnticipation);
calculateButtonPlr.addEventListener('click', calculatePlr)


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

  let taxToBePaid = totalIncomesToTax * taxAliquot - deduction - lastPlrTaxes;
  return taxToBePaid;
}



function calculatePlr(){

  let anticipationData = calculateAnticipation();

  let salaryInput = document.querySelector('#form__incomes-salary-02');  
  let lastPlrTotalValueInput = document.querySelector('#form__last-plr-total-02');
  let lastPlrTaxesInput = document.querySelector('#form__last-plr-taxes-02');

  salaryInput.value = anticipationData.fullSalary.toFixed(2);
  lastPlrTotalValueInput.value = anticipationData.anticipationTotalValue.toFixed(2);
  lastPlrTaxesInput.value = anticipationData.anticipationPaidTaxes.toFixed(2);

  let salary = Number(document.querySelector('#form__incomes-salary-02').value);  
  let lastPlrTotalValue = Number(document.querySelector('#form__last-plr-total-02').value);
  let lastPlrTaxes = Number(document.querySelector('#form__last-plr-taxes-02').value)


  let majorityRuleValue = 2.2 * salary;
  let profitShare = 2690.97;
  let fixedShare = 1064.79
  let variablesSecondSemestrer = Number(document.querySelector('#form__incomes-variables-02').value);
  let anticipationDeduction = 5461.93;
  let sindicateTax = 210.00;
  let totalIncomes = majorityRuleValue + profitShare + fixedShare + variablesSecondSemestrer - anticipationDeduction; 

  let totalIncomesToTax = totalIncomes + lastPlrTotalValue;
  let taxesToPay = calculateTaxes(totalIncomesToTax, lastPlrTaxes)
  let netValue = totalIncomes - taxesToPay - sindicateTax;

  let resultsOutput = document.querySelector('#results__output');
  let resultsSection = document.querySelector('#results');
  resultsSection.classList.remove('hide');
  resultsOutput.innerHTML = `<h3 class="results__title">RESULTADO</h3> Valor bruto: <span class="results__line">${totalIncomes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} <br> </span> Imposto de Renda:  <span class="results__line results__line--deductor"> ${taxesToPay.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span> <br>  Valor Liquido: <span class="results__line results__line--net"> ${netValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>`
}



function calculateAnticipation(){
  let salary = Number(document.querySelector('#form__incomes-salary').value);  
  let anticipationSalary = salary * 0.54;
  let profitShareAnticipation = 2807.03;
  let fixedShareAnticipation = 1684.21;
  let variablesFirstSemestrer = Number(document.querySelector('#form__incomes-variables').value);
  let lastPlrTotalValue = Number(document.querySelector('#form__last-plr-total').value);
  let lastPlrTaxes = Number(document.querySelector('#form__last-plr-taxes').value);
  let sindicateTax = 124.04

  let totalIncomes = anticipationSalary + profitShareAnticipation + fixedShareAnticipation + variablesFirstSemestrer - sindicateTax;
  let totalIncomesToTax = totalIncomes + lastPlrTotalValue;
  let taxesToPay = calculateTaxes(totalIncomesToTax, lastPlrTaxes);
  let netValue = totalIncomes - taxesToPay;

  let resultsOutput = document.querySelector('#results__output');
  let resultsSection = document.querySelector('#results');
  resultsSection.classList.remove('hide');
  resultsOutput.innerHTML = `<h3 class="results__title">RESULTADO</h3> Valor bruto: <span class="results__line">${totalIncomes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} <br> </span> Imposto de Renda:  <span class="results__line results__line--deductor"> ${taxesToPay.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span> <br>  Valor Liquido: <span class="results__line results__line--net"> ${netValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>`

  let anticipationData = {
    fullSalary: salary,
    anticipationTotalValue: totalIncomes,
    anticipationPaidTaxes: taxesToPay
  } 

  return anticipationData;
}