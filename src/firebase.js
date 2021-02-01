import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA0AJTz-VvGsCG5ZWtfMj-x4cWaq-X80es",
    authDomain: "pokedex-react-70bfd.firebaseapp.com",
    projectId: "pokedex-react-70bfd",
    storageBucket: "pokedex-react-70bfd.appspot.com",
    messagingSenderId: "2830862063",
    appId: "1:2830862063:web:017c96bfbf12addbd47d1a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

export {auth, firebase}
