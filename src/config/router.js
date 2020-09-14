import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/pages/Home.vue'
import Patients from '@/components/pages/Patients.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home,
    props: {
        title: 'Home'
    }
}, {
    name: 'pacientes',
    path: '/pacientes',
    component: Patients,
    props: {
        title: 'Pacientes'
    }
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router