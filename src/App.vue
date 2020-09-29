<template>
	<v-app id="inspire">
		<Drawer />
		<AppBar />
		<Content data-app />
		<Footer />
	</v-app>
</template>

<script>
import Content from "./components/template/Content"
import AppBar from "./components/template/AppBar"
import Drawer from "./components/template/Drawer"
import Footer from "./components/template/Footer"

export default {
	name: "App",
	components: { Content, AppBar, Drawer, Footer },
};
</script>

<style>
* {
	font-family: "Poppins";
}

</style>
