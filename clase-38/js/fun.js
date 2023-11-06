import { URL_BACKEND, API_KEY } from "./var.js";
//~ otra manera de importar todas las variables que hayamos exportaodos de otros archivos seria asi

// import * as name_objeto from 'carpeta_var_exportados'
// el name_objeto almacenara todo las variables exportadas y para poder buscar tendremos que acceder como objeto con el punto
//? en nodejs otra manera seria usando esto por lo cual ya no  necesitamos colocar a las variables export
// module.exports = {
//   URL_BACKEND: URL_BACKEND,
//   API_KEY:API_KEY,
// };
// ojo con el import esla nueva tendencia de uso de modules la antigua era
// const packageName = require('packageName');


export const searchPeliculas = async (busqueda) => {
  const response = await fetch(
    `${URL_BACKEND}search/movie?api_key=${API_KEY}&language=es-PE&query=${busqueda}&page=1&include_adult=false`
  );
  const json = await response.json();
  return json;
};

//! vamos a consumir la api DBMOVIE
export const getPopulares = async () => {
  const response = await fetch(
    `${URL_BACKEND}movie/popular?api_key=${API_KEY}&language=es-PE&page=1`
  );
  const json = await response.json();
  return json;
};

export const limitCaracters = ({ title, overview }) => {
  if (title.length > 40) {
    return overview.substr(0, 50) + " <a href='#'>ver mas... </a>";
  } else {
    return overview.substr(0, 100) + " <a href='#'>ver mas... </a> ";
  }
};
