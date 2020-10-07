import Vue from "vue"
import VueRouter from "vue-router"
import { auth } from '@/config/firebase'

import Index from "@/components/Index.vue"
import Home from "@/components/pages/Home.vue"
import Agenda from "@/components/pages/appointments/Agenda.vue"
import PatientsList from "@/components/pages/patients/PatientsList.vue"
import PatientView from "@/components/pages/patients/PatientView.vue"
import Settings from "@/components/pages/settings/Settings.vue"
import DentistsList from "@/components/pages/settings/dentists/DentistsList.vue"
import UsersList from "@/components/pages/settings/users/UsersList.vue"
import Login from "@/components/auth/Login.vue"


Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: "/",
        component: Index,
        //Meta campo é uma informação adicional que você pode definir para o seu percurso. requiresAuth nos informará que essa visão precisa de autenticação.
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
                name: "Pacientes",
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
                        name: "Cirurgiões-Dentistas",
                        path: "dentistas",
                        component: DentistsList,
                    },
                    {
                        name: "Usuários",
                        path: "usuarios",
                        component: UsersList,
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

// navigation guard to check for logged in users / Logica para deixar acessar apenas usuários autenticados, caso não o usuário é derirecionado para a tela de login
router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.requireAuth)
    if(requireAuth && !auth.currentUser) {
        next('login')
    }
    else next()
})

export default router
