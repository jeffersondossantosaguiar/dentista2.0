<template>
	<v-app id="inspire">
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md3>
					<v-card class="elevation-12">
						<v-card-title class="justify-center login-title ma-5"
							>Bem-Vindo!</v-card-title
						>
						<v-card-subtitle class="login-subtitle"
							>Faça login em sua conta</v-card-subtitle
						>
						<v-card-text>
							<v-form
								v-model="valid"
								ref="form"
								@submit.prevent
							>
								<!-- (.trim) remove emove os espaços em branco (whitespaces) do início e/ou fim de um texto -->
								<v-text-field
									v-model.trim="email"
									name="email"
									label="Email"
									type="text"
									:rules="[rules.required]"
									outlined
								></v-text-field>
								<v-text-field
									v-model.trim="password"
									:append-icon="
										show ? 'mdi-eye' : 'mdi-eye-off'
									"
									:rules="[rules.required]"
									:type="show ? 'text' : 'password'"
									name="input-10-1"
									label="Password"
									@click:append="show = !show"
									outlined
								></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions>
							<v-btn
								:disabled="!valid"
								block
								color="primary"
								large
								type="submit"
								@click="login"
								>Login</v-btn
							>
						</v-card-actions>
						<p class="esqueceu-senha pa-10">
							<a href="">Esqueceu a senha?</a>
						</p>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
/* import firebase from "firebase"; */

export default {
	data: () => ({
		email: "",
		password: "",
		valid: false,
		show: false,
		rules: {
			required: (value) => !!value || "Requerido.",
		},
	}),
	props: {
		source: String,
	},
	methods: {
		login() {
			this.$store.dispatch('login', {
			email: this.email,
			password: this.password
		})
			/* firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.replace("/");
				})
				.catch((error) => {
					console.log(error);
				}); */
		},
	},
};
</script>
<style>
.login-title {
	font-weight: 400;
	font-size: 30px;
}
.login-subtitle {
	text-align: center;
}
.esqueceu-senha {
	text-align: center;
	font-size: small;
}
</style>