import Vue from "vue"
import VueRouter from "vue-router"
import Index from "@/components/Index.vue"
import Home from "@/components/pages/Home.vue"
import Agenda from "@/components/pages/appointments/Agenda.vue"
import PatientsList from "@/components/pages/patients/PatientsList.vue"
import PatientView from "@/components/pages/patients/PatientView.vue"
import Settings from "@/components/pages/settings/Settings.vue"
import DentistsList from "@/components/pages/settings/dentists/DentistsList.vue"
import Login from "@/components/auth/Login.vue"

import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: "/",
        component: Index,
        meta: {
            requireAuth: true
        },
        children: [
            {
                name: "Home",
                path: "",
                component: Home,
            },
            {
                name: "Agenda",
                path: "/agenda",
                component: Agenda,
            },
            {
                name: "Lista de Pacientes",
                path: "/pacientes",
                component: PatientsList,
            },
            {
                name: "Paciente",
                path: "/pacientes/:id",
                component: PatientView,
                props: true,
            },
            {
                name: "Configurações",
                path: "/configuracoes",
                component: Settings,
                children: [
                    {
                        name: "Lista de Dentistas",
                        path: "dentistas",
                        component: DentistsList,
                    }
                ]
            }
        ]
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.requireAuth)
    if(requireAuth && !currentUser) next('login')
    else if (!requireAuth && currentUser) next('/');
    else next()
})

export default router
