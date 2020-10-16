import dataAtletas from './data/atletas/atletas.js';
import {
  sortedAscendent,
  sortedDescendent,
  filterByGender,
  filterByCountry,
  filterByDiscipline,
} from './data.js';

// filtrando la data para trabajar con los atletas desde Beijing 2008
const athletes = dataAtletas.atletas;
const dataDisciplines = athletes.filter(athlete => (athlete.disciplinas));
const data = dataDisciplines.filter(athletesList => (athletesList.disciplinas[0].año > 2007));

// declarando variables
const allAthletes = document.querySelector('#all-athletes');
let eventOrder = 0;
let dataToSort;
let dataFilteredD;
let dataFilteredC;
let dataFilteredG;

// mostrar a todos los atletas
const showAthletes = (dataAmostrar) => {
  let info = '';
  dataAmostrar.forEach((obj) => {
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
      <p class="name-modal">${obj.nombre}</p>
      <table>
      <tr><td><p class="info-modal">Género: </p></td><td><p class="info-modal">${obj.genero === 'F' ? '<i class="fas fa-venus"></i>' : '<i class="fas fa-mars"></i>' }</p></td></tr>
      <tr><td><p class="info-modal">Altura: </p></td><td><p class="info-modal"><i class="fas fa-ruler-vertical"></i> ${obj.altura} cm</p></td></tr>
      <tr><td><p class="info-modal">Peso: </p></td><td><p class="info-modal"><i class="fas fa-weight"></i> ${obj.peso} kg</p></td></tr>
      <tr><td><p class="info-modal">Deporte: </p></td><td><p class="info-modal"> ${obj.deporte}</p></td></tr>
      <tr><td><p class="info-modal">Disciplina: </p></td><td><p class="info-modal"> ${obj.disciplinas.map(item => item.disciplina)}</p></td></tr>
      <tr><td><p class="info-modal">País: </p></td><td><p class="info-modal"><i class="fas fa-home"></i> ${obj.equipo}</p></td></tr>
      <tr><td><p class="info-modal">Año de Participación: </p></td><td><p class="info-modal"><i class="fas fa-calendar-alt"></i> ${obj.disciplinas.map(year => year.año)}</p></td></tr>
      <tr><td><p class="info-modal">Sede Olímpica: </p></td><td><p class="info-modal"><i class="fas fa-archway"></i> ${obj.disciplinas.map(city => city.ciudad)}</p></td></tr>
      <tr><td><p class="info-modal">Medallas: </p></td><td><p class="info-modal"><i class="fas fa-medal"></i> ${obj.disciplinas.map(medal => medal.medalla)}</p></td></tr>
      </table>
      </div>`;
      document.querySelector('#modal-athlete').appendChild(boxModal);
      boxModal.innerHTML = infoAthleteModal;

      // funcionalidad cerrar modal
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
showAthletes(data);

// funcionalidad del boton ordenar A-Z
document.getElementById('a-z').addEventListener('click', () => {
  if (eventOrder === 0) {
    dataToSort = data;
  }
  if (eventOrder === 1) {
    dataToSort = dataFilteredG;
  }
  if (eventOrder === 2) {
    dataToSort = dataFilteredD;
  }
  if (eventOrder === 3) {
    dataToSort = dataFilteredC;
  }

  allAthletes.innerHTML = '';
  showAthletes(sortedAscendent(dataToSort));
});

// funcionalidad del boton ordenar Z-A
document.getElementById('z-a').addEventListener('click', () => {
  if (eventOrder === 0) {
    dataToSort = data;
  }
  if (eventOrder === 1) {
    dataToSort = dataFilteredG;
  }
  if (eventOrder === 2) {
    dataToSort = dataFilteredD;
  }
  if (eventOrder === 3) {
    dataToSort = dataFilteredC;
  }

  allAthletes.innerHTML = '';
  showAthletes(sortedDescendent(dataToSort));
});

// funcionalidad del filtro por genero
const genderFilter = document.querySelector('#genderFilter');

genderFilter.addEventListener('change', () => {
  eventOrder = 1;
  const value = genderFilter.value;
  document.getElementById('disciplineFilter').value = '';

  if (countrysFilter.value !== ''){
    dataFilteredG = filterByGender(filterByCountry(data, countrysFilter.value), value);
  } else {
    dataFilteredG = filterByGender(data, value);
  }
  
  allAthletes.innerHTML = '';
  showAthletes(dataFilteredG);
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
const selectDiscipline = document.querySelector('#disciplineFilter');
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


// funcionalidad del filtro por disciplinas
const disciplinesFilter = document.getElementById('disciplineFilter');
disciplinesFilter.addEventListener('change', () => {
  eventOrder = 2;
  const value = disciplinesFilter.value;

  // document.getElementById('countryFilter').value = '';
  document.getElementById('genderFilter').value = '';

  if (countrysFilter.value !== ''){
    dataFilteredD = filterByDiscipline(filterByCountry(data, countrysFilter.value), value);
  } else {
    dataFilteredD = filterByDiscipline(data, value);
  }
  
  allAthletes.innerHTML = '';
  showAthletes(dataFilteredD);
});


// lista de options en select paises
const countryL = data.map(atletas => atletas.equipo);
const countrys = countryL.filter((elemento, index, array) => (array.indexOf(elemento) === index));
const selectCountry = document.querySelector('#countryFilter');
(() => {
  const orderCountrys = countrys.sort();
  orderCountrys.forEach((country) => {
    const option = document.createElement('option');
    option.textContent = country;
    option.setAttribute('value', country);
    option.setAttribute('class', 'options');
    selectCountry.appendChild(option);
  });
})();

// funcionalidad del filtro por pais
const countrysFilter = document.getElementById('countryFilter');
countrysFilter.addEventListener('change', () => {
  eventOrder = 3;
  const value = countrysFilter.value;

  if (genderFilter.value !== ''){
    disciplinesFilter.value = '';
    dataFilteredC = filterByCountry(filterByGender(data, genderFilter.value), value);
  } 
  if (disciplinesFilter.value !== ''){
    dataFilteredC = filterByCountry(filterByDiscipline(data, disciplinesFilter.value), value);
  }
  if (genderFilter.value === '' && disciplinesFilter.value === ''){
    dataFilteredC = filterByCountry(data, value);
  }

  allAthletes.innerHTML = '';
  showAthletes(dataFilteredC);
});

// funcionalidad del input buscar por nombre
const searcher = document.getElementById('search');

searcher.addEventListener('input', (e) => {
  const typedValue = e.target.value.toLowerCase();
  const names = document.querySelector('#all-athletes').getElementsByTagName('div');
  Array.from(names).forEach((box) => {
    const athleteName = box.childNodes[2].textContent;
    const boxes = box;
    if (athleteName.toLowerCase().indexOf(typedValue) !== -1) {
      boxes.style.display = 'block';
    } else {
      boxes.style.display = 'none';
    }
  });
});

// funcionalidad del boton go-top go-down
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 900) {
    document.querySelector('#go-top').classList.remove('hide');
    document.querySelector('#go-down').classList.remove('hide');
  } else {
    document.querySelector('#go-top').classList.add('hide');
    document.querySelector('#go-down').classList.add('hide');
  }
  if (window.pageYOffset > 197000) {
    document.querySelector('#go-down').classList.add('hide');
  }
});

document.getElementById('go-top').addEventListener('click', () => {
  const header = document.querySelector('.header');
  header.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('go-down').addEventListener('click', () => {
  const footer = document.querySelector('.athlos-info');
  footer.scrollIntoView({ behavior: 'smooth' });
});
