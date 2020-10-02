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
					<v-list-item-title>
						<v-btn tile small @click="logout">
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
import firebase from 'firebase'

export default {
	computed: {
		...mapState(["drawer"]),
	},
	methods: {
		...mapMutations({
			setDrawer: "SET_DRAWER",
		}),
		logout() {
			/* var user = firebase.auth().currentUser;
			console.log("teste", user.uid); */
			firebase.auth().signOut().then(() => {
				this.$router.replace('login')
			})
		}
	}
};
</script>

<style>
</style>