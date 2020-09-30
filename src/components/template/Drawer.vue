<template>
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
		<v-list dense v-for="item in navLinks" :key="item.text">
			<v-list-item v-if="!item.children" :to="item.path" color="primary">
				<v-list-item-action>
					<v-icon class="menu-icon">{{ item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>{{ item.text }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-group v-else :value="true" :prepend-icon="item.icon" >
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title>{{ item.text }}</v-list-item-title>
					</v-list-item-content>
				</template>

				<v-list-item
					v-for="(item, index) in item.children"
					:key="index"
					:to="item.path"
				>
					<v-list-item-action>
						<v-icon class="menu-icon">mdi-circle-small</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ item.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data: () => ({
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
				icon: "mdi-tune",
				children: [
				{ 
					text: "Dentistas", 
					path: "/configuracoes/dentistas", 
				},
				{ 
					text: "Usuários",
				},
				{ 
					text: "Anamneses",
				}],
			},
		],
	}),
	computed: {
		drawer: {
			get() {
				return this.$store.state.drawer;
			},
			set(val) {
				this.$store.commit("SET_DRAWER", val);
			},
		},
	},
};
</script>

<style>
</style>