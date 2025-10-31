import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
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

// Variables para refrenciar secciones
const contToyota = document.querySelector("#toyota + header + .contenedores");
const contNissan = document.querySelector("#nissan + header + .contenedores");
const contFord   = document.querySelector("#ford + header + .contenedores");

// Generar tarjeta para cada automovil
function crearTarjeta(auto) {
    const div = document.createElement("div");
    div.classList.add("tarjeta");

    div.innerHTML = `
        <h2 class="modelo">${auto.marca} ${auto.modelo}</h2>
        <img class="img" src="${auto.urlImag}" alt="${auto.marca} ${auto.modelo}">
        <p class="descripcion">${auto.descripcion}</p>
        <button class="boton">Más información</button>
    `;
    return div;
}

// Cargar automoviles eb el html
function mostrarAutomoviles() {
    const dbRef = refS(db, 'Automoviles');

    onValue(dbRef, (snapshot) => {
        contToyota.innerHTML = "";
        contNissan.innerHTML = "";
        contFord.innerHTML = "";

        snapshot.forEach(childSnapshot => {
            const auto = childSnapshot.val();
            const tarjeta = crearTarjeta(auto);
            const marca = auto.marca.toLowerCase();
            if (marca.includes("toyota")) contToyota.appendChild(tarjeta);
            else if (marca.includes("nissan")) contNissan.appendChild(tarjeta);
            else if (marca.includes("ford")) contFord.appendChild(tarjeta);
        });
    });
}

document.addEventListener('DOMContentLoaded', mostrarAutomoviles)