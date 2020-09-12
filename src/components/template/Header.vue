<template>
    <div class="header">
        Cabeçalho
        <v-icon>home</v-icon>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background-color: #F1F6FC;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>