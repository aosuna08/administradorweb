// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, onValue, ref as refS, set, child, get, update, remove }from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPjBkuj1fu8LoetqT4WkNXKSHth32cNYg",
    authDomain: "proyectowebfinal-588.firebaseapp.com",
    projectId: "proyectowebfinal-588",
    storageBucket: "proyectowebfinal-588.firebasestorage.app",
    messagingSenderId: "608066839985",
    appId: "1:608066839985:web:a8918aa4048e19b6404990"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

// declarar unas variables global
var numSerie = 0;
var marca = "";
var modelo = "";
var descripcion = "";
var urlImag = "";


// funciones
function leerInputs() {
    numSerie = document.getElementById('txtNumSerie').value;
    marca = document.getElementById('txtMarca').value;
    modelo = document.getElementById('txtModelo').value;
    descripcion = document.getElementById('txtDescripcion').value;
    urlImag = document.getElementById('txtUrl').value;
}

function mostrarMensaje(mensaje) {
    var mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = 'block';
    setTimeout(()=>{
        mensajeElement.style.display = 'none';
    },1000);
}

// agregar producto a la base de datos
const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', insertarProducto);

function insertarProducto() {
    alert("ingrese a add db");
    leerInputs();
    //validar
    if(numSerie === "" || marca === "" || modelo === "" || descripcion === "") {
        mostrarMensaje("faltaron datos por capturar");
        return;
    }
    // funcion de Firebase para agregar registro
    set(
        refS(db,'Automoviles/' + numSerie), {
            // datos a guardar
            // realizar json con los campos y datos de la tabla
            // campo:valor
            numSerie:numSerie,
            marca:marca,
            modelo:modelo,
            descripcion:descripcion,
            urlImag:urlImag
        }
    ).then(()=>{
        alert("Se agrego con exito");
    }).catch((error)=>{
        alert("Ocurrio un error");
    });
}

// codifica el boton de buscar
// agregar las siguientes funciones
function limpiarInputs() {
    document.getElementById('txtNumSerie').value = '';
    document.getElementById('txtModelo').value = '';
    document.getElementById('txtMarca').value = '';
    document.getElementById('txtDescripcion').value = '';
    document.getElementById('txtUrl').value = '';
}

function escribirInputs() {
    document.getElementById('txtModelo').value = modelo;
    document.getElementById('txtMarca').value = marca;
    document.getElementById('txtDescripcion').value = descripcion;
    document.getElementById('txtUrl').value = urlImag;
}

function buscarProducto() {
    let numSerie = document.getElementById('txtNumSerie').value.trim();
    if (numSerie === "") {
        mostrarMensaje("No se ingresó Num Serie");
        return;
    }

    const dbref = ref(db);
    get(child(dbref, 'Automoviles/' + numSerie)).then((snapshot) => {
        if (snapshot.exists()) {
            marca = snapshot.val().marca;
            modelo = snapshot.val().modelo;
            descripcion = snapshot.val().descripcion;
            urlImag = snapshot.val().urlImag;
            escribirInputs();
        } else {
            limpiarInputs();
            mostrarMensaje("El producto con código " + numSerie + " no existe.");
        }
    });
}
btnBuscar.addEventListener('click', buscarProducto);

// listar productos
function Listarproductos() {
    const dbRef = refS(db, 'Automoviles');
    const tabla = document.getElementById('tablaProductos');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;

            const data = childSnapshot.val();
            var fila = document.createElement('tr');

            var celdaCodigo = document.createElement('td');
            celdaCodigo.textContent = childKey;
            fila.appendChild(celdaCodigo);

            var celdaNombre = document.createElement('td');
            celdaNombre.textContent = data.marca;
            fila.appendChild(celdaNombre);

            var celdaPrecio = document.createElement('td');
            celdaPrecio.textContent = data.modelo;
            fila.appendChild(celdaPrecio);

            var celdaCantidad = document.createElement('td');
            celdaCantidad.textContent = data.descripcion;
            fila.appendChild(celdaCantidad);


            var celdaImagen = document.createElement('td');
            var imagen = document.createElement('img');
            imagen.src = data.urlImag;
            imagen.width = 100;
            celdaImagen.appendChild(imagen);
            fila.appendChild(celdaImagen);
            tbody.appendChild(fila);
        });
    }, { onlyOnce: true });
}
document.addEventListener('DOMContentLoaded', Listarproductos)