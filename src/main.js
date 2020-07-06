import dataAtletas from './data/atletas/atletas.js';
import { defineFlag, } from './data.js';

let info = '';
// mostrar a todos los atletas
const allAthletes = document.querySelector('#all-athletes');

const athletes = dataAtletas.atletas;
const dataDisciplines = athletes.filter(athlete => (athlete.disciplinas));
const data = dataDisciplines.filter(athletesList => (athletesList.disciplinas[0].año > 2007));

const showAthletes = (show) => {
    show.forEach((obj) => {
        const box = document.createElement('div');
        box.setAttribute('id', 'box');
        box.setAttribute('class', 'box');
        info = `<img src = ${obj.genero === 'F' ? './imagenes/avatarFem.png' : './imagenes/avatarMas.png'} class="avatar">
    <p class="name">${obj.nombre}</p>
    <p class="info">${obj.disciplinas.map(item => item.disciplina)}</p>
    <p class="info">${obj.disciplinas.map(year => year.año)}</p>
    <p class="info"><b>${obj.equipo}</b></p>
    <img class="flag" src ="https://www.countryflags.io/${defineFlag(obj.noc,)}/flat/64.png">`;
        allAthletes.appendChild(box);
        box.innerHTML = info;
    });
};
showAthletes(data);

document.getElementById('discipline').addEventListener('click', () => {
    document.getElementById('principal').style.display = 'block';
    document.getElementById('initial').style.display = 'none';
});