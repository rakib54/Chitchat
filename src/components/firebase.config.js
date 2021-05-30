import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCqrI93xwQXx-0lhm3PshhQ4JzBsT8zuxw",
    authDomain: "chitchat-9ebab.firebaseapp.com",
    projectId: "chitchat-9ebab",
    storageBucket: "chitchat-9ebab.appspot.com",
    messagingSenderId: "591984089225",
    appId: "1:591984089225:web:79d29f7ed22788a0aa0e58"
}).auth();

// export const firebaseConfig = {
//     apiKey: "AIzaSyCqrI93xwQXx-0lhm3PshhQ4JzBsT8zuxw",
//     authDomain: "chitchat-9ebab.firebaseapp.com",
//     projectId: "chitchat-9ebab",
//     storageBucket: "chitchat-9ebab.appspot.com",
//     messagingSenderId: "591984089225",
//     appId: "1:591984089225:web:79d29f7ed22788a0aa0e58"
// };