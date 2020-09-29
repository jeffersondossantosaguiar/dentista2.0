<template>
    <v-main class="content">
        <router-view></router-view>
    </v-main>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
.v-main__wrap {
	background-color: #f1f6fc;
	padding: 20px;
}
</style>