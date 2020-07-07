import dataAtletas from './data/atletas/atletas.js';
import { sortedAscendent, sortedDescendent } from './data.js';

const allAthletes = document.querySelector('#all-athletes');
const athletes = dataAtletas.atletas;
const dataDisciplines = athletes.filter(athlete => (athlete.disciplinas));
const data = dataDisciplines.filter(athletesList => (athletesList.disciplinas[0].año > 2007));

// mostrar a todos los atletas
const showAthletes = () => {
  let info = '';
  data.forEach((obj) => {
    const box = document.createElement('div');
    box.setAttribute('id', 'box');
    box.setAttribute('class', 'box');
    info = `<img src = ${obj.genero === 'F' ? './imagenes/avatarFem.png' : './imagenes/avatarMas.png'} class="avatar">
    <p class="name">${obj.nombre}</p>
    <p class="info">${obj.deporte}</p>
    <p class="info">${obj.disciplinas.map(year => year.año)}</p>
    <p class="info">${obj.equipo}</p>`;
    // <img class="flag" src ="https://www.countryflags.io/${defineFlag(obj.noc,)}/flat/64.png">`;
    allAthletes.appendChild(box);
    box.innerHTML = info;

    // informacion de atleta en un modal
    const showAthleteModal = () => {
      let infoAthleteModal = '';
      const boxModal = document.createElement('div');
      boxModal.setAttribute('id', 'box-modal');
      boxModal.setAttribute('class', 'box-modal');
      infoAthleteModal = `<div class="athlete">
      <span class="close" id="close">&times;</span>
      <img src = ${obj.genero === 'F' ? './imagenes/avatarFem.png' : './imagenes/avatarMas.png'} class="avatar2">
      <p class="name">${obj.nombre}</p>
      <table>
      <tr><td><p class="info">Genero: </p></td><td><p class="info">${obj.genero}</p></td></tr>
      <tr><td><p class="info">Altura: </p></td><td><p class="info">${obj.altura} cm</p></td></tr>
      <tr><td><p class="info">Peso: </p></td><td><p class="info">${obj.peso} kg</p></td></tr>
      <tr><td><p class="info">Deporte: </p></td><td><p class="info">${obj.deporte}</p></td></tr>
      <tr><td><p class="info">Disciplina: </p></td><td><p class="info">${obj.disciplinas.map(item => item.disciplina)}</p></td></tr>
      <tr><td><p class="info">Año de Participacion: </p></td><td><p class="info">${obj.disciplinas.map(year => year.año)}</p></td></tr>
      <tr><td><p class="info">Pais: </p></td><td><p class="info">${obj.equipo}</p></td></tr>
      </table>
      </div>`;
      document.querySelector('#modal-athlete').appendChild(boxModal);
      boxModal.innerHTML = infoAthleteModal;

      const close = document.querySelector('#close');
      close.addEventListener('click', () => {
        document.querySelector('#modal-athlete').removeChild(boxModal);
      });
    };
    // mostrar modal al hacer click
    box.addEventListener('click', () => {
      showAthleteModal(obj);
      document.querySelector('#modal-athlete').classList.remove('hide');
    });
  });
};
window.onload = showAthletes(data);

// funcionalidad del boton ordenar A-Z

document.getElementById('a-z').addEventListener('click', () => {
  allAthletes.innerHTML = '';
  showAthletes(sortedAscendent(data));
});

// funcionalidad del boton ordenar Z-A
document.getElementById('z-a').addEventListener('click', () => {
  allAthletes.innerHTML = '';
  showAthletes(sortedDescendent(data));
});

// lista de options en selects disciplinas
const disciplineListOne = data.map(atleta => atleta.disciplinas);
const disciplineListTwo = () => {
  const result = [];
  disciplineListOne.forEach((arr) => {
    arr.forEach((obj) => {
      result.push(obj.disciplina);
    });
  });
  return result;
};

const disciplineList = disciplineListTwo();
const disciplines = disciplineList.filter((element, indx, arr) => (arr.indexOf(element) === indx));
const selectDiscipline = document.querySelector('#discipline');
(() => {
  const orderDiscipline = disciplines.sort();
  orderDiscipline.forEach((discipline) => {
    const option = document.createElement('option');
    option.textContent = discipline;
    option.setAttribute('class', 'options');
    option.setAttribute('value', discipline);
    selectDiscipline.appendChild(option);
  });
})();

// lista de options en select paises
const countryList = data.map(paises => paises.equipo);
const countrys = countryList.filter((elemento, index, array) => array.indexOf(elemento) === index);
const selectCountry = document.querySelector('#country');
(() => {
  const orderCountrys = countrys.sort();
  orderCountrys.forEach((pais) => {
    const option = document.createElement('option');
    option.textContent = pais;
    option.setAttribute('value', pais);
    option.setAttribute('class', 'options');
    selectCountry.appendChild(option);
  });
})();