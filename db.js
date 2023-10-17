import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBtaPyXI1p8A8f9m9YQOPWGzJTnCf744Z8",
    authDomain: "mobile-28c28.firebaseapp.com",
    projectId: "mobile-28c28",
    storageBucket: "mobile-28c28.appspot.com",
    messagingSenderId: "954063427997",
    appId: "1:954063427997:web:324c3c02d0e8ff8d48f774"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export default db;