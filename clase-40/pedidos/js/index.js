import { getResourceAll, postPedidos } from "./servicios.js";

//*********************************************************

/** fragment es un acumulador de elementos html con el objetivo de no hacer renderizar n veces con cada DOM con cada appendChild*/
let mesas__lista = document.getElementById("mesas__lista");
let cargandoMesas = document.getElementById("cargandoMesas");
let carta__categorias = document.getElementById("carta__categorias");
let carta__platos = document.getElementById("carta__platos");
let comanda = document.getElementById("comanda");
let global_mesa_id = 0;
let global_pedidos = [];
/***
 * {
 * mesa_id:5,
 * platos:[
 *  {
 *    plato_id:1,
 *    cant:3,
 *    precio:23
 *  },
 * {
 *   plato_id:5,
 * cant:3,
 * precio:12,
 * }
 * ]
 * }
 */

/**
 * funcion que add o resta una unidad al pedido de la emsa actual
 * dado el identificador del plato
 * @param{*}  accion "sumar|restar"
 * @param{*} id "id del plato a modificar"
 * @param{*} precio "precio unitario de la base de datos"
 * @param{*} nombre "nombre del plato"
 *
 */
const sumarRestarPlato = (accion, id, precio, nombre) => {
  if (global_mesa_id === 0) {
    return;
  }
  //va encontrar el pedido de la mesa global seleccionada e el arreglo global de pedidos
  let pedidoMesaActual = global_pedidos.find(
    (objPedido) => objPedido.mesa_id === global_mesa_id
  );
  if (pedidoMesaActual) {
    //signifca que lamesa actualya tenia un pedido inicial
    //preguntar si el plato ya existe en el pedido actual
    if (pedidoMesaActual.platos.find((plato) => plato.plato_id == id)) {
      pedidoMesaActual.platos = pedidoMesaActual.platos.filter((plato) => {
        if (accion === "sumar") {
          if (plato.plato_id == id) {
            plato.cant = plato.cant + 1;
            plato.precio = plato.cant * precio;
          }
        } else {
          if (plato.plato_id == id) {
            plato.cant = plato.cant - 1;
            plato.precio = plato.cant * precio;
          }
        }
        if (plato.cant > 0) {
          return plato;
        }
      });
    } else {
      if (accion === "sumar") {
        let objPlato = {
          plato_id: id,
          cant: 1,
          precio: precio,
          nombre: nombre,
        };
        pedidoMesaActual.platos.push(objPlato);
      }
    }
    //verificar si el plato que estoy sumando o restando, ya existe en el pedido y su primer
    console.log(global_pedidos);
  } else {
    if (accion === "sumar") {
      let objPedido = {
        mesa_id: global_mesa_id,
        platos: [
          {
            plato_id: id,
            cant: 1,
            precio: precio,
            nombre: nombre,
          },
        ],
      };
      global_pedidos.push(objPedido);
      console.log(global_pedidos);
    }
    //significa que la mesa actual inciara su primer pedido
  }
  paintComanda();
  // console.log(accion, id, precio, "ok");
};

const pagar = async() =>{
  const pedidoMesaActual = global_pedidos.find((objPedido) => (objPedido.mesa_id == global_mesa_id))
  let respuesta = await postPedidos(pedidoMesaActual)
  if (respuesta?.id) {
    Swal.fire({
      title: "Creado",
      icon: "success",
      text: "pedido pagado correctamente",
      position:"center",
      showConfirmButton: false,
      timer:1500
    })
    //borrar el pedido del arreglo globaldel pedido
    //retornar todos los peddos que sean diferentes de la mesa actual
    global_pedidos=global_pedidos.filter((objPedido)=>{objPedido.mesa_id!== global_mesa_id})
  }
  paintComanda();
}

const paintComanda = () => {
  comanda.innerHTML = "";
  comanda.innerHTML = `
  <h4 class="comanda__mesa">${global_mesa_id}</h4>
  <p class="comanda__usuario">Carlos Jimenez</p>
  <hr />
  `;
  let ul = document.createElement("ul");
  ul.classList.add("comanda__lista");
  //obteniendo el objeto de tipo de la mesa actual seleccionada
  let objPedidoActual = global_pedidos.find(
    (pedido) => pedido.mesa_id == global_mesa_id
  );
  // const fragment = new DocumentFragment();
  //verificar si la mesa selecionada global actual tiene platos en su pedido, por que podriatener un arreglo de 0platos
  //objePedidoAcutal? == kiere decir no me mandes el error nihaga nada de lo que esta adentro
  //objPedidoActual? == significa que si el objeto no tiene la propiedad platos , js no va a mandar un error por tener el identificador ?
  // y si no tiene el atributo platos, obtendra el tamnio del arreglo y procedera con la validacion
  if (objPedidoActual?.platos.length > 0) {
    objPedidoActual.platos.forEach((objPlato) => {
      const li = document.createElement("li");
      li.classList.add("comanda__item");
      li.innerHTML = `
                    <p class="comanda__nombre">
                      <span><strong>${objPlato.nombre}</strong></span>
                      <span>Precio: S/ ${objPlato.precio / objPlato.cant}</span>
                    </p>
                    <p class="comanda__cantidad">${objPlato.cant}</p>
                    <p class="comanda__precio">
                      <strong>S/ ${objPlato.precio}</strong>
                    </p>`;
      // fragment.appendChild(li)
      ul.appendChild(li);
    });
    comanda.appendChild(ul);
    const btnPagar = document.createElement("button");
    btnPagar.classList.add("btn", "btn-success");
    btnPagar.innerText = "PAGAR";
    btnPagar.onclick = () => {
      // pagar();
      Swal.fire({
        title: "Pagar?",
        text: "Se registraran los cambios en la base de datos",
        icon: "question",
        confirmButtonText: "Pagar",
        showCancelButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          pagar();
        }
      });
    };
    comanda.appendChild(btnPagar);
  } else {
    ul.innerText = "Mesa Libre";
    comanda.appendChild(ul);
  }
};
// paintComanda();

const paintMesas = (mesas) => {
  const fragment = new DocumentFragment();
  mesas.forEach(({ mesa_nro, mesa_id }) => {
    const mesaLi = document.createElement("li");
    mesaLi.classList.add("mesas__mesa");
    mesaLi.innerHTML = `<span class="mesas__titulo">Mesa</span>
    <span class="mesas__numero">${mesa_nro}</span> `;

    mesaLi.onclick = () => {
      let li = document.querySelectorAll(".mesas__lista .mesas__mesa");
      let liArray = Array.from(li);
      liArray.forEach((objLi) => {
        objLi.classList.remove("active");
      });
      global_mesa_id = mesa_id;
      console.log(global_mesa_id);
      mesaLi.classList.add("active");
      paintComanda();
    };
    fragment.appendChild(mesaLi);
  });
  mesas__lista.appendChild(fragment);

  cargandoMesas.setAttribute("hidden", "hidden");
  mesas__lista.removeAttribute("hidden");
};

const paintPlatos = (platos, cat) => {
  const fragment = new DocumentFragment();
  carta__platos.innerText = "";
  platos.forEach(
    ({ plato_pre, plato_id, plato_img, plato_nom, categoria_id }) => {
      if (categoria_id == cat) {
        const card = document.createElement("div");
        card.classList.add("carta__plato");
        card.innerHTML = `
        <img
          src="${plato_img}"
          alt=""
        />
        <h4 class="carta__titulo">${plato_nom}</h4>
        <span class="carta__precio">S/ ${plato_pre.toFixed(2)}</span>
      `;
        const btnContenedor = document.createElement("div");
        btnContenedor.classList.add("carta__botones");

        const btnSumar = document.createElement("button");
        btnSumar.classList.add("btn", "btn-outline-primary", "btn-sumar");
        btnSumar.innerText = "+1";
        btnSumar.onclick = () => {
          sumarRestarPlato("sumar", +plato_id, plato_pre, plato_nom);
        };

        const btnRestar = document.createElement("button");
        btnRestar.classList.add("btn", "btn-outline-primary", "btn-restar");
        btnRestar.innerText = "-1";
        btnRestar.onclick = () => {
          sumarRestarPlato("restar", +plato_id, plato_pre, plato_nom);
        };

        btnContenedor.appendChild(btnRestar);
        btnContenedor.appendChild(btnSumar);

        card.appendChild(btnContenedor);
        fragment.appendChild(card, plato_id);
      }
    }
  );
  carta__platos.appendChild(fragment);
};

const paintCategory = (categoria) => {
  const fragment = new DocumentFragment();
  categoria.forEach(({ categoria_id, categoria_nom }) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn-outline-primary");
    button.innerText = categoria_nom;
    button.onclick = () => {
      let botones = document.querySelectorAll(".carta__categorias button");
      let botonesArray = Array.from(botones);
      botonesArray.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      getAllPlatos(+categoria_id);
    };

    fragment.appendChild(button);
  });
  carta__categorias.appendChild(fragment);
};

const getAllPlatos = (cat) => {
  getResourceAll("platos").then((resp) => {
    // let platosFilter = resp.filter((objResp) => cat === objResp.categoria_id)
    // paintPlatos(platosFilter)
    paintPlatos(resp, cat);
  });
};
const getAllMesas = () => {
  getResourceAll("mesas").then((mesas) => {
    cargandoMesas.setAttribute("hidden", "hidden");
    paintMesas(mesas);
  });
};

const getAllCategoria = () => {
  getResourceAll("categoria").then((categoria) => {
    paintCategory(categoria);
  });
};
getAllMesas();
getAllCategoria();
