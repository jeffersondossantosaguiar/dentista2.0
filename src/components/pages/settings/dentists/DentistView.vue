<template>
	<v-container class="dentist-view">
		<DentistForm v-model="dialog" :editedDentist="editedDentist" />
		<v-container class="d-flex text-center align-self-center">
			<v-spacer></v-spacer>
			<v-btn text small color="primary">
				<v-icon>mdi-printer</v-icon>
			</v-btn>
			<v-btn text small color="primary" @click="editDentist(dentista)">
				<v-icon>mdi-account-edit</v-icon>Editar Dentista
			</v-btn>
		</v-container>
		<v-row>
			<v-col class="padding-right-0px" cols="12" md="3">
				<v-card class="v-card-min-height d-flex">
					<v-container class="text-center align-self-center">
						<v-avatar
							class="avatar rounded-circle"
							rounded="true"
							size="100"
						>
							<img
								src="../../../../assets/avatar.jpg"
								alt="Joselito"
							/>
						</v-avatar>
						<h3 class="pt-5">{{ dentista.nome }}</h3>
						<p>{{ dentista.email }}</p>
						<p>{{ dentista.telefone }}</p>
						<v-btn outlined color="primary">
							<v-icon>mdi-calendar-account</v-icon>Agenda
						</v-btn>
					</v-container>
				</v-card>
			</v-col>
			<v-col cols="12" md="9">
				<v-card class="v-card-min-height texto">
					<v-card-title>Dados</v-card-title>
					<v-container class="d-flex align-self-center flex-wrap">
						<v-container class="px-7">
							<v-row>
								<v-col cols="12">
									<v-row>
										<strong class="font-weight-medium"
											>Especialidade(s):</strong
										>
									</v-row>
									<v-row>
										<p
											v-for="especialidade in dentista.especialidade"
											:key="especialidade"
										>
											<v-chip>{{ especialidade }}</v-chip>
										</p>
									</v-row>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="4">
									<v-row>
										<strong class="font-weight-medium"
											>CPF</strong
										>
									</v-row>
									<v-row>
										<p>
											{{ dentista.cpf }}
										</p>
									</v-row>
								</v-col>
								<v-col cols="12" sm="4">
									<v-row>
										<strong class="font-weight-medium"
											>RG</strong
										>
									</v-row>
									<v-row>
										<p>
											{{ dentista.rg }}
										</p>
									</v-row>
								</v-col>
								<v-col cols="12" sm="4">
									<v-row>
										<strong class="font-weight-medium"
											>CRO</strong
										>
									</v-row>
									<v-row>
										<p>
											{{ dentista.cro }} -
											{{ dentista.croUf }}
										</p>
									</v-row>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="4">
									<v-row>
										<strong class="font-weight-medium"
											>Endereço</strong
										>
									</v-row>
									<v-row>
										<p>
											{{ dentista.endereco.logradouro }},
											{{ dentista.endereco.numero }}
											{{
												dentista.endereco.complemento
											}}
											-
											{{ dentista.endereco.bairro }}
										</p>
									</v-row>
								</v-col>
								<v-col cols="12" sm="4">
									<v-row>
										<strong class="font-weight-medium"
											>Cidade</strong
										>
									</v-row>
									<v-row>
										<p>
											{{ dentista.endereco.localidade }} -
											{{ dentista.endereco.uf }}
										</p>
									</v-row>
								</v-col>
								<v-col cols="12" sm="4">
									<v-row>
										<strong class="font-weight-medium"
											>Status</strong
										>
									</v-row>
									<v-row>
										<p>
											<v-icon
												v-if="dentista.ativo"
												color="green"
												fab
												>mdi-checkbox-marked-circle</v-icon
											>
											<v-icon v-else fab
												>mdi-checkbox-blank-circle-outline</v-icon
											>
										</p>
									</v-row>
								</v-col>
							</v-row>
						</v-container>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="4">
				<v-card class="v-card-min-height">
					<v-card-title>Disponibilidade</v-card-title>
					<v-card-text>
						<v-btn class="ma-2" small fab dark color="red">
							D
						</v-btn>
						<v-btn class="ma-2" small fab dark color="primary">
							S
						</v-btn>
						<v-btn class="ma-2" small fab dark color="primary">
							T
						</v-btn>
						<v-btn class="ma-2" small fab dark color="primary">
							Q
						</v-btn>
						<v-btn class="ma-2" small fab dark color="primary">
							Q
						</v-btn>
						<v-btn class="ma-2" small fab dark color="primary">
							S
						</v-btn>
						<v-btn class="ma-2" small fab dark color="primary">
							S
						</v-btn>
						<p>
							Segunda à Sexta, das 8:00 às 12:00 - 14:00 às 18:00
						<br>
							Sabado, das 8:00 às 12:00
						</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { dentistasCollection } from "@/config/firebase";
import DentistForm from "./DentistForm";

export default {
	name: "dentist-view",
	components: { DentistForm },
	data: () => ({
		dentista: {
			nome: "",
			email: "",
			cpf: "",
			rg: "",
			telefone: "",
			especialidade: [],
			cro: "",
			croUf: "",
			endereco: {
				cep: "",
				logradouro: "",
				numero: "",
				complemento: "",
				bairro: "",
				localidade: "",
				uf: "SP",
			},
		},
		dialog: false,
		editedDentist: null,
		files: {},
	}),
	created() {
		let dbRef = dentistasCollection.doc(this.$route.params.id);
		dbRef
			.get()
			.then((doc) => {
				this.dentista = doc.data();
				const option = {
					dateStyle: "long",
				};
				this.dentista.dataCriacao = this.dentista.dataCriacao
					.toDate()
					.toLocaleDateString("pt-BR", option);
			})
			.catch((error) => {
				console.log("ERRO", error);
			});
	},
	methods: {
		editDentist(dentista) {
			this.editedDentist = dentista;
			this.dialog = !this.dialog;
		},
	},
};
</script>

<style>
.texto {
	font-size: 0.9em;
}
.container {
	padding: 0;
}
.v-card-min-height {
	min-height: 350px;
}
.padding-right-0px {
	padding-right: 0px;
}
</style>
