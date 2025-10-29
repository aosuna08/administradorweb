// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase, onValue, ref as refS, set, child, get, update, remove} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
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