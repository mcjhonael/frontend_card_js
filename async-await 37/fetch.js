//~ fetch reemplaza a XMLHttpRequest => objeto para hacer peticion a un servdor externo y consumir datos a lo que se viene a decir apis
//?lo cual a venir una function mas resumida que es fetch
// consumir una api con fetch reqres.in
// end point es un urlcon diferentes verbos
//? un endpoint es una ruta queesta representando un conjunto de datos

// api para traer datos
let tbody = document.getElementById("tbody");
let alertaCargando=document.getElementById("alertaCargando")
let miTabla=document.getElementById("miTabla")
const url = "https://reqres.in/api/users";
//?fetch recibe una url
// fetch(url)
//   .then((response) => {
//     return response.json();
//   })
//   .then((myjson) => {
//     console.log(myjson.data);
//   });

const getUser = async () => {
  let response = await fetch(url);
  let myjson = await response.json();
  return myjson;
};
const llenarTable = (data) => {
  let contenido = "";
  data.forEach(({ id, first_name, last_name, email, avatar }) => {
    contenido += `
    <tr>
      <td>${id - 1}</td>
      <td>${id}</td>
      <td>${first_name}</td>
      <td>${last_name}</td>
      <td>${id}</td>
      <td><img src="${avatar}" alt="" width="80px"/></td>
      </tr>
  `;
  });
  tbody.innerHTML = contenido;
  miTabla.removeAttribute("hidden")
  alertaCargando.setAttribute("hidden","hidden")
};

getUser().then(({page,data}) => {
  llenarTable(data);
});
