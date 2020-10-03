import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDbZ0uUCi1t38SaU2IDGUUX2mroYTyzcxE",
    authDomain: "dentista-2ponto0-4f64f.firebaseapp.com",
    databaseURL: "https://dentista-2ponto0-4f64f.firebaseio.com",
    projectId: "dentista-2ponto0-4f64f",
    storageBucket: "dentista-2ponto0-4f64f.appspot.com",
    messagingSenderId: "440981855242",
    appId: "1:440981855242:web:82ac7c298524ea6653d3f3",
    measurementId: "G-V6DDWRTDR2"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
