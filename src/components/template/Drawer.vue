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
				path: "/settings",
				icon: "mdi-cogs",
			},
		],
    }),
    computed: {
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
    }
};
</script>

<style>
</style>