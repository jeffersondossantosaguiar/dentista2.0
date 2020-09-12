<template>
    <aside class="menu">
        Menu <v-icon>mdi-menu</v-icon>
    </aside>
</template>

<script>
export default {
    name: 'Menu',
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background-color: #FAFCFE;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>