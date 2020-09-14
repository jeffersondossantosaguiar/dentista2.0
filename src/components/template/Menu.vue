<template>
    <aside class="menu">
        <ul>
            <div class="menu-header">
                <div>
                <h1>Odontal</h1>
                <h2>Odontologia Assistencial</h2>
                </div>
                <v-icon>mdi-menu</v-icon>
            </div>
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
.menu-header {
        display: flex;
    align-items: center;
}
.menu-header h1 {
    font-size: 1,2em;
    
}
.menu-header h2 {
    font-size: 0.8em;
    color: gray;
    font-weight: 400;
}
.menu-header img {
    height: 100px;
}
.menu-line a {
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