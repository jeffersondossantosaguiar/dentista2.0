<template>
    <aside class="menu">
        Menu
    </aside>
</template>

<script>
export default {
    name: 'Menu'
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