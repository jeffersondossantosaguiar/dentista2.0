import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* isMenuToggle: false, */
        patient: {}
    },
    mutations: {
        /* toggleMenu(state, isToggle) {
            if(isToggle === undefined) {
                state.isMenuToggle = !state.isMenuToggle
            } else {
                state.isMenuToggle = isToggle
            }
            console.log('toggleMenu = ' + state.isMenuToggle);
        } */
    }
})