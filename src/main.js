<<<<<<< HEAD
document.getElementById('discipline').addEventListener('click', () => {
    document.getElementById('principal').style.display = "block";
});


//import { example } from './data.js';
// import data from './data/atletas/atletas.js';
// import data from './data/lol/lol.js';
//import data from './data/pokemon/pokemon.js';

//console.log(example, data);
=======
//import { example } from './data.js';
import data from './data/atletas/atletas.js';
import * as functions from './data.js';
functions.sortData();
functions.filterData();


//import data from './data/lol/lol.js';
//import data from './data/pokemon/pokemon.js';

console.log(data);
console.log(filterData);
console.log(sortData);
>>>>>>> c800e876c9505ec30f47b67eb60daea215a78616
