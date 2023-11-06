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
//~ siempre cuando uses async-await debe juntar todas tus promesas o las funciones que estan relacionadas para poder usar el async en una sola function
//^ function que retorna tanto el pais como la lista de departamento dado el id de un pais
// cualquier function que retorne una promesa tendra que ser conmusida como promesa

//! explicacion de async - await

/**
 * al colocar async en una function automaticamente esa function se vuvele promesa por lo cual y sabes como consumirla
 * la cuando usemos un return dentro del await es como usar resolve
 * throw es igual al reject lo consumimos como unreject normal
 */
const getAllPais = async (id) => {
  let paisEncontrado = await getPaisId(id);
  let depasEncontrado=await getDeparId(paisEncontrado.id)
  return {
    paisEncontrado,
    depasEncontrado
  }
};
getAllPais(3).then(response => console.log(response)).catch((error) => console.log(error))




const funcionAsincrona = async () => {
  return 200;
};
funcionAsincrona().then((response) => console.log(response));
