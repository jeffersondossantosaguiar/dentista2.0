import Vue from "vue"
import Vuex from "vuex"
import * as fb from "./firebase"
import router from "./router"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        drawer: null,
        userProfile: {},
        patients: []
    },
    mutations: { //A única maneira de realmente mudar de estado em um store Vuex é fazer um commit da mutação. As mutações do Vuex são muito semelhantes aos eventos: cada mutação tem uma cadeia de caracteres tipo e um manipulador.
        setUserProfile(state, val) {
            state.userProfile = val
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        setPatients(state, val) {
            state.patients = val
          }
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(
                form.email,
                form.password
            )

            // fetch user profile and set in state
            dispatch("fetchUserProfile", user)
        },
        async logout({ commit }) {
            await fb.auth.signOut()

            // clear userProfile and redirect to /login
            commit("setUserProfile", {})
            router.push("/login")
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit("setUserProfile", userProfile.data())

            // change route to dashboard
            if (router.currentRoute.path === "/login") {
                router.push("/")
            }
        },
        async getPacientes() {
        // buscando os pacientes na base de dados e setando o array com os mesmos no store
        await fb.pacientesCollection.onSnapshot((snapshotChange) => {
            let patientArray = []

            snapshotChange.forEach((res) => {
                patientArray.push({
                    id: res.id,
                    name: res.data().nome,
                    phone: res.data().telefone,
                    email: res.data().email
                })
            })
            store.commit('setPatients', patientArray)
        })
    },
    }
})

export default store
