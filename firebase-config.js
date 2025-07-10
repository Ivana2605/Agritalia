// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBGeFazvjgtDUbB-VSJlEcXDe4bW-r0sJs",
    authDomain: "agritalia-app.firebaseapp.com",
    projectId: "agritalia-app",
    storageBucket: "agritalia-app.appspot.com",
    messagingSenderId: "935329247921",
    appId: "1:935329247921:web:d9de1aa832e2432170a890",
    measurementId: "G-F6YD3Y19FD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

