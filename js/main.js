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