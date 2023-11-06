// let nombre = ["kiko", "koko", "pamela"];
// let [...name] = nombre;
// console.log(name);

// let datos = {
//   nombre: "pamela",
//   codigo: 21,
// };

// let { nombre:names , codigo } = datos
// console.log(names,codigo);

// promesas
//? toda promesa devuelve un respuesta (buena | mala) como si fuera un retorno
//?las promesas noa ayuda a esperar un proceso asincrono
//& es importante que en la promesa exista un proceso asincrno, o en caso contrario no serviria utilizarla
//! resolve()=> cuando result es positivo
//! reject()=> cuando result es negativo
//! .then() => recibe el resolve
//! .catch()=>r recibe el reject
// let miPromesa=new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //?en el resolve y reject solo envia un elemento como parametro de cualquier tipo
//     resolve("resultados")
//   }, 2000);
// })

// let miPromesa=new Promise((resolve, reject) => {
// })

// let prom = () => {
//   return new Promise((resolve, reject) => {
//     //proceso asincrono

//   });
// }
// prom().then().catch()

// practica
let paises = [
  { id: 1, nombre: "Peru" },
  { id: 2, nombre: "Bolivia" },
  { id: 3, nombre: "Chile" },
  { id: 4, nombre: "Argentina" },
];

let departamento = [
  { id: 1, nombre: "Lima", paisId: 1 },
  { id: 2, nombre: "Arequipa", paisId: 1 },
  { id: 3, nombre: "Puno", paisId: 1 },
  { id: 4, nombre: "La Paz", paisId: 2 },
  { id: 5, nombre: "Cochabamba", paisId: 2 },
  { id: 6, nombre: "Santa Cruz", paisId: 2 },
];

// busqueda por el id
const getPaisId = (ids) => {
  let search = new Promise((resolve, reject) => {
    setTimeout(() => {
      const pais = paises.find(({ id }) => id === ids);
      pais ? resolve(pais) : reject("no hay coincidencias");
    }, 1000);
  });

  return search;
};

const getDeparId = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const depas = departamento.filter(({ paisId }) => paisId === id);
      depas ? resolve(depas) : reject("no hay depas");
    }, 1000);
  });
};
//~ una manera de consumir una promesa dentro de otra promesa por lo cual se aria un callback hell
//^ getPaisId(2)
//^   .then(({ id, nombre }) => {
//^     console.log(id, nombre);
//^     getDeparId(id).then((response)=>console.log(response));
//^   })
//^   .catch((error) => console.log(error));

getPaisId(1)
  .then(({ id, nombre }) => {
    console.log(id, nombre);
    // getDeparId(id).then((response)=>console.log(response));
    return getDeparId(id);
  })
  .then((response)=>console.log(response))
  .catch((error) => console.log(error));

// getDeparId(1)
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));
