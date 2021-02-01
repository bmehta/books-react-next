import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDEO7wdqaDiBADqe7QqejZ4V_Gwwix_Uyg",
    authDomain: "books-react-next.firebaseapp.com",
    projectId: "books-react-next",
    storageBucket: "books-react-next.appspot.com",
    messagingSenderId: "422045674741",
    appId: "1:422045674741:web:96fc14428518b7cc9729bc",
    measurementId: "G-472FLVLXQV"
};
try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;
