<template>
	<v-app-bar absolute app color="#f1f6fc" flat>
		<v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
		<v-toolbar-title v-text="$route.name"></v-toolbar-title>
		<v-spacer></v-spacer>
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item>
					<v-list-item-avatar>
						<img :src="userProfile.avatar" />
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{
							userProfile.nome
						}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>
				<v-list-item>
					<v-list-item-title>
						<v-btn block tile small @click="logout()">
							<v-icon left> mdi-logout-variant </v-icon>
							Logout
						</v-btn>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	computed: {
		...mapState(["drawer","userProfile"]),
	},
	methods: {
		...mapMutations({
			setDrawer: "SET_DRAWER",
		}),
		logout() {
			this.$store.dispatch("logout");
		},
	},
};
</script>

<style>
</style>