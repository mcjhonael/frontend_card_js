import { getPopulares, limitCaracters, searchPeliculas } from "./fun.js";
import { URL_IMG } from "./var.js";
//? peticion http es invocar un endpoint https://reqres.in/user (endpoint)
//? en la peticon http hay diferentes verbos http (get,post,put,delete,path)
//?toda petiicon debe incluir un verbo http
//? en una peticion http tbm hay cabeceras(headers) => informacion adicional de la peticion ejm: el tipo de contenido que estoy mandando al servidor
//? en una peticion tambien se puede mandar contenido y eso va en el body
//? una api rest es un conjunto endpoint
//?cuando hagas con metodo get o quieras listar un recuerso entones debes hacerlo sin headers ni body

//! respuesta http siempre contiene el status http por parte del servidorejm 200 = todo ok, etc
//?contiene un body la cual el seridor envia para poder comunicar

//? una api rest es todo lo anterior para un end point
//?aprendiendo importaciones y exportaciones

// ?aqui vendria ya el consumo ya que hemos separado en un archivo las variables otro los metodos y ahora el consumo

const contenedorCarrusel = document.getElementById("contenedorCarrusel");
const inputBuscador = document.getElementById("inputBuscador");
const resultados = document.getElementById("resultados");

inputBuscador.onkeyup = () => {
  if (inputBuscador.value.length < 3) {
    //todo: limpiar la zona de resultados
    resultados.innerText=""
    return;
  }
  searchPeliculas(inputBuscador.value).then(({ results }) => {
    dibujarBusqueda(results);
  });
};
const flkty = new Flickity(contenedorCarrusel, {
  freeScroll: true,
  autoPlay: 1000,
});

const dibujarBusqueda = (results) => {
  console.log(results);
  results.forEach((objResul) => {
    let col = document.createElement("div");
    col.classList.add("col-md-2");
    col.innerHTML = `
    <div class="card text-dark">
      <img class="card-img-top" src="${URL_IMG}${objResul.poster_path}" alt="">
      <div class="card-body">
      <h4 class="card-title">${objResul.title}</h4>
      <p class="card-text">${limitCaracters(objResul)}</p>
      </div>
    </div>
    `;
    resultados.appendChild(col);
  });
  // flkty.select(results.length / 2);
};


const showPeliculas = (results) => {
  results.forEach((objResul) => {
    let card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "carousel-cell","card-flickity");
    card.innerHTML = `
    <img class="card-img-top" src="${URL_IMG}${objResul.poster_path}" alt="">
    <div class="card-body">
    <h4 class="card-title">${objResul.title}</h4>
    <p class="card-text">${limitCaracters(objResul)}</p>
    </div>
    `;

    flkty.append(card);
  });
  flkty.select(results.length / 2);
  // flkty.on("settle", function (index) {
  //   if (index==19) {
  //     console.log("final");
  //   }
  // })
};
//? para poder usar flickity tenemos que tener el contenedor ya lleno de elementos que deseamos mostrar en el caroulse

getPopulares().then(({ results }) => {
  showPeliculas(results);
});
