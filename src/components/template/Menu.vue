<template>
    <aside class="menu">
        <ul>
            Menu
            <v-icon>mdi-menu</v-icon>
            <li class="menu-line" v-for="(link, index) in navLinks" :key="index">
                <router-link :to="link.path">
                    <v-icon class="menu-icon">{{link.icon}}</v-icon>
                    {{ link.text }}
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: "Menu",
    props: ["navLinks"],
    methods: {
        toggleMenu() {
            this.$store.commit("toggleMenu");
        },
    },
};
</script>

<style>
.menu {
    grid-area: menu;
    background-color: #fafcfe;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.menu-line {
    padding: 20px;
}
.menu-line:hover {
    background-color: #ff5252;
}
.menu-line:hover * {
    color: #fff;
}
.menu a {
    text-decoration: none;
    align-items: center;
    font-weight: 500;
    color: #000;

    display: flex;
    align-items: center;
}
.menu-icon {
    margin-right: 20px;
}
</style>