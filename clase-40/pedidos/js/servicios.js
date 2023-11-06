import { URL_BACKEND } from "./variables.js";
// otra manera de importar
// const { URL_BACKEND} = require("./variables")
// esto nos permite conectado con la base de datos un servicio un servidor
export const getResourceAll = async (recurso) => {
  const response = await fetch(`${URL_BACKEND}/${recurso}`);
  const json = response.json();
  return json;
};

export const postPedidos = async (objPedido) => {
  const response = await fetch(`${URL_BACKEND}/pedidos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(objPedido),
  });
  const json = await response.json();
  return json;
};
