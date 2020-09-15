import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/pages/Home.vue'
import Agenda from '@/components/pages/Agenda.vue'
import Patients from '@/components/pages/Patients.vue'
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
    component: Patients,
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