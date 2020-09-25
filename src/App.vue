<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app>
			<v-list-item two-line :class="miniVariant && 'px-0'">
				<v-list-item-avatar>
					<img src="https://randomuser.me/api/portraits/men/81.jpg" />
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>Application</v-list-item-title>
					<v-list-item-subtitle>Subtext</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>
			<v-list dense v-for="(link, index) in navLinks" :key="index">
				<v-list-item :to="link.path">
					<v-list-item-action>
						<v-icon class="menu-icon">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ link.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="primary" dark>
			<v-app-bar-nav-icon
				@click.stop="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-icon large class="account-icon" v-if="$route.name === 'Paciente'"
				>mdi-account</v-icon
			>
			<v-toolbar-title
				v-if="$route.name === 'Paciente'"
				v-text="this.$store.state.patient.name"
			></v-toolbar-title>
			<v-toolbar-title v-else v-text="$route.name"></v-toolbar-title>
		</v-app-bar>

		<v-main class="content">
			<Content data-app />
		</v-main>
		<v-footer color="primary" app :inset="true">
			<span class="white--text"
				>&copy; {{ new Date().getFullYear() }}</span
			>
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
	background-color: #f1f6fc;
	padding: 20px;
}
.account-icon {
	margin-right: 10px;
}
</style>
