let button01 = document.querySelector('#header__select-button-01');
let button02 = document.querySelector('#header__select-button-02');
let formAntecipation = document.querySelector('#form__antecipation');
let formPlr = document.querySelector('#form__plr');

button01.addEventListener('click', showAntecipationForm);
button02.addEventListener('click', showPlrForm);

function showAntecipationForm(){
  formAntecipation.classList.remove('hide');
  formPlr.classList.add('hide');
  button01.classList.add('header__select-button--active');
  button02.classList.remove('header__select-button--active');
}

function showPlrForm(){
  formAntecipation.classList.add('hide');
  formPlr.classList.remove('hide');
  button01.classList.remove('header__select-button--active');
  button02.classList.add('header__select-button--active');
}
