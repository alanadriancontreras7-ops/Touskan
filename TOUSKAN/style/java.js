// ==========================================
// CARRITO DE TOWSKAN
// ==========================================


// Obtener carrito guardado
let carrito = JSON.parse(localStorage.getItem("carritoTowskan")) || [];


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

function agregarProducto(nombre, precio, imagen, descripcion) {

    // Buscar si ya existe
    let productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );


    if (productoExistente) {

        // Si existe, aumentar cantidad
        productoExistente.cantidad++;

    } else {

        // Si no existe, agregarlo
        carrito.push({

            nombre: nombre,

            precio: precio,

            imagen: imagen,

            descripcion: descripcion,

            cantidad: 1

        });

    }


    // Guardar carrito
    guardarCarrito();


    // Mostrar mensaje
    mostrarMensaje(nombre);

}


// ==========================================
// GUARDAR CARRITO
// ==========================================

function guardarCarrito() {

    localStorage.setItem(
        "carritoTowskan",
        JSON.stringify(carrito)
    );

}


// ==========================================
// MENSAJE AL AGREGAR
// ==========================================

function mostrarCarrito() {

    let lista = document.getElementById("listaCarrito");

    // Si estamos en index.html,
    // no hacemos nada
    if (!lista) {
        return;
    }

    lista.innerHTML = "";


    if (carrito.length === 0) {

        lista.innerHTML = `

            <div class="text-center p-4">

                <i
                    class="bi bi-cart-x"
                    style="font-size:40px;color:#b74700;">
                </i>

                <p class="mt-3">
                    Tu pedido está vacío.
                </p>

                <a
                    href="index.html"
                    class="btn btn-warning">

                    Ver menú

                </a>

            </div>

        `;

        actualizarResumen();

        return;
    }


    carrito.forEach(function(producto, indice) {

        lista.innerHTML += `

            <div class="product-card mb-3">

                <div class="product-image">

                    ${
                        producto.imagen

                        ?

                        `<img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                        >`

                        :

                        `<div
                            class="d-flex align-items-center justify-content-center h-100"
                            style="background:#ffe8df;">

                            <i
                                class="bi bi-plus-circle"
                                style="font-size:25px;color:#b74700;">
                            </i>

                        </div>`
                    }

                </div>


                <div class="product-info">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h5>
                                ${producto.nombre}
                            </h5>

                            <p>
                                ${producto.descripcion}
                            </p>

                        </div>


                        <button
                            class="delete-btn"
                            onclick="eliminarProducto(${indice})">

                            ×

                        </button>

                    </div>


                    <div class="product-bottom">

                        <strong>
                            $${producto.precio.toFixed(2)}
                        </strong>


                        <div class="quantity">

                            <button
                                onclick="disminuirCantidad(${indice})">

                                −

                            </button>


                            <span>
                                ${producto.cantidad}
                            </span>


                            <button
                                onclick="aumentarCantidad(${indice})">

                                +

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });


    actualizarResumen();

}
// ==========================================
// AUMENTAR CANTIDAD
// ==========================================

function aumentarCantidad(indice) {

    carrito[indice].cantidad++;

    guardarCarrito();

    mostrarCarrito();

}
// ==========================================
// DISMINUIR CANTIDAD
// ==========================================

function disminuirCantidad(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    } else {

        carrito.splice(indice, 1);

    }


    guardarCarrito();

    mostrarCarrito();

}
// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();

    mostrarCarrito();

}
// ==========================================
// ACTUALIZAR RESUMEN
// ==========================================

function actualizarResumen() {

    let subtotal = 0;

    let cantidadTotal = 0;


    carrito.forEach(function(producto) {

        subtotal +=
            producto.precio * producto.cantidad;

        cantidadTotal +=
            producto.cantidad;

    });


    // Impuesto 18%
    let impuestos = subtotal * 0.18;


    // Envío
    let envio = carrito.length > 0
        ? 3.50
        : 0;


    let total =
        subtotal +
        impuestos +
        envio;


    // Actualizar HTML

    let subtotalElemento =
        document.getElementById("subtotal");

    let impuestosElemento =
        document.getElementById("impuestos");

    let envioElemento =
        document.getElementById("envio");

    let totalElemento =
        document.getElementById("total");

    let cantidadElemento =
        document.getElementById("cantidadArticulos");


    if (subtotalElemento) {

        subtotalElemento.textContent =
            "$" + subtotal.toFixed(2);

    }


    if (impuestosElemento) {

        impuestosElemento.textContent =
            "$" + impuestos.toFixed(2);

    }


    if (envioElemento) {

        envioElemento.textContent =
            "$" + envio.toFixed(2);

    }


    if (totalElemento) {

        totalElemento.textContent =
            "$" + total.toFixed(2);

    }


    if (cantidadElemento) {

        cantidadElemento.textContent =
            cantidadTotal;

    }

}
// ==========================================
// INICIAR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarCarrito();

    }
);