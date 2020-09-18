<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app>
			<v-list dense v-for="(link, index) in navLinks" :key="index">
				<v-list-item :to="link.path">
					<v-list-item-action>
						<v-icon class="menu-icon">{{link.icon}}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ link.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="indigo" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title v-text="$route.name"></v-toolbar-title>
		</v-app-bar>

		<v-main class="content">
			<Content data-app />
		</v-main>
		<v-footer color="indigo" app :inset="true">
			<span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
import Content from "./components/template/Content";

export default {
	name: "App",
	components: { Content },
	data: () => ({
        drawer: null,
        miniVariant: false,
		navLinks: [
			{
				text: "Home",
				path: "/",
				icon: "mdi-home",
			},
			{
				text: "Agenda",
				path: "/agenda",
				icon: "mdi-calendar",
			},
			{
				text: "Pacientes",
				path: "/pacientes",
				icon: "mdi-account-group",
			},
			{
				text: "Configurações",
				path: "/settings",
				icon: "mdi-cogs",
			},
		],
	}),
};
</script>

<style>
* {
	font-family: "Poppins";
}

body {
	margin: 0;
}
.content {
        background-color: #F1F6FC;
        padding: 20px;
    }

</style>
