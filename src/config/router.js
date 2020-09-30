import Vue from "vue"
import VueRouter from "vue-router"
import Home from "@/components/pages/Home.vue"
import Agenda from "@/components/pages/appointments/Agenda.vue"
import PatientsList from "@/components/pages/patients/PatientsList.vue"
import PatientView from "@/components/pages/patients/PatientView.vue"
import Settings from "@/components/pages/settings/Settings.vue"
import DentistsList from "@/components/pages/settings/dentists/DentistsList.vue"

Vue.use(VueRouter)

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "Agenda",
        path: "/agenda",
        component: Agenda
    },
    {
        name: "Lista de Pacientes",
        path: "/pacientes",
        component: PatientsList
    },
    {
        name: "Paciente",
        path: "/pacientes/:id",
        component: PatientView,
        props: true
    },
    {
        name: "Configurações",
        path: "/configuracoes",
        component: Settings,
        children: [
            {
                name: "Lista de Dentistas",
                path: "dentistas",
                component: DentistsList
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
