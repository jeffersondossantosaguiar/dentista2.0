<template>
	<v-app id="index">
		<Drawer />
		<AppBar />
		<Content data-app />
		<Footer />
	</v-app>
</template>

<script>
import Content from "@/components/template/Content"
import AppBar from "@/components/template/AppBar"
import Drawer from "@/components/template/Drawer"
import Footer from "@/components/template/Footer"

export default {
	name: "index",
	components: { Content, AppBar, Drawer, Footer },
};
</script>

<style>

</style>