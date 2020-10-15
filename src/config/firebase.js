import * as firebase from "firebase"
import 'firebase/auth'
import 'firebase/firestore'

//teste
// firebase init
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

firebase.initializeApp(firebaseConfig)

//utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

//Referencias das coleções
const usersCollection = db.collection('users')
const pacientesCollection = db.collection('pacientes')
const dentistasCollection = db.collection('dentistas')


export {
    db,
    auth,
    storage,
    usersCollection,
    pacientesCollection,
    dentistasCollection
}
