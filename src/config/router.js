import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/pages/Home.vue'
import Agenda from '@/components/pages/Agenda.vue'
import PatientsList from '@/components/pages/patients/PatientsList.vue'
import PatientView from '@/components/pages/patients/PatientView.vue'
import PatientCreate from '@/components/pages/patients/PatientCreate.vue'
import Settings from '@/components/pages/Settings.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'Home',
    path: '/',
    component: Home,
}, {
    name: 'Agenda',
    path: '/agenda',
    component: Agenda,
}, {
    name: 'Pacientes',
    path: '/pacientes',
    component: PatientsList,
}, {
    name: 'Cadastro de Paciente',
    path: '/pacientes/cadastro',
    component: PatientCreate
}, {
    name: 'Paciente!',
    path: '/pacientes/:id',
    component: PatientView
}, {
    name: 'Configurações',
    path: '/settings',
    component: Settings,
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router